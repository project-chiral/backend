import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { NodeEntity } from './entities/node.entity'
import { RelationEntity } from './entities/relation.entity'
import { CypherService } from './cypher/cypher.service'
import { RelationSchema, RelationType } from './schema'
import {
  Subscribe,
  ContentCreateMsg,
  ContentRemoveMsg,
  ContentUpdateMsg,
} from '@app/rmq/index'
import { TreeSchema, TreeType } from './tree-schema'
import { NodeIdsDto } from './dto/graph/node-ids.dto'
import { RelationIdDto } from './dto/graph/relation-id.dto'
import { RelationIdsDto } from './dto/graph/relation-ids.dto'
import { TreeIdDto } from './dto/tree/tree-id.dto'
import { MergeNodesDto } from './dto/graph/merge-nodes.dto'
import { TreeEntity } from './entities/tree.entity'
import { NodeIdDto } from './dto/graph/node-id.dto'
import { RemoveRelationsDto } from './dto/graph/remove-relations.dto'
import { PagenationQuery } from 'apps/base/src/dto/pagenation.query'

@Injectable()
export class GraphService {
  constructor(private readonly cypherService: CypherService) {}

  async getRelatedNodes({ type, id }: NodeIdDto, relType?: RelationType) {
    if (!relType) {
      const query = await this.cypherService.execute`
      match (:${type} ${{ id }})--(n)
      return n
      `.run()
      return plainToInstance(
        NodeEntity,
        query.map(({ n }) => n)
      )
    }

    const { from } = RelationSchema[relType]
    let query: Record<string, any>[]

    if (from === type) {
      query = await this.cypherService.execute`
      match (:${type} ${{ id }})-[:${relType}]->(n)
      return n
      `.run()
    } else {
      query = await this.cypherService.execute`
      match (n)-[:${relType}]->(:${type} ${{ id }})
      return n
      `.run()
    }

    return plainToInstance(
      NodeEntity,
      query.map(({ n }) => n)
    )
  }

  async getRelations({ type, id }: NodeIdDto, relType?: RelationType) {
    const relLabel = relType ? `:${relType}` : ''
    const query = await this.cypherService.execute`
    match (:${type} ${{ id }})-[r${relLabel}]-()
    return r
    `.run()

    return plainToInstance(
      RelationEntity,
      query.map(({ r }) => r)
    )
  }

  async getRelationsBatch({ type, ids }: NodeIdsDto, relType?: RelationType) {
    const relLabel = relType ? `:${relType}` : ''
    const query = await this.cypherService.execute`
    unwind ${ids} as id
    match (:${type} {id:id})-[r${relLabel}]-()
    return r
    `.run()

    return plainToInstance(
      RelationEntity,
      query.map(({ r }) => r)
    )
  }

  async createRelation({ type, from, to }: RelationIdDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    match 
      (from:${fromType} ${{ id: from }}),
      (to:${toType} ${{ id: to }})
    merge (from)-[r:${type}]->(to)
    return r
    `.run()

    return plainToInstance(RelationEntity, query)
  }

  async createRelationBatch({ type, ids }: RelationIdsDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    unwind ${ids} as data
    match 
      (from:${fromType} {id:data.from}), 
      (to:${toType} {id:data.to})
    merge (from)-[r:${type}]->(to)
    return r
    `.run()

    return plainToInstance(RelationEntity, query)
  }

  async removeRelations({ from, to, type }: RemoveRelationsDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    match 
      (from:${fromType} ${{ id: from }})
      -[r:${type}]->
      (to:${toType} ${{ id: to }})
    delete r
    return r
    `.run()

    return plainToInstance(RelationEntity, query)
  }

  async removeRelationsBatch({ type, ids }: RelationIdsDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    unwind ${ids} as data
    match
      (from:${fromType} {id:data.from})
      -[r:${type}]->
      (to:${toType} {id:data.to})
    delete r
    return r
    `.run()

    return plainToInstance(RelationEntity, query)
  }

  async mergeNodes(projectId: number, { type, nodes }: MergeNodesDto) {
    const query = await this.cypherService.execute`
    unwind ${nodes} as node
    merge (n:${type} {id:node.id, projectId:${projectId}})
    set n += node
    return n
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ n }) => n)
    )
  }

  async removeNodes({ type, ids }: NodeIdsDto) {
    const query = await this.cypherService.execute`
    match (n:${type})
    where n.id in ${ids}
    detach delete n
    `.run()

    return plainToInstance(NodeEntity, query)
  }

  // ---------------------------------- tree ----------------------------------

  async getTrees(projectId: number, type: TreeType) {
    const rootIds = (await this.getTreeRoots(projectId, type, {})).map(
      ({ properties: { id } }) => id
    )
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    unwind ${rootIds} as id
    match path = (:${type} {id:id})-[:${relType} *0..]->(:${type})
    with collect(path) as paths
    call apoc.convert.toTree(paths, false)
    yield value
    return value as tree
    `.run()

    return plainToInstance(
      TreeEntity,
      query.map(({ tree }) => tree)
    )
  }

  async searchTrees(projectId: number, type: TreeType, input: string) {
    const rootIds = (await this.getTreeRoots(projectId, type, {})).map(
      ({ properties: { id } }) => id
    )
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    unwind ${rootIds} as id
    match path = (:${type} {id:id})-[:${relType} *0..]->(n:${type})
    where n.name contains '${input}'
    with collect(path) as paths
    call apoc.convert.toTree(paths, false)
    yield value
    return value as tree
    `.run()

    return plainToInstance(
      TreeEntity,
      query.map(({ tree }) => tree)
    )
  }

  async getTreeRoots(
    projectId: number,
    type: TreeType,
    { page = 0, size }: PagenationQuery
  ) {
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    match (n:${type} {projectId:${projectId}})
    where not ()-[:${relType}]->(n)
    return n
    order by n.order
    skip ${page * (size ?? 0)}
    ${size ? `limit ${size}` : ''}
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ n }) => n)
    )
  }

  async getSupTree({ type, id }: TreeIdDto) {
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    match (n)-[:${relType}]->(:${type} ${{ id }})
    return n
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ n }) => n)
    )
  }

  async getAllSupTrees({ type, id }: TreeIdDto) {
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    match (n)-[:${relType} *0..]->(:${type} ${{ id }})
    return n
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ n }) => n)
    )
  }

  async getSubTrees({ type, id }: TreeIdDto) {
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    match (:${type} ${{ id }})-[:${relType}]->(n)
    return n
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ n }) => n)
    )
  }

  async getAllSubTrees({ type, id }: TreeIdDto) {
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    match (:${type} ${{ id }})-[:${relType}*]->(n)
    return n
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ n }) => n)
    )
  }

  async connectTrees({ type, id }: TreeIdDto, to: number[]) {
    const relType = TreeSchema(type)
    // 删除子节点原有的父节点
    const query = await this.cypherService.execute`
    unwind ${to} as id
    match (n)-[r:${relType}]->(:${type} {id:id})
    delete r
    return n
    `.run()

    // 连接子节点到新的父节点
    await this.cypherService.execute`
    unwind ${to} as id
    optional match (from:${type} {id:${id}}), (to:${type} {id:id})
    merge (from)-[:${relType}]->(to)
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ n }) => n)
    )
  }

  async disconnectTrees(type: TreeType, to: number[]) {
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    unwind ${to} as id
    optional match 
      (n:${type})
      -[r:${relType}]->
      (:${type} {id:id})
    delete r
    return n
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ n }) => n)
    )
  }

  // ----------------------------------- subscribe ----------------------------------

  @Subscribe('graph', 'content_create')
  protected async handleEntityCreate({
    type,
    data,
    projectId,
  }: ContentCreateMsg) {
    await this.mergeNodes(projectId, { type, nodes: data })
  }

  @Subscribe('graph', 'content_update')
  protected async handleEntityUpdate({
    type,
    data,
    projectId,
  }: ContentUpdateMsg) {
    await this.mergeNodes(projectId, { type, nodes: data })
  }

  @Subscribe('graph', 'content_remove')
  protected async handleEntityRemove({ type, ids }: ContentRemoveMsg) {
    await this.removeNodes({ type, ids })
  }
}

import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { NodeIdDto } from './dto/graph/node-id.dto'
import { NodeEntity } from './entities/node.entity'
import { RelationEntity } from './entities/relation.entity'
import { CypherService } from './cypher/cypher.service'
import { RelationSchema } from './schema'
import {
  Subscribe,
  ContentCreateMsg,
  ContentRemoveMsg,
  ContentUpdateMsg,
} from '@app/rmq/index'
import { NodeRelationsEntity } from './entities/node-relations.entity'
import { GetTreeRootQueryDto } from './dto/tree/get-tree-root-query.dto'
import { TreeSchema } from './tree-schema'
import { NodeIdsDto } from './dto/graph/node-ids.dto'
import { RelationIdDto } from './dto/graph/relation-id.dto'
import { RelationIdsDto } from './dto/graph/relation-ids.dto'
import { TreeIdDto } from './dto/tree/tree-id.dto'
import { ConnectTreesDto } from './dto/tree/connect-trees.dto'
import { DisconnectTreesDto } from './dto/tree/disconnect-trees.dto'
import { MergeNodesDto } from './dto/graph/merge-nodes.dto'

const RelationReturn = (name = 'r') => `
type(${name}) as type,
startnode(${name}).id as from,
endnode(${name}).id as to,
properties(${name}) as props`

@Injectable()
export class GraphService {
  constructor(private readonly cypherService: CypherService) {}

  async getNodeRelations({ type, id }: NodeIdDto) {
    const [fromQuery, toQuery] = await Promise.all([
      this.cypherService.execute`
      match (n)-[from]->(:${type} ${{ id }})
      return
        type(from) as type,
        n.id as id
      `.run(),
      this.cypherService.execute`
      match (:${type} ${{ id }})-[to]->(n)
      return
        type(to) as type,
        n.id as id
      `.run(),
    ])

    const result = new NodeRelationsEntity()
    for (const { type, id } of fromQuery) {
      result[type]?.from.push(id)
    }
    for (const { type, id } of toQuery) {
      result[type]?.to.push(id)
    }

    return result
  }

  async getRelation({ type, from, to }: RelationIdDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    match 
      (from:${fromType} ${{ id: from }})
      -[r:${type}]->
      (to:${toType} ${{ id: to }})
    return ${RelationReturn()}
    `.run()

    return plainToInstance(RelationEntity, query)
  }

  async createRelation({ type, from, to }: RelationIdDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    match 
      (from:${fromType} ${{ id: from }}),
      (to:${toType} ${{ id: to }})
    merge (from)-[r:${type}]->(to)
    return ${RelationReturn()}
    `.run()

    return plainToInstance(RelationEntity, query)
  }

  async createRelations({ type, ids }: RelationIdsDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    unwind ${ids} as data
    match 
      (from:${fromType} {id:data.from}), 
      (to:${toType} {id:data.to})
    merge (from)-[r:${type}]->(to)
    return ${RelationReturn()}
    `.run()

    return plainToInstance(RelationEntity, query)
  }

  async removeRelation({ from, to, type }: RelationIdDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    match 
      (from:${fromType} ${{ id: from }})
      -[r:${type}]->
      (to:${toType} ${{ id: to }})
    delete r
    return ${RelationReturn()}
    `.run()

    return plainToInstance(RelationEntity, query)
  }

  async removeRelations({ type, ids }: RelationIdsDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    unwind ${ids} as data
    match
      (from:${fromType} {id:data.from})
      -[r:${type}]->
      (to:${toType} {id:data.to})
    delete r
    return ${RelationReturn()}
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
    await this.cypherService.execute`
    match (n:${type})
    where n.id in ${ids}
    detach delete n
    `.run()
  }

  // ---------------------------------- tree ----------------------------------

  async getTreeRoots(
    projectId: number,
    { type, page = 0, size }: GetTreeRootQueryDto
  ) {
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    match (n:${relType} {projectId:${projectId}})
    where not ()-[:${type}]->(n)
    order by n.order
    return n
    skip ${page * (size ?? 0)}
    ${size && `limit ${size}`}
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

  async connectTrees({ type, from, to }: ConnectTreesDto) {
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
    optional match (from:${type} {id:${from}}), (to:${type} {id:id})
    merge (from)-[:${relType}]->(to)
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ n }) => n)
    )
  }

  async disconnectTrees({ type, to }: DisconnectTreesDto) {
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

  // async removeTree({ type, id }: TreeIdDto) {
  //   const relType = TreeSchema(type)
  //   await this.cypherService.execute`
  //   match (n:${type} ${{ id }})-[r:${relType}*]->(m)
  //   detach delete n, m
  //   `.run()
  // }

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

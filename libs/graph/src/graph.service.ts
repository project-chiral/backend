import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { NodeIdDto } from './dto/graph/node-id.dto'
import { NodeEntity } from './entities/node.entity'
import { RelationEntity } from './entities/relation.entity'
import { CypherService } from './cypher/cypher.service'
import { RelationSchema } from './schema'
import { Subscribe, EntityCreateMsg, EntityRemoveMsg } from '@app/rmq/index'
import { NodeRelationsEntity } from './entities/node-relations.entity'
import { GetTreeRootQueryDto } from './dto/tree/get-tree-root-query.dto'
import { TreeSchema } from './tree-schema'
import { NodeIdsDto } from './dto/graph/node-ids.dto'
import { RelationIdDto } from './dto/graph/relation-id.dto'
import { RelationIdsDto } from './dto/graph/relation-ids.dto'
import { TreeIdDto } from './dto/tree/tree-id.dto'
import { ConnectTreesDto } from './dto/tree/connect-trees.dto'
import { DisconnectTreesDto } from './dto/tree/disconnect-trees.dto'

const RelationReturn = (name = 'r') => `
type(${name}) as type,
startnode(${name}).id as from,
endnode(${name}).id as to,
properties(${name}) as props`

const nodeReturn = (name = 'n') => `
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

  async createNode(projectId: number, { type, id }: NodeIdDto) {
    const query = (
      await this.cypherService.execute`
    merge (n:${type} ${{ id, projectId }})
    return ${nodeReturn()}
    `.run()
    )[0]

    return (
      query?.props &&
      plainToInstance(NodeEntity, {
        type,
        ...query.props,
      })
    )
  }

  async createNodes(projectId: number, { type, ids }: NodeIdsDto) {
    const query = await this.cypherService.execute`
    unwind ${ids} as id
    merge (n:${type} {id:id, projectId:${projectId}})
    return ${nodeReturn()}
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ props }) => ({
        type,
        ...props,
      }))
    )
  }

  async removeNode({ type, id }: NodeIdDto) {
    const query = (
      await this.cypherService.execute`
    match (n:${type} ${{ id }})
    detach delete n
    return ${nodeReturn()}
    `.run()
    )[0]

    return (
      query?.props &&
      plainToInstance(NodeEntity, {
        type,
        ...query.props,
      })
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

  async getTreeRoots(projectId: number, { type }: GetTreeRootQueryDto) {
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    match (n:${relType} {projectId:${projectId}})
    where not ()-[:${type}]->(n)
    return ${nodeReturn()}
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ props }) => ({
        type,
        ...props,
      }))
    )
  }

  async getSupTree({ type, id }: TreeIdDto) {
    const relType = TreeSchema(type)
    const query = (
      await this.cypherService.execute`
    match (n)-[:${relType}]->(:${type} ${{ id }})
    return ${nodeReturn()}
    `.run()
    )[0]

    return (
      query?.props &&
      plainToInstance(NodeEntity, {
        type,
        ...query.props,
      })
    )
  }

  async getAllSupTrees({ type, id }: TreeIdDto) {
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    match (n)-[:${relType}*]->(:${type} ${{ id }})
    return ${nodeReturn()}
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ props }) => ({
        type,
        ...props,
      }))
    )
  }

  async getSubTrees({ type, id }: TreeIdDto) {
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    match (:${type} ${{ id }})-[:${relType}]->(n)
    return ${nodeReturn()}
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ props }) => ({
        type,
        ...props,
      }))
    )
  }

  async getAllSubTrees({ type, id }: TreeIdDto) {
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    match (:${type} ${{ id }})-[:${relType}*]->(n)
    return ${nodeReturn()}
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ props }) => ({
        type,
        ...props,
      }))
    )
  }

  async connectTrees({ type, from, to }: ConnectTreesDto) {
    const relType = TreeSchema(type)
    const query = await this.cypherService.execute`
    unwind ${to} as id
    optional match (n)-[r:${relType}]->(:${type} {id:id})
    delete r
    with n

    unwind ${to} as id
    optional match (from:${type} {id:${from}}), (to:${type} {id:id})
    merge (from)-[:${relType}]->(to)
    return ${nodeReturn()}
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ props }) => ({
        type,
        ...props,
      }))
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
    return ${nodeReturn()}
    `.run()

    return plainToInstance(
      NodeEntity,
      query.map(({ props }) => ({
        type,
        ...props,
      }))
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

  @Subscribe('graph', 'entity_create')
  protected async handleEntityCreate({
    type,
    ids,
    projectId,
  }: EntityCreateMsg) {
    await this.createNodes(projectId, { type, ids })
  }

  @Subscribe('graph', 'entity_remove')
  protected async handleEntityRemove({ type, ids }: EntityRemoveMsg) {
    await this.removeNodes({ type, ids })
  }
}

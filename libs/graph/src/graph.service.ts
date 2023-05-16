import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { NodeIdDto } from './dto/node-id.dto'
import { RelationIdDto } from './dto/relation-id.dto'
import { NodeEntity } from './entities/node.entity'
import { RelationEntity } from './entities/relation.entity'
import { CypherService } from './cypher/cypher.service'
import { RelationSchema } from './schema'
import { Subscribe, EntityCreateMsg, EntityRemoveMsg } from '@app/rmq/index'
import { NodeIdsDto } from './dto/node-ids.dto'
import { RelationIdsDto } from './dto/relation-ids.dto'
import { NodeRelationsEntity } from './entities/node-relations.entity'

const RelationReturn = `
type(r) as type,
startnode(r).id as from,
endnode(r).id as to,
properties(r) as props`

@Injectable()
export class GraphService {
  constructor(private readonly cypherService: CypherService) {}

  async getNodeRelations({ type, id }: NodeIdDto) {
    const [fromQuery, toQuery] = await Promise.all([
      this.cypherService.execute`
      match (a:${type} ${{ id }})<-[from]-(b)
      return
        type(from) as type,
        b.id as id
      `.run(),
      this.cypherService.execute`
      match (a:${type} ${{ id }})-[to]->(b)
      return
        type(to) as type,
        b.id as id
      `.run(),
    ])

    const result = new NodeRelationsEntity()
    for (const { type, id } of fromQuery) {
      result[type].from.push(id)
    }
    for (const { type, id } of toQuery) {
      result[type].to.push(id)
    }

    return result
  }

  async getRelation({ type, from, to }: RelationIdDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    match (from:${fromType} ${{ id: from }})
    -[r:${type}]->
    (to:${toType} ${{ id: to }})
    return ${RelationReturn}
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
    return ${RelationReturn}
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
    return ${RelationReturn}
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
    return ${RelationReturn}
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
    return ${RelationReturn}
    `.run()

    return plainToInstance(RelationEntity, query)
  }

  async createNode(projectId: number, { type, id }: NodeIdDto) {
    await this.cypherService.execute`
    merge (n:${type} ${{ id, projectId }})
    return n
    `.run()

    return plainToInstance(NodeEntity, {
      type,
      id,
      projectId,
    })
  }

  async createNodes(projectId: number, { type, ids }: NodeIdsDto) {
    const props = ids.map((id) => ({ id, projectId }))

    await this.cypherService.execute`
    unwind ${props} as props
    merge (n:${type} {id:props.id, projectId:props.projectId})
    return n
    `.run()
  }

  async removeNode({ type, id }: NodeIdDto) {
    const query = await this.cypherService.execute`
    match (n:${type} ${{ id }})
    detach delete n
    return 
      properites(n) as props
    `.run()[0]

    return plainToInstance(NodeEntity, {
      type,
      ...query?.props,
    })
  }

  async removeNodes({ type, ids }: NodeIdsDto) {
    await this.cypherService.execute`
    match (n:${type})
    where n.id in ${ids}
    detach delete n
    `.run()
  }

  @Subscribe('graph', 'entity_create')
  protected async handleEntityCreate({
    type,
    ids,
    projectId,
  }: EntityCreateMsg) {
    if (type === 'worldview') {
      return
    }
    await this.createNodes(projectId, { type, ids })
  }

  @Subscribe('graph', 'entity_remove')
  protected async handleEntityRemove({ type, ids }: EntityRemoveMsg) {
    if (type === 'worldview') {
      return
    }
    await this.removeNodes({ type, ids })
  }
}

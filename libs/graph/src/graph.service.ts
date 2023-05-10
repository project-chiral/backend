import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { NodeIdDto } from './dto/node-id.dto'
import { RelationIdDto } from './dto/relation-id.dto'
import { NodeEntity } from './entities/node.entity'
import { RelationEntity } from './entities/relation.entity'
import { NodeRelationsEntity } from './entities/node-relations.entity'
import { CypherService } from './cypher/cypher.service'
import { RelationType, RelationSchema } from './schema'
import { Subscribe, EntityCreateMsg, EntityRemoveMsg } from '@app/rmq/index'

@Injectable()
export class GraphService {
  constructor(private readonly cypherService: CypherService) {}

  async getNodeRelations({ type, id }: NodeIdDto) {
    const query = (await this.cypherService.execute`
    match (a:${type} ${{ id }})-[r]-(b)
    return
      type(r) as type,
      startnode(r).id = a.id as out,
      b.id as id
    `.run()) as { type: RelationType; out: boolean; id: number }[]

    const relations = new NodeRelationsEntity()
    for (const { type, out, id } of query) {
      const rel = relations[type]
      if (out) {
        rel.to.push(id)
      } else {
        rel.from.push(id)
      }
    }

    return relations
  }

  async getRelation({ type, from, to }: RelationIdDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    match (from:${fromType} ${{ id: from }})
    -[r:${type}]->
    (to:${toType} ${{ id: to }})
    return r
    `.run()

    return plainToInstance(
      RelationEntity,
      query.map((q) => q?.r)
    )
  }

  async createRelation(projectId: number, { from, to, type }: RelationIdDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    match 
      (from:${fromType} ${{ id: from, projectId }}),
      (to:${toType} ${{ id: to, projectId }})
    merge (from)-[r:${type}]->(to)
    return r
    `.run()

    return plainToInstance(
      RelationEntity,
      query.map((q) => q?.r)
    )
  }

  async createRelations(projectId: number, dtos: RelationIdDto[]) {
    // cypher中节点的label不能作为参数，因此只能先根据type归类，再分别执行
    const typeMap = {} as Record<string, { from?: number; to?: number }[]>
    for (const { from, to, type } of dtos) {
      if (!typeMap[type]) {
        typeMap[type] = []
      }
      typeMap[type].push({ from, to })
    }

    const query = (
      await Promise.all(
        Object.entries(typeMap).map(([type, dtos]) => {
          const { from: fromType, to: toType } = RelationSchema[type]
          return this.cypherService.execute`
        unwind ${dtos} as data
        match 
          (from:${fromType} {id:data.from, projectId:${projectId}}), 
          (to:${toType} {id:data.to, projectId:${projectId}})
        merge (from)-[r:${type}]->(to)
        return r
        `.run()
        })
      )
    ).flat()

    return plainToInstance(
      RelationEntity,
      query.map((q) => q?.r)
    )
  }

  async removeRelation({ from, to, type }: RelationIdDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    match 
      (from:${fromType} ${{ id: from }})
      -[r:${type}]->
      (to:${toType} ${{ id: to }})
    delete r
    return r
    `.run()

    return plainToInstance(
      RelationEntity,
      query.map((q) => q?.r)
    )
  }

  async removeRelations(dtos: RelationIdDto[]) {
    const typeMap = {} as Record<string, { from?: number; to?: number }[]>
    for (const { from, to, type } of dtos) {
      if (!typeMap[type]) {
        typeMap[type] = []
      }
      typeMap[type].push({ from, to })
    }

    const query = (
      await Promise.all(
        Object.entries(typeMap).map(([type, dtos]) => {
          const { from: fromType, to: toType } = RelationSchema[type]
          return this.cypherService.execute`
        unwind ${dtos} as data
        match 
          (from:${fromType} {id:data.from})
          -[r:${type}]->
          (to:${toType} {id:data.to})
        delete r
        return r
        `.run()
        })
      )
    ).flat()

    return plainToInstance(
      RelationEntity,
      query.map((q) => q?.r)
    )
  }

  async createNode(projectId: number, { type, id }: NodeIdDto) {
    const query = await this.cypherService.execute`
    merge (n:${type} ${{ id, projectId }})
    return n
    `.run()[0]

    return plainToInstance(NodeEntity, query?.n)
  }

  async removeNode({ type, id }: NodeIdDto) {
    const query = await this.cypherService.execute`
    match (n:${type} ${{ id }})
    detach delete n
    return n
    `.run()[0]

    return plainToInstance(NodeEntity, query?.n)
  }

  @Subscribe('entity_create', 'graph')
  protected async handleEntityCreate({
    type,
    ids,
    projectId,
  }: EntityCreateMsg) {
    const props = ids.map((id) => ({ id, projectId }))

    await this.cypherService.execute`
    unwind ${props} as props
    merge (n:${type} {id:props.id, projectId:props.projectId})
    return n
    `.run()
  }

  @Subscribe('entity_remove', 'graph')
  protected async handleEntityRemove({ type, ids }: EntityRemoveMsg) {
    await this.cypherService.execute`
    match (n:${type})
    where n.id in ${ids}
    detach delete n
    `.run()
  }
}

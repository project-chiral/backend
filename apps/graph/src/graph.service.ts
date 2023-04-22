import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { NodeIdDto } from './dto/node-id.dto'
import { RelationIdDto } from './dto/relation-id.dto'
import { NodeEntity } from './entities/node.entity'
import { RelationEntity } from './entities/relation.entity'
import { RelationsEntity } from './entities/relations.entity'
import { CypherService } from './cypher/cypher.service'
import { RelationType, RelationSchema } from './schema'
import { Subscribe, EntityCreateMsg, EntityRemoveMsg } from '@app/rmq/index'

@Injectable()
export class GraphService {
  constructor(private readonly cypherService: CypherService) {}

  async getRelations({ type, id }: NodeIdDto) {
    const query = (await this.cypherService.execute`
    match (a:${type} ${{ id }})-[r]-(b)
    return
      type(r) as type,
      startnode(r).id = a.id as out,
      b.id as id
    `.run()) as { type: RelationType; out: boolean; id: number }[]

    const relations = new RelationsEntity()
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

  async createRelation({ from, to, type }: RelationIdDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    match (from:${fromType} ${{ id: from }}), (to:${toType} ${{ id: to }})
    merge (from)-[r:${type}]->(to)
    return r
    `.run()

    return query.map((q) => plainToInstance(RelationEntity, q?.r))
  }

  async removeRelation({ from, to, type }: RelationIdDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    match (from:${fromType} ${{ id: from }})-[r:${type}]->(to:${toType} ${{
      id: to,
    }})
    delete r
    return r
    `.run()

    return query.map((q) => plainToInstance(RelationEntity, q?.r))
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

  @Subscribe('amq.direct', 'entity_create')
  async handleEntityCreate({ type, ids, projectId }: EntityCreateMsg) {
    // TODO
  }

  @Subscribe('amq.direct', 'entity_remove')
  async handleEntityRemove({ type, ids }: EntityRemoveMsg) {
    await this.cypherService.execute`
    match (n:${type})
    where n.id in ${ids}
    detach delete n
    `.run()
  }
}

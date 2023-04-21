import { Type } from 'class-transformer'
import { NodeEntity } from './node.entity'
import { RelationEntity } from './relation.entity'

export class GraphEntity {
  @Type(() => NodeEntity)
  nodes: NodeEntity[]

  @Type(() => RelationEntity)
  relations: RelationEntity[]
}

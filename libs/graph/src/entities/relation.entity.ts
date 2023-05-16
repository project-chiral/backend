import { Type } from 'class-transformer'
import type { RelationType } from '../schema'

export class RelationEntity {
  type: RelationType

  @Type(() => Number)
  from: number

  @Type(() => Number)
  to: number

  @Type(() => Object)
  props: Record<string, any>
}

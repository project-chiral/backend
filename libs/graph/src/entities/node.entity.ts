import { EntityType } from '@app/rmq/types'
import { Type } from 'class-transformer'

export class NodeEntity {
  type: EntityType

  @Type(() => Number)
  id: number

  @Type(() => Number)
  projectId: number
}

import { Type } from 'class-transformer'
import type { RelationType } from '../schema'

class Relations {
  from: number[] = []
  to: number[] = []
}

export class RelationsEntity implements Record<RelationType, Relations> {
  @Type(() => Relations)
  HAPPENED_AFTER: Relations = new Relations()

  @Type(() => Relations)
  LED_TO: Relations = new Relations()

  @Type(() => Relations)
  AFFECTED: Relations = new Relations()

  @Type(() => Relations)
  INCLUDES: Relations = new Relations()

  @Type(() => Relations)
  OCCURRED_IN: Relations = new Relations()

  @Type(() => Relations)
  HAS_RELATIONSHIP: Relations = new Relations()

  @Type(() => Relations)
  PARTICIPATED_IN: Relations = new Relations()

  @Type(() => Relations)
  CONTAINS: Relations = new Relations()
}

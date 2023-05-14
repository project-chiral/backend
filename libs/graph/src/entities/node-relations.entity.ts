import { Type } from 'class-transformer'
import type { RelationType } from '../schema'

class NodeRelation {
  from: number[] = []
  to: number[] = []
}

/**
 * 表示以某个节点为主体的所有关系
 */
export class NodeRelationsEntity implements Record<RelationType, NodeRelation> {
  @Type(() => NodeRelation)
  HAPPENED_AFTER: NodeRelation = new NodeRelation()

  @Type(() => NodeRelation)
  LED_TO: NodeRelation = new NodeRelation()

  @Type(() => NodeRelation)
  AFFECTED: NodeRelation = new NodeRelation()

  @Type(() => NodeRelation)
  INCLUDES: NodeRelation = new NodeRelation()

  @Type(() => NodeRelation)
  OCCURRED_IN: NodeRelation = new NodeRelation()

  @Type(() => NodeRelation)
  HAS_RELATIONSHIP: NodeRelation = new NodeRelation()

  @Type(() => NodeRelation)
  PARTICIPATED_IN: NodeRelation = new NodeRelation()

  @Type(() => NodeRelation)
  CONTAINS: NodeRelation = new NodeRelation()
}

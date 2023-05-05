export const EVENT = 'EVENT' // 事件
export const CHARA = 'CHARA' // 角色
export const SCENE = 'SCENE' // 场景

export const HAPPENED_AFTER = 'HAPPENED_AFTER' as const // event to event 顺承
export const LED_TO = 'LED_TO' as const // event to event 因果
export const AFFECTED = 'AFFECTED' as const // event to event 影响
export const OCCURRED_IN = 'OCCURRED_IN' as const // event to scene 发生在
export const HAS_RELATIONSHIP = 'HAS_RELATIONSHIP' as const // chara to chara 角色关系
export const PARTICIPATED_IN = 'PARTICIPATED_IN' as const // chara to event 参与
export const CONTAINS = 'CONTAINS' as const // scene to scene 场景包含

export declare const NodeType: {
  EVENT: 'EVENT'
  CHARA: 'CHARA'
  SCENE: 'SCENE'
}
export type NodeType = (typeof NodeType)[keyof typeof NodeType]
export enum NodeEnum {
  EVENT = 'EVENT',
  CHARA = 'CHARA',
  SCENE = 'SCENE',
}

export declare const RelationType: {
  HAPPENED_AFTER: 'HAPPENED_AFTER'
  LED_TO: 'LED_TO'
  AFFECTED: 'AFFECTED'
  OCCURRED_IN: 'OCCURRED_IN'
  HAS_RELATIONSHIP: 'HAS_RELATIONSHIP'
  PARTICIPATED_IN: 'PARTICIPATED_IN'
  CONTAINS: 'CONTAINS'
}
export type RelationType = (typeof RelationType)[keyof typeof RelationType]
export enum RelationEnum {
  HAPPENED_AFTER = 'HAPPENED_AFTER',
  LED_TO = 'LED_TO',
  AFFECTED = 'AFFECTED',
  OCCURRED_IN = 'OCCURRED_IN',
  HAS_RELATIONSHIP = 'HAS_RELATIONSHIP',
  PARTICIPATED_IN = 'PARTICIPATED_IN',
  CONTAINS = 'CONTAINS',
}

export const RelationSchema = {
  [HAPPENED_AFTER]: { from: EVENT, to: EVENT },
  [LED_TO]: { from: EVENT, to: EVENT },
  [AFFECTED]: { from: EVENT, to: EVENT },
  [OCCURRED_IN]: { from: EVENT, to: SCENE },
  [HAS_RELATIONSHIP]: { from: CHARA, to: CHARA },
  [PARTICIPATED_IN]: { from: CHARA, to: EVENT },
  [CONTAINS]: { from: SCENE, to: SCENE },
} as const
9

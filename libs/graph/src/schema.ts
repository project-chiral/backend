export const EVENT = 'event' // 事件
export const CHARA = 'chara' // 角色
export const SCENE = 'scene' // 场景

export const HAPPENED_AFTER = 'HAPPENED_AFTER' as const // event to event 顺承
export const LED_TO = 'LED_TO' as const // event to event 因果
export const AFFECTED = 'AFFECTED' as const // event to event 影响
export const OCCURRED_IN = 'OCCURRED_IN' as const // event to scene 发生在
export const HAS_RELATIONSHIP = 'HAS_RELATIONSHIP' as const // chara to chara 角色关系
export const PARTICIPATED_IN = 'PARTICIPATED_IN' as const // chara to event 参与
export const CONTAINS = 'CONTAINS' as const // scene to scene 场景包含

export enum NodeEnum {
  event = 'event',
  chara = 'chara',
  scene = 'scene',
  worldview = 'worldview',
}
export type NodeType = keyof typeof NodeEnum

export enum RelationEnum {
  HAPPENED_AFTER = 'HAPPENED_AFTER',
  LED_TO = 'LED_TO',
  AFFECTED = 'AFFECTED',
  OCCURRED_IN = 'OCCURRED_IN',
  HAS_RELATIONSHIP = 'HAS_RELATIONSHIP',
  PARTICIPATED_IN = 'PARTICIPATED_IN',
  CONTAINS = 'CONTAINS',
}
export type RelationType = keyof typeof RelationEnum

export const RelationSchema = {
  [HAPPENED_AFTER]: { from: EVENT, to: EVENT },
  [LED_TO]: { from: EVENT, to: EVENT },
  [AFFECTED]: { from: EVENT, to: EVENT },
  [OCCURRED_IN]: { from: EVENT, to: SCENE },
  [HAS_RELATIONSHIP]: { from: CHARA, to: CHARA },
  [PARTICIPATED_IN]: { from: CHARA, to: EVENT },
  [CONTAINS]: { from: SCENE, to: SCENE },
} as const

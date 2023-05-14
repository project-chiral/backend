export type ExchangeType =
  | 'amq.direct'
  | 'amq.fanout'
  | 'amq.headers'
  | 'amq.match'
  | 'amq.topic'

export type EntityType = 'event' | 'chara' | 'scene' | 'worldview'
export enum EntityEnum {
  event = 'event',
  chara = 'chara',
  scene = 'scene',
  worldview = 'worldview',
}

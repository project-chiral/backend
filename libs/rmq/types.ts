export type ExchangeType =
  | 'amq.direct'
  | 'amq.fanout'
  | 'amq.headers'
  | 'amq.match'
  | 'amq.topic'

export type ContentType = 'event' | 'chara' | 'scene' | 'worldview'
export enum ContentEnum {
  event = 'event',
  chara = 'chara',
  scene = 'scene',
  worldview = 'worldview',
}

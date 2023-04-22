import { RabbitSubscribe } from '@nestjs-plus/rabbitmq'
import { RmqMsgQueue } from '../message'

type ExchangeType =
  | 'amq.direct'
  | 'amq.fanout'
  | 'amq.headers'
  | 'amq.match'
  | 'amq.topic'

export const Subscribe = (exchange: ExchangeType, routingKey: RmqMsgQueue) =>
  RabbitSubscribe({
    exchange,
    routingKey,
  })

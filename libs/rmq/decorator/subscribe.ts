import { RabbitSubscribe } from '@nestjs-plus/rabbitmq'
import { RmqMsgQueue } from '../message'
import { ExchangeType } from '../types'

export const Subscribe = (exchange: ExchangeType, routingKey: RmqMsgQueue) =>
  RabbitSubscribe({
    exchange,
    routingKey,
  })

import { RabbitSubscribe } from '@nestjs-plus/rabbitmq'
import { RmqSubscribeKeys } from '../subscribe'
import { ExchangeType } from '../types'

export const Subscribe = (
  exchange: ExchangeType,
  routingKey: RmqSubscribeKeys
) =>
  RabbitSubscribe({
    exchange,
    routingKey,
  })

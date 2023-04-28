import { RabbitRPC, RabbitSubscribe } from '@nestjs-plus/rabbitmq'
import { RmqSubscribeKeys } from './subscribe'
import { ExchangeType } from './types'

export const Subscribe = (
  exchange: ExchangeType,
  routingKey: RmqSubscribeKeys
) =>
  RabbitSubscribe({
    exchange,
    routingKey,
  })

export const Rpc = (exchange: ExchangeType, routingKey: RmqSubscribeKeys) =>
  RabbitRPC({
    exchange,
    routingKey,
  })

import { RabbitRPC, RabbitSubscribe } from '@nestjs-plus/rabbitmq'
import { RmqSubscribeKeys } from './subscribe'

export const Subscribe = (queue: RmqSubscribeKeys) =>
  RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: queue,
    queue,
  })

export const Rpc = (queue: RmqSubscribeKeys) =>
  RabbitRPC({
    exchange: 'amq.direct',
    routingKey: queue,
    queue,
  })

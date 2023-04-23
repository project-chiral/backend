import { AmqpConnection } from '@nestjs-plus/rabbitmq'
import { Injectable } from '@nestjs/common'
import { ExchangeType } from './types'
import { RmqSubscribeKeys, RmqSubscribeTypes } from './subscribe'
import { RmqRpcKeys, RmqRpcTypes } from './rpc'

@Injectable()
export class RmqService {
  constructor(private readonly rmq: AmqpConnection) {}

  async publish<K extends RmqSubscribeKeys>(
    exchange: ExchangeType,
    routingKey: K,
    msg: RmqSubscribeTypes[K]
  ) {
    this.rmq.publish(exchange, routingKey, msg)
  }

  async request<K extends RmqRpcKeys>(
    exchange: ExchangeType,
    routingKey: K,
    payload: RmqRpcTypes[K]['req']
  ) {
    return this.rmq.request<RmqRpcTypes[K]['res']>({
      exchange,
      routingKey,
      payload,
    })
  }
}

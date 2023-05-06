import { AmqpConnection } from '@nestjs-plus/rabbitmq'
import { Injectable } from '@nestjs/common'
import { RmqSubscribeKeys, RmqSubscribeTypes } from './subscribe'
import { RmqRpcKeys, RmqRpcTypes } from './rpc'

@Injectable()
export class RmqService {
  constructor(private readonly rmq: AmqpConnection) {}

  async publish<K extends RmqSubscribeKeys>(
    routingKey: K,
    msg: RmqSubscribeTypes[K]
  ) {
    this.rmq.publish('amq.direct', routingKey, msg)
  }

  async request<K extends RmqRpcKeys>(
    routingKey: K,
    payload: RmqRpcTypes[K]['req']
  ) {
    return this.rmq.request<RmqRpcTypes[K]['res']>({
      exchange: 'amq.direct',
      routingKey,
      payload,
    })
  }
}

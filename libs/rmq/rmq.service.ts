import { AmqpConnection } from '@nestjs-plus/rabbitmq'
import { Injectable } from '@nestjs/common'
import { ExchangeType } from './types'
import { RmqMsgQueue, RmqMsgTypes } from './message'

@Injectable()
export class RmqService {
  constructor(private readonly rmq: AmqpConnection) {}

  async publish<K extends RmqMsgQueue>(
    exchange: ExchangeType,
    routingKey: K,
    msg: RmqMsgTypes[K]
  ) {
    this.rmq.publish(exchange, routingKey, msg)
  }

  async request<T, P>(
    exchange: ExchangeType,
    routingKey: RmqMsgQueue,
    payload: P
  ): Promise<T> {
    return this.rmq.request<T>({
      exchange,
      routingKey,
      payload,
    })
  }
}

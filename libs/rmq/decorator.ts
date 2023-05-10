import { RabbitRPC, RabbitSubscribe } from '@nestjs-plus/rabbitmq'
import { RmqTopic } from './subscribe'

export const Subscribe = (
  id: string,
  topic: RmqTopic,
  subTopics: string[] = ['*']
) =>
  RabbitSubscribe({
    exchange: 'amq.topic',
    queue: `${id}_${topic}`,
    routingKey: `${topic}${subTopics.map((s) => `.${s}`)}`,
  })

export const Rpc = (queue: RmqTopic) =>
  RabbitRPC({
    exchange: 'amq.direct',
    routingKey: queue,
    queue,
  })

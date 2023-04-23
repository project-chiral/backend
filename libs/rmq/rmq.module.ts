import { RabbitMQModule } from '@nestjs-plus/rabbitmq'
import { Global, Module } from '@nestjs/common'
import { RmqService } from './rmq.service'

const USERNAME = process.env.RMQ_USERNAME
const PASSWORD = process.env.RMQ_PASSWORD
const HOST = process.env.RMQ_HOST
const PORT = process.env.RMQ_PORT

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: `amqp://${USERNAME}:${PASSWORD}@${HOST}:${PORT}`,
      defaultRpcTimeout: 50000,
      defaultExchangeType: '',
    }),
  ],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {}

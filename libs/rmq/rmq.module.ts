import { RabbitMQModule } from '@nestjs-plus/rabbitmq'
import { Module } from '@nestjs/common'

const USERNAME = process.env.RMQ_USERNAME
const PASSWORD = process.env.RMQ_PASSWORD
const HOST = process.env.RMQ_HOST
const PORT = process.env.RMQ_PORT

@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: `amqp://${USERNAME}:${PASSWORD}@${HOST}:${PORT}`,
      defaultRpcTimeout: 50000,
      defaultExchangeType: '',
    }),
  ],
})
export class RmqModule {}

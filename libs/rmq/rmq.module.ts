import { RabbitMQModule } from '@nestjs-plus/rabbitmq'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: process.env.RMQ_URI as string,
      defaultRpcTimeout: 50000,
      defaultExchangeType: '',
    }),
  ],
})
export class RmqModule {}

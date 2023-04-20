import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { AmqpConnection } from '@nestjs-plus/rabbitmq'
import { EventService } from './event.service'
import { EventController } from './event.controller'

@Module({
  imports: [],
  controllers: [EventController],
  providers: [EventService, PrismaService, AmqpConnection],
})
export class EventModule {}

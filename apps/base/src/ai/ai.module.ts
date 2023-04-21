import { Module } from '@nestjs/common'
import { AiService } from './ai.service'
import { AiController } from './ai.controller'
import { EventService } from '../event/event.service'
import { ProjectService } from '../project/project.service'
import { AmqpConnection } from '@nestjs-plus/rabbitmq'
import { OpenaiService } from '../api/openai.service'

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    OpenaiService,
    EventService,
    ProjectService,
    AmqpConnection,
  ],
})
export class AiModule {}

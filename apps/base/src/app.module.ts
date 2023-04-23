import { Module } from '@nestjs/common'
import { EnvModule } from 'libs/env'
import { PrismaModule } from 'nestjs-prisma'
import { AmqpConnection } from '@nestjs-plus/rabbitmq'
import { HttpModule } from '@nestjs/axios'
import { RmqModule } from 'libs/rmq/rmq.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EventModule } from './event/event.module'
import { CharaModule } from './chara/chara.module'
import { FileModule } from './file/file.module'
import { TaskService } from './task/task.service'
import { SceneModule } from './scene/scene.module'
import { ProjectModule } from './project/project.module'
import { WorldviewModule } from './worldview/worldview.module'
import { OpenaiService } from './api/openai.service'
import { AiModule } from './ai/ai.module'
import { RequestContextModule } from 'nestjs-request-context'

@Module({
  imports: [
    EnvModule,
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [],
      },
    }),
    RmqModule,
    RequestContextModule,
    HttpModule,
    EventModule,
    CharaModule,
    SceneModule,
    FileModule,
    WorldviewModule,
    ProjectModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService, TaskService, OpenaiService, AmqpConnection],
})
export class AppModule {}

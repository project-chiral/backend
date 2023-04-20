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

@Module({
  imports: [
    EnvModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    RmqModule,
    HttpModule,
    EventModule,
    CharaModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService, TaskService, AmqpConnection],
})
export class AppModule {}

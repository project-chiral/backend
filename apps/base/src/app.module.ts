import { Module } from '@nestjs/common'
import { EnvModule } from 'libs/env'
import { PrismaModule } from 'nestjs-prisma'
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
import { RequestContextModule } from 'nestjs-request-context'
import { GraphModule } from './graph/graph.module'
import { CacheModule } from '@app/cache'
import { UtilsModule } from '@app/utils'

@Module({
  imports: [
    EnvModule,
    RmqModule,
    GraphModule,
    CacheModule,
    UtilsModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    RequestContextModule,
    HttpModule,
    EventModule,
    CharaModule,
    SceneModule,
    FileModule,
    WorldviewModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}

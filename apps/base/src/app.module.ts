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
import { SceneModule } from './scene/scene.module'
import { ProjectModule } from './project/project.module'
import { WorldviewModule } from './worldview/worldview.module'
import { RequestContextModule } from 'nestjs-request-context'
import { GraphModule } from './graph/graph.module'
import { CacheModule } from '@app/cache'
import { UtilsModule } from '@app/utils'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CaslModule } from './casl/casl.module'
import { UserModule } from './user/user.module'
import { TreeModule } from './tree/tree.module'

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
    ServeStaticModule.forRoot({
      rootPath: process.env.FILE_PATH,
    }),
    EventModule,
    CharaModule,
    SceneModule,
    FileModule,
    WorldviewModule,
    ProjectModule,
    CaslModule,
    UserModule,
    TreeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

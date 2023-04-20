import { Module } from '@nestjs/common'
import { EnvModule } from 'libs/env'
import { RmqModule } from 'libs/rmq/rmq.module'
import { QaController } from './qa.controller'
import { QaService } from './qa.service'

@Module({
  imports: [EnvModule, RmqModule],
  controllers: [QaController],
  providers: [QaService],
})
export class QaModule {}

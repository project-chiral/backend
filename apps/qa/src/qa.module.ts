import { Module } from '@nestjs/common'
import { EnvModule } from '@app/env'
import { QaController } from './qa.controller'
import { QaService } from './qa.service'

@Module({
  imports: [
    EnvModule,
  ],
  controllers: [QaController],
  providers: [QaService],
})
export class QaModule {}

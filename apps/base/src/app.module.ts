import { Module } from '@nestjs/common'
import { EnvModule } from '@app/env'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    EnvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

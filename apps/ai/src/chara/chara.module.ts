import { Module } from '@nestjs/common'
import { CharaService } from './chara.service'
import { PrismaModule } from 'nestjs-prisma'
import { CharaController } from './chara.controller';

@Module({
  imports: [PrismaModule],
  providers: [CharaService],
  exports: [CharaService],
  controllers: [CharaController],
})
export class CharaModule {}

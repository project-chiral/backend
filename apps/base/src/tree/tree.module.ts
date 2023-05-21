import { Module } from '@nestjs/common'
import { TreeController } from './tree.controller'
import { GraphModule } from '@app/graph'

@Module({
  imports: [GraphModule],
  controllers: [TreeController],
})
export class TreeModule {}

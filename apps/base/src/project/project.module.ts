import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService],
  imports: [],
})
export class ProjectModule {}

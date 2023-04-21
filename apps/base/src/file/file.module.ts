import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { TaskService } from '../task/task.service'

@Module({
  controllers: [FileController],
  providers: [FileService, TaskService],
})
export class FileModule {}

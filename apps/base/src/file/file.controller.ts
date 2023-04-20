import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileService } from './file.service'
import { ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes } from '@nestjs/swagger'
import { UploadFileDto } from './dto/upload-file.dto'
import { RemoveFileDto } from './dto/remove-file.dto'

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  upload(
    @Body() dto: UploadFileDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.fileService.upload(dto, file)
  }

  @Delete()
  remove(@Body() dto: RemoveFileDto) {
    return this.fileService.remove(dto)
  }

  @Post('temp')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  uploadTemp(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadTemp(file)
  }
}

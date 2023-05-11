import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileService } from './file.service'
import { ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes } from '@nestjs/swagger'
import { UploadFileDto } from './dto/upload-file.dto'
import { RemoveFileDto } from './dto/remove-file.dto'
import { UploadTempFileDto } from './dto/upload-temp-file.dto'
import { SaveTempFileDto } from './dto/save-temp-file.dto'
import { UtilsService } from '@app/utils'

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly utils: UtilsService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  upload(
    @Body() dto: UploadFileDto,
    @UploadedFile('file') file: Express.Multer.File
  ) {
    return this.fileService.upload(this.utils.getProjectId(), { ...dto, file })
  }

  @Delete()
  remove(@Body() dto: RemoveFileDto) {
    return this.fileService.remove(this.utils.getProjectId(), dto)
  }

  @Post('temp')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  uploadTemp(
    @Body() dto: UploadTempFileDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.fileService.uploadTemp({ ...dto, file })
  }

  @Put('temp/save')
  saveTemp(@Body() dto: SaveTempFileDto) {
    return this.fileService.saveTemp(dto)
  }
}

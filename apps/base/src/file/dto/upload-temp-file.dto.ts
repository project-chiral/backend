import { Allow } from 'class-validator'
import { ApiFile } from '../../decorators/file'

export class UploadTempFileDto {
  @ApiFile()
  @Allow()
  file: Express.Multer.File
}

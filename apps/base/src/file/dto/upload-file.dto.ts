import { IsString } from 'class-validator'
import { ApiFile } from '../../decorators/file'

export class UploadFileDto {
  @IsString()
  position: string

  @ApiFile()
  file: Express.Multer.File
}

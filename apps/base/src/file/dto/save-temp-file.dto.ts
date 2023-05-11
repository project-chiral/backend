import { IsString } from 'class-validator'

export class SaveTempFileDto {
  @IsString()
  name: string

  @IsString()
  position: string
}

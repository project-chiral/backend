import { IsString } from 'class-validator'

export class RemoveFileDto {
  @IsString()
  position: string
}

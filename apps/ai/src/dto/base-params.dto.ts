import { IsString, IsNotEmpty, IsEnum } from 'class-validator'
import { Lang } from '../const'

export class BaseParams {
  @IsString()
  @IsNotEmpty()
  doc: string

  @IsEnum(Lang)
  lang: string
}

import { Type } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdateSettingsDto {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  darkMode?: boolean

  @IsString()
  @IsOptional()
  lang?: string
}

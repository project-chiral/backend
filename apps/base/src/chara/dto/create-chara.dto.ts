import { Type } from 'class-transformer'
import { IsDate, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

export class CreateCharaDto {
  @IsString()
  name: string

  @IsString({ each: true })
  @Type(() => String)
  @IsOptional()
  alias?: string[]

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  avatar?: string

  @IsInt()
  @Min(0)
  @Max(8)
  @IsOptional()
  @Type(() => Number)
  unit?: number

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  start?: Date

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  end?: Date
}

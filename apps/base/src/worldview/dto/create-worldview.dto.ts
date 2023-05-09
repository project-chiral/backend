import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class CreateWorldviewDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  path: string

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  supId?: number
}

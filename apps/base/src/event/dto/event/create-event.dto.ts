import { Type } from 'class-transformer'
import {
  IsDate,
  IsHexColor,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator'

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  path?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsHexColor()
  color: string

  @IsInt()
  @Min(0)
  @Max(8)
  @Type(() => Number)
  unit: number

  @IsDate()
  @Type(() => Date)
  start: Date

  @IsDate()
  @Type(() => Date)
  end: Date

  @IsUrl()
  @IsOptional()
  cover?: string
}

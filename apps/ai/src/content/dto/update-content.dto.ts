import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator'
import { EntityEnum, EntityType } from '@app/rmq/types'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class UpdateContentDto {
  @IsEnum(EntityEnum)
  @ApiProperty({ enum: EntityEnum })
  type: EntityType

  @IsInt()
  @Type(() => Number)
  id: number

  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  desc?: string
}

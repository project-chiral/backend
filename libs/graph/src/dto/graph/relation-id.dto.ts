import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsOptional } from 'class-validator'
import type { RelationType } from '../../schema'
import { RelationEnum } from '../../schema'
import { Type } from 'class-transformer'

export class RelationIdDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  from?: number

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  to?: number

  @IsEnum(RelationEnum)
  @ApiProperty({ enum: RelationEnum })
  type: RelationType
}

import { RelationEnum, RelationType } from '@app/graph/schema'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional } from 'class-validator'

export class RemoveRelationsDto {
  @IsEnum(RelationEnum)
  @ApiProperty({ enum: RelationEnum })
  type: RelationType

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  from?: number

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  to?: number
}

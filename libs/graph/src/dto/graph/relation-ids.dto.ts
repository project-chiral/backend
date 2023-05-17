import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsOptional, ValidateNested } from 'class-validator'
import { RelationEnum, RelationType } from '../../schema'
import { Type } from 'class-transformer'

class Relation {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  from?: number

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  to?: number
}

export class RelationIdsDto {
  @IsEnum(RelationEnum)
  @ApiProperty({ enum: RelationEnum })
  type: RelationType

  @ValidateNested()
  @Type(() => Relation)
  ids: Relation[]
}

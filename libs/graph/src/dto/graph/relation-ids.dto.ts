import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, ValidateNested } from 'class-validator'
import { RelationEnum, RelationType } from '../../schema'
import { Type } from 'class-transformer'

class Relation {
  @IsInt()
  @Type(() => Number)
  from: number

  @IsInt()
  @Type(() => Number)
  to: number
}

export class RelationIdsDto {
  @IsEnum(RelationEnum)
  @ApiProperty({ enum: RelationEnum })
  type: RelationType

  @ValidateNested()
  @Type(() => Relation)
  ids: Relation[]
}

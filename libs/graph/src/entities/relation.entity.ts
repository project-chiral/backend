import { Type } from 'class-transformer'
import { RelationEnum, RelationType } from '../schema'
import { ApiProperty } from '@nestjs/swagger'

export class RelationEntity {
  @ApiProperty({ enum: RelationEnum })
  type: RelationType

  @Type(() => Number)
  from: number

  @Type(() => Number)
  to: number

  @Type(() => Object)
  props: Record<string, any>
}

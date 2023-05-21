import {
  NodeEnum,
  NodeType,
  RelationEnum,
  RelationType,
} from '@app/graph/schema'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional } from 'class-validator'

export class GetRelationsBatchDto {
  @IsEnum(NodeEnum)
  @ApiProperty({ enum: NodeEnum })
  type: NodeType

  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[]

  @ApiProperty({ enum: RelationEnum })
  @IsEnum(RelationEnum)
  @IsOptional()
  relType?: RelationType
}

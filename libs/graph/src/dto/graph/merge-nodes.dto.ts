import { NodeEnum, NodeType } from '@app/graph/schema'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

class NodeData {
  @IsInt()
  @Type(() => Number)
  id: number

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  order?: number

  @IsString()
  @IsOptional()
  name?: string
}

export class MergeNodesDto {
  @ApiProperty({ enum: NodeEnum })
  @IsEnum(NodeEnum)
  type: NodeType

  @ValidateNested()
  @Type(() => NodeData)
  nodes: NodeData[]
}

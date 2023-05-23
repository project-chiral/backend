import { NodeEnum, NodeType } from '@app/graph/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'

export class NodeTypeParams {
  @ApiProperty({ enum: NodeEnum })
  @IsEnum(NodeEnum)
  type: NodeType
}

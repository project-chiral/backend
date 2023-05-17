import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { NodeEnum, NodeType } from '../schema'

export class NodeEntity {
  @ApiProperty({ enum: NodeEnum })
  type: NodeType

  @Type(() => Number)
  id: number

  @Type(() => Number)
  projectId: number
}

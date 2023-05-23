import { ApiProperty } from '@nestjs/swagger'
import { TreeEnum, TreeType } from '../tree-schema'
import { NodeData } from './node.entity'

export class TreeEntity extends NodeData {
  _id: number
  @ApiProperty({ enum: TreeEnum })
  _type: TreeType
}

import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { NodeEnum, NodeType } from '../schema'
import { Node } from 'cypher-query-builder'
export class NodeData {
  @Type(() => Number)
  id: number

  @Type(() => Number)
  projectId: number

  @Type(() => Number)
  order: number

  name: string
}

export class NodeEntity implements Node<NodeData> {
  identity: string

  @ApiProperty({ enum: NodeEnum })
  labels: NodeType[]

  properties: NodeData
}

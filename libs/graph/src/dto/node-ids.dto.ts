import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsInt } from 'class-validator'
import type { NodeType } from '../schema'
import { NodeEnum } from '../schema'

export class NodeIdsDto {
  @IsEnum(NodeEnum)
  @ApiProperty({ enum: NodeEnum })
  type: NodeType

  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[]
}

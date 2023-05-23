import { TreeEnum, TreeType } from '@app/graph/tree-schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'

export class TreeTypeParams {
  @ApiProperty({ enum: TreeEnum })
  @IsEnum(TreeEnum)
  type: TreeType
}

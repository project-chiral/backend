import { IsEnum, IsInt } from 'class-validator'
import { TreeEnum, TreeType } from '../../tree-schema'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class TreeIdsDto {
  @IsEnum(TreeEnum)
  @ApiProperty({ enum: TreeEnum })
  type: TreeType

  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[]
}

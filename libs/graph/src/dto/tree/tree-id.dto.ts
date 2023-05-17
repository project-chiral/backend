import { IsEnum, IsInt } from 'class-validator'
import { TreeEnum, TreeType } from '../../tree-schema'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class TreeIdDto {
  @IsEnum(TreeEnum)
  @ApiProperty({ enum: TreeEnum })
  type: TreeType

  @IsInt()
  @Type(() => Number)
  id: number
}

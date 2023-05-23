import { TreeEnum, TreeType } from '@app/graph/tree-schema'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsInt } from 'class-validator'

export class DisconnectTreesQuery {
  @IsEnum(TreeEnum)
  @ApiProperty({ enum: TreeEnum })
  type: TreeType

  @IsInt({ each: true })
  @Type(() => Number)
  to: number[]
}

import { IsEnum, IsInt, IsOptional, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { TreeEnum, TreeType } from '../../tree-schema'
import { Type } from 'class-transformer'

export class GetTreeRootQueryDto {
  @IsEnum(TreeEnum)
  @ApiProperty({ enum: TreeEnum })
  type: TreeType

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  size?: number

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  page?: number
}

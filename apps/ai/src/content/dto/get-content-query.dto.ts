import { IsEnum, IsInt } from 'class-validator'
import { EntityEnum, EntityType } from '@app/rmq/types'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class GetContentQueryDto {
  @ApiProperty({ enum: EntityEnum })
  @IsEnum(EntityEnum)
  type: EntityType

  @IsInt()
  @Type(() => Number)
  id: number
}

export class GetContentsQueryDto {
  @ApiProperty({ enum: EntityEnum })
  @IsEnum(EntityEnum)
  type: EntityType

  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[]
}

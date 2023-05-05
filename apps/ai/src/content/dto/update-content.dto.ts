import { IsEnum, IsInt, IsString } from 'class-validator'
import { EntityEnum, EntityType } from '@app/rmq/types'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateContentDto {
  @IsEnum(EntityEnum)
  @ApiProperty({ enum: EntityEnum })
  type: EntityType

  @IsInt()
  id: number

  @IsString()
  content: string
}

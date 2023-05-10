import { EntityEnum, EntityType } from '@app/rmq/types'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class SearchContentQueryDto {
  @ApiProperty({ enum: EntityEnum })
  @IsEnum(EntityEnum)
  type: EntityType

  @IsString()
  @IsNotEmpty()
  query: string

  @IsNumber()
  @Min(1)
  k: number
}

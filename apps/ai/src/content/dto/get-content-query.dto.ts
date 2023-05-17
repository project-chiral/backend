import { IsEnum, IsInt } from 'class-validator'
import { ContentEnum, ContentType } from '@app/rmq/types'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class GetContentQueryDto {
  @ApiProperty({ enum: ContentEnum })
  @IsEnum(ContentEnum)
  type: ContentType

  @IsInt()
  @Type(() => Number)
  id: number
}

export class GetContentsQueryDto {
  @ApiProperty({ enum: ContentEnum })
  @IsEnum(ContentEnum)
  type: ContentType

  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[]
}

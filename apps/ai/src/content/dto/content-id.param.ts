import { ContentEnum, ContentType } from '@app/rmq/types'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsInt } from 'class-validator'

export class ContentIdParams {
  @ApiProperty({ enum: ContentEnum })
  @IsEnum(ContentEnum)
  type: ContentType

  @IsInt()
  @Type(() => Number)
  id: number
}

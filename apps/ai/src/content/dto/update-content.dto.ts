import { IsEnum, IsInt, IsString } from 'class-validator'
import { ContentEnum, ContentType } from '@app/rmq/types'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class UpdateContentDto {
  @IsEnum(ContentEnum)
  @ApiProperty({ enum: ContentEnum })
  type: ContentType

  @IsInt()
  @Type(() => Number)
  id: number

  @IsString()
  content: string
}

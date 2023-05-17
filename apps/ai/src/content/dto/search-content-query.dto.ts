import { ContentEnum, ContentType } from '@app/rmq/types'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class SearchContentQueryDto {
  @ApiProperty({ enum: ContentEnum })
  @IsEnum(ContentEnum)
  type: ContentType

  @IsString()
  @IsNotEmpty()
  query: string

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  k: number
}

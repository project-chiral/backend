import { PartialType } from '@nestjs/swagger'
import { CreateWorldviewDto } from './create-worldview.dto'
import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

export class UpdateWorldviewDto extends PartialType(CreateWorldviewDto) {
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  done?: boolean
}

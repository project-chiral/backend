import { PartialType } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateEventDto } from './create-event.dto'

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  done?: boolean

  @IsArray()
  @IsOptional()
  unresolved?: object[]
}

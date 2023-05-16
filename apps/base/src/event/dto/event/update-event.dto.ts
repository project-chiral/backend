import { PartialType } from '@nestjs/swagger'
import { CreateEventDto } from './create-event.dto'
import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  done?: boolean
}

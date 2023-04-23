import { PartialType } from '@nestjs/swagger'
import { IsArray, IsOptional } from 'class-validator'
import { CreateEventDto } from './create-event.dto'

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsArray()
  @IsOptional()
  unresolved?: object[]
}

import { Type } from 'class-transformer'
import { IsBoolean } from 'class-validator'

export class ToggleDoneDto {
  @IsBoolean()
  @Type(() => Boolean)
  done: boolean
}

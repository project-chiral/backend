import { Type } from 'class-transformer'
import { IsBoolean } from 'class-validator'

export class ToggleEventDoneDto {
  @IsBoolean()
  @Type(() => Boolean)
  done: boolean
}

import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'

export class IdParams {
  @IsInt()
  @Type(() => Number)
  id: number
}

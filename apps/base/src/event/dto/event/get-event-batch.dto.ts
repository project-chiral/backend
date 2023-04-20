import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'

export class GetEventBatchDto {
  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[]
}

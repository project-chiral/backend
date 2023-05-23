import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'

export class IdBatchQuery {
  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[]
}

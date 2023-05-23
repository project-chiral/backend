import { Type } from 'class-transformer'
import { IsDate, IsInt, Max, Min } from 'class-validator'

export class GetByRangeQuery {
  @IsInt()
  @Min(0)
  @Max(8)
  @Type(() => Number)
  unit: number

  @IsDate()
  @Type(() => Date)
  start: Date

  @IsDate()
  @Type(() => Date)
  end: Date
}

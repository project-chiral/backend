import { Type } from 'class-transformer'
import { IsInt, Min } from 'class-validator'

export class GenerateQueriesDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  n: number = 1
}

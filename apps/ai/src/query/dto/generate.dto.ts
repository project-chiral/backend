import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'

export class GenerateQueriesDto {
  @IsInt()
  @Type(() => Number)
  n: number = 1
}

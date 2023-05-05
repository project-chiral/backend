import { IsInt } from 'class-validator'

export class GenerateQueriesDto {
  @IsInt()
  n: number = 1
}

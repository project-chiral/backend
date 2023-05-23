import { Type } from 'class-transformer'
import { IsInt, Min, IsOptional } from 'class-validator'

export class PagenationQuery {
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  size?: number

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  page?: number
}

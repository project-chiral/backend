import { Type } from 'class-transformer'
import { IsInt, IsOptional, Min } from 'class-validator'

export class GetAllEventQueryDto {
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

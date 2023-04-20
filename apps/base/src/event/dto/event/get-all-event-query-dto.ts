import { IsInt, IsOptional, Min } from 'class-validator'

export class GetAllEventQueryDto {
  @IsInt()
  @Min(0)
  @IsOptional()
  size?: number

  @IsInt()
  @Min(0)
  @IsOptional()
  page?: number
}

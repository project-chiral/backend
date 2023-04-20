import { IsOptional, IsString } from 'class-validator'

export class UpdateContentDto {
  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  cover?: string
}

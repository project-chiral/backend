import { Type } from 'class-transformer'
import { IsBoolean, IsHexColor, IsOptional } from 'class-validator'

export class UpdateTodoDto {
  @IsHexColor()
  @IsOptional()
  color?: string

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  checked?: boolean
}

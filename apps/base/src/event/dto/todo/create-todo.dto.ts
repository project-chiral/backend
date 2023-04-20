import { IsHexColor, IsOptional, IsString } from 'class-validator'

export class CreateTodoDto {
  @IsString()
  title: string

  @IsHexColor()
  @IsOptional()
  color?: string
}

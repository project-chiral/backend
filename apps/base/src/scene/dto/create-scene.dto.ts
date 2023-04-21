import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSceneDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string
}

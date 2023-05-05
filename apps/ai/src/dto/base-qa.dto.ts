import { IsNotEmpty, IsString } from 'class-validator'

export class BaseQaDto {
  @IsString()
  @IsNotEmpty()
  query: string
}

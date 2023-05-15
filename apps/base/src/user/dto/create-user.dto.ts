import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

  @IsPhoneNumber()
  @IsOptional()
  phone?: string

  @IsEmail()
  @IsOptional()
  email?: string
}

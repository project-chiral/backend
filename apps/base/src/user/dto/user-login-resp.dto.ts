import { IsString } from 'class-validator'

export class UserLoginRespDto {
  @IsString()
  access_token: string
}

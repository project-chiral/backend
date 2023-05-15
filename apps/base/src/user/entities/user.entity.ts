import { ApiHideProperty } from '@nestjs/swagger'
import type { User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity implements User {
  id: number
  username: string
  phone: string | null
  email: string | null
  avatar: string | null

  @Exclude()
  @ApiHideProperty()
  password: string

  @Exclude()
  @ApiHideProperty()
  salt: string
}

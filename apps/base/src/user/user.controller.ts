import { Body, Controller, Delete, Get, Post, Request } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'
import { CreateUserDto } from './dto/create-user.dto'
import { UserLoginRespDto } from './dto/user-login-resp.dto'
import type { UserEntity } from './entities/user.entity'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async get(@Request() { user }: { user: UserEntity }) {
    return user
  }

  @Delete()
  delete(@Request() { user: { id } }: { user: UserEntity }) {
    return this.userService.remove(id)
  }

  @Post('login')
  login(@Request() { user }: { user: UserEntity }) {
    return plainToInstance(UserLoginRespDto, user)
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.userService.create(dto)
  }

  // TODO 增加手机登录功能
}

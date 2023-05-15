import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import type { CreateUserDto } from './dto/create-user.dto'
import { UserEntity } from './entities/user.entity'
import { generateSalt, encryptPassword } from './utils'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(id: number) {
    const result = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(UserEntity, result)
  }

  async getByUsername(username: string) {
    const result = await this.prismaService.user.findUniqueOrThrow({
      where: { username },
    })

    return plainToInstance(UserEntity, result)
  }

  async remove(id: number) {
    const result = await this.prismaService.user.delete({
      where: { id },
    })

    return plainToInstance(UserEntity, result)
  }

  async getAll() {
    const users = await this.prismaService.user.findMany()
    return users.map((user) => plainToInstance(UserEntity, user))
  }

  async create(dto: CreateUserDto) {
    const salt = generateSalt()
    const password = encryptPassword(dto.password, salt)

    const result = this.prismaService.user.create({
      data: {
        ...dto,
        salt,
        password,
      },
    })

    return plainToInstance(UserEntity, result)
  }
}

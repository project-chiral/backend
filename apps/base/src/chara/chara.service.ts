import { Injectable } from '@nestjs/common'
import type { CreateCharaDto } from './dto/create-chara.dto'
import type { UpdateCharaDto } from './dto/update-chara.dto'
import { PrismaService } from 'nestjs-prisma'
import { getProjectId } from '../utils/get-header'
import { plainToInstance } from 'class-transformer'
import { CharaEntity } from './entities/chara.entity'

@Injectable()
export class CharaService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCharaDto) {
    const projectId = getProjectId()
    const chara = await this.prismaService.character.create({
      data: {
        ...dto,
        projectId,
      },
    })

    return plainToInstance(CharaEntity, chara)
  }

  async findAll() {
    const projectId = getProjectId()

    const charas = await this.prismaService.character.findMany({
      where: { projectId },
    })

    return charas.map((chara) => plainToInstance(CharaEntity, chara))
  }

  async findOne(id: number) {
    const chara = await this.prismaService.character.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(CharaEntity, chara)
  }

  async update(id: number, dto: UpdateCharaDto) {
    const chara = await this.prismaService.character.update({
      where: { id },
      data: dto,
    })

    return plainToInstance(CharaEntity, chara)
  }

  async remove(id: number) {
    const chara = await this.prismaService.character.delete({
      where: { id },
    })

    return plainToInstance(CharaEntity, chara)
  }

  async searchByName(name: string) {
    const charas = await this.prismaService.character.findMany({
      where: {
        name: { contains: name },
      },
    })

    return charas.map((c) => plainToInstance(CharaEntity, c))
  }
}

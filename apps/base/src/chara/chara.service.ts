import { Injectable } from '@nestjs/common'
import type { CreateCharaDto } from './dto/create-chara.dto'
import type { UpdateCharaDto } from './dto/update-chara.dto'
import { PrismaService } from 'nestjs-prisma'
import { plainToInstance } from 'class-transformer'
import { CharaEntity } from './entities/chara.entity'
import { RmqService } from '@app/rmq/rmq.service'

@Injectable()
export class CharaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rmqService: RmqService
  ) {}

  async get(id: number) {
    const chara = await this.prismaService.chara.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(CharaEntity, chara)
  }

  async getAll(projectId: number) {
    const charas = await this.prismaService.chara.findMany({
      where: { projectId },
    })

    return charas.map((chara) => plainToInstance(CharaEntity, chara))
  }

  async create(projectId: number, dto: CreateCharaDto) {
    const chara = await this.prismaService.chara.create({
      data: {
        ...dto,
        projectId,
      },
    })

    this.rmqService.publish('content_create', ['chara'], {
      type: 'chara',
      data: [
        {
          id: chara.id,
          order: chara.id,
          name: chara.name,
        },
      ],
      projectId,
    })

    return plainToInstance(CharaEntity, chara)
  }

  async update(id: number, dto: UpdateCharaDto) {
    const result = await this.prismaService.chara.update({
      where: { id },
      data: dto,
    })

    this.rmqService.publish('content_update', ['chara'], {
      type: 'chara',
      projectId: result.projectId,
      data: [
        {
          id: result.id,
          name: dto.name,
        },
      ],
    })

    if (dto.done !== undefined) {
      this.rmqService.publish('content_done', ['chara'], {
        type: 'chara',
        ids: [id],
        projectId: result.projectId,
        done: dto.done,
      })
    }

    return plainToInstance(CharaEntity, result)
  }

  async remove(id: number) {
    const result = await this.prismaService.chara.delete({
      where: { id },
    })

    this.rmqService.publish('content_remove', ['chara'], {
      type: 'chara',
      ids: [id],
      projectId: result.projectId,
    })

    return plainToInstance(CharaEntity, result)
  }

  async searchByName(name: string) {
    const charas = await this.prismaService.chara.findMany({
      where: {
        name: { contains: name },
      },
    })

    return charas.map((c) => plainToInstance(CharaEntity, c))
  }
}

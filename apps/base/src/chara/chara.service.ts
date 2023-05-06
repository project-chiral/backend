import { Injectable } from '@nestjs/common'
import type { CreateCharaDto } from './dto/create-chara.dto'
import type { UpdateCharaDto } from './dto/update-chara.dto'
import { PrismaService } from 'nestjs-prisma'
import { getProjectId } from '../utils/get-header'
import { plainToInstance } from 'class-transformer'
import { CharaEntity } from './entities/chara.entity'
import { ToggleDoneDto } from '../dto/toggle-done.dto'
import { RmqService } from '@app/rmq/rmq.service'

@Injectable()
export class CharaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rmqService: RmqService
  ) {}

  async get(id: number) {
    const chara = await this.prismaService.character.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(CharaEntity, chara)
  }

  async getAll() {
    const projectId = getProjectId()

    const charas = await this.prismaService.character.findMany({
      where: { projectId },
    })

    return charas.map((chara) => plainToInstance(CharaEntity, chara))
  }

  async create(dto: CreateCharaDto) {
    const projectId = getProjectId()
    const chara = await this.prismaService.character.create({
      data: {
        ...dto,
        projectId,
      },
    })

    this.rmqService.publish('entity_create', {
      type: 'chara',
      projectId,
      ids: [chara.id],
    })

    return plainToInstance(CharaEntity, chara)
  }

  async update(id: number, dto: UpdateCharaDto) {
    const projectId = getProjectId()
    const chara = await this.prismaService.character.update({
      where: { id },
      data: dto,
    })

    this.rmqService.publish('entity_update', {
      type: 'chara',
      projectId,
      ids: [id],
    })

    return plainToInstance(CharaEntity, chara)
  }

  async toggleDone(id: number, { done }: ToggleDoneDto) {
    const result = await this.prismaService.character.update({
      where: { id },
      data: { done },
    })

    this.rmqService.publish('entity_done', {
      type: 'chara',
      ids: [id],
      done,
    })

    return plainToInstance(CharaEntity, result)
  }

  async remove(id: number) {
    const chara = await this.prismaService.character.delete({
      where: { id },
    })

    this.rmqService.publish('entity_remove', {
      type: 'chara',
      ids: [id],
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

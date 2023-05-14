import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import type { CreateWorldviewDto } from './dto/create-worldview.dto'
import type { UpdateWorldviewDto } from './dto/update-worldview.dto'
import { WorldviewEntity } from './entities/worldview.entity'
import { ToggleDoneDto } from '../dto/toggle-done.dto'
import { RmqService } from '@app/rmq/rmq.service'

@Injectable()
export class WorldviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rmqService: RmqService
  ) {}

  async create(projectId: number, dto: CreateWorldviewDto) {
    const result = await this.prismaService.worldview.create({
      data: {
        ...dto,
        project: { connect: { id: projectId } },
      },
    })

    this.rmqService.publish('entity_create', ['worldview'], {
      type: 'worldview',
      projectId,
      ids: [result.id],
    })

    return plainToInstance(WorldviewEntity, result)
  }

  async get(id: number) {
    const result = await this.prismaService.worldview.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(WorldviewEntity, result)
  }

  async getAll(projectId: number) {
    const results = await this.prismaService.worldview.findMany({
      where: { projectId },
    })

    return results.map((v) => plainToInstance(WorldviewEntity, v))
  }

  async update(id: number, dto: UpdateWorldviewDto) {
    const result = await this.prismaService.worldview.update({
      where: { id },
      data: dto,
    })

    this.rmqService.publish('entity_update', ['worldview'], {
      type: 'worldview',
      projectId: result.projectId,
      ids: [id],
    })

    return plainToInstance(WorldviewEntity, result)
  }

  async toggleDone(id: number, { done }: ToggleDoneDto) {
    const result = await this.prismaService.worldview.update({
      where: { id },
      data: { done },
    })

    this.rmqService.publish('entity_done', ['worldview'], {
      type: 'worldview',
      ids: [id],
      projectId: result.projectId,
      done,
    })

    return plainToInstance(WorldviewEntity, result)
  }

  async remove(id: number) {
    const result = await this.prismaService.worldview.delete({
      where: { id },
    })

    const subs = await this.prismaService.worldview.findMany({
      where: { path: { startsWith: result.path } },
    })

    const subIds = subs.map((v) => v.id)

    // 删除子节点
    if (subIds.length > 0) {
      await this.prismaService.worldview.deleteMany({
        where: {
          id: { in: subIds },
        },
      })
    }

    this.rmqService.publish('entity_remove', ['worldview'], {
      type: 'worldview',
      ids: [id, ...subIds],
      projectId: result.projectId,
    })

    return plainToInstance(WorldviewEntity, result)
  }
}

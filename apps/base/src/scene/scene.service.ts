import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import { CreateSceneDto } from './dto/create-scene.dto'
import { UpdateSceneDto } from './dto/update-scene.dto'
import { SceneEntity } from './entities/scene.entity'
import { RmqService } from '@app/rmq/rmq.service'

@Injectable()
export class SceneService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rmqService: RmqService
  ) {}

  async get(id: number) {
    const scene = await this.prismaService.scene.findUnique({
      where: { id },
    })

    return plainToInstance(SceneEntity, scene)
  }

  async create(projectId: number, dto: CreateSceneDto) {
    const result = await this.prismaService.scene.create({
      data: {
        ...dto,
        project: { connect: { id: projectId } },
      },
    })

    this.rmqService.publish('content_create', ['scene'], {
      type: 'scene',
      projectId,
      data: [
        {
          id: result.id,
          order: result.id,
          name: result.name,
        },
      ],
    })

    return plainToInstance(SceneEntity, result)
  }

  async update(id: number, dto: UpdateSceneDto) {
    const result = await this.prismaService.scene.update({
      where: { id },
      data: dto,
    })

    this.rmqService.publish('content_update', ['scene'], {
      type: 'scene',
      projectId: result.projectId,
      data: [
        {
          id: result.id,
          name: result.name,
        },
      ],
    })

    if (dto.done !== undefined) {
      this.rmqService.publish('content_done', ['scene'], {
        type: 'scene',
        ids: [id],
        projectId: result.projectId,
        done: dto.done,
      })
    }

    return plainToInstance(SceneEntity, result)
  }

  async remove(id: number) {
    const scene = await this.prismaService.scene.delete({
      where: { id },
    })

    this.rmqService.publish('content_remove', ['scene'], {
      type: 'scene',
      ids: [id],
      projectId: scene.projectId,
    })

    return plainToInstance(SceneEntity, scene)
  }

  async searchByName(text: string) {
    const scenes = await this.prismaService.scene.findMany({
      where: { name: { contains: text } },
    })

    return scenes.map((scene) => plainToInstance(SceneEntity, scene))
  }
}

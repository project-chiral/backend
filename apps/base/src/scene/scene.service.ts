import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import { getProjectId } from '../utils/get-header'
import { CreateSceneDto } from './dto/create-scene.dto'
import { UpdateSceneDto } from './dto/update-scene.dto'
import { SceneEntity } from './entities/scene.entity'

@Injectable()
export class SceneService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(id: number) {
    const scene = await this.prismaService.scene.findUnique({
      where: { id },
    })

    return plainToInstance(SceneEntity, scene)
  }

  async create(dto: CreateSceneDto) {
    const projectId = getProjectId()
    const scene = await this.prismaService.scene.create({
      data: {
        ...dto,
        project: { connect: { id: projectId } },
      },
    })

    return plainToInstance(SceneEntity, scene)
  }

  async update(id: number, dto: UpdateSceneDto) {
    const scene = await this.prismaService.scene.update({
      where: { id },
      data: dto,
    })

    return plainToInstance(SceneEntity, scene)
  }

  async removeScene(id: number) {
    const scene = await this.prismaService.scene.delete({
      where: { id },
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

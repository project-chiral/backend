import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import type { CreateProjectDto } from './dto/create-project.dto'
import type { UpdateProjectDto } from './dto/update-project.dto'
import type { UpdateSettingsDto } from './dto/update-settings.dto'
import type { UpdateWorkspaceDto } from './dto/update-workspace.dto'
import { ProjectEntity } from './entities/project.entity'
import { SettingsEntity } from './entities/settings.entity'
import { WorkspaceEntity } from './entities/workspace.entity'
import { RmqService } from '@app/rmq/rmq.service'

@Injectable()
export class ProjectService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rmqService: RmqService
  ) {}

  /* --------------------------------- project -------------------------------- */

  async get(id: number) {
    const project = await this.prismaService.project.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(ProjectEntity, project)
  }

  async create(userId: number, dto: CreateProjectDto) {
    const project = await this.prismaService.project.create({
      data: {
        ...dto,
        user: { connect: { id: userId } },
        workspace: { create: {} },
        settings: { create: {} },
      },
    })

    return plainToInstance(ProjectEntity, project)
  }

  async update(id: number, dto: UpdateProjectDto) {
    const project = await this.prismaService.project.update({
      where: { id },
      data: dto,
    })

    return plainToInstance(ProjectEntity, project)
  }

  async remove(id: number) {
    const project = await this.prismaService.project.delete({
      where: { id },
    })

    return plainToInstance(ProjectEntity, project)
  }

  /* -------------------------------- workspace ------------------------------- */

  async getWorkspace(id: number) {
    const workspace = await this.prismaService.project
      .findUniqueOrThrow({
        where: { id },
      })
      .workspace()

    return plainToInstance(WorkspaceEntity, workspace)
  }

  async updateWorkspace(id: number, dto: UpdateWorkspaceDto) {
    const workspace = await this.prismaService.project.update({
      where: { id },
      data: { workspace: { update: dto } },
      select: { workspace: true },
    })

    return plainToInstance(WorkspaceEntity, workspace)
  }

  /* -------------------------------- settings -------------------------------- */

  async getSettings(id: number) {
    const settings = await this.prismaService.project
      .findUniqueOrThrow({
        where: { id },
      })
      .settings()

    return plainToInstance(SettingsEntity, settings)
  }

  async updateSettings(id: number, dto: UpdateSettingsDto) {
    const settings = await this.prismaService.project.update({
      where: { id },
      data: { settings: { update: dto } },
      select: { settings: true },
    })

    return plainToInstance(SettingsEntity, settings)
  }
}

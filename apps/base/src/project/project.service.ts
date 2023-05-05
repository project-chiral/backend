import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import { getProjectId, getUserId } from '../utils/get-header'
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

  async get() {
    const id = getProjectId()
    const project = await this.prismaService.project.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(ProjectEntity, project)
  }

  async create(dto: CreateProjectDto) {
    const userId = getUserId()
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

  async update(dto: UpdateProjectDto) {
    const id = getProjectId()
    const project = await this.prismaService.project.update({
      where: { id },
      data: dto,
    })

    return plainToInstance(ProjectEntity, project)
  }

  async remove() {
    const projectId = getProjectId()
    const project = await this.prismaService.project.delete({
      where: { id: projectId },
    })

    this.rmqService.publish('amq.direct', 'entity_remove', {
      projectId,
    })

    return plainToInstance(ProjectEntity, project)
  }

  /* -------------------------------- workspace ------------------------------- */

  async getWorkspace() {
    const projectId = getProjectId()

    const workspace = await this.prismaService.project
      .findUniqueOrThrow({
        where: { id: projectId },
      })
      .workspace()

    return plainToInstance(WorkspaceEntity, workspace)
  }

  async updateWorkspace(dto: UpdateWorkspaceDto) {
    const projectId = getProjectId()

    const workspace = await this.prismaService.project.update({
      where: { id: projectId },
      data: { workspace: { update: dto } },
      select: { workspace: true },
    })

    return plainToInstance(WorkspaceEntity, workspace)
  }

  /* -------------------------------- settings -------------------------------- */

  async getSettings() {
    const projectId = getProjectId()
    const settings = await this.prismaService.project
      .findUniqueOrThrow({
        where: { id: projectId },
      })
      .settings()

    return plainToInstance(SettingsEntity, settings)
  }

  async updateSettings(dto: UpdateSettingsDto) {
    const projectId = getProjectId()

    const settings = await this.prismaService.project.update({
      where: { id: projectId },
      data: { settings: { update: dto } },
      select: { settings: true },
    })

    return plainToInstance(SettingsEntity, settings)
  }
}

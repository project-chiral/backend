import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { UpdateSettingsDto } from './dto/update-settings.dto'
import { UpdateWorkspaceDto } from './dto/update-workspace.dto'
import { ProjectService } from './project.service'
import { UtilsService } from '@app/utils'

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly utils: UtilsService
  ) {}

  // --------------------------------- project --------------------------------

  /**
   * 创建新项目
   */
  @Post()
  async create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(this.utils.getUserId(), dto)
  }

  /**
   * 获取项目信息
   */
  @Get()
  async get() {
    const projectId = this.utils.getProjectId()
    return this.projectService.get(projectId)
  }

  /**
   * 更新项目信息
   */
  @Put()
  async update(@Body() dto: UpdateProjectDto) {
    const projectId = this.utils.getProjectId()
    return this.projectService.update(projectId, dto)
  }

  /**
   * 删除项目
   */
  @Delete()
  async remove() {
    const projectId = this.utils.getProjectId()
    return this.projectService.remove(projectId)
  }

  // -------------------------------- workspace -------------------------------

  /**
   * 获取工作区信息
   */
  @Get('workspace')
  async getWorkspace() {
    const projectId = this.utils.getProjectId()
    return this.projectService.getWorkspace(projectId)
  }

  /**
   * 更新工作区信息
   */
  @Put('workspace')
  async updateWorkspace(@Body() dto: UpdateWorkspaceDto) {
    const projectId = this.utils.getProjectId()
    return this.projectService.updateWorkspace(projectId, dto)
  }

  // -------------------------------- settings --------------------------------

  /**
   * 获取项目设置
   */
  @Get('settings')
  async getSettings() {
    const projectId = this.utils.getProjectId()
    return this.projectService.getSettings(projectId)
  }

  /**
   * 更新项目设置
   */
  @Put('settings')
  async updateSettings(@Body() dto: UpdateSettingsDto) {
    const projectId = this.utils.getProjectId()
    return this.projectService.updateSettings(projectId, dto)
  }
}

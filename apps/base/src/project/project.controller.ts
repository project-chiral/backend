import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { UpdateSettingsDto } from './dto/update-settings.dto'
import { UpdateWorkspaceDto } from './dto/update-workspace.dto'
import { ProjectService } from './project.service'

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // --------------------------------- project --------------------------------

  /**
   * 创建新项目
   */
  @Post()
  async create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto)
  }

  /**
   * 获取项目信息
   */
  @Get()
  async get() {
    return this.projectService.get()
  }

  /**
   * 更新项目信息
   */
  @Put()
  async update(@Body() dto: UpdateProjectDto) {
    return this.projectService.update(dto)
  }

  /**
   * 删除项目
   */
  @Delete()
  async remove() {
    return this.projectService.remove()
  }

  // -------------------------------- workspace -------------------------------

  /**
   * 获取工作区信息
   */
  @Get('workspace')
  async getWorkspace() {
    return this.projectService.getWorkspace()
  }

  /**
   * 更新工作区信息
   */
  @Put('workspace')
  async updateWorkspace(@Body() dto: UpdateWorkspaceDto) {
    return this.projectService.updateWorkspace(dto)
  }

  // -------------------------------- settings --------------------------------

  /**
   * 获取项目设置
   */
  @Get('settings')
  async getSettings() {
    return this.projectService.getSettings()
  }

  /**
   * 更新项目设置
   */
  @Put('settings')
  async updateSettings(@Body() dto: UpdateSettingsDto) {
    return this.projectService.updateSettings(dto)
  }
}

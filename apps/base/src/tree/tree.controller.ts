import { GraphService } from '@app/graph'
import { ConnectTreesDto } from '@app/graph/dto/tree/connect-trees.dto'
import { DisconnectTreesDto } from '@app/graph/dto/tree/disconnect-trees.dto'
import { GetTreeRootQueryDto } from '@app/graph/dto/tree/get-tree-root-query.dto'
import { TreeIdDto } from '@app/graph/dto/tree/tree-id.dto'
import { UtilsService } from '@app/utils'
import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common'

@Controller('tree')
export class TreeController {
  constructor(
    private readonly graphService: GraphService,
    private readonly utils: UtilsService
  ) {}

  @Get('root')
  async getTreeRoots(@Query() dto: GetTreeRootQueryDto) {
    const projectId = this.utils.getProjectId()
    return this.graphService.getTreeRoots(projectId, dto)
  }

  @Get('sup')
  async getSupTree(@Query() dto: TreeIdDto) {
    return this.graphService.getSupTree(dto)
  }

  @Get('sup/all')
  async getAllSupTrees(@Query() dto: TreeIdDto) {
    return this.graphService.getAllSupTrees(dto)
  }

  @Get('sub')
  async getSubTrees(@Query() dto: TreeIdDto) {
    return this.graphService.getSubTrees(dto)
  }

  @Get('sub/all')
  async getAllSubTrees(@Query() dto: TreeIdDto) {
    return this.graphService.getAllSubTrees(dto)
  }

  @Put('connect')
  async connectTrees(@Body() dto: ConnectTreesDto) {
    return this.graphService.connectTrees(dto)
  }

  @Delete('disconnect')
  async disconnectTrees(@Body() dto: DisconnectTreesDto) {
    return this.graphService.disconnectTrees(dto)
  }
}

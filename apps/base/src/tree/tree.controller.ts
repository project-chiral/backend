import { GraphService } from '@app/graph'
import { DisconnectTreesQuery } from '@app/graph/dto/tree/disconnect-trees.query'
import { TreeIdDto } from '@app/graph/dto/tree/tree-id.dto'
import { UtilsService } from '@app/utils'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PagenationQuery } from '../dto/pagenation.query'
import { TreeTypeParams } from './dto/tree-type.param'
import { SearchTreeParams } from './dto/search-tree.param'
import { ConnectTreesDto } from './dto/connect-trees.dto'

@ApiTags('tree')
@Controller('tree')
export class TreeController {
  constructor(
    private readonly graphService: GraphService,
    private readonly utils: UtilsService
  ) {}

  @Get(':type/root')
  async getTreeRoots(
    @Param() { type }: TreeTypeParams,
    @Query() query: PagenationQuery
  ) {
    const projectId = this.utils.getProjectId()
    return this.graphService.getTreeRoots(projectId, type, query)
  }

  @Get(':type/:id/sup/all')
  async getAllSupTrees(@Param() params: TreeIdDto) {
    return this.graphService.getAllSupTrees(params)
  }

  @Get(':type/:id/sup')
  async getSupTree(@Param() params: TreeIdDto) {
    return this.graphService.getSupTree(params)
  }

  @Get(':type/:id/sub')
  async getSubTrees(@Param() params: TreeIdDto) {
    return this.graphService.getSubTrees(params)
  }

  @Get(':type/:id/sub/all')
  async getAllSubTrees(@Param() params: TreeIdDto) {
    return this.graphService.getAllSubTrees(params)
  }

  @Get(':type/search/:input')
  async searchTree(@Param() { type, input }: SearchTreeParams) {
    const projectId = this.utils.getProjectId()
    return this.graphService.searchTrees(projectId, type, input)
  }

  @Get(':type/tree')
  async getTree(@Param() { type }: TreeTypeParams) {
    const projectId = this.utils.getProjectId()
    return this.graphService.getTrees(projectId, type)
  }

  @Put('connect')
  async connectTrees(@Body() { type, id, to }: ConnectTreesDto) {
    return this.graphService.connectTrees({ type, id }, to)
  }

  @Delete('disconnect')
  async disconnectTrees(@Query() { type, to }: DisconnectTreesQuery) {
    return this.graphService.disconnectTrees(type, to)
  }
}

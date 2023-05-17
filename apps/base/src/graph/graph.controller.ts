import { GraphService } from '@app/graph'
import { NodeIdDto } from '@app/graph/dto/graph/node-id.dto'
import { RelationIdDto } from '@app/graph/dto/graph/relation-id.dto'
import { RelationIdsDto } from '@app/graph/dto/graph/relation-ids.dto'
import { ConnectTreesDto } from '@app/graph/dto/tree/connect-trees.dto'
import { DisconnectTreesDto } from '@app/graph/dto/tree/disconnect-trees.dto'
import { GetTreeRootQueryDto } from '@app/graph/dto/tree/get-tree-root-query.dto'
import { TreeIdDto } from '@app/graph/dto/tree/tree-id.dto'
import { UtilsService } from '@app/utils'
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Put,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('graph')
@Controller('graph')
export class GraphController {
  constructor(
    private readonly graphService: GraphService,
    private readonly utils: UtilsService
  ) {}

  @Get('test')
  getTest() {
    return 'success'
  }

  // ---------------------------------- node ----------------------------------

  @Get('node/relations')
  async getNodeRelations(@Query() dto: NodeIdDto) {
    return this.graphService.getNodeRelations(dto)
  }

  @Put('node')
  async createNode(@Body() dto: NodeIdDto) {
    throw new ForbiddenException(dto)
  }

  @Delete('node')
  async removeNode(@Body() dto: NodeIdDto) {
    throw new ForbiddenException(dto)
  }

  // -------------------------------- relation --------------------------------

  @Put('relation')
  async createRelation(@Body() dto: RelationIdDto) {
    return this.graphService.createRelation(dto)
  }

  @Put('relation/batch')
  async createRelations(@Body() dto: RelationIdsDto) {
    return this.graphService.createRelations(dto)
  }

  @Delete('relation')
  async removeRelation(@Body() dto: RelationIdDto) {
    return this.graphService.removeRelation(dto)
  }

  @Delete('relation/batch')
  async removeRelations(@Body() dto: RelationIdsDto) {
    return this.graphService.removeRelations(dto)
  }

  // ---------------------------------- tree ----------------------------------

  @Get('tree/root')
  async getTreeRoots(dto: GetTreeRootQueryDto) {
    const projectId = this.utils.getProjectId()
    return this.graphService.getTreeRoots(projectId, dto)
  }

  @Get('tree/sup')
  async getSupTree(@Query() dto: TreeIdDto) {
    return this.graphService.getSupTree(dto)
  }

  @Get('tree/sup/all')
  async getAllSupTrees(@Query() dto: TreeIdDto) {
    return this.graphService.getAllSupTrees(dto)
  }

  @Get('tree/sub')
  async getSubTrees(@Query() dto: TreeIdDto) {
    return this.graphService.getSubTrees(dto)
  }

  @Get('tree/sub/all')
  async getAllSubTrees(@Query() dto: TreeIdDto) {
    return this.graphService.getAllSubTrees(dto)
  }

  @Put('tree/connect')
  async connectTrees(@Body() dto: ConnectTreesDto) {
    return this.graphService.connectTrees(dto)
  }

  @Delete('tree/disconnect')
  async disconnectTrees(@Body() dto: DisconnectTreesDto) {
    return this.graphService.disconnectTrees(dto)
  }
}

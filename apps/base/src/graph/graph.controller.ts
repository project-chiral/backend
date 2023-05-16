import { GraphService } from '@app/graph'
import { NodeIdDto } from '@app/graph/dto/node-id.dto'
import { RelationIdDto } from '@app/graph/dto/relation-id.dto'
import { RelationIdsDto } from '@app/graph/dto/relation-ids.dto'
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Post,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('graph')
@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get('test')
  getTest() {
    return 'success'
  }

  @Get('node/relations')
  async getNodeRelations(@Query() dto: NodeIdDto) {
    return this.graphService.getNodeRelations(dto)
  }

  @Post('relation')
  async createRelation(@Body() dto: RelationIdDto) {
    return this.graphService.createRelation(dto)
  }

  @Post('relation/batch')
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

  @Post('node')
  async createNode(@Body() dto: NodeIdDto) {
    throw new ForbiddenException(dto)
  }

  @Delete('node')
  async removeNode(@Body() dto: NodeIdDto) {
    throw new ForbiddenException(dto)
  }
}

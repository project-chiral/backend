import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Post,
  Query,
} from '@nestjs/common'
import { GraphService } from './graph.service'
import { NodeIdDto } from './dto/node-id.dto'
import { RelationIdDto } from './dto/relation-id.dto'

@Controller()
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get('test')
  getTest() {
    return 'success'
  }

  @Get('relations')
  async getRelations(@Query() dto: NodeIdDto) {
    return this.graphService.getRelations(dto)
  }

  @Post('relations')
  async createRelations() {
    return []
  }

  @Post('relation')
  async createRelation(@Body() dto: RelationIdDto) {
    return this.graphService.createRelation(dto)
  }

  @Delete('relation')
  async removeRelation(@Body() dto: RelationIdDto) {
    return this.graphService.removeRelation(dto)
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

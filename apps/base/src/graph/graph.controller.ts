import { GraphService } from '@app/graph'
import { NodeIdDto } from '@app/graph/dto/node-id.dto'
import { RelationIdDto } from '@app/graph/dto/relation-id.dto'
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

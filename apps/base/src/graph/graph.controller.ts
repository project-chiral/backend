import { GraphService } from '@app/graph'
import { RelationIdDto } from '@app/graph/dto/graph/relation-id.dto'
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
import { GetRelationsParams } from './dto/get-relations.param'
import { NodeIdDto } from '@app/graph/dto/graph/node-id.dto'
import { GetRelationsBatchQuery } from './dto/get-relations-batch.query'
import { RemoveRelationsDto } from '@app/graph/dto/graph/remove-relations.dto'

@ApiTags('graph')
@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get('batch')
  async getRelationsBatch(@Query() dto: GetRelationsBatchQuery) {
    return this.graphService.getRelationsBatch(dto)
  }

  @Get(':type/:id/node')
  async getAllRelatedNodes(@Param() { type, id }: NodeIdDto) {
    return this.graphService.getRelatedNodes({ type, id })
  }

  @Get(':type/:id/:relType/node')
  async getRelatedNodes(@Param() { type, id, relType }: GetRelationsParams) {
    return this.graphService.getRelatedNodes({ type, id }, relType)
  }

  @Get(':type/:id/:relType')
  async getRelations(@Param() { type, id, relType }: GetRelationsParams) {
    return this.graphService.getRelations({ type, id }, relType)
  }

  @Get(':type/:id')
  async getAllRelations(@Param() { type, id }: NodeIdDto) {
    return this.graphService.getRelations({ type, id })
  }

  @Put()
  async createRelation(@Body() dto: RelationIdDto) {
    return this.graphService.createRelation(dto)
  }

  @Delete()
  async removeRelation(@Query() query: RemoveRelationsDto) {
    return this.graphService.removeRelations(query)
  }
}

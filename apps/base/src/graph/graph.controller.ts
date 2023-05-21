import { GraphService } from '@app/graph'
import { GetRelationsBatchDto } from '@app/graph/dto/graph/get-relations-batch.dto'
import { GetRelationsDto } from '@app/graph/dto/graph/get-relations.dto'
import { RelationIdDto } from '@app/graph/dto/graph/relation-id.dto'
import { RelationIdsDto } from '@app/graph/dto/graph/relation-ids.dto'
import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('graph')
@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get('node')
  async getRelatedNodes(@Query() dto: GetRelationsDto) {
    return this.graphService.getRelatedNodes(dto)
  }

  @Get('batch')
  async getRelationsBatch(@Query() dto: GetRelationsBatchDto) {
    return this.graphService.getRelationsBatch(dto)
  }

  @Get()
  async getRelations(@Query() dto: GetRelationsDto) {
    return this.graphService.getRelations(dto)
  }

  @Put('batch')
  async createRelations(@Body() dto: RelationIdsDto) {
    return this.graphService.createRelations(dto)
  }

  @Put()
  async createRelation(@Body() dto: RelationIdDto) {
    return this.graphService.createRelation(dto)
  }

  @Delete('batch')
  async removeRelations(@Body() dto: RelationIdsDto) {
    return this.graphService.removeRelations(dto)
  }

  @Delete()
  async removeRelation(@Body() dto: RelationIdDto) {
    return this.graphService.removeRelation(dto)
  }
}

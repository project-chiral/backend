import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateEventDto } from './dto/event/create-event.dto'
import { GetByRangeQuery } from './dto/event/get-by-range.query'
import { UpdateEventDto } from './dto/event/update-event.dto'
import { CreateTodoDto } from './dto/todo/create-todo.dto'
import { UpdateTodoDto } from './dto/todo/update-todo.dto'
import { EventService } from './event.service'
import { UtilsService } from '@app/utils'
import { PagenationQuery } from '../dto/pagenation.query'
import { IdParams } from '../dto/id.param'
import { IdBatchQuery } from '../dto/id-batch.query'

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly utils: UtilsService
  ) {}

  // ---------------------------------- event ---------------------------------

  @Get('batch')
  async getBatch(@Query() { ids }: IdBatchQuery) {
    return this.eventService.getBatch(ids)
  }

  @Get('list')
  async getAll(@Query() dto: PagenationQuery) {
    const projectId = this.utils.getProjectId()
    return this.eventService.getAll(projectId, dto)
  }

  @Get('list/range')
  getByRange(@Query() { unit, start, end }: GetByRangeQuery) {
    const projectId = this.utils.getProjectId()
    return this.eventService.getByRange(projectId, unit, start, end)
  }

  @Get('search/name')
  searchByName(@Query('text') text: string) {
    return this.eventService.searchByName(text)
  }

  @Get(':id')
  async get(@Param() { id }: IdParams) {
    return this.eventService.get(id)
  }

  @Post()
  create(@Body() dto: CreateEventDto) {
    const projectId = this.utils.getProjectId()
    return this.eventService.create(projectId, dto)
  }

  @Put(':id')
  update(@Param() { id }: IdParams, @Body() dto: UpdateEventDto) {
    return this.eventService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param() { id }: IdParams) {
    return this.eventService.remove(id)
  }

  // ---------------------------------- todo ----------------------------------

  /**
   * 获取某个事件的全部todo项
   * @param id 事件id
   */
  @Get(':id/todo')
  getTodos(@Param() { id }: IdParams) {
    return this.eventService.getTodos(id)
  }

  @Post(':id/todo')
  createTodo(@Param() { id }: IdParams, @Body() dto: CreateTodoDto) {
    return this.eventService.createTodo(id, dto)
  }

  @Put(':id/todo')
  updateTodo(@Param() { id }: IdParams, @Body() dto: UpdateTodoDto) {
    return this.eventService.updateTodo(id, dto)
  }

  @Delete('todo/:id')
  removeTodo(@Param() { id }: IdParams) {
    return this.eventService.removeTodo(id)
  }
}

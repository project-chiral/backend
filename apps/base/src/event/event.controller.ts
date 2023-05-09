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
import { GetAllEventQueryDto } from './dto/event/get-all-event-query-dto'
import { GetEventsByRangeQueryDto } from './dto/event/get-events-by-range-query.dto'
import { UpdateEventDto } from './dto/event/update-event.dto'
import { CreateTodoDto } from './dto/todo/create-todo.dto'
import { UpdateTodoDto } from './dto/todo/update-todo.dto'
import { EventService } from './event.service'
import { GetEventBatchDto } from './dto/event/get-event-batch.dto'
import { ToggleDoneDto } from '../dto/toggle-done.dto'

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // ---------------------------------- event ---------------------------------

  @Get('batch')
  async getBatch(@Query() { ids }: GetEventBatchDto) {
    return this.eventService.getBatch(ids)
  }

  @Get('list')
  async getAll(@Query() dto: GetAllEventQueryDto) {
    return this.eventService.getAll(dto)
  }

  @Get('list/range')
  getByRange(@Query() { unit, start, end }: GetEventsByRangeQueryDto) {
    return this.eventService.getByRange(unit, start, end)
  }

  @Get('search/name')
  searchByName(@Query('text') text: string) {
    return this.eventService.searchByName(text)
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.eventService.get(id)
  }

  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateEventDto) {
    return this.eventService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventService.remove(id)
  }

  @Put(':id/done')
  toggleDone(@Param('id') id: number, @Body() dto: ToggleDoneDto) {
    return this.eventService.toggleDone(id, dto)
  }

  // ---------------------------------- todo ----------------------------------

  /**
   * 获取某个事件的全部todo项
   * @param id 事件id
   */
  @Get(':id/todo')
  getTodos(@Param('id') id: number) {
    return this.eventService.getTodos(id)
  }

  @Post(':id/todo')
  createTodo(@Param('id') id: number, @Body() dto: CreateTodoDto) {
    return this.eventService.createTodo(id, dto)
  }

  @Put(':id/todo')
  updateTodo(@Param('id') id: number, @Body() dto: UpdateTodoDto) {
    return this.eventService.updateTodo(id, dto)
  }

  @Delete('todo/:id')
  removeTodo(@Param('id') id: number) {
    return this.eventService.removeTodo(id)
  }
}

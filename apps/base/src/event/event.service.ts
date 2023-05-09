import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import { getProjectId } from '../utils/get-header'
import type { CreateEventDto } from './dto/event/create-event.dto'
import type { UpdateEventDto } from './dto/event/update-event.dto'
import { EventEntity } from './entities/event.entity'
import { EventTodoEntity } from './entities/event-todo.entity'
import type { CreateTodoDto } from './dto/todo/create-todo.dto'
import type { UpdateTodoDto } from './dto/todo/update-todo.dto'
import type { GetAllEventQueryDto } from './dto/event/get-all-event-query-dto'
import { RmqService } from '@app/rmq/rmq.service'
import { ToggleDoneDto } from '../dto/toggle-done.dto'

@Injectable()
export class EventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rmqService: RmqService
  ) {}

  // ---------------------------------- event ---------------------------------

  async get(id: number) {
    const event = await this.prismaService.event.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(EventEntity, event)
  }

  async getBatch(ids: number[]) {
    const results = await this.prismaService.event.findMany({
      where: { id: { in: ids } },
    })

    return plainToInstance(EventEntity, results)
  }

  async getAll({ size, page = 0 }: GetAllEventQueryDto) {
    const projectId = getProjectId()
    const results = await this.prismaService.event.findMany({
      where: { projectId },
      skip: (size ?? 0) * page,
      take: size,
    })

    return plainToInstance(EventEntity, results)
  }

  /**
   * 根据时间范围或给定id列表获取事件，将二者的并集返回
   * @param range 事件发生的时间范围
   * @param ids 事件的id列表
   */
  async getByRange(unit: number, start: Date, end: Date) {
    const projectId = getProjectId()
    const results = await this.prismaService.event.findMany({
      where: {
        unit,
        // 事件时间范围与查询时间范围有交集
        start: { lte: end },
        end: { gte: start },
        projectId,
      },
    })
    return plainToInstance(EventEntity, results)
  }

  async getBySerial(serial: number) {
    const projectId = getProjectId()
    const result = await this.prismaService.event.findUniqueOrThrow({
      where: { serial_projectId: { serial, projectId } },
    })

    return plainToInstance(EventEntity, result)
  }

  async searchByName(text: string) {
    if (text === '') {
      return []
    }
    const serial = parseInt(text)
    const results = await this.prismaService.event.findMany({
      where: {
        OR: [
          { serial: isNaN(serial) ? -1 : serial },
          { name: { contains: text } },
        ],
      },
    })

    return plainToInstance(EventEntity, results)
  }

  async create(dto: CreateEventDto) {
    const projectId = getProjectId()

    // 生成事件序号
    const { serial } = await this.prismaService.project.update({
      where: { id: projectId },
      data: { serial: { increment: 1 } },
      select: { serial: true },
    })

    const result = await this.prismaService.event.create({
      data: {
        ...dto,
        projectId,
        serial,
      },
    })

    this.rmqService.publish('entity_create', {
      type: 'event',
      projectId,
      ids: [result.id],
    })

    return plainToInstance(EventEntity, result)
  }

  async update(id: number, dto: UpdateEventDto) {
    const projectId = getProjectId()
    const result = await this.prismaService.event.update({
      where: { id },
      data: { ...dto },
    })

    this.rmqService.publish('entity_update', {
      type: 'event',
      projectId,
      ids: [id],
    })

    return plainToInstance(EventEntity, result)
  }

  async toggleDone(id: number, { done }: ToggleDoneDto) {
    const result = await this.prismaService.event.update({
      where: { id },
      data: { done },
    })

    this.rmqService.publish('entity_done', {
      type: 'event',
      ids: [id],
      done,
    })

    return plainToInstance(EventEntity, result)
  }

  async remove(id: number) {
    const result = await this.prismaService.event.delete({
      where: { id },
    })

    const subs = await this.prismaService.event.findMany({
      where: { path: { startsWith: result.path } },
      select: { id: true },
    })
    const subIds = subs.map((v) => v.id)

    if (subIds.length > 0) {
      await this.prismaService.event.deleteMany({
        where: { id: { in: subIds } },
      })
    }

    this.rmqService.publish('entity_remove', {
      type: 'event',
      ids: [result.id, ...subIds],
    })

    return plainToInstance(EventEntity, result)
  }

  // ---------------------------------- todo ---------------------------------

  async getTodos(eventId: number) {
    const { todos } = await this.prismaService.event.findUniqueOrThrow({
      where: { id: eventId },
      include: { todos: true },
    })

    return plainToInstance(EventTodoEntity, todos)
  }

  async getTodo(id: number) {
    const todo = await this.prismaService.eventTodo.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(EventTodoEntity, todo)
  }

  async createTodo(eventId: number, dto: CreateTodoDto) {
    const todo = await this.prismaService.eventTodo.create({
      data: {
        ...dto,
        eventId,
      },
    })

    return plainToInstance(EventTodoEntity, todo)
  }

  async updateTodo(id: number, dto: UpdateTodoDto) {
    const todo = await this.prismaService.eventTodo.update({
      where: { id },
      data: dto,
    })

    return plainToInstance(EventTodoEntity, todo)
  }

  async removeTodo(id: number) {
    const todo = await this.prismaService.eventTodo.delete({
      where: { id },
    })

    return plainToInstance(EventTodoEntity, todo)
  }
}

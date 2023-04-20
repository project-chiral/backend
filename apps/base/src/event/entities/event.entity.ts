import { ApiProperty } from '@nestjs/swagger'
import { EventType } from '@prisma/client'
import type { Event } from '@prisma/client'

export class EventEntity implements Event {
  id: number
  name: string
  description: string | null
  color: string
  serial: number

  @ApiProperty({ enum: EventType })
  type: EventType

  createdAt: Date
  updatedAt: Date

  deleted: Date | null

  unit: number
  start: Date
  end: Date

  done: boolean

  unresolved: object

  contentId: number | null
  projectId: number
}

import type { EventTodo } from '@prisma/client'

export class EventTodoEntity implements EventTodo {
  id: number
  title: string
  color: string | null
  checked: boolean

  eventId: number | null
}

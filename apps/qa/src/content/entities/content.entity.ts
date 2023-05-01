import { EntityType } from '@app/rmq/types'

export class ContentEntity {
  updateAt: Date
  type: EntityType
  id: number
  content: string

  constructor(updateAt: Date, type: EntityType, id: number, content: string) {
    this.updateAt = updateAt
    this.type = type
    this.id = id
    this.content = content
  }
}

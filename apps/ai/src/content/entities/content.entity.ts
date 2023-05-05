import { EntityType } from '@app/rmq/types'
import { Doc } from '../../vecstore/types'

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

  toDoc(done = false) {
    return new Doc({
      metadata: {
        done,
        id: this.id,
        type: this.type,
        updateAt: this.updateAt,
      },
      pageContent: this.content,
    })
  }

  static fromDoc(doc: Doc) {
    const {
      metadata: { updateAt, type, id },
      pageContent,
    } = doc
    return new ContentEntity(updateAt, type, id, pageContent)
  }
}

import { EntityType } from '@app/rmq/types'
import { Doc } from '../../vecstore/schema'

export class ContentEntity {
  updateAt: Date
  type: EntityType
  id: number
  projectId: number
  content: string

  constructor(
    id: number,
    projectId: number,
    type: EntityType,
    content: string,
    updateAt: Date
  ) {
    this.updateAt = updateAt
    this.type = type
    this.id = id
    this.projectId = projectId
    this.content = content
  }

  toDoc() {
    return new Doc({
      metadata: {
        id: this.id,
        projectId: this.projectId,
        updateAt: this.updateAt,
      },
      pageContent: this.content,
    })
  }
}

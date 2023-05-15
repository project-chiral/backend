import { EntityType } from '@app/rmq/types'
import { Doc } from '../../vecstore/schema'

export class ContentEntity {
  updateAt: Date
  type: EntityType
  id: number
  projectId: number
  content: string

  static fromDoc(type: EntityType, doc: Doc) {
    const result = new ContentEntity()

    result.type = type
    result.updateAt = doc.metadata.updateAt
    result.id = doc.metadata.id
    result.projectId = doc.metadata.projectId
    result.content = doc.pageContent

    return result
  }

  toDoc() {
    return new Doc({
      metadata: {
        id: this.id,
        projectId: this.projectId,
        updateAt: this.updateAt,
        desc: ' ',
      },
      pageContent: this.content,
    })
  }
}

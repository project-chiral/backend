import { EntityType } from '@app/rmq/types'
import { Doc } from '../../vecstore/schema'

export class ContentEntity {
  updateAt: Date
  type: EntityType
  id: number
  projectId: number
  content: string
  desc: string

  static fromDoc(type: EntityType, doc: Doc) {
    const result = new ContentEntity()

    result.type = type
    result.updateAt = doc.metadata.updateAt
    result.id = doc.metadata.id
    result.projectId = doc.metadata.projectId
    result.content = doc.pageContent
    result.desc = doc.metadata.desc

    return result
  }

  toDoc() {
    return new Doc({
      metadata: {
        id: this.id,
        projectId: this.projectId,
        updateAt: this.updateAt,
        desc: this.desc,
      },
      pageContent: this.content,
    })
  }
}

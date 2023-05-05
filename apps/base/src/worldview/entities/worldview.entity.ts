import type { Worldview } from '@prisma/client'

export class WorldviewEntity implements Worldview {
  id: number
  name: string
  description: string | null
  cover: string
  path: string

  deleted: Date | null

  done: boolean

  projectId: number
  contentId: number | null
}

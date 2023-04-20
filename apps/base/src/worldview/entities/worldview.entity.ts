import type { Worldview } from '@prisma/client'

export class WorldviewEntity implements Worldview {
  path: string
  id: number
  name: string
  description: string | null
  deleted: Date | null

  projectId: number
  contentId: number | null
}

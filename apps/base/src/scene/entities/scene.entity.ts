import type { Scene } from '@prisma/client'

export class SceneEntity implements Scene {
  id: number
  name: string
  alias: string[]
  description: string | null
  deleted: Date | null
  superId: number | null

  projectId: number
}

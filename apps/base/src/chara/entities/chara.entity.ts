import type { Chara } from '@prisma/client'

export class CharaEntity implements Chara {
  id: number
  name: string
  alias: string[]
  description: string | null
  avatar: string | null

  deleted: Date | null

  unit: number | null
  start: Date | null
  end: Date | null

  done: boolean

  projectId: number
}

import type { Character } from '@prisma/client'

export class CharaEntity implements Character {
  id: number
  name: string
  alias: string[]
  description: string | null
  avatar: string | null

  deleted: Date | null

  unit: number | null
  start: Date | null
  end: Date | null

  projectId: number
}

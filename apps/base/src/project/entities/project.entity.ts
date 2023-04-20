import type { Project } from '@prisma/client'

export class ProjectEntity implements Project {
  id: number
  serial: number
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date

  deleted: Date | null
}

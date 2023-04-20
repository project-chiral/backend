import type { Settings } from '@prisma/client'

export class SettingsEntity implements Settings {
  id: number
  projectId: number
  darkMode: boolean
  lang: string
}

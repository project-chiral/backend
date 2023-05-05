import { Type } from 'class-transformer'

export class CharaOption {
  id: number
  name: string
  alias: string
  score: number
}

export class UnresolvedCharasDto {
  name: string

  @Type(() => CharaOption)
  options: CharaOption[]
}

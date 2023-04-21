import { Type } from 'class-transformer'

export class EntityOption {
  id: number
  name: string
  alias: string
  score: number
}

export class UnresolvedEntityDto {
  name: string

  @Type(() => EntityOption)
  options: EntityOption[]
}

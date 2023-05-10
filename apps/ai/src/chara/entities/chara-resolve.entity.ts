import { Type } from 'class-transformer'
import { UnresolvedCharasDto } from '../dto/unresolved.dto'

export class CharaResolveEntity {
  @Type(() => Number)
  resolved: number[]

  @Type(() => UnresolvedCharasDto)
  unresolved: UnresolvedCharasDto[]
}

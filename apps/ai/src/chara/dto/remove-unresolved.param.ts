import { Type } from 'class-transformer'
import { IsInt, IsString } from 'class-validator'

export class RemoveUnresolvedParams {
  @IsInt()
  @Type(() => Number)
  id: number

  @IsString()
  name: string
}

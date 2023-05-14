import { Type } from 'class-transformer'
import { IsInt, IsString, ValidateNested } from 'class-validator'

export class CharaOption {
  @IsInt()
  @Type(() => Number)
  id: number

  @IsString()
  name: string

  @IsString()
  alias: string

  @IsInt()
  @Type(() => Number)
  score: number
}

export class UnresolvedCharasDto {
  name: string

  @ValidateNested()
  @Type(() => CharaOption)
  options: CharaOption[]
}

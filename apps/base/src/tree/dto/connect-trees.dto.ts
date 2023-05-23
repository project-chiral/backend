import { TreeIdDto } from '@app/graph/dto/tree/tree-id.dto'
import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'

export class ConnectTreesDto extends TreeIdDto {
  @IsInt({ each: true })
  @Type(() => Number)
  to: number[]
}

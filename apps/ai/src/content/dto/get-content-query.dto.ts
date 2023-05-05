import { IsEnum, IsInt } from 'class-validator'
import { EntityEnum, EntityType } from '@app/rmq/types'

export class GetContentQueryDto {
  @IsEnum(EntityEnum)
  type: EntityType

  @IsInt()
  id: number
}

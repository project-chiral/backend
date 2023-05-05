import { IsEnum, IsInt } from 'class-validator'
import { EntityEnum, EntityType } from '@app/rmq/types'

export class GetContentQueryDto {
  @IsEnum(EntityEnum)
  type: EntityType

  @IsInt()
  id: number
}

export class GetContentsQueryDto {
  @IsEnum(EntityEnum)
  type: EntityType

  @IsInt({ each: true })
  ids: number[]
}

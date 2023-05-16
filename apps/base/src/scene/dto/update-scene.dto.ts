import { PartialType } from '@nestjs/swagger'
import { CreateSceneDto } from './create-scene.dto'
import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

export class UpdateSceneDto extends PartialType(CreateSceneDto) {
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  done?: boolean
}

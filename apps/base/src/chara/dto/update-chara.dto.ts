import { PartialType } from '@nestjs/swagger'
import { CreateCharaDto } from './create-chara.dto'
import { IsBoolean, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateCharaDto extends PartialType(CreateCharaDto) {
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  done?: boolean
}

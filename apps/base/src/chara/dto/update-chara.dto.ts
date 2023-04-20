import { PartialType } from '@nestjs/swagger'
import { CreateCharaDto } from './create-chara.dto'

export class UpdateCharaDto extends PartialType(CreateCharaDto) {}

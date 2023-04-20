import { PartialType } from '@nestjs/swagger'
import { CreateWorldviewDto } from './create-worldview.dto'

export class UpdateWorldviewDto extends PartialType(CreateWorldviewDto) {}

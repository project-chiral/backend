import { PartialType } from '@nestjs/swagger'
import { CreateSceneDto } from './create-scene.dto'

export class UpdateSceneDto extends PartialType(CreateSceneDto) {}

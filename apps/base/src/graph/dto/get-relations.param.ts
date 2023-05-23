import { NodeIdDto } from '@app/graph/dto/graph/node-id.dto'
import { RelationEnum, RelationType } from '@app/graph/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'

export class GetRelationsParams extends NodeIdDto {
  @ApiProperty({ enum: RelationEnum })
  @IsEnum(RelationEnum)
  relType: RelationType
}

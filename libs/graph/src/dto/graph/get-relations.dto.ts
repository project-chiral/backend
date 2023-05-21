import { RelationEnum, RelationType } from '@app/graph/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'
import { NodeIdDto } from './node-id.dto'

export class GetRelationsDto extends NodeIdDto {
  @ApiProperty({ enum: RelationEnum })
  @IsEnum(RelationEnum)
  @IsOptional()
  relType?: RelationType
}

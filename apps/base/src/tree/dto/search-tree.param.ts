import { IsString } from 'class-validator'
import { TreeTypeParams } from './tree-type.param'

export class SearchTreeParams extends TreeTypeParams {
  @IsString()
  input: string
}

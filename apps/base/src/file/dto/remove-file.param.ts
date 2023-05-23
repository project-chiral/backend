import { IsString } from 'class-validator'

export class RemoveFileParams {
  @IsString()
  position: string
}

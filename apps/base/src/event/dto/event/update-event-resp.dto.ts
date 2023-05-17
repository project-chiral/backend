import { EventEntity } from '../../entities/event.entity'

export class UpdateEventRespDto {
  before: EventEntity
  after: EventEntity
}

import { EntityType } from '@app/rmq/types'

export const ContentKey = ({ type, id }: { type: EntityType; id: number }) =>
  `${type}/${id}/content`

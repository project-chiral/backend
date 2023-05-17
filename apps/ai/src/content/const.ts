import { ContentType } from '@app/rmq/types'

export const ContentKey = ({ type, id }: { type: ContentType; id: number }) =>
  `${type}/${id}/content`

import { EntityType } from '@app/rmq/types'

export const ContentKey = ({
  projectId,
  type,
  id,
}: {
  type: EntityType
  projectId: number
  id: number
}) => `${projectId}/${type}/${id}/content`

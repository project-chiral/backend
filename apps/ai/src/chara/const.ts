export const CharaListKey = ({ projectId }: { projectId: number }) =>
  `${projectId}/chara/table`

export const UnresolvedCharasKey = ({
  projectId,
  eventId,
}: {
  projectId: number
  eventId: number
}) => `${projectId}/event/${eventId}/unresolvedCharas`

export const CharaListKey = ({ projectId }: { projectId: number }) =>
  `${projectId}/chara/table`

export const UnresolvedCharasKey = ({ eventId }: { eventId: number }) =>
  `event/${eventId}/unresolvedCharas`

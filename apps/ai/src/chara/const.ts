export const CharaListKey = ({ projectId }: { projectId: number }) =>
  `${projectId}/chara/table`

export const ResolvedCharasKey = ({ eventId }: { eventId: number }) =>
  `event/${eventId}/resolvedCharas`

export const UnresolvedCharasKey = ({ eventId }: { eventId: number }) =>
  `event/${eventId}/unresolvedCharas`

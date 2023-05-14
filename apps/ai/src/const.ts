export enum Lang {
  CN = 'cn',
  EN = 'en',
}

export const LangMap = {
  [Lang.CN]: 'Chinese Simplified',
  [Lang.EN]: 'English',
} as const

export const LangKey = ({ projectId }: { projectId: number }) =>
  `${projectId}/settings/lang`

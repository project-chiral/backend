export enum TreeEnum {
  event = 'event',
  scene = 'scene',
  worldview = 'worldview',
}
export type TreeType = keyof typeof TreeEnum

export const TreeSchema = (type: TreeType) => `${type}_INCLUDES` as const

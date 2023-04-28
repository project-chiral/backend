export interface EntityCreateMsg {
  type: 'EVENT' | 'CHARA' | 'SCENE'
  ids: number[]
  projectId: number
}

export interface EntityRemoveMsg {
  type: 'EVENT' | 'CHARA' | 'SCENE'
  ids?: number[]
  projectId?: number
}

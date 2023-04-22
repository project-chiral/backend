export class EntityCreateMsg {
  type: 'EVENT' | 'CHARA' | 'SCENE'
  ids: number[]
  projectId: number
}

export class EntityRemoveMsg {
  type: 'EVENT' | 'CHARA' | 'SCENE'
  ids: number[]
}

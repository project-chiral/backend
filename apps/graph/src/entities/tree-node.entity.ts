import { Type } from 'class-transformer'

export class TreeNodeEntity {
  id: number
  @Type(() => TreeNodeEntity)
  children: TreeNodeEntity[]

  constructor(id: number, children: TreeNodeEntity[] = []) {
    this.id = id
    this.children = children
  }
}

import { Relation } from 'cypher-query-builder'

export class RelationEntity implements Relation {
  identity: string
  start: string
  end: string
  label: string
  properties: any
}

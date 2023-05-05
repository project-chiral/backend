import {
  EntityCreateMsg,
  EntityDoneMsg,
  EntityRemoveMsg,
  EntityUpdateMsg,
} from './entity'

export type RmqSubscribeTypes = {
  entity_create: EntityCreateMsg
  entity_update: EntityUpdateMsg
  entity_remove: EntityRemoveMsg
  entity_done: EntityDoneMsg
}

export type RmqSubscribeKeys = keyof RmqSubscribeTypes

export * from './entity'

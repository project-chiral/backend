import {
  ContentCreateMsg,
  ContentDoneMsg,
  ContentRemoveMsg,
  ContentUpdateMsg,
} from './content'

export type RmqSubscribeTypes = {
  content_create: ContentCreateMsg
  content_update: ContentUpdateMsg
  content_remove: ContentRemoveMsg
  content_done: ContentDoneMsg
}

export type RmqTopic = keyof RmqSubscribeTypes

export * from './content'

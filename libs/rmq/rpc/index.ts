import { BaseQaReq, BaseQaRes } from './qa'

export type RmqRpcTypes = {
  base_qa: {
    req: BaseQaReq
    res: BaseQaRes
  }
}

export type RmqRpcKeys = keyof RmqRpcTypes

export * from './qa'

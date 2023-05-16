import { Injectable } from '@nestjs/common'
import { Tool } from 'langchain/tools'

@Injectable()
export class HierarchyService extends Tool {
  name = 'hierarchy_search_tool'
  description = ``

  protected _call(query: string): Promise<string> {
    throw new Error('Method not implemented.')
  }
}

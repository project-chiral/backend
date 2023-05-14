import { GraphService } from '@app/graph'
import { Injectable } from '@nestjs/common'
import { Tool } from 'langchain/tools'

@Injectable()
export class MetaService extends Tool {
  name = 'meta_search_tool'
  description = `
  Input format:
  []`

  constructor(private readonly graphService: GraphService) {
    super()
  }

  protected async _call(query: string): Promise<string> {
    return ''
  }
}

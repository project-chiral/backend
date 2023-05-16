import { GraphService } from '@app/graph'
import { Injectable } from '@nestjs/common'
import { Tool } from 'langchain/tools'

@Injectable()
export class RelationService extends Tool {
  name = 'relation_search_tool'
  description = ``

  constructor(private readonly graphService: GraphService) {
    super()
  }

  protected _call(query: string): Promise<string> {
    throw new Error('Method not implemented.')
  }
}

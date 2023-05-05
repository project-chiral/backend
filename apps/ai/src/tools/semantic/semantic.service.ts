import { Injectable } from '@nestjs/common'
import { Tool } from 'langchain/tools'
import { VecstoreService } from '../../vecstore/vecstore.service'

@Injectable()
export class SemanticService extends Tool {
  name = 'semantic_search_tool'
  description = ''

  constructor(private readonly vecstoreService: VecstoreService) {
    super()
  }

  _call(query: string): Promise<string> {
    return Promise.resolve('')
  }
}

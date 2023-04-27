import { Injectable } from '@nestjs/common'
import { Tool } from 'langchain/dist/tools'
import { VecstoreService } from '../../vecstore/vecstore.service'

@Injectable()
export class SemanticService extends Tool {
  name = 'semantic_search_tool'
  description = `retrieves several events that are most relevant to a given query and returns their specific description information, which can be used as a basis for obtaining the final answer.
    
    Input format:
    
    \`\`\`json
    {
        "query": "user query"
    }
    \`\`\`
    
    Output format:
    
    \`\`\`json
    [
        { "id": 1, "content": "event 1 content" },
        { "id": 2, "content": "event 2 content" }
    ]
    \`\`\`
    `

  constructor(private readonly vecstoreService: VecstoreService) {
    super()
  }

  protected _call(): Promise<string> {
    throw new Error('Method not implemented.')
  }
}

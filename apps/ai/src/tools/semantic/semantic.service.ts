import { Injectable } from '@nestjs/common'
import { Tool } from 'langchain/tools'
import { ContentService } from '../../content/content.service'

@Injectable()
export class SemanticService extends Tool {
  name = 'semantic_search_tool'
  description = `retrieves several events that are most relevant to a given query and returns their specific 
    description information, which can be used as a basis for obtaining the final answer.
    Input format:
    {{}}
        "query": "user query"
    {{}}`

  constructor(private readonly contentService: ContentService) {
    super()
  }

  protected async _call(input: string): Promise<string> {
    const { query } = JSON.parse(input) as { query: string }
    const result = await this.contentService.search({
      type: 'event',
      query,
      k: 1,
    })

    return JSON.stringify(result.map(({ id, content }) => ({ id, content })))
  }
}

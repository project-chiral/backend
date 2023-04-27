import { Injectable } from '@nestjs/common'
import { LLMChain } from 'langchain'

import { ZeroShotAgent, AgentExecutor } from 'langchain/agents'
import { OpenAIChat } from 'langchain/dist/llms/openai-chat'
import { Tool } from 'langchain/dist/tools'
import { SemanticService } from '../tools/semantic/semantic.service'
@Injectable()
export class AgentService {
  executor: AgentExecutor

  constructor(private readonly semanticService: SemanticService) {
    const tools: Tool[] = [semanticService]
    const chat = new OpenAIChat()
    const llmChain = new LLMChain({
      prompt: null,
      llm: chat,
    })
    const prompt = ZeroShotAgent.createPrompt(tools)
    const agent = new ZeroShotAgent({
      llmChain,
      allowedTools: tools.map(({ name }) => name),
    })
    this.executor = AgentExecutor.fromAgentAndTools({
      agent,
      tools,
    })
  }

  baseQA(query: string) {
    return ''
  }
}

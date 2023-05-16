import { Injectable } from '@nestjs/common'
import { LLMChain } from 'langchain/chains'

import { ZeroShotAgent, AgentExecutor } from 'langchain/agents'
import { Tool } from 'langchain/tools'
import { SemanticService } from '../tools/semantic/semantic.service'
import { OpenAIChat } from 'langchain/llms/openai'
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
} from 'langchain/prompts'
import { Prefix, Suffix, inputVariables } from './prompt'
import { Lang } from '../const'

@Injectable()
export class AgentService {
  model: OpenAIChat
  tools: Tool[]

  constructor(private readonly semanticService: SemanticService) {
    this.tools = [semanticService]
    this.model = new OpenAIChat({ temperature: 0.8 })
  }

  createExecutor() {
    const prompt = ZeroShotAgent.createPrompt(this.tools, {
      prefix: Prefix[Lang.EN],
      suffix: Suffix[Lang.EN],
      inputVariables,
    })

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      new SystemMessagePromptTemplate(prompt),
    ])

    const llmChain = new LLMChain({
      prompt: chatPrompt,
      llm: this.model,
    })

    const agent = new ZeroShotAgent({
      llmChain,
      allowedTools: this.tools.map(({ name }) => name),
    })
    return AgentExecutor.fromAgentAndTools({
      agent,
      tools: this.tools,
    })
  }

  async baseQA(query: string) {
    const executor = this.createExecutor()
    const resp = await executor.call({
      input: query,
    })
    return resp.output as string
  }
}

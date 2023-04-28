import { Injectable } from '@nestjs/common'
import { LLMChain } from 'langchain/chains'

import { ZeroShotAgent, AgentExecutor } from 'langchain/agents'
import { Tool } from 'langchain/tools'
import { SemanticService } from '../tools/semantic/semantic.service'
import { OpenAIChat } from 'langchain/llms/openai'
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from 'langchain/prompts'

@Injectable()
export class AgentService {
  executor: AgentExecutor

  constructor(private readonly semanticService: SemanticService) {
    const tools: Tool[] = [semanticService]
    const chat = new OpenAIChat()

    const prompt = ZeroShotAgent.createPrompt(tools, {
      prefix: `Answer the following questions as best you can, but speaking as a pirate might speak. You have access to the following tools:`,
      suffix: `Begin! Remember to speak as a pirate when giving your final answer. Use lots of "Args"`,
    })

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      new SystemMessagePromptTemplate(prompt),
      HumanMessagePromptTemplate.fromTemplate(`{input}

This was your previous work (but I haven't seen any of it! I only see what you return as final answer):
{agent_scratchpad}`),
    ])

    const llmChain = new LLMChain({
      prompt: chatPrompt,
      llm: chat,
    })

    const agent = new ZeroShotAgent({
      llmChain,
      allowedTools: tools.map(({ name }) => name),
    })
    this.executor = AgentExecutor.fromAgentAndTools({
      agent,
      tools,
    })
  }

  async baseQA(query: string) {
    // const resp = await this.executor.run(query)
    return ''
  }
}

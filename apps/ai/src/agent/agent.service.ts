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

@Injectable()
export class AgentService {
  executor: AgentExecutor
  model: OpenAIChat

  constructor(private readonly semanticService: SemanticService) {
    const tools: Tool[] = [semanticService]
    this.model = new OpenAIChat({ temperature: 0.4, verbose: true })

    const prompt = ZeroShotAgent.createPrompt(tools, {
      suffix: `The final answer should include supporting evidence and be in the following format:
    "Final Answer: 根据 [@<id>] 和 [@<id>] 提供的信息, 我认为..."
    Where [@<id>] are the id of the events you want to use as evidence.

    The final answer should be in Chinese Simpified.

    Begin!

    Question: {input}
    Thought: {agent_scratchpad}`,
      inputVariables: ['input', 'agent_scratchpad'],
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
      allowedTools: tools.map(({ name }) => name),
    })
    this.executor = AgentExecutor.fromAgentAndTools({
      agent,
      tools,
    })
  }

  async baseQA(query: string) {
    const resp = await this.executor.call({
      input: query,
    })
    return resp.output as string
  }
}

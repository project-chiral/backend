import { Injectable } from '@nestjs/common'
import {
  ChatCompletionRequestMessageRoleEnum,
  CreateChatCompletionRequest,
  CreateCompletionRequest,
  OpenAIApi,
} from './openai/api'
import { Configuration } from './openai/configuration'

@Injectable()
export class OpenaiService extends OpenAIApi {
  constructor() {
    super(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      })
    )
  }

  async complete(
    prompt: string,
    options?: Partial<CreateChatCompletionRequest>
  ) {
    const {
      data: {
        choices: [
          {
            message: { content },
          },
        ],
      },
    } = await this.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: prompt,
        },
      ],

      max_tokens: 128,
      temperature: 0.7,
      n: 1,
      ...options,
    })

    return content
  }

  async completeDavinci(
    prompt: string,
    options?: Partial<CreateCompletionRequest>
  ) {
    const {
      data: {
        choices: [{ text }],
      },
    } = await this.createCompletion({
      model: 'text-davinci-003',
      max_tokens: 128,
      temperature: 0.7,
      prompt,
      n: 1,
      ...options,
    })

    return text
  }
}

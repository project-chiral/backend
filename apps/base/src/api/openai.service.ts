import { Injectable } from '@nestjs/common'
import { OpenAIApi } from './openai/api'
import { Configuration } from './openai/configuration'

@Injectable()
export class OpenaiService extends OpenAIApi {
  constructor() {
    super(
      new Configuration({
        basePath: 'https://api.openai.com/v1/',
        apiKey: process.env.OPENAI_API_KEY,
      })
    )
  }
}

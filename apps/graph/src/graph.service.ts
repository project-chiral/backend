import { Injectable } from '@nestjs/common'

@Injectable()
export class GraphService {
  getHello(): string {
    return 'Hello World!'
  }
}

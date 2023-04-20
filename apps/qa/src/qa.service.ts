import { Injectable } from '@nestjs/common'

@Injectable()
export class QaService {
  getHello(): string {
    return 'Hello World!'
  }
}

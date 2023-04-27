import { BadRequestException, Injectable } from '@nestjs/common'
import { RequestContext } from 'nestjs-request-context'

@Injectable()
export class UtilsService {
  getHeader(key: string) {
    const req = RequestContext.currentContext.req
    const headers: Record<string, string> = req.headers

    if (!(key in headers)) {
      throw new BadRequestException(`Header ${key} not found`)
    }

    return headers[key]
  }

  getNumberHeader(key: string) {
    const value = this.getHeader(key)
    const number = parseInt(value)

    if (isNaN(number)) {
      throw new BadRequestException(`Header ${key} is not a number`)
    }

    return number
  }

  getProjectId() {
    return this.getNumberHeader('project-id')
  }

  getUserId() {
    return this.getNumberHeader('user-id')
  }
}

import { BadRequestException } from '@nestjs/common/exceptions'
import { RequestContext } from 'nestjs-request-context'

/**
 * 通过request header获取header的内容
 * @param key header key
 * @returns 该header的内容
 * @throws BadRequestException 如果header不存在
 */
export const getHeader = (key: string) => {
  const req = RequestContext.currentContext.req
  const headers: Record<string, string> = req.headers

  if (!(key in headers)) {
    throw new BadRequestException(`Header ${key} not found`)
  }

  return headers[key]
}

/**
 * 通过request header获取header的内容并转换为数字
 * @param key header key
 * @returns 该header的内容
 * @throws BadRequestException 如果header不存在
 */
export const getNumberHeader = (key: string) => {
  const value = getHeader(key)
  const number = parseInt(value)

  if (isNaN(number)) {
    throw new BadRequestException(`Header ${key} is not a number`)
  }

  return number
}

export const getProjectId = () => getNumberHeader('project-id')
export const getUserId = () => getNumberHeader('user-id')

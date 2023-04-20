import util from 'node:util'
import type { OnApplicationShutdown } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { Connection } from 'cypher-query-builder'

const removeUndefined = (data: Record<string, any>) => Object.keys(data)
  .filter(key => data[key] !== null && data[key] !== undefined)
  .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})

@Injectable()
export class CypherService extends Connection implements OnApplicationShutdown {
  constructor() {
    const url = process.env.NEO_URL ?? ''
    const username = process.env.NEO_USERNAME ?? ''
    const password = process.env.NEO_PASSWORD ?? ''

    super(url, { username, password })
  }

  async onApplicationShutdown(_signal?: string | undefined) {
    await this.close()
  }

  execute(
    strs: TemplateStringsArray,
    ...args: any[]
  ) {
    let query = ''
    for (let i = 0; i < strs.length + args.length; ++i) {
      const pos = Math.floor(i / 2)
      if (i % 2 === 0) {
        query += strs[pos]
      }
      else {
        const value = args[pos]
        query += typeof value === 'object'
        // 转换为不含双引号的JSON
          ? util.inspect(removeUndefined(value))
          : `${value}`
      }
    }

    return this.raw(query)
  }
}

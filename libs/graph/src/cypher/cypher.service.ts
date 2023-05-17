import util from 'node:util'
import type { OnApplicationShutdown } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { Connection } from 'cypher-query-builder'

const removeUndefined = (data: Record<string, any>) =>
  Object.keys(data)
    .filter((key) => data[key] !== null && data[key] !== undefined)
    .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})

const format = (value: any) => {
  if (typeof value === 'object') {
    value = Array.isArray(value) ? value : removeUndefined(value)
    return util.inspect(value)
  } else {
    return `${value}`
  }
}

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

  execute(strs: TemplateStringsArray, ...args: any[]) {
    let query = ''
    for (let i = 0; i < strs.length + args.length; ++i) {
      const pos = Math.floor(i / 2)
      query += i % 2 === 0 ? strs[pos] : format(args[pos])
    }

    // console.log(query)

    return this.raw(query)
  }
}

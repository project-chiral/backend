import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class CacheService extends Redis {
  constructor() {
    super(process.env.REDIS_URL)
  }

  async get<T = string>(key: string) {
    const data = await super.get(key)
    return JSON.parse(data) as T
  }

  async set<T = unknown>(key: string, value: T) {
    return super.set(key, JSON.stringify(value))
  }
}

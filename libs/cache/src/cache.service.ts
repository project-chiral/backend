import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

const EXPIRE = 1000 * 60 * 5

@Injectable()
export class CacheService extends Redis {
  constructor() {
    super(process.env.REDIS_URL ?? '', {})
  }

  async get<T = object>(key: string) {
    const data = await super.get(key)
    if (!data) {
      return null
    }
    return JSON.parse(data) as T
  }

  async set<T = unknown>(key: string, value: T) {
    return super.set(key, JSON.stringify(value))
  }

  async setWithExpire<T = unknown>(
    key: string,
    value: T,
    milli: number = EXPIRE
  ) {
    return super.set(key, JSON.stringify(value), 'PX', milli)
  }
}

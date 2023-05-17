import { ContentType } from '@app/rmq/types'
import { Injectable } from '@nestjs/common'
import { Tool } from 'langchain/tools'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class MetaService extends Tool {
  name = 'meta_search_tool'
  description = `
  This tool allows you to search meta information about events and characters.

  Event: name, start time, end time
  Character: name, birth time, death time

  Input Format:
  {{}}
      "type": "event",
      "ids": [1, 2, 3]
  {{}}`

  constructor(private readonly prismaService: PrismaService) {
    super()
  }

  private async event(ids: number[]) {
    const results = await this.prismaService.event.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        name: true,
        start: true,
        end: true,
      },
    })

    return results
  }

  private async chara(ids: number[]) {
    const results = await this.prismaService.chara.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        name: true,
        start: true,
        end: true,
      },
    })

    return results
  }

  protected async _call(query: string): Promise<string> {
    const { type, ids } = JSON.parse(query) as {
      type: ContentType
      ids: number[]
    }

    let metadata: any[] = []
    if (type === 'event') {
      metadata = await this.event(ids)
    } else if (type === 'chara') {
      metadata = await this.chara(ids)
    }

    return JSON.stringify({
      type,
      metadata,
    })
  }
}

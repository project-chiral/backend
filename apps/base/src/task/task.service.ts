import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { readdir, stat, unlink } from 'fs/promises'
import path from 'path'
import { tempFilePath } from '../file/const/path'

@Injectable()
export class TaskService {
  /**
   * 每天清理一次时长超过一天的临时文件
   */
  @Interval(1000 * 60 * 60 * 24)
  async clearTempFile() {
    const names = await readdir(tempFilePath)
    const nowStamp = new Date().valueOf()

    await Promise.all(
      names.map(async (name) => {
        const filePath = path.join(tempFilePath, name)
        const { birthtime } = await stat(filePath)
        const birthStamp = birthtime.valueOf()
        return nowStamp - birthStamp > 1000 * 60 * 60 * 24
          ? unlink(filePath)
          : Promise.resolve()
      })
    )
  }
}

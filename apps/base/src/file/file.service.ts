import { Injectable } from '@nestjs/common'
import { RemoveFileDto } from './dto/remove-file.dto'
import { UploadFileDto } from './dto/upload-file.dto'
import hasha from 'hasha'
import { extension } from 'mime-types'
import { readdir, rename, rm, stat, unlink, writeFile } from 'fs/promises'
import path from 'path'
import { filesPath, tempFilePath } from './const/path'
import { Interval } from '@nestjs/schedule'

const getChecksum = (file: Express.Multer.File) => {
  const { buffer } = file
  return hasha(buffer, { algorithm: 'md5' })
}

@Injectable()
export class FileService {
  async upload({ position }: UploadFileDto, file: Express.Multer.File) {
    const ext = extension(file.mimetype)
    const positionWithExt = `${position}.${ext}`
    const filePath = path.join(filesPath, positionWithExt)
    await writeFile(filePath, file.buffer)
    return positionWithExt
  }

  async remove({ position }: RemoveFileDto) {
    const filePath = path.join(filesPath, position)
    await rm(`${filePath}.*`)
    return position
  }

  async uploadTemp(file: Express.Multer.File) {
    const ext = extension(file.mimetype)
    const checksum = getChecksum(file)
    const nameWithExt = `${checksum}.${ext}`
    await writeFile(path.join(tempFilePath, nameWithExt), file.buffer)
    return nameWithExt
  }

  async saveTemp(nameWithExt: string, position: string) {
    const ext = path.extname(nameWithExt)
    const positionWithExt = `${position}.${ext}`
    await rename(
      path.join(tempFilePath, nameWithExt),
      path.join(filesPath, positionWithExt)
    )
  }

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

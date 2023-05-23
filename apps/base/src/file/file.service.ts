import { Injectable } from '@nestjs/common'
import { UploadFileDto } from './dto/upload-file.dto'
import hasha from 'hasha'
import { extension } from 'mime-types'
import {
  mkdir,
  readdir,
  rename,
  rm,
  stat,
  unlink,
  writeFile,
} from 'fs/promises'
import path from 'path'
import { filesPath, tempFilePath } from './const/path'
import { Interval } from '@nestjs/schedule'
import { UploadTempFileDto } from './dto/upload-temp-file.dto'
import { DAY_MILLISECONDS } from '@app/utils'
import { SaveTempFileDto } from './dto/save-temp-file.dto'

const getChecksum = (file: Express.Multer.File) => {
  const { buffer } = file
  return hasha(buffer, { algorithm: 'md5' })
}

@Injectable()
export class FileService {
  async upload(projectId: number, { position, file }: UploadFileDto) {
    const ext = extension(file.mimetype)
    const positionWithExt = `${position}.${ext}`
    const filePath = path.join(filesPath, `${projectId}`, positionWithExt)

    const dirPath = path.dirname(filePath)
    await mkdir(dirPath, { recursive: true })

    await writeFile(filePath, file.buffer)
    return positionWithExt
  }

  async remove(projectId: number, position: string) {
    const filePath = path.join(filesPath, `${projectId}`, position)
    await rm(`${filePath}*`, { recursive: true })
    return position
  }

  async uploadTemp({ file }: UploadTempFileDto) {
    const ext = extension(file.mimetype)
    const checksum = getChecksum(file)
    const nameWithExt = `${checksum}.${ext}`
    const filePath = path.join(tempFilePath, nameWithExt)

    const dirPath = path.dirname(filePath)
    await mkdir(dirPath, { recursive: true })

    await writeFile(filePath, file.buffer)

    return nameWithExt
  }

  async saveTemp({ name, position }: SaveTempFileDto) {
    const ext = path.extname(name)
    const positionWithExt = `${position}.${ext}`

    const sourcePath = path.join(tempFilePath, name)
    const targetPath = path.join(filesPath, positionWithExt)

    const targetDirPath = path.dirname(targetPath)
    await mkdir(path.dirname(targetDirPath), { recursive: true })

    await rename(sourcePath, targetPath)
  }

  @Interval(DAY_MILLISECONDS)
  protected async clearTempFile() {
    const names = await readdir(tempFilePath)
    const nowStamp = new Date().valueOf()

    await Promise.all(
      names.map(async (name) => {
        const filePath = path.join(tempFilePath, name)
        const { birthtime } = await stat(filePath)
        const birthStamp = birthtime.valueOf()

        return nowStamp - birthStamp > DAY_MILLISECONDS
          ? unlink(filePath)
          : Promise.resolve()
      })
    )
  }
}

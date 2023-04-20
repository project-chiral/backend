import { Injectable } from '@nestjs/common'
import { TaskService } from '../task/task.service'
import { RemoveFileDto } from './dto/remove-file.dto'
import { UploadFileDto } from './dto/upload-file.dto'
import hasha from 'hasha'
import { extension } from 'mime-types'
import { rename, rm, writeFile } from 'fs/promises'
import path from 'path'
import { filesPath, tempFilePath } from './const/path'

const getChecksum = (file: Express.Multer.File) => {
  const { buffer } = file
  return hasha(buffer, { algorithm: 'md5' })
}

@Injectable()
export class FileService {
  constructor(private readonly taskService: TaskService) {}

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
}

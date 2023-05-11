import path from 'node:path'

export const staticPath = process.env.FILE_PATH as string
export const tempFilePath = path.join(staticPath, 'temp')
export const filesPath = path.join(staticPath, 'files')

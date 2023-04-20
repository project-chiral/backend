import path from 'node:path'

export const staticPath = path.join(process.cwd(), 'dist/apps/base/static')
export const tempFilePath = path.join(staticPath, 'temp')
export const filesPath = path.join(staticPath, 'files')

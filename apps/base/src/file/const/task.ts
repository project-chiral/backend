import path from 'node:path'

export const removeFile = (...filePaths: string[]) =>
  `remove-${path.join(...filePaths)}`

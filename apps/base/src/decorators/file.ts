import { ApiProperty } from '@nestjs/swagger'

export const ApiFile = () =>
  ApiProperty({
    type: 'string',
    format: 'binary',
  })

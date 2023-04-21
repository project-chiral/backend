import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export enum Lang {
  CN = 'cn',
  EN = 'en',
}

export const LangMap = {
  [Lang.CN]: 'Chinese Simplified',
  [Lang.EN]: 'English',
} as const

export class BaseParams {
  @IsString()
  @IsNotEmpty()
  doc: string

  @IsEnum(Lang)
  lang: string
}

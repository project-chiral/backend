import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator'
import { BaseParams } from '../dto/base-params.dto'

export const SummarizeTitlePrompt = ({ doc, lang }: BaseParams) =>
  `Provide a short, descriptive title for the given piece of document. The title needs to be in the same language as the original text. The title needs to be in ${lang}.

  [document]
  ${doc}

  [title]`

export class SummarizeDescParams {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  length?: number = 100

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  abstraction?: number = 70

  @IsString({ each: true })
  @IsOptional()
  keyword: string[] = []
}

export const SummarizeDescPrompt = ({
  doc,
  lang,
  length,
  abstraction,
  keyword,
}: BaseParams & SummarizeDescParams) =>
  `I want you to act as a text summarizer that can condense historical texts into informative, concise summaries. The summarizer should output summaries that are no longer than a specified length of ${length}. The summarizer should strive to accurately capture specific details such as names, dates, and locations in the original text. The summary should be generated around a set of specified keywords: ${keyword.join(
    ','
  )}, which represents a group of character names. The summarizer should maintain a professional tone and achieve a minimum level of abstraction, indicated by ${abstraction}, by limiting the percentage of directly copied sentences from the original text. The input texts may include subjective or literary descriptions. The output format for the summaries should be a single paragraph. The summaries needs to be in ${lang}.

  [document]
  ${doc}

  [summary]`

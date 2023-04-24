import { BaseParams } from '../base'

export const QueryGeneratePrompt = ({ doc, lang }: BaseParams) =>
  `Provide a question that can be answered by the given piece of document. The question needs to be in ${lang}.

  doc: David ate a apple and a banana today.
  query: What did David eat today?

  doc: In 2020, the United States had the highest number of COVID-19 cases in the world.
  query: Which country had the highest number of COVID-19 cases in 2020?

  doc: ${doc}
  query:`

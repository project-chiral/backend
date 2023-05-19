import { BaseParams } from '../dto/base-params.dto'

/**
 * 阅读理解题
 */
export const CompPrompt = ({ doc, lang }: BaseParams) =>
  `Provide a question that can be answered by the given piece of document. The question should be easy to understand and precise. The question needs to be in ${lang}.

  doc: David ate a apple and a banana today.
  query: What did David eat today?

  doc: In 2020, the United States had the highest number of COVID-19 cases in the world.
  query: Which country had the highest number of COVID-19 cases in 2020?

  doc: ${doc}
  query:`

/**
 * 选择题
 */
export const MCQPrompt = ({ doc, lang }: BaseParams) =>
  `Provide a multiple choice question and its answer according to the given piece of document. There should be only one correct answer. The question needs to be in ${lang}.
  
  doc: Jesus, according to some biblical sources, was born in this town some two millennia ago in Bethlehem. The story begins with wise men who come to the city of Jerusalem after seeing a star that they interpreted as signaling the birth of a new king.

  Question: Where was Jesus born? 
  Choices: [@A:Jerusalem][@B:Palestine][@C:Bethlehem][@D:Tel-Aviv]
  Answer: C
  
  doc: ${doc}
  
  Question: `

export const CharaRecognizePrompt = ({
  doc,
}: {
  doc: string
}) => `I need you to act as a character name recognition tool. I will provide you with a document, 
    and you need to identify all the character names mentioned in it:

"Mao Zedong is an outstanding military strategist." -> ["Mao Zedong"]

"Mao Zedong is a great leader. Peng Dehuai is the Chairman Mao's comrade-in-arms." -> ["Mao Zedong", "Peng Dehuai"]

The document may use different coreference to refer to the same person. Please resolute the coreference and include 
only the actual character names as results:

"Mao Zedong led the Communist Party of China. The Chairman Mao lived frugally throughout his life." -> ["Mao Zedong"]

For cases where coreference resolution is not possible, please include the coreference as a result:

"Chairman Mao was one of the founders of New China." -> ["Chairman Mao"]

The document content may contain foreign names or strange names, please recognize them normally:

"阿万达阿飞砍大辉 is an excellent naval commander who fought alongside E'est Ma Peto." -> ["阿万达阿飞砍大辉", "E'est Ma Peto"]

For situations where no name can be recognized, return empty list:

"this is a test" -> []

I want you to only reply the array result and nothing else, do not write any explanations. All result should be valid JSON format.
 
"${doc}" -> `

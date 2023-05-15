const length = (doc: string) => {
  const length = doc.length
  if (length < 256) {
    return length
  } else if (length < 512) {
    return length * 0.8
  } else if (length < 1024) {
    return length * 0.6
  } else if (length < 2048) {
    return length * 0.5
  } else {
    return length * 0.4
  }
}

export const SummarizeDescPrompt = (doc: string) =>
  `I want you to act as a text summarizer. The output should no longer than ${length(
    doc
  )}. The summarizer should strive to accurately capture specific details such as names, dates, and locations in the original text. The output format for the summaries should be a single paragraph.

  [document]
  ${doc}

  [summary]`

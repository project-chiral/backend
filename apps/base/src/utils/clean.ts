export const cleanHTML = (text: string) => {
  return text.replace(/<[^>]*>/g, '')
}

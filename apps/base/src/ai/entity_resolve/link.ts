import { Lang } from '../base'
import levenshtein from 'js-levenshtein'
import { EntityOption } from '../dto/unresolved.dto'

const LCS = (a: string, b: string): number => {
  const m = a.length
  const n = b.length
  const dp: number[][] = new Array(m + 1)
    .fill(0)
    .map(() => new Array(n + 1).fill(0))
  let max_len = 0
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
        max_len = Math.max(max_len, dp[i][j])
      } else {
        dp[i][j] = 0
      }
    }
  }
  return max_len
}

const calcScore = (lang: Lang, name: string, exist_name: string) => {
  if (lang === Lang.CN) {
    return LCS(name, exist_name) / Math.max(name.length, exist_name.length)
  }
  if (lang === Lang.EN) {
    return levenshtein(name, exist_name)
  }
}

export const linkEntities = () => {
  return [] as EntityOption[]
}

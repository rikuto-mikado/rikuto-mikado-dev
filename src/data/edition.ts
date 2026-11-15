import type { Language } from './translations'

export const PAPER_NAME = 'The R.M. Journal'

/** Year the journal (this site) began; volume numbers count up from here. */
const FOUNDED_YEAR = 2026

const ROMAN: [number, string][] = [
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

function toRoman(n: number): string {
  let out = ''
  for (const [value, numeral] of ROMAN) {
    while (n >= value) {
      out += numeral
      n -= value
    }
  }
  return out
}

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  return Math.floor((date.getTime() - start.getTime()) / 86_400_000)
}

export interface EditionInfo {
  /** e.g. "Vol. I" */
  volume: string
  /** e.g. "No. 319" — one issue per day of the year */
  issue: string
  /** e.g. "Sunday, November 15, 2026" / "2026年11月15日 日曜日" */
  longDate: string
  /** e.g. "Nov 15, 2026" / "2026年11月15日" */
  shortDate: string
}

/** Masthead / folio details for today's "edition", derived from the visitor's local date. */
export function getEditionInfo(lang: Language, date = new Date()): EditionInfo {
  const locale = lang === 'ja' ? 'ja-JP' : 'en-US'
  return {
    volume: `Vol. ${toRoman(Math.max(1, date.getFullYear() - FOUNDED_YEAR + 1))}`,
    issue: `No. ${dayOfYear(date)}`,
    longDate: date.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    shortDate: date.toLocaleDateString(locale, { year: 'numeric', month: lang === 'ja' ? 'long' : 'short', day: 'numeric' }),
  }
}

/** Fills a "{page}" placeholder in a translated jump line ("Continued on {page}"). */
export function jumpText(template: string, page: string): string {
  return template.replace('{page}', page)
}

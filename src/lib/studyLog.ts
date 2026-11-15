import { useEffect, useState } from 'react'
import type { Language } from '../data/translations'

/*
 * Study log feed (typbox). Fetched once per page load and shared by every consumer
 * (masthead ear, front page, Study Log section) through a module-level promise.
 */

const FEED_URL = 'https://typbox-dev.onrender.com/api/portfolio/feed/'
export const RECENT_DAY_COUNT = 7

export interface StudyLogEntry {
  id: number
  date: string
  duration_minutes: number
  topic: string
  category: {
    code: string
    name: string
    color: string
  }
}

export type FeedState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; entries: StudyLogEntry[]; fetchedAt: Date }

export interface CategoryTotal {
  code: string
  name: string
  color: string
  minutes: number
  sessions: number
  topics: string[]
}

export interface DayGroup {
  date: string
  minutes: number
  categories: CategoryTotal[]
}

// API dates are plain YYYY-MM-DD; build a local Date so the day never shifts across time zones
export function parseDay(value: string) {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function toDayKey(date: Date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((n) => String(n).padStart(2, '0')).join('-')
}

export function formatMonthDay(date: Date) {
  return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

/** Day key `count - 1` days before `date`, so the window [result, date] spans `count` days. */
export function windowStartKey(date: Date, count: number) {
  return toDayKey(new Date(date.getFullYear(), date.getMonth(), date.getDate() - (count - 1)))
}

/** Monday–Sunday week containing `date`. */
export function weekRange(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate() - ((date.getDay() + 6) % 7))
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6)
  return { start, end }
}

// Mirrors TYPBOX's own labels: logs store whole minutes, totals are summed in minutes,
// and hours are shown to one decimal (minutes / 60).toFixed(1)
export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes}m`
  return minutes % 60 === 0 ? `${minutes / 60}h` : `${(minutes / 60).toFixed(1)}h`
}

export function formatExactMinutes(minutes: number) {
  return `${formatDuration(minutes)} (${minutes} min)`
}

export function formatSessions(count: number, lang: Language) {
  if (lang === 'ja') return `${count}回`
  return `${count} ${count === 1 ? 'session' : 'sessions'}`
}

export function totalByCategory(entries: StudyLogEntry[]): CategoryTotal[] {
  const totals = new Map<string, CategoryTotal>()
  for (const { category, duration_minutes, topic } of entries) {
    const total = totals.get(category.code) ?? { ...category, minutes: 0, sessions: 0, topics: [] }
    total.minutes += duration_minutes
    total.sessions += 1
    if (topic) total.topics.push(topic)
    totals.set(category.code, total)
  }
  return [...totals.values()].sort((a, b) => b.minutes - a.minutes)
}

export function groupByDay(entries: StudyLogEntry[]): DayGroup[] {
  const byDate = new Map<string, StudyLogEntry[]>()
  for (const entry of entries) {
    byDate.set(entry.date, [...(byDate.get(entry.date) ?? []), entry])
  }
  return [...byDate.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, dayEntries]) => ({
      date,
      minutes: dayEntries.reduce((sum, entry) => sum + entry.duration_minutes, 0),
      categories: totalByCategory(dayEntries),
    }))
}

let feedPromise: Promise<FeedState> | null = null

function loadFeed(): Promise<FeedState> {
  feedPromise ??= fetch(FEED_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json() as Promise<StudyLogEntry[]>
    })
    .then((entries): FeedState => ({ status: 'ready', entries, fetchedAt: new Date() }))
    .catch((err: unknown): FeedState => {
      console.error('Study log feed failed:', err)
      return { status: 'error' }
    })
  return feedPromise
}

/** Shared study log feed state; every caller reuses the same single request. */
export function useStudyLogFeed(): FeedState {
  const [feed, setFeed] = useState<FeedState>({ status: 'loading' })

  useEffect(() => {
    let isActive = true
    loadFeed().then((state) => {
      if (isActive) setFeed(state)
    })
    return () => {
      isActive = false
    }
  }, [])

  return feed
}

/** Minutes logged in a Monday–Sunday week that is `weeksAgo` weeks before the week containing `date`. */
export function minutesInWeek(entries: StudyLogEntry[], date: Date, weeksAgo = 0): number {
  const { start, end } = weekRange(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7 * weeksAgo))
  const startKey = toDayKey(start)
  const endKey = toDayKey(end)
  return entries.reduce(
    (sum, entry) => (entry.date >= startKey && entry.date <= endKey ? sum + entry.duration_minutes : sum),
    0,
  )
}

/** Minutes logged on the calendar day of `date`. */
export function minutesOnDay(entries: StudyLogEntry[], date: Date): number {
  const key = toDayKey(date)
  return entries.reduce((sum, entry) => (entry.date === key ? sum + entry.duration_minutes : sum), 0)
}

/** Percentage change, rounded; null when there is no baseline to compare with. */
export function percentChange(current: number, previous: number): number | null {
  if (previous <= 0) return null
  return Math.round(((current - previous) / previous) * 100)
}

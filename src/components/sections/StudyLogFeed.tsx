import { Clock, Terminal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { Language, UiText } from '../../data/translations'
import { ChevronDownIcon } from '../common/icons'
import SectionHeader from '../common/SectionHeader'

const FEED_URL = 'https://typbox-dev.onrender.com/api/portfolio/feed/'
const INITIAL_VISIBLE_DAYS = 3
const RECENT_DAY_COUNT = 7

interface StudyLogEntry {
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

type FeedState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; entries: StudyLogEntry[]; fetchedAt: Date }

interface CategoryTotal {
  code: string
  name: string
  color: string
  minutes: number
  sessions: number
  topics: string[]
}

interface DayGroup {
  date: string
  minutes: number
  categories: CategoryTotal[]
}

interface StudyLogFeedProps {
  isDark: boolean
  ui: UiText
  lang: Language
}

// API dates are plain YYYY-MM-DD; build a local Date so the day never shifts across time zones
function parseDay(value: string) {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function toDayKey(date: Date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((n) => String(n).padStart(2, '0')).join('-')
}

function formatMonthDay(date: Date) {
  return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

/** Day key `count - 1` days before `date`, so the window [result, date] spans `count` days. */
function windowStartKey(date: Date, count: number) {
  return toDayKey(new Date(date.getFullYear(), date.getMonth(), date.getDate() - (count - 1)))
}

/** Monday–Sunday week containing `date`. */
function weekRange(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate() - ((date.getDay() + 6) % 7))
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6)
  return { start, end }
}

// Mirrors TYPBOX's own labels: logs store whole minutes, totals are summed in minutes,
// and hours are shown to one decimal (minutes / 60).toFixed(1)
function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes}m`
  return minutes % 60 === 0 ? `${minutes / 60}h` : `${(minutes / 60).toFixed(1)}h`
}

function formatExactMinutes(minutes: number) {
  return `${formatDuration(minutes)} (${minutes} min)`
}

function formatSessions(count: number, lang: Language) {
  if (lang === 'ja') return `${count}回`
  return `${count} ${count === 1 ? 'session' : 'sessions'}`
}

function totalByCategory(entries: StudyLogEntry[]): CategoryTotal[] {
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

function groupByDay(entries: StudyLogEntry[]): DayGroup[] {
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

export default function StudyLogFeed({ isDark, ui, lang }: StudyLogFeedProps) {
  const [feed, setFeed] = useState<FeedState>({ status: 'loading' })
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    fetch(FEED_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<StudyLogEntry[]>
      })
      .then((entries) => setFeed({ status: 'ready', entries, fetchedAt: new Date() }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        console.error('Study log feed failed:', err)
        setFeed({ status: 'error' })
      })

    return () => controller.abort()
  }, [])

  const entries = useMemo(() => (feed.status === 'ready' ? feed.entries : []), [feed])
  const days = useMemo(() => groupByDay(entries), [entries])

  // The category breakdown covers the current Monday–Sunday week and starts over every Monday
  const week = useMemo(() => (feed.status === 'ready' ? weekRange(feed.fetchedAt) : null), [feed])
  const weekCategories = useMemo(() => {
    if (!week) return []
    const startKey = toDayKey(week.start)
    const endKey = toDayKey(week.end)
    return totalByCategory(entries.filter((entry) => entry.date >= startKey && entry.date <= endKey))
  }, [entries, week])

  const totalMinutes = days.reduce((sum, day) => sum + day.minutes, 0)
  const maxCategoryMinutes = weekCategories[0]?.minutes ?? 0
  // The daily log is a rolling window (today and the 6 days before it), unlike the weekly breakdown
  const recentDays = useMemo(() => {
    if (feed.status !== 'ready') return []
    const startKey = windowStartKey(feed.fetchedAt, RECENT_DAY_COUNT)
    return days.filter((day) => day.date >= startKey)
  }, [days, feed])
  const visibleDays = isExpanded ? recentDays : recentDays.slice(0, INITIAL_VISIBLE_DAYS)

  const locale = lang === 'ja' ? 'ja-JP' : 'en-US'
  const border = isDark ? 'border-night-border' : 'border-cream-border'
  const rule = isDark ? 'divide-night-rule' : 'divide-cream-line'
  const muted = 'text-gray-500'
  const strong = isDark ? 'text-ivory' : 'text-gray-900'
  const label = `text-[10px] uppercase tracking-[0.2em] ${muted}`

  const stats = [
    { label: ui.studyLogTotal, value: formatDuration(totalMinutes), title: formatExactMinutes(totalMinutes), accent: true },
    { label: ui.studyLogSessions, value: String(entries.length), title: undefined, accent: false },
    { label: ui.studyLogDays, value: String(days.length), title: undefined, accent: false },
  ]

  return (
    <section
      id="study-log"
      className={`relative z-10 w-full py-24 md:py-32 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-night-divider' : 'border-cream-divider'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          isDark={isDark}
          badge={ui.studyLogBadge}
          heading={ui.studyLogHeading}
          lead={ui.studyLogLead}
          badgeTrackingClass="tracking-[0.22em]"
          headingClassName="tracking-tight"
        />

        <div
          className={`border font-mono text-sm transition-colors duration-500 ${border} ${
            isDark ? 'bg-night-panel' : 'bg-white/60'
          }`}
        >
          {/* Header bar */}
          <div className={`flex items-center justify-between gap-4 px-5 py-3 border-b ${border}`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <Terminal className="w-4 h-4 shrink-0 text-rust" strokeWidth={1.75} aria-hidden="true" />
              <span className={`font-sans text-xs tracking-wide truncate ${strong}`}>{ui.studyLogSource}</span>
            </div>
            <span className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] ${muted}`}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  feed.status === 'ready' ? 'bg-rust' : feed.status === 'error' ? 'bg-gray-400' : 'bg-gray-400 animate-pulse'
                }`}
              />
              {feed.status === 'ready' ? 'live' : feed.status}
            </span>
          </div>

          {feed.status === 'loading' && <p className={`px-5 py-16 text-center ${muted}`}>{ui.studyLogLoading}</p>}
          {feed.status === 'error' && <p className={`px-5 py-16 text-center ${muted}`}>{ui.studyLogError}</p>}
          {feed.status === 'ready' && entries.length === 0 && (
            <p className={`px-5 py-16 text-center ${muted}`}>{ui.studyLogEmpty}</p>
          )}

          {entries.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-[19rem_1fr]">
              {/* Summary: headline stats + this week's time share per category */}
              <aside className={`border-b lg:border-b-0 lg:border-r ${border}`}>
                <dl className={`grid grid-cols-3 divide-x border-b ${border} ${rule}`}>
                  {stats.map((stat) => (
                    <div key={stat.label} className="px-4 py-5 space-y-1.5">
                      <dt className={label}>{stat.label}</dt>
                      <dd
                        title={stat.title}
                        className={`font-serif text-2xl tabular-nums ${stat.accent ? 'text-rust' : strong}`}
                      >
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="px-5 py-5 space-y-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className={label}>{ui.studyLogByCategory}</h3>
                    {week && (
                      <span className={`text-[10px] tabular-nums ${muted}`}>
                        {formatMonthDay(week.start)} – {formatMonthDay(week.end)}
                      </span>
                    )}
                  </div>

                  {weekCategories.length === 0 ? (
                    <p className={`text-xs ${muted}`}>{ui.studyLogWeekEmpty}</p>
                  ) : (
                    <ul className="space-y-3">
                      {weekCategories.map((category) => (
                        <li
                          key={category.code}
                          title={`${category.name} · ${formatExactMinutes(category.minutes)}`}
                          className="space-y-1.5"
                        >
                          <div className="flex items-baseline justify-between gap-3 text-xs">
                            <span className="flex items-baseline gap-2">
                              <span className={`tracking-wider ${strong}`}>{category.code}</span>
                              <span className={`text-[10px] ${muted}`}>{formatSessions(category.sessions, lang)}</span>
                            </span>
                            <span className={`tabular-nums ${muted}`}>{formatDuration(category.minutes)}</span>
                          </div>
                          <div className={`h-1 ${isDark ? 'bg-night-chip' : 'bg-cream-line'}`}>
                            <div
                              className="h-full"
                              style={{
                                width: `${(category.minutes / maxCategoryMinutes) * 100}%`,
                                backgroundColor: category.color,
                              }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </aside>

              {/* Daily log: one row per day, one chip per category with its session count */}
              <div>
                {recentDays.length === 0 && (
                  <p className={`px-5 py-16 text-center text-xs ${muted}`}>{ui.studyLogRecentEmpty}</p>
                )}
                <ol className={`divide-y ${rule}`}>
                  {visibleDays.map((day) => {
                    const date = parseDay(day.date)
                    return (
                      <li key={day.date} className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[5.5rem_1fr] gap-4 px-5 py-5">
                        <div className="space-y-1">
                          <time dateTime={day.date} className={`block font-serif text-2xl leading-none tabular-nums ${strong}`}>
                            {formatMonthDay(date)}
                          </time>
                          <span className={`block ${label}`}>
                            {date.toLocaleDateString(locale, { weekday: 'short' })}
                          </span>
                          <span
                            title={formatExactMinutes(day.minutes)}
                            className={`flex items-center gap-1 pt-1 text-xs tabular-nums ${muted}`}
                          >
                            <Clock className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                            {formatDuration(day.minutes)}
                          </span>
                        </div>

                        <ul className="flex flex-wrap content-start gap-1.5">
                          {day.categories.map((category) => (
                            <li
                              key={category.code}
                              title={[
                                `${category.name} · ${formatSessions(category.sessions, lang)} · ${formatExactMinutes(category.minutes)}`,
                                ...category.topics,
                              ].join('\n')}
                              className={`inline-flex items-stretch border text-[11px] transition-colors ${border} ${
                                isDark ? 'hover:bg-night-hover' : 'hover:bg-cream-surface/60'
                              }`}
                            >
                              <span className="inline-flex items-center gap-1.5 px-2 py-1">
                                <span
                                  className="w-2 h-2 shrink-0"
                                  style={{ backgroundColor: category.color }}
                                  aria-hidden="true"
                                />
                                <span className={`tracking-wider ${strong}`}>{category.code}</span>
                                <span className={`tabular-nums ${muted}`}>{formatDuration(category.minutes)}</span>
                              </span>
                              {category.sessions > 1 && (
                                <span
                                  className={`inline-flex items-center px-1.5 border-l tabular-nums ${border} ${muted}`}
                                  aria-label={formatSessions(category.sessions, lang)}
                                >
                                  ×{category.sessions}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                    )
                  })}
                </ol>

                {recentDays.length > INITIAL_VISIBLE_DAYS && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    aria-expanded={isExpanded}
                    className={`w-full flex items-center justify-center gap-2 px-5 py-3 border-t text-[11px] uppercase tracking-[0.18em] transition-colors cursor-pointer ${border} ${
                      isDark ? 'text-apricot hover:bg-night-hover' : 'text-rust hover:bg-cream-surface/60'
                    }`}
                  >
                    <span>{isExpanded ? ui.showLess : ui.readMore}</span>
                    <ChevronDownIcon
                      className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

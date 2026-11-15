import { useMemo, useState } from 'react'
import { sectionPage } from '../../data/navigation'
import type { Language, UiText } from '../../data/translations'
import {
  RECENT_DAY_COUNT,
  formatDuration,
  formatExactMinutes,
  formatMonthDay,
  formatSessions,
  groupByDay,
  minutesInWeek,
  minutesOnDay,
  parseDay,
  percentChange,
  toDayKey,
  totalByCategory,
  useStudyLogFeed,
  weekRange,
  windowStartKey,
} from '../../lib/studyLog'
import { usePrintEdition } from '../../hooks/usePrintEdition'
import { ChevronDownIcon } from '../common/icons'
import PageHead from '../newspaper/PageHead'

const INITIAL_VISIBLE_DAYS = 3

interface StudyLogFeedProps {
  isDark: boolean
  ui: UiText
  lang: Language
}

export default function StudyLogFeed({ isDark, ui, lang }: StudyLogFeedProps) {
  const feed = useStudyLogFeed()
  const [isExpanded, setIsExpanded] = useState(false)
  // The print edition carries the whole week's log
  const { isPrinting } = usePrintEdition()

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
  const weekMinutes = weekCategories.reduce((sum, category) => sum + category.minutes, 0)
  const maxCategoryMinutes = weekCategories[0]?.minutes ?? 0
  // The daily log is a rolling window (today and the 6 days before it), unlike the weekly breakdown
  const recentDays = useMemo(() => {
    if (feed.status !== 'ready') return []
    const startKey = windowStartKey(feed.fetchedAt, RECENT_DAY_COUNT)
    return days.filter((day) => day.date >= startKey)
  }, [days, feed])
  const visibleDays = isExpanded || isPrinting ? recentDays : recentDays.slice(0, INITIAL_VISIBLE_DAYS)

  // One bar per calendar day in the rolling window, including days with nothing logged
  const chartDays = useMemo(() => {
    if (feed.status !== 'ready') return []
    const minutesByDay = new Map(days.map((day) => [day.date, day.minutes]))
    const today = feed.fetchedAt
    return Array.from({ length: RECENT_DAY_COUNT }, (_, i) => {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (RECENT_DAY_COUNT - 1 - i))
      const key = toDayKey(date)
      return { key, date, minutes: minutesByDay.get(key) ?? 0, isToday: i === RECENT_DAY_COUNT - 1 }
    })
  }, [days, feed])
  const maxChartMinutes = Math.max(1, ...chartDays.map((day) => day.minutes))

  const locale = lang === 'ja' ? 'ja-JP' : 'en-US'
  const rule = isDark ? 'border-night-border' : 'border-cream-border'
  const muted = isDark ? 'text-gray-400' : 'text-gray-500'
  const strong = isDark ? 'text-ivory' : 'text-ink'
  const body = isDark ? 'text-stone' : 'text-gray-700'
  const ink = isDark ? 'bg-linen/60' : 'bg-ink/55'
  const hatchInk = isDark ? 'text-linen/70' : 'text-ink/75'
  const label = `font-sans text-[11px] uppercase tracking-[0.16em] ${muted}`

  // Market-table style change against last week (null when last week has nothing to compare with)
  const lastWeekMinutes = feed.status === 'ready' ? minutesInWeek(entries, feed.fetchedAt, 1) : 0
  const weekChange = percentChange(weekMinutes, lastWeekMinutes)
  const weekNote =
    weekChange === null ? undefined : `${weekChange >= 0 ? '▲' : '▼'} ${Math.abs(weekChange)}% ${ui.vsLastWeek}`

  const stats = [
    {
      label: ui.studyLogThisWeek,
      value: formatDuration(weekMinutes),
      title: formatExactMinutes(weekMinutes),
      accent: true,
      note: weekNote,
    },
    { label: ui.studyLogTotal, value: formatDuration(totalMinutes), title: formatExactMinutes(totalMinutes), accent: false },
    { label: ui.studyLogSessions, value: String(entries.length), title: undefined, accent: false },
    { label: ui.studyLogDays, value: String(days.length), title: undefined, accent: false },
  ]

  return (
    <section
      id="study-log"
      className={`relative w-full py-20 md:py-28 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-night-divider' : 'border-cream-divider'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <PageHead
          isDark={isDark}
          page={sectionPage('study-log')}
          section={ui.navStudyLog}
          kicker={ui.studyLogBadge}
          heading={ui.studyLogHeading}
          deck={ui.studyLogLead}
        />

        {/* Statistics box, set like the figures page of a newspaper */}
        <div className={`border-y-[3px] border-double transition-colors duration-500 ${rule}`}>
          {/* Source line */}
          <div className={`flex items-center justify-between gap-4 py-3 border-b ${rule}`}>
            <span className={`font-sans text-xs truncate ${body}`}>{ui.studyLogSource}</span>
            <span className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] ${muted}`}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  feed.status === 'ready' ? 'bg-accent' : feed.status === 'error' ? 'bg-gray-400' : 'bg-gray-400 animate-pulse'
                }`}
              />
              {feed.status === 'ready' ? 'live' : feed.status}
            </span>
          </div>

          {feed.status === 'loading' && <p className={`py-16 text-center font-sans text-sm ${muted}`}>{ui.studyLogLoading}</p>}
          {feed.status === 'error' && <p className={`py-16 text-center font-sans text-sm ${muted}`}>{ui.studyLogError}</p>}
          {feed.status === 'ready' && entries.length === 0 && (
            <p className={`py-16 text-center font-sans text-sm ${muted}`}>{ui.studyLogEmpty}</p>
          )}

          {entries.length > 0 && (
            <>
              {/* Headline figures */}
              <dl className={`grid grid-cols-2 md:grid-cols-4 border-b ${rule}`}>
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`py-6 md:py-8 space-y-2 ${rule} ${index % 2 === 1 ? 'border-l pl-5 md:pl-8' : 'md:pl-8 first:md:pl-0'} ${
                      index >= 2 ? 'max-md:border-t md:border-l' : ''
                    }`}
                  >
                    <dt className={label}>{stat.label}</dt>
                    <dd
                      title={stat.title}
                      className={`font-serif font-light text-4xl md:text-5xl leading-none tabular-nums tracking-tight ${
                        stat.accent ? 'text-accent' : strong
                      }`}
                    >
                      {stat.value}
                    </dd>
                    {'note' in stat && stat.note && (
                      <dd className={`font-mono text-[11px] tabular-nums ${muted}`}>{stat.note}</dd>
                    )}
                  </div>
                ))}
              </dl>

              <div className={`grid grid-cols-1 lg:grid-cols-12 border-b ${rule}`}>
                {/* Last 7 days: one inked bar per day, today in the accent red */}
                <figure className="lg:col-span-7 py-8 lg:pr-10">
                  <figcaption className={`${label} mb-6`}>{ui.studyLogLast7Days}</figcaption>
                  <ol className={`grid grid-cols-7 gap-2 sm:gap-4 h-44 items-end border-b ${rule}`}>
                    {chartDays.map((day) => (
                      <li key={day.key} className="h-full flex flex-col justify-end items-center gap-1.5" title={formatExactMinutes(day.minutes)}>
                        <span className={`font-mono text-[10px] sm:text-[11px] tabular-nums ${day.isToday ? 'text-accent' : muted}`}>
                          {day.minutes > 0 ? formatDuration(day.minutes) : '—'}
                        </span>
                        <span
                          className={`w-full max-w-9 ${day.isToday ? 'bg-accent' : `hatch ${hatchInk}`}`}
                          style={{ height: `${(day.minutes / maxChartMinutes) * 100}%`, minHeight: day.minutes > 0 ? 2 : 0 }}
                        />
                      </li>
                    ))}
                  </ol>
                  <ol className="grid grid-cols-7 gap-2 sm:gap-4 pt-2">
                    {chartDays.map((day) => (
                      <li key={day.key} className="text-center leading-tight">
                        <span className={`block font-sans text-[11px] ${day.isToday ? 'text-accent font-medium' : strong}`}>
                          {day.isToday ? ui.studyLogToday : day.date.toLocaleDateString(locale, { weekday: 'short' })}
                        </span>
                        <span className={`block font-mono text-[10px] tabular-nums ${muted}`}>{formatMonthDay(day.date)}</span>
                      </li>
                    ))}
                  </ol>
                </figure>

                {/* This week by category: leader-dotted table */}
                <div className={`lg:col-span-5 py-8 lg:pl-10 border-t lg:border-t-0 lg:border-l ${rule}`}>
                  <div className="flex items-baseline justify-between gap-3 mb-5">
                    <h3 className={label}>{ui.studyLogByCategory}</h3>
                    {week && (
                      <span className={`font-mono text-[11px] tabular-nums ${muted}`}>
                        {formatMonthDay(week.start)} – {formatMonthDay(week.end)}
                      </span>
                    )}
                  </div>

                  {weekCategories.length === 0 ? (
                    <p className={`font-sans text-sm ${muted}`}>{ui.studyLogWeekEmpty}</p>
                  ) : (
                    <ul className="space-y-3">
                      {weekCategories.map((category) => (
                        <li key={category.code} title={`${category.name} · ${formatExactMinutes(category.minutes)}`}>
                          <div className={`flex items-baseline font-mono text-xs ${strong}`}>
                            <span className="tracking-wider">{category.code}</span>
                            <span className={`ml-2 font-sans text-[11px] ${muted}`}>{formatSessions(category.sessions, lang)}</span>
                            <span className="leader" aria-hidden="true" />
                            <span className="tabular-nums">{formatDuration(category.minutes)}</span>
                          </div>
                          <div className="mt-1.5 h-[2px]">
                            <div
                              className={`h-full ${ink}`}
                              style={{ width: `${(category.minutes / maxCategoryMinutes) * 100}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Daily log */}
              <div className="pt-8">
                <h3 className={`${label} mb-2`}>{ui.studyLogDailyLog}</h3>
                {recentDays.length === 0 && <p className={`py-10 font-sans text-sm ${muted}`}>{ui.studyLogRecentEmpty}</p>}
                <ol className={`divide-y ${isDark ? 'divide-night-border' : 'divide-cream-border'}`}>
                  {visibleDays.map((day) => {
                    const date = parseDay(day.date)
                    // Change against the calendar day before (zero if nothing was logged that day)
                    const previousMinutes = minutesOnDay(
                      entries,
                      new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
                    )
                    const delta = day.minutes - previousMinutes
                    return (
                      <li key={day.date} className="grid grid-cols-[4.75rem_1fr] sm:grid-cols-[7rem_7.5rem_1fr] gap-x-4 sm:gap-x-6 gap-y-2 py-5">
                        <div className="leading-none">
                          <time dateTime={day.date} className={`block font-serif text-2xl tabular-nums ${strong}`}>
                            {formatMonthDay(date)}
                          </time>
                          <span className={`block mt-1.5 ${label}`}>
                            {date.toLocaleDateString(locale, { weekday: 'short' })}
                          </span>
                        </div>

                        <span
                          title={formatExactMinutes(day.minutes)}
                          className={`font-mono text-sm tabular-nums pt-1 ${strong} max-sm:col-start-2 max-sm:row-start-1`}
                        >
                          {formatDuration(day.minutes)}
                          {delta !== 0 && (
                            <span className={`ml-2 text-[11px] ${delta > 0 ? ('text-accent') : muted}`}>
                              {delta > 0 ? '▲' : '▼'}
                              {formatDuration(Math.abs(delta))}
                            </span>
                          )}
                        </span>

                        <p className={`min-w-0 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs leading-relaxed sm:pt-1.5 ${body} max-sm:col-start-2`}>
                          {day.categories.map((category) => (
                            <span
                              key={category.code}
                              title={[
                                `${category.name} · ${formatSessions(category.sessions, lang)} · ${formatExactMinutes(category.minutes)}`,
                                ...category.topics,
                              ].join('\n')}
                              className="whitespace-nowrap"
                            >
                              <span className={strong}>{category.code}</span> {formatDuration(category.minutes)}
                              {category.sessions > 1 && <span className={muted}> ×{category.sessions}</span>}
                            </span>
                          ))}
                        </p>
                      </li>
                    )
                  })}
                </ol>

                {recentDays.length > INITIAL_VISIBLE_DAYS && (
                  <button
                    data-print="hide"
                    type="button"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    aria-expanded={isExpanded}
                    className={`w-full flex items-center justify-center gap-2 py-4 border-t font-sans text-[11px] uppercase tracking-[0.16em] transition-colors cursor-pointer ${rule} ${
                      isDark ? 'text-accent hover:text-ivory' : 'text-accent hover:text-ink'
                    }`}
                  >
                    <span>{isExpanded ? ui.showLess : ui.readMore}</span>
                    <ChevronDownIcon
                      className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

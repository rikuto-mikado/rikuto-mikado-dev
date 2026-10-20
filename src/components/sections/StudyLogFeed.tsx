import { Clock, Terminal } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Language, UiText } from '../../data/translations'
import SectionHeader from '../common/SectionHeader'

const FEED_URL = 'https://typbox-dev.onrender.com/api/portfolio/feed/'

interface StudyLogEntry {
  id?: number | string
  date: string
  category: {
    code: string
    color: string
  }
  topic: string
  duration_minutes: number
}

type FeedState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; entries: StudyLogEntry[] }

interface StudyLogFeedProps {
  isDark: boolean
  ui: UiText
  lang: Language
}

function formatDate(value: string, lang: Language) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`
}

export default function StudyLogFeed({ isDark, ui, lang }: StudyLogFeedProps) {
  const [feed, setFeed] = useState<FeedState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    fetch(FEED_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<StudyLogEntry[]>
      })
      .then((entries) => setFeed({ status: 'ready', entries }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        console.error('Study log feed failed:', err)
        setFeed({ status: 'error' })
      })

    return () => controller.abort()
  }, [])

  const entries = feed.status === 'ready' ? feed.entries : []
  const totalMinutes = entries.reduce((sum, entry) => sum + entry.duration_minutes, 0)

  const border = isDark ? 'border-night-border' : 'border-cream-border'
  const rule = isDark ? 'divide-night-rule' : 'divide-cream-line'
  const muted = 'text-gray-500'
  const strong = isDark ? 'text-ivory' : 'text-gray-900'

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
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-rust" strokeWidth={1.75} aria-hidden="true" />
              <span className={`text-xs tracking-wider ${strong}`}>typbox://portfolio/feed</span>
            </div>
            <span className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] ${muted}`}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  feed.status === 'ready' ? 'bg-rust' : feed.status === 'error' ? 'bg-gray-400' : 'bg-gray-400 animate-pulse'
                }`}
              />
              {feed.status === 'ready' ? `${entries.length} logs` : feed.status}
            </span>
          </div>

          {/* Column labels (desktop) */}
          <div
            className={`hidden md:grid grid-cols-[8rem_7rem_1fr_7rem] gap-6 px-5 py-2.5 border-b text-[10px] uppercase tracking-[0.2em] ${border} ${muted}`}
          >
            <span>Date</span>
            <span>Category</span>
            <span>Topic</span>
            <span className="text-right">Duration</span>
          </div>

          {feed.status === 'loading' && <p className={`px-5 py-10 text-center ${muted}`}>{ui.studyLogLoading}</p>}
          {feed.status === 'error' && <p className={`px-5 py-10 text-center ${muted}`}>{ui.studyLogError}</p>}
          {feed.status === 'ready' && entries.length === 0 && (
            <p className={`px-5 py-10 text-center ${muted}`}>{ui.studyLogEmpty}</p>
          )}

          {entries.length > 0 && (
            <ul className={`divide-y ${rule}`}>
              {entries.map((entry, index) => (
                <li
                  key={entry.id ?? index}
                  className={`grid grid-cols-[1fr_auto] md:grid-cols-[8rem_7rem_1fr_7rem] items-center gap-x-6 gap-y-1.5 px-5 py-3.5 transition-colors ${
                    isDark ? 'hover:bg-night-hover' : 'hover:bg-cream-surface/50'
                  }`}
                >
                  <time dateTime={entry.date} className={`text-xs tabular-nums ${muted}`}>
                    {formatDate(entry.date, lang)}
                  </time>
                  <span className={`flex items-center gap-2 text-xs tracking-wider justify-self-end md:justify-self-auto ${strong}`}>
                    <span
                      className={`w-2.5 h-2.5 shrink-0 border ${isDark ? 'border-white/20' : 'border-black/10'}`}
                      style={{ backgroundColor: entry.category.color }}
                      aria-hidden="true"
                    />
                    {entry.category.code}
                  </span>
                  <span className={`col-span-2 md:col-span-1 font-serif text-base truncate ${strong}`}>
                    {entry.topic}
                  </span>
                  <span
                    className={`col-span-2 md:col-span-1 flex items-center md:justify-end gap-1.5 text-xs tabular-nums ${muted}`}
                  >
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                    {formatDuration(entry.duration_minutes)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Footer total */}
          {entries.length > 0 && (
            <div
              className={`flex items-center justify-between px-5 py-3 border-t text-[11px] uppercase tracking-[0.18em] ${border} ${muted}`}
            >
              <span>{ui.studyLogTotal}</span>
              <span className="text-rust font-semibold tabular-nums">{formatDuration(totalMinutes)}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

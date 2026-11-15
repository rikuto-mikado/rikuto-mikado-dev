import { useEffect, useState, type ReactNode } from 'react'
import { sectionPage } from '../../data/navigation'
import type { CrossroadsRoute, TimelineItem, UiText } from '../../data/translations'
import { scrollToTarget } from '../../lib/smoothScroll'
import PageHead from '../newspaper/PageHead'

interface TrajectorySectionProps {
  isDark: boolean
  ui: UiText
  events: TimelineItem[]
  routes: CrossroadsRoute[]
}

type StatusTone = 'current' | 'upcoming' | 'muted'

/** Status marker: small dot + mono label. One accent hue, varied by fill, instead of a rainbow of pills. */
function StatusTag({ tone, isDark, children }: { tone: StatusTone; isDark: boolean; children: ReactNode }) {
  const dot =
    tone === 'current'
      ? 'bg-accent'
      : tone === 'upcoming'
        ? 'border border-accent'
        : isDark
          ? 'border border-gray-500'
          : 'border border-gray-400'
  const text = tone === 'muted' ? (isDark ? 'text-gray-400' : 'text-gray-500') : 'text-accent'

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider ${text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {children}
    </span>
  )
}

const periodClass = (isDark: boolean) =>
  `font-mono text-xs tabular-nums transition-colors duration-500 ${isDark ? 'text-linen' : 'text-ink'}`

/** Marker sitting on the vertical rail beside each entry. */
function RailDot({ isDark, filled = false }: { isDark: boolean; filled?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -left-[calc(2rem+4.5px)] sm:-left-[calc(2.5rem+4.5px)] top-1.5 w-2 h-2 rounded-full ring-4 transition-colors duration-500 ${
        filled ? 'bg-accent' : isDark ? 'bg-night-border' : 'bg-cream-border'
      } ${isDark ? 'ring-night' : 'ring-paper'}`}
    />
  )
}

function TimelineEntry({
  item,
  isDark,
  ui,
  anchorId,
}: {
  item: TimelineItem
  isDark: boolean
  ui: UiText
  anchorId: string
}) {
  // Tentative entries keep their header legible above the fog and blur only the body
  const fogged = item.isTentative ? 'blur-[3px] opacity-60 select-none' : ''

  return (
    <div id={anchorId} data-chronology className="relative group scroll-mt-28">
      <RailDot isDark={isDark} filled={item.isCurrent} />

      <div className="space-y-3">
        <div className="relative z-10 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className={periodClass(isDark)}>{item.period}</span>
          {item.duration && (
            <span className={`text-xs font-sans transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              • {item.duration}
            </span>
          )}
          {item.location && (
            <span className={`text-xs font-sans transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              • {item.location}
            </span>
          )}
          {item.isCurrent && (
            <StatusTag tone="current" isDark={isDark}>
              {ui.statusCurrent}
            </StatusTag>
          )}
          {item.isTentative ? (
            <StatusTag tone="muted" isDark={isDark}>
              {ui.statusTentative}
            </StatusTag>
          ) : (
            item.isUpcoming && (
              <StatusTag tone="upcoming" isDark={isDark}>
                {ui.statusRoadmap}
              </StatusTag>
            )
          )}
        </div>

        <div className={`space-y-2 transition-[filter,opacity] duration-500 ${fogged}`}>
          <h3
            className={`font-serif text-2xl md:text-[1.75rem] font-normal tracking-tight leading-snug text-balance transition-colors duration-500 ${
              isDark ? 'text-ivory' : 'text-ink'
            }`}
          >
            {item.title}
          </h3>

          <p
            className={`news-body font-news text-base md:text-[17px] leading-[1.7] transition-colors duration-500 ${
              isDark ? 'text-stone' : 'text-gray-700'
            }`}
          >
            {item.narrative}
          </p>

          {item.details && item.details.length > 0 && (
            <ul className="mt-3.5 space-y-2 font-news text-[15px] pl-0.5">
              {item.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="mt-[0.6em] shrink-0 w-2.5 border-t border-accent" />
                  <span className={`leading-relaxed ${isDark ? 'text-stone' : 'text-gray-700'}`}>{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

function FogBank({ isDark, children }: { isDark: boolean; children: ReactNode }) {
  return (
    <div className="relative">
      <div className="space-y-14">{children}</div>
      <div className={`fog ${isDark ? 'fog-dark' : ''}`} aria-hidden="true" />
    </div>
  )
}

const CROSSROADS_ID = 'trajectory-crossroads'

function CrossroadsEntry({ isDark, ui, routes }: { isDark: boolean; ui: UiText; routes: CrossroadsRoute[] }) {
  const mutedText = isDark ? 'text-gray-400' : 'text-gray-500'

  return (
    <div id={CROSSROADS_ID} data-chronology className="relative scroll-mt-28">
      <RailDot isDark={isDark} />

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className={periodClass(isDark)}>{ui.crossroadsPeriod}</span>
          <StatusTag tone="upcoming" isDark={isDark}>
            {ui.statusConsidering}
          </StatusTag>
        </div>
        <h3
          className={`font-serif text-2xl md:text-[1.75rem] font-normal tracking-tight leading-snug text-balance transition-colors duration-500 ${
            isDark ? 'text-ivory' : 'text-ink'
          }`}
        >
          {ui.crossroadsTitle}
        </h3>
        <p
          className={`news-body font-news text-base md:text-[17px] leading-[1.7] transition-colors duration-500 ${
            isDark ? 'text-stone' : 'text-gray-700'
          }`}
        >
          {ui.crossroadsLead}
        </p>
      </div>

      <div className="relative mt-8 sm:pt-6">
        {/* One rail splitting into three branches */}
        <div
          className={`hidden sm:block absolute top-0 left-[16.66%] right-[16.66%] border-t ${
            isDark ? 'border-night-border' : 'border-cream-border'
          }`}
        ></div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {routes.map((route) => (
            <div
              key={route.id}
              className={`relative rounded-md border p-4 sm:p-5 transition-colors duration-500 ${
                isDark ? 'border-night-border' : 'border-cream-border'
              }`}
            >
              <div
                className={`hidden sm:block absolute -top-6 left-1/2 h-6 border-l ${
                  isDark ? 'border-night-border' : 'border-cream-border'
                }`}
              ></div>

              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full border font-mono text-xs border-accent text-accent"
                >
                  {route.id}
                </span>
                <h4
                  className={`font-sans text-sm font-semibold leading-snug transition-colors duration-500 ${
                    isDark ? 'text-ivory' : 'text-gray-900'
                  }`}
                >
                  {route.title}
                </h4>
              </div>

              <p className={`font-sans text-[11px] mb-3 ${mutedText}`}>{route.timing}</p>

              <ul className="space-y-1.5 font-sans text-xs">
                {route.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-[7px] shrink-0 w-2 border-t border-accent" />
                    <span className={`leading-relaxed ${isDark ? 'text-stone' : 'text-gray-700'}`}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className={`mt-6 text-center font-serif italic text-sm transition-colors duration-500 ${mutedText}`}>
        {ui.crossroadsFooter}
      </p>
    </div>
  )
}

interface ChronologyItem {
  id: string
  period: string
  title: string
  tone: StatusTone | 'past'
}

/**
 * Sticky "Chronology" index beside the timeline (desktop): every entry at a glance, the one being
 * read highlighted, each line a jump link.
 */
function ChronologyIndex({
  isDark,
  ui,
  items,
  activeId,
}: {
  isDark: boolean
  ui: UiText
  items: ChronologyItem[]
  activeId: string | null
}) {
  const muted = isDark ? 'text-gray-400' : 'text-gray-500'

  return (
    <nav
      aria-label={ui.chronologyLabel}
      className="hidden lg:block lg:col-span-3 self-start sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto [scrollbar-width:none]"
    >
      <h3
        className={`pb-2 mb-1 border-b-[3px] font-sans text-[11px] uppercase tracking-[0.18em] font-semibold ${
          isDark ? 'border-linen/80 text-linen' : 'border-ink text-ink'
        }`}
      >
        {ui.chronologyLabel}
      </h3>
      <ol className={`divide-y ${isDark ? 'divide-night-border' : 'divide-cream-border'}`}>
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-current={isActive ? 'location' : undefined}
                onClick={() => {
                  const target = document.getElementById(item.id)
                  if (target) scrollToTarget(target)
                }}
                className="group relative w-full text-left py-2 pl-4 cursor-pointer"
              >
                {/* Active marker */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-2.5 bottom-2.5 w-[3px] transition-colors duration-300 ${
                    isActive ? 'bg-accent' : 'bg-transparent'
                  }`}
                />
                <span
                  className={`block font-mono text-[11px] tabular-nums transition-colors ${
                    isActive ? 'text-accent' : muted
                  }`}
                >
                  {item.period}
                  {item.tone === 'current' && <span className="ml-2">●</span>}
                </span>
                <span
                  className={`block mt-0.5 font-serif text-[14px] leading-snug truncate transition-colors ${
                    isActive
                      ? isDark
                        ? 'text-ivory'
                        : 'text-ink'
                      : item.tone === 'muted'
                        ? `${muted} italic`
                        : isDark
                          ? 'text-stone group-hover:text-ivory'
                          : 'text-gray-600 group-hover:text-ink'
                  }`}
                >
                  {item.title}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default function TrajectorySection({ isDark, ui, events, routes }: TrajectorySectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  // Read oldest → newest (the data is stored newest first). Consecutive tentative entries share one
  // fog bank, and the crossroads opens straight after the current entry, before the plans beyond it.
  const blocks: ReactNode[] = []
  const chronology: ChronologyItem[] = []
  let foggedEntries: ReactNode[] = []

  const flushFog = () => {
    if (foggedEntries.length === 0) return
    blocks.push(
      <FogBank key={`fog-${blocks.length}`} isDark={isDark}>
        {foggedEntries}
      </FogBank>,
    )
    foggedEntries = []
  }

  const oldestFirst = events.map((item, index) => ({ item, index })).reverse()

  oldestFirst.forEach(({ item, index }) => {
    const anchorId = `trajectory-entry-${index}`
    const entry = <TimelineEntry key={index} item={item} isDark={isDark} ui={ui} anchorId={anchorId} />
    const tone: ChronologyItem['tone'] = item.isTentative
      ? 'muted'
      : item.isCurrent
        ? 'current'
        : item.isUpcoming
          ? 'upcoming'
          : 'past'
    if (item.isTentative) {
      foggedEntries.push(entry)
      chronology.push({ id: anchorId, period: item.period, title: item.title, tone })
      return
    }
    flushFog()
    blocks.push(entry)
    chronology.push({ id: anchorId, period: item.period, title: item.title, tone })
    if (item.isCurrent && routes.length > 0) {
      blocks.push(<CrossroadsEntry key="crossroads" isDark={isDark} ui={ui} routes={routes} />)
      chronology.push({ id: CROSSROADS_ID, period: ui.crossroadsPeriod, title: ui.crossroadsTitle, tone: 'upcoming' })
    }
  })
  flushFog()

  // Highlight the entry crossing the upper-middle of the viewport
  useEffect(() => {
    const targets = [...document.querySelectorAll<HTMLElement>('#trajectory [data-chronology]')]
    if (targets.length === 0) return
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (record.isIntersecting) setActiveId(record.target.id)
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [events, routes])

  return (
    <section
      id="trajectory"
      className={`relative w-full py-20 md:py-28 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-night-divider' : 'border-cream-divider'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <PageHead
          isDark={isDark}
          page={sectionPage('trajectory')}
          section={ui.navTrajectory}
          kicker={ui.trajectoryBadge}
          heading={ui.trajectoryHeading}
          deck={ui.trajectoryLead}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-10">
          <ChronologyIndex isDark={isDark} ui={ui} items={chronology} activeId={activeId} />

          <div
            className={`relative lg:col-span-9 border-l space-y-14 pl-8 sm:pl-10 py-2 transition-colors duration-500 ${
              isDark ? 'border-night-border' : 'border-cream-border'
            }`}
          >
            {blocks}
          </div>
        </div>
      </div>
    </section>
  )
}

import type { ReactNode } from 'react'
import type { CrossroadsRoute, TimelineItem, UiText } from '../../data/translations'
import SectionHeader from '../common/SectionHeader'

interface TrajectorySectionProps {
  isDark: boolean
  ui: UiText
  events: TimelineItem[]
  routes: CrossroadsRoute[]
}

const statusPillBase =
  'inline-block text-xs font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors duration-500'

const periodChipClass = (isDark: boolean) =>
  `inline-block text-xs font-sans font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full transition-colors duration-500 ${
    isDark ? 'text-apricot bg-night-chip border border-night-border' : 'text-rust bg-[#eae4da] border border-cream-border'
  }`

function RailConnector() {
  // Horizontal dashed connector to the vertical rail
  return <div className="absolute -left-[34px] top-3.5 w-8 border-t-2 border-dashed border-sand"></div>
}

function TimelineEntry({ item, isDark, ui }: { item: TimelineItem; isDark: boolean; ui: UiText }) {
  // Tentative entries keep their header legible above the fog and blur only the body
  const fogged = item.isTentative ? 'blur-[3px] opacity-60 select-none' : ''

  return (
    <div className="relative group">
      <RailConnector />

      <div className="space-y-2">
        <div className="relative z-10 flex flex-wrap items-center gap-2">
          <span className={periodChipClass(isDark)}>{item.period}</span>
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
            <span
              className={`${statusPillBase} ${
                isDark ? 'text-emerald-300 bg-emerald-950/70 border border-emerald-800/60' : 'text-emerald-800 bg-emerald-100'
              }`}
            >
              {ui.statusCurrent}
            </span>
          )}
          {item.isTentative ? (
            <span
              className={`${statusPillBase} ${
                isDark ? 'text-stone bg-night-chip border border-night-border' : 'text-gray-600 bg-gray-200'
              }`}
            >
              {ui.statusTentative}
            </span>
          ) : (
            item.isUpcoming && (
              <span
                className={`${statusPillBase} ${
                  isDark ? 'text-amber-300 bg-amber-950/70 border border-amber-800/60' : 'text-amber-800 bg-amber-100'
                }`}
              >
                {ui.statusRoadmap}
              </span>
            )
          )}
        </div>

        <div className={`space-y-2 transition-[filter,opacity] duration-500 ${fogged}`}>
          <h3
            className={`font-serif italic text-xl md:text-2xl font-semibold leading-snug transition-colors duration-500 ${
              isDark ? 'text-ivory' : 'text-gray-900'
            }`}
          >
            {item.title}
          </h3>

          <p
            className={`font-sans text-sm md:text-base leading-relaxed font-light transition-colors duration-500 ${
              isDark ? 'text-stone' : 'text-gray-700'
            }`}
          >
            {item.narrative}
          </p>

          {item.details && item.details.length > 0 && (
            <ul className="mt-3.5 space-y-2 font-sans text-xs sm:text-sm pl-0.5">
              {item.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${isDark ? 'bg-apricot' : 'bg-rust'}`} />
                  <span className={`leading-relaxed font-light ${isDark ? 'text-stone' : 'text-gray-700'}`}>{detail}</span>
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

function CrossroadsEntry({ isDark, ui, routes }: { isDark: boolean; ui: UiText; routes: CrossroadsRoute[] }) {
  const mutedText = isDark ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className="relative">
      <RailConnector />

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={periodChipClass(isDark)}>{ui.crossroadsPeriod}</span>
          <span
            className={`${statusPillBase} ${
              isDark ? 'text-sky-300 bg-sky-950/70 border border-sky-800/60' : 'text-sky-800 bg-sky-100'
            }`}
          >
            {ui.statusConsidering}
          </span>
        </div>
        <h3
          className={`font-serif italic text-xl md:text-2xl font-semibold leading-snug transition-colors duration-500 ${
            isDark ? 'text-ivory' : 'text-gray-900'
          }`}
        >
          {ui.crossroadsTitle}
        </h3>
        <p
          className={`font-sans text-sm md:text-base leading-relaxed font-light transition-colors duration-500 ${
            isDark ? 'text-stone' : 'text-gray-700'
          }`}
        >
          {ui.crossroadsLead}
        </p>
      </div>

      <div className="relative mt-6 sm:pt-6">
        {/* One rail splitting into three branches */}
        <div className="hidden sm:block absolute top-0 left-[16.66%] right-[16.66%] border-t-2 border-dashed border-sand"></div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {routes.map((route) => (
            <div
              key={route.id}
              className={`relative rounded-xl border p-4 transition-colors duration-500 ${
                isDark ? 'bg-night-card border-night-border' : 'bg-white/60 border-cream-border'
              }`}
            >
              <div className="hidden sm:block absolute -top-6 left-1/2 h-6 border-l-2 border-dashed border-sand"></div>

              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full border font-serif italic text-sm font-semibold ${
                    isDark ? 'border-apricot text-apricot' : 'border-rust text-rust'
                  }`}
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
                    <span className={`mt-[7px] shrink-0 w-2 border-t ${isDark ? 'border-apricot' : 'border-rust'}`} />
                    <span className={`leading-relaxed font-light ${isDark ? 'text-stone' : 'text-gray-700'}`}>{point}</span>
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

export default function TrajectorySection({ isDark, ui, events, routes }: TrajectorySectionProps) {
  // Group consecutive tentative entries under one fog bank, and open the crossroads just above the current entry
  const blocks: ReactNode[] = []
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

  events.forEach((item, index) => {
    const entry = <TimelineEntry key={index} item={item} isDark={isDark} ui={ui} />
    if (item.isTentative) {
      foggedEntries.push(entry)
      return
    }
    flushFog()
    if (item.isCurrent && routes.length > 0) {
      blocks.push(<CrossroadsEntry key="crossroads" isDark={isDark} ui={ui} routes={routes} />)
    }
    blocks.push(entry)
  })
  flushFog()

  return (
    <section
      id="trajectory"
      className={`relative z-10 w-full py-24 md:py-32 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-night-divider' : 'border-cream-divider'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeader isDark={isDark} badge={ui.trajectoryBadge} heading={ui.trajectoryHeading} lead={ui.trajectoryLead} />

        <div className="relative border-l-2 border-sand max-w-2xl mx-auto space-y-14 pl-8 py-4">{blocks}</div>
      </div>
    </section>
  )
}

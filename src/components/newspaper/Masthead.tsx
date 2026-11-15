import type { ReactNode } from 'react'
import { SITE_LOGO_SRC } from '../../config'
import { navSections } from '../../data/navigation'
import type { UiText } from '../../data/translations'
import { useEdition } from '../../hooks/useEdition'
import { scrollToTarget } from '../../lib/smoothScroll'
import { formatDuration, minutesInWeek, minutesOnDay, useStudyLogFeed } from '../../lib/studyLog'

interface MastheadProps {
  isDark: boolean
  ui: UiText
}

/** Small boxed "ear" flanking the nameplate, as on a newspaper front page. */
function Ear({ isDark, children }: { isDark: boolean; children: ReactNode }) {
  return (
    <div
      className={`hidden md:flex flex-col justify-center gap-1 px-4 py-3 border min-h-[5.5rem] ${
        isDark ? 'border-night-border' : 'border-cream-border'
      }`}
    >
      {children}
    </div>
  )
}

/**
 * Front-page masthead: ears, nameplate and motto, the volume/date bar between double rules,
 * and the "Inside" index strip (which doubles as in-page navigation).
 */
export default function Masthead({ isDark, ui }: MastheadProps) {
  const { edition } = useEdition()
  const feed = useStudyLogFeed()

  const muted = isDark ? 'text-gray-400' : 'text-gray-500'
  const strong = isDark ? 'text-ivory' : 'text-ink'
  const rule = isDark ? 'border-night-border' : 'border-cream-border'
  const smallCaps = `font-sans text-[11px] uppercase tracking-[0.16em] ${muted}`

  const todayMinutes = feed.status === 'ready' ? minutesOnDay(feed.entries, feed.fetchedAt) : null
  const weekMinutes = feed.status === 'ready' ? minutesInWeek(feed.entries, feed.fetchedAt) : null

  return (
    <header className="relative px-6 pt-24 sm:pt-28">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[11rem_1fr_11rem] items-center gap-6">
          {/* Left ear: live study figure from the typbox feed */}
          <Ear isDark={isDark}>
            <span className={smallCaps}>{ui.todaysStudy}</span>
            <span className={`font-serif text-3xl leading-none tabular-nums ${todayMinutes ? 'text-accent' : strong}`}>
              {todayMinutes === null ? '—' : formatDuration(todayMinutes)}
            </span>
            <span className={`font-mono text-[11px] tabular-nums ${muted}`}>
              {ui.studyLogThisWeek} {weekMinutes === null ? '—' : formatDuration(weekMinutes)}
            </span>
          </Ear>

          {/* Nameplate */}
          <div className="text-center">
            <p
              className={`font-serif font-medium leading-[0.92] tracking-[-0.025em] text-[clamp(2.75rem,10.5vw,6.75rem)] ${strong}`}
            >
              <span className="italic font-light">The</span> R.M. Journal
            </p>
            <p className={`mt-3 font-news italic text-sm sm:text-base ${muted}`}>{ui.paperMotto}</p>
          </div>

          {/* Right ear: volume and issue */}
          <Ear isDark={isDark}>
            <span className={`flex items-center justify-between gap-2 ${smallCaps}`}>
              {edition.volume}
              <img src={SITE_LOGO_SRC} alt="" className="w-5 h-5 rounded" />
            </span>
            <span className={`font-serif text-3xl leading-none tabular-nums ${strong}`}>{edition.issue}</span>
            <span className={`font-mono text-[11px] tabular-nums ${muted}`}>Est. 2026</span>
          </Ear>
        </div>

        {/* Volume / date bar */}
        <div
          className={`mt-6 py-2 border-y-[3px] border-double grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-baseline gap-4 font-sans text-[11px] uppercase tracking-[0.16em] tabular-nums ${rule} ${muted}`}
        >
          <span>{ui.locationText}</span>
          <span className={`text-right sm:text-center ${strong}`}>
            <span className="hidden sm:inline">{edition.longDate}</span>
            <span className="sm:hidden">{edition.shortDate}</span>
          </span>
          <span className="hidden sm:block text-right">
            {edition.volume} · {edition.issue}
          </span>
        </div>

        {/* Inside: index of the sections in this edition */}
        <nav
          aria-label={ui.insideLabel}
          className={`border-b ${rule} -mx-6 px-6 sm:mx-0 sm:px-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
          <ul className="flex items-baseline gap-x-6 md:justify-between py-3 whitespace-nowrap">
            <li className="font-sans text-[11px] uppercase tracking-[0.18em] font-medium text-accent">{ui.insideLabel}</li>
            {navSections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => {
                    const target = document.getElementById(section.id)
                    if (target) scrollToTarget(target)
                  }}
                  className={`group inline-flex items-baseline gap-2 cursor-pointer ${strong}`}
                >
                  <span className="font-serif text-[15px] group-hover:text-accent transition-colors">{ui[section.labelKey]}</span>
                  <span className={`font-mono text-[11px] tabular-nums ${muted}`}>{section.page}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

    </header>
  )
}

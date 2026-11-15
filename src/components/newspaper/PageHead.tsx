import { PAPER_NAME } from '../../data/edition'
import { useEdition } from '../../hooks/useEdition'

interface PageHeadProps {
  isDark: boolean
  /** Folio, e.g. "B1" */
  page: string
  /** Section flag, e.g. "Learning" */
  section: string
  /** Small kicker beside the flag */
  kicker: string
  /** Lead story headline for the page */
  heading: string
  /** Deck (sub-headline) under the headline */
  deck?: string
}

/**
 * Top of a newspaper page: running head (folio · paper · date), the section flag over a heavy rule,
 * then the page's lead headline and deck.
 */
export default function PageHead({ isDark, page, section, kicker, heading, deck }: PageHeadProps) {
  const { edition } = useEdition()
  const muted = isDark ? 'text-gray-400' : 'text-gray-500'
  const heavyRule = isDark ? 'border-linen/80' : 'border-ink'

  return (
    <header className="page-head mb-12 md:mb-16">
      {/* Running head */}
      <div
        className={`grid grid-cols-[auto_1fr_auto] items-baseline gap-4 pb-2 border-b font-sans text-[11px] uppercase tracking-[0.16em] ${muted} ${
          isDark ? 'border-night-border' : 'border-cream-border'
        }`}
      >
        <span className="font-mono text-xs text-accent tabular-nums">{page}</span>
        <span className="text-center truncate">{PAPER_NAME}</span>
        <span className="text-right tabular-nums">
          <span className="hidden sm:inline">{edition.longDate}</span>
          <span className="sm:hidden">{edition.shortDate}</span>
        </span>
      </div>

      {/* Section flag */}
      <div className={`flex items-end justify-between gap-6 pt-5 pb-3 border-b-[3px] ${heavyRule}`}>
        <p
          className={`font-serif font-normal leading-[0.9] tracking-[-0.02em] text-[2.6rem] sm:text-6xl md:text-7xl ${
            isDark ? 'text-ivory' : 'text-ink'
          }`}
        >
          {section}
        </p>
        <span className={`hidden sm:block pb-1.5 font-sans text-[11px] uppercase tracking-[0.18em] text-right ${muted}`}>
          {kicker}
        </span>
      </div>

      {/* Lead headline + deck */}
      <div className="page-head-lead pt-7 md:pt-9 max-w-4xl space-y-4">
        <span className="sm:hidden block font-sans text-[11px] uppercase tracking-[0.18em] text-accent">
          {kicker}
        </span>
        <h2
          className={`font-serif font-normal text-[2rem] leading-[1.08] sm:text-4xl md:text-5xl tracking-tight text-balance ${
            isDark ? 'text-ivory' : 'text-ink'
          }`}
        >
          {heading}
        </h2>
        {deck && (
          <p
            className={`font-news italic text-lg md:text-xl leading-snug max-w-3xl text-pretty ${
              isDark ? 'text-stone' : 'text-gray-600'
            }`}
          >
            {deck}
          </p>
        )}
      </div>
    </header>
  )
}

import { ArrowDown, Printer } from 'lucide-react'
import { CONTACT_EMAIL } from '../../config'
import { PAPER_NAME } from '../../data/edition'
import { FRONT_PAGE, sectionPage } from '../../data/navigation'
import type { SocialLink } from '../../data/socialLinks'
import type { UiText } from '../../data/translations'
import { useEdition } from '../../hooks/useEdition'
import { usePrintEdition } from '../../hooks/usePrintEdition'
import { scrollToTarget } from '../../lib/smoothScroll'
import PageHead from '../newspaper/PageHead'

interface FooterSectionProps {
  isDark: boolean
  ui: UiText
  socialLinks: SocialLink[]
}

/** Back page (D2): letters to the editor (contact), social links and the colophon. */
export default function FooterSection({ isDark, ui, socialLinks }: FooterSectionProps) {
  const { edition } = useEdition()
  const { isPrinting, printEdition } = usePrintEdition()
  const rule = isDark ? 'border-night-border' : 'border-cream-border'
  const muted = isDark ? 'text-gray-400' : 'text-gray-500'
  const strong = isDark ? 'text-ivory' : 'text-ink'

  return (
    <footer
      id="contact"
      className={`relative w-full px-6 pt-20 md:pt-28 pb-10 border-t scroll-mt-6 transition-colors duration-500 ${
        isDark ? 'border-night-divider' : 'border-cream-divider'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <PageHead
          isDark={isDark}
          page={sectionPage('contact')}
          section={ui.navContact}
          kicker={ui.footerContact}
          heading={ui.lettersTitle}
          deck={ui.lettersText}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12">
          {/* Letters: the address, set large */}
          <div className={`lg:col-span-8 lg:pr-10 lg:border-r ${rule}`}>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`block font-serif font-light tracking-tight leading-[1.05] text-[clamp(1.6rem,6.2vw,4rem)] break-words decoration-accent decoration-1 underline-offset-[0.18em] hover:underline ${strong}`}
            >
              {CONTACT_EMAIL}
            </a>

            <ul data-print="hide" className="mt-10 flex flex-wrap items-center gap-2">
              {socialLinks.map(({ name, url, icon: Icon }) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className={`flex items-center justify-center w-11 h-11 rounded-full border transition-colors ${
                      isDark
                        ? 'border-night-border text-linen hover:text-accent hover:border-accent/60'
                        : 'border-cream-border text-ink hover:text-accent hover:border-accent/50'
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Print only: icons mean nothing on paper, so the addresses are set in type */}
            <dl className="hidden print:grid mt-8 grid-cols-[7rem_1fr] gap-x-4 gap-y-1 font-mono text-[11px]">
              {socialLinks.map(({ name, url }) => (
                <div key={name} className="contents">
                  <dt className="uppercase tracking-wider">{name}</dt>
                  <dd className="break-all">{url.replace(/^https?:\/\//, '')}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Colophon box */}
          <aside className="lg:col-span-4 lg:pl-10">
            <div className={`p-5 border-[3px] border-double ${rule}`}>
              <h3 className={`font-sans text-[11px] uppercase tracking-[0.18em] font-semibold ${strong}`}>
                {ui.colophonTitle}
              </h3>
              <p className={`mt-3 font-news text-[15px] leading-relaxed news-body ${isDark ? 'text-stone' : 'text-gray-700'}`}>
                {ui.colophonText}
              </p>
              <p className={`mt-4 pt-3 border-t font-mono text-[11px] tabular-nums leading-relaxed ${rule} ${muted}`}>
                {edition.volume} · {edition.issue}
                <br />
                {edition.longDate}
                {isDark && (
                  <>
                    <br />
                    {ui.nightEdition}
                  </>
                )}
              </p>

              {/* Print Edition: save this paper as a PDF */}
              <button
                type="button"
                data-print="hide"
                onClick={() => void printEdition()}
                title={ui.printEditionHint}
                className={`group mt-4 w-full flex items-center justify-between gap-3 pt-3 border-t text-left cursor-pointer ${rule}`}
              >
                <span className="flex items-center gap-2.5">
                  <Printer className="w-4 h-4 text-accent" strokeWidth={1.75} aria-hidden="true" />
                  <span>
                    <span className={`block font-serif text-lg leading-tight transition-colors group-hover:text-accent ${strong}`}>
                      {ui.printEdition}
                    </span>
                    <span className={`block font-mono text-[11px] ${isPrinting ? 'text-accent' : muted}`}>
                      {isPrinting ? ui.printPreparing : ui.printEditionCta}
                    </span>
                  </span>
                </span>
                <ArrowDown
                  className="w-4 h-4 text-accent transition-transform duration-300 group-hover:translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </button>
            </div>
          </aside>
        </div>

        {/* Foot of the back page */}
        <div
          className={`mt-16 md:mt-24 pt-4 border-t-[3px] border-double flex flex-col-reverse sm:flex-row sm:items-baseline sm:justify-between gap-4 ${rule}`}
        >
          <p className={`font-sans text-xs tracking-wide ${muted}`}>{ui.copyright}</p>
          <button
            type="button"
            onClick={() => scrollToTarget('top')}
            className={`self-start inline-flex items-baseline gap-2 cursor-pointer font-serif text-base ${strong} hover:text-accent transition-colors`}
          >
            <span className="italic">{PAPER_NAME}</span>
            <span className={`font-mono text-[11px] ${muted}`}>{FRONT_PAGE} &uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

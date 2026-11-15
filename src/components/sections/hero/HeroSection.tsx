import type { ReactNode } from 'react'
import urakawaLandscape from '../../../assets/urakawa-landscape.webp'
import { blogPostsData } from '../../../data/blogPosts'
import { jumpText } from '../../../data/edition'
import { sectionPage, type SectionId } from '../../../data/navigation'
import type { CourseItem, UiText } from '../../../data/translations'
import { useEdition } from '../../../hooks/useEdition'
import { scrollToTarget } from '../../../lib/smoothScroll'
import { formatDuration, minutesInWeek, minutesOnDay, percentChange, useStudyLogFeed } from '../../../lib/studyLog'
import HalftoneImage from '../../newspaper/HalftoneImage'
import JumpLine from '../../newspaper/JumpLine'
import TerminalProfile from './TerminalProfile'

interface HeroSectionProps {
  isDark: boolean
  ui: UiText
  courses: CourseItem[]
}

/** One "refer" in the front-page sidebar: a teaser pointing to the page where the story runs. */
function Refer({
  isDark,
  label,
  target,
  children,
}: {
  isDark: boolean
  label: string
  target: SectionId
  children: ReactNode
}) {
  const page = sectionPage(target)
  return (
    <button
      type="button"
      onClick={() => {
        const el = document.getElementById(target)
        if (el) scrollToTarget(el)
      }}
      className={`group block w-full text-left py-6 first:pt-0 border-b last:border-b-0 cursor-pointer ${
        isDark ? 'border-night-border' : 'border-cream-border'
      }`}
    >
      <span className="flex items-baseline justify-between gap-3 mb-2">
        <span
          className="font-sans text-[11px] uppercase tracking-[0.16em] font-medium text-accent"
        >
          {label}
        </span>
        <span className={`font-mono text-[11px] tabular-nums ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {page} &rarr;
        </span>
      </span>
      {children}
    </button>
  )
}

/** Front page (A1): banner headline, deck, byline, photo, opening story and the "In this edition" refers. */
export default function HeroSection({ isDark, ui, courses }: HeroSectionProps) {
  const { lang } = useEdition()
  const feed = useStudyLogFeed()

  const latestPost = blogPostsData[lang].at(-1)
  const newestCourse = courses.at(-1)

  const weekMinutes = feed.status === 'ready' ? minutesInWeek(feed.entries, feed.fetchedAt) : null
  const lastWeekMinutes = feed.status === 'ready' ? minutesInWeek(feed.entries, feed.fetchedAt, 1) : null
  const todayMinutes = feed.status === 'ready' ? minutesOnDay(feed.entries, feed.fetchedAt) : null
  const weekChange = weekMinutes !== null && lastWeekMinutes !== null ? percentChange(weekMinutes, lastWeekMinutes) : null

  const strong = isDark ? 'text-ivory' : 'text-ink'
  const body = isDark ? 'text-stone' : 'text-gray-700'
  const muted = isDark ? 'text-gray-400' : 'text-gray-500'
  const rule = isDark ? 'border-night-border' : 'border-cream-border'
  const headlineHover = 'group-hover:text-accent'

  return (
    <section id="hero" className="relative w-full px-6 pt-10 md:pt-14 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14">
          {/* Lead story */}
          <article className={`lg:col-span-8 lg:pr-10 lg:border-r ${rule}`}>
            <p
              className="font-sans text-[11px] uppercase tracking-[0.16em] font-medium leading-relaxed text-accent"
            >
              {ui.heroBadge}
            </p>

            <h1
              className={`mt-4 font-serif font-light tracking-[-0.025em] leading-[0.95] text-[clamp(3.1rem,9vw,6.75rem)] ${strong}`}
            >
              {ui.heroGreeting} <span className="italic text-accent">{ui.heroName}</span>
            </h1>

            <p className={`mt-6 font-news italic text-xl md:text-2xl leading-snug text-pretty ${body}`}>{ui.heroLead}</p>

            {/* Byline */}
            <p
              className={`mt-7 py-2.5 border-y flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-sans text-[11px] uppercase tracking-[0.16em] ${rule} ${muted}`}
            >
              <span>
                {ui.bylineBy} <span className={`font-semibold ${strong}`}>Rikuto Mikado</span>
              </span>
              <span>{ui.locationText}</span>
            </p>

            {/* Front-page photograph */}
            <figure className="group mt-8">
              <HalftoneImage
                src={urakawaLandscape}
                alt={ui.aboutPhotoPlace}
                isDark={isDark}
                className="w-full aspect-[16/9]"
                focus={[0.5, 0.4]}
                loading="eager"
              />
              <figcaption className={`mt-2.5 pb-2 border-b font-news italic text-sm ${rule} ${muted}`}>
                {ui.aboutPhotoPlace}
              </figcaption>
            </figure>

            {/* Opening of the story, continued on A2 */}
            <div className={`mt-7 news-columns sm:columns-2 font-news text-[17px] leading-[1.7] ${body}`}>
              <p className="news-body drop-cap">{ui.aboutP1}</p>
            </div>
            <div className="mt-4">
              <JumpLine text={jumpText(ui.continuedOn, sectionPage('about'))} targetId="about" />
            </div>
          </article>

          {/* In this edition */}
          <aside className="lg:col-span-4 lg:pl-10">
            <h2
              className={`pb-2 mb-6 border-b-[3px] font-sans text-[11px] uppercase tracking-[0.18em] font-semibold ${
                isDark ? 'border-linen/80 text-linen' : 'border-ink text-ink'
              }`}
            >
              {ui.inThisEdition}
            </h2>

            {latestPost && (
              <Refer isDark={isDark} label={ui.latestEssayLabel} target="blog">
                <span
                  className={`block font-serif text-2xl leading-snug tracking-tight text-balance transition-colors ${strong} ${headlineHover}`}
                >
                  {latestPost.title}
                </span>
                <span className={`mt-2 block font-news text-[15px] leading-relaxed line-clamp-4 ${body}`}>
                  {latestPost.paragraphs[0] || latestPost.excerpt}
                </span>
              </Refer>
            )}

            <Refer isDark={isDark} label={ui.studyFiguresLabel} target="study-log">
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-serif font-light text-5xl leading-none tabular-nums text-accent">
                  {weekMinutes === null ? '—' : formatDuration(weekMinutes)}
                </span>
                {weekChange !== null && (
                  <span className={`font-mono text-xs tabular-nums ${strong}`}>
                    {weekChange >= 0 ? '▲' : '▼'} {Math.abs(weekChange)}% <span className={muted}>{ui.vsLastWeek}</span>
                  </span>
                )}
              </span>
              <span className={`mt-2 block font-mono text-xs tabular-nums ${muted}`}>
                {ui.studyLogToday} {todayMinutes === null ? '—' : formatDuration(todayMinutes)}
              </span>
            </Refer>

            {newestCourse && (
              <Refer isDark={isDark} label={ui.latestCertLabel} target="courses">
                <span
                  className={`block font-serif text-xl leading-snug tracking-tight text-balance transition-colors ${strong} ${headlineHover}`}
                >
                  {newestCourse.title}
                </span>
                <span className={`mt-2 block font-mono text-[11px] tabular-nums ${muted}`}>
                  {newestCourse.platform} &nbsp;·&nbsp; {newestCourse.date} &nbsp;·&nbsp; {newestCourse.hours}
                </span>
              </Refer>
            )}
          </aside>
        </div>

      </div>

      {/* The fold: the crease across the middle of the front page, edge to edge of the sheet */}
      <div className="fold -mx-6 my-14 md:my-20" aria-hidden="true" />

      {/* Below the fold: the profile listing, full width */}
      <div className="max-w-6xl mx-auto">
        <TerminalProfile isDark={isDark} caption={ui.listingCaption} />
      </div>
    </section>
  )
}

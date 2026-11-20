import portraitImg from '../../assets/about-portrait.webp'
import { jumpText } from '../../data/edition'
import { FRONT_PAGE, sectionPage } from '../../data/navigation'
import type { UiText } from '../../data/translations'
import HalftoneImage from '../newspaper/HalftoneImage'
import JumpLine from '../newspaper/JumpLine'
import PageHead from '../newspaper/PageHead'

interface AboutSectionProps {
  isDark: boolean
  ui: UiText
}

/** Page A2: the front-page story continued, with a pull quote, a portrait and the writer's specialties. */
export default function AboutSection({ isDark, ui }: AboutSectionProps) {
  const strong = isDark ? 'text-ivory' : 'text-ink'
  const body = isDark ? 'text-stone' : 'text-gray-700'
  const muted = isDark ? 'text-gray-400' : 'text-gray-500'
  const rule = isDark ? 'border-night-border' : 'border-cream-border'
  const heavyRule = isDark ? 'border-linen/80' : 'border-ink'

  return (
    <section
      id="about"
      className={`relative w-full py-20 md:py-28 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-night-divider' : 'border-cream-divider'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <PageHead
          isDark={isDark}
          page={sectionPage('about')}
          section={ui.navAbout}
          kicker={ui.aboutSectionBadge}
          heading={ui.aboutHeading}
        />

        <div className="about-grid grid grid-cols-1 lg:grid-cols-12 gap-y-12">
          {/* Story, continued from the front page */}
          <article className={`lg:col-span-8 lg:pr-10 lg:border-r ${rule}`}>
            <JumpLine text={jumpText(ui.continuedFrom, FRONT_PAGE)} align="left" />

            <div className={`mt-5 news-columns md:columns-2 font-news text-[17px] leading-[1.7] ${body}`}>
              <p className="news-body">{ui.aboutP2}</p>

              {/* Pull quote, spanning both columns */}
              <blockquote className={`[column-span:all] my-9 py-7 border-y-[3px] ${heavyRule}`}>
                <p
                  className={`font-serif font-light italic text-[1.7rem] md:text-[2.1rem] leading-[1.2] tracking-tight text-center text-balance ${strong}`}
                >
                  {ui.aboutQuote}
                </p>
              </blockquote>

              <p className="news-body">{ui.aboutP3}</p>
            </div>

            {/* Specialties */}
            <div className={`mt-10 pt-5 border-t ${rule}`}>
              <h3 className={`font-sans text-[11px] uppercase tracking-[0.18em] ${muted}`}>{ui.specialtiesLabel}</h3>
              <ul className="mt-3 flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-2">
                {[ui.aboutBadge1, ui.aboutBadge2].map((badge) => (
                  <li key={badge} className={`flex items-baseline gap-2.5 font-serif text-lg ${strong}`}>
                    <span className="text-accent" aria-hidden="true">
                      ■
                    </span>
                    {badge}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Portrait */}
          <figure className="group lg:col-span-4 lg:pl-10 lg:sticky lg:top-16 self-start">
            <HalftoneImage
              src={portraitImg}
              alt="Rikuto Mikado"
              isDark={isDark}
              className="w-full max-w-sm mx-auto lg:max-w-none aspect-[4/5]"
              focus={[0.5, 0]}
            />
            <figcaption className={`mt-3 pt-2.5 border-t max-w-sm mx-auto lg:max-w-none space-y-1 ${rule}`}>
              <p className={`font-sans text-[11px] uppercase tracking-[0.16em] font-semibold ${strong}`}>
                {ui.aboutPhotoName}
              </p>
              <p className={`font-news italic text-sm ${muted}`}>
                {ui.locationText}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

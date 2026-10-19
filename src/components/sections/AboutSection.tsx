import myfaceImg from '../../assets/myface.webp'
import urakawaLandscape from '../../assets/urakawa-landscape.webp'
import type { UiText } from '../../data/translations'

interface AboutSectionProps {
  isDark: boolean
  ui: UiText
}

// Radial masks fade the landscape photo into the page background
const LANDSCAPE_MASK = {
  dark: 'radial-gradient(ellipse 85% 90% at 75% 45%, black 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.2) 100%)',
  light: 'radial-gradient(ellipse 75% 85% at 80% 45%, black 25%, rgba(0,0,0,0.35) 65%, transparent 95%)',
}

export default function AboutSection({ isDark, ui }: AboutSectionProps) {
  const landscapeMask = isDark ? LANDSCAPE_MASK.dark : LANDSCAPE_MASK.light

  return (
    <section
      id="about"
      className={`relative z-10 w-full py-24 md:py-32 px-6 border-t transition-colors duration-500 overflow-hidden scroll-mt-6 ${
        isDark ? 'bg-night-section border-night-divider' : 'border-cream-divider'
      }`}
    >
      {/* Atmospheric landscape background (hometown) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {isDark && (
          <div className="absolute inset-0 bg-gradient-to-r from-night-section/80 via-transparent to-[#221c17]/30 z-10 pointer-events-none" />
        )}
        <img
          src={urakawaLandscape}
          alt=""
          className={`w-full h-full object-cover object-[85%_35%] transition-opacity duration-700 ${
            isDark
              ? 'opacity-[0.30] filter contrast-110 brightness-100 saturate-[0.85]'
              : 'opacity-[0.18] filter contrast-105 saturate-[0.9]'
          }`}
          style={{ maskImage: landscapeMask, WebkitMaskImage: landscapeMask }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: narrative */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-sans uppercase tracking-widest text-rust font-semibold block">
              {ui.aboutSectionBadge}
            </span>
            <h2 className="text-4xl md:text-5xl text-rust italic font-serif leading-tight">{ui.aboutHeading}</h2>
          </div>

          <div
            className={`p-6 rounded-2xl border-l-4 border-rust space-y-2 transition-colors duration-500 ${
              isDark ? 'bg-[#1E1C1A]' : 'bg-[#ede8de]'
            }`}
          >
            <p
              className={`text-xl md:text-2xl font-serif italic leading-snug transition-colors duration-500 ${
                isDark ? 'text-ivory' : 'text-gray-900'
              }`}
            >
              {ui.aboutQuote}
            </p>
          </div>

          <div
            className={`space-y-5 font-sans text-base md:text-lg leading-relaxed font-light transition-colors duration-500 ${
              isDark ? 'text-stone' : 'text-gray-700'
            }`}
          >
            <p>{ui.aboutP1}</p>
            <p>{ui.aboutP2}</p>
            <p>{ui.aboutP3}</p>
          </div>

          <div className="pt-2 flex flex-wrap gap-2.5">
            {[ui.aboutBadge1, ui.aboutBadge2].map((badge) => (
              <span
                key={badge}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-colors duration-500 ${
                  isDark
                    ? 'bg-night-chip text-apricot border border-night-border'
                    : 'bg-[#eae4da] text-[#783515] border border-cream-border'
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Right: arch-framed profile photo */}
        <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-16">
          <div className="relative group">
            <div className="absolute -inset-3 rounded-t-full border-2 border-dashed border-sand pointer-events-none"></div>

            <div
              className={`relative w-64 sm:w-72 lg:w-80 xl:w-[22rem] h-84 sm:h-96 lg:h-[28rem] xl:h-[31rem] rounded-t-full overflow-hidden shadow-2xl border-4 transition-all duration-500 ${
                isDark ? 'border-night-edge bg-[#1E1C1A]' : 'border-white bg-gray-200'
              }`}
            >
              <img
                src={myfaceImg}
                alt="Rikuto Mikado"
                className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="mt-6 text-center space-y-1.5">
            <p
              className={`font-serif italic text-2xl transition-colors duration-500 ${
                isDark ? 'text-ivory' : 'text-gray-900'
              }`}
            >
              {ui.aboutPhotoName}
            </p>
            <p className="text-xs font-sans uppercase tracking-[0.2em] text-rust font-semibold">
              {ui.aboutPhotoPlace}
            </p>
            <p
              className={`font-sans text-xs font-light transition-colors duration-500 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {ui.aboutPhotoDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

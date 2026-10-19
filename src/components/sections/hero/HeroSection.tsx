import { SITE_LOGO_SRC } from '../../../config'
import type { UiText } from '../../../data/translations'
import TerminalProfile from './TerminalProfile'

interface HeroSectionProps {
  isDark: boolean
  ui: UiText
}

function DashedDivider({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`border-t-2 border-dashed w-3/4 max-w-lg mx-auto transition-colors duration-500 ${
        isDark ? 'border-sand/50' : 'border-sand'
      }`}
    ></div>
  )
}

export default function HeroSection({ isDark, ui }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative z-10 w-full min-h-[75vh] md:min-h-[85vh] flex flex-col justify-between items-center py-16 md:py-24 px-6"
    >
      {/* Top spacer so the card centers within the remaining height */}
      <div className="w-full"></div>

      <div className="max-w-4xl mx-auto text-center space-y-8 my-auto w-full">
        <div className="flex justify-center items-center">
          <img
            src={SITE_LOGO_SRC}
            alt="RIKUTO"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm hover:scale-105 transition-transform duration-300"
          />
        </div>

        <DashedDivider isDark={isDark} />

        <div className="space-y-4">
          <h1
            className={`text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.08] transition-colors duration-500 ${
              isDark ? 'text-ivory' : 'text-[#231f1d]'
            }`}
          >
            {ui.heroGreeting} <span className="italic font-normal text-rust">{ui.heroName}</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-sans uppercase tracking-[0.22em] text-rust font-semibold">
            {ui.heroBadge}
          </p>
        </div>

        <p
          className={`text-base sm:text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-sans font-light px-2 transition-colors duration-500 ${
            isDark ? 'text-stone' : 'text-gray-700'
          }`}
        >
          {ui.heroLead}
        </p>

        <DashedDivider isDark={isDark} />

        <div className="pt-2 sm:pt-4 max-w-3xl mx-auto w-full text-left">
          <TerminalProfile isDark={isDark} />
        </div>
      </div>
    </section>
  )
}

import type { TimelineItem, UiText } from '../../data/translations'
import SectionHeader from '../common/SectionHeader'

interface TrajectorySectionProps {
  isDark: boolean
  ui: UiText
  events: TimelineItem[]
}

const statusPillBase =
  'inline-block text-xs font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors duration-500'

function TimelineEntry({ item, isDark, ui }: { item: TimelineItem; isDark: boolean; ui: UiText }) {
  return (
    <div className="relative group">
      {/* Horizontal dashed connector to the vertical rail */}
      <div className="absolute -left-[34px] top-3.5 w-8 border-t-2 border-dashed border-sand"></div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-block text-xs font-sans font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full transition-colors duration-500 ${
              isDark
                ? 'text-apricot bg-night-chip border border-night-border'
                : 'text-rust bg-[#eae4da] border border-cream-border'
            }`}
          >
            {item.period}
          </span>
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
          {item.isUpcoming && (
            <span
              className={`${statusPillBase} ${
                isDark ? 'text-amber-300 bg-amber-950/70 border border-amber-800/60' : 'text-amber-800 bg-amber-100'
              }`}
            >
              {ui.statusRoadmap}
            </span>
          )}
        </div>

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
  )
}

export default function TrajectorySection({ isDark, ui, events }: TrajectorySectionProps) {
  return (
    <section
      id="trajectory"
      className={`relative z-10 w-full py-24 md:py-32 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-night-divider' : 'border-cream-divider'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeader isDark={isDark} badge={ui.trajectoryBadge} heading={ui.trajectoryHeading} lead={ui.trajectoryLead} />

        <div className="relative border-l-2 border-sand max-w-2xl mx-auto space-y-14 pl-8 py-4">
          {events.map((item, index) => (
            <TimelineEntry key={index} item={item} isDark={isDark} ui={ui} />
          ))}
        </div>
      </div>
    </section>
  )
}

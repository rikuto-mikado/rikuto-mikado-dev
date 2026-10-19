interface SectionHeaderProps {
  isDark: boolean
  badge: string
  heading: string
  lead: string
  badgeTrackingClass?: string
  headingClassName?: string
}

/** Centered badge + italic heading + lead paragraph used at the top of content sections. */
export default function SectionHeader({
  isDark,
  badge,
  heading,
  lead,
  badgeTrackingClass = 'tracking-widest',
  headingClassName = '',
}: SectionHeaderProps) {
  return (
    <div className="text-center mb-16 space-y-3">
      <span className={`text-xs font-sans uppercase ${badgeTrackingClass} text-rust font-semibold block`}>
        {badge}
      </span>
      <h2 className={`text-4xl md:text-5xl text-rust italic font-serif ${headingClassName}`}>{heading}</h2>
      <p
        className={`text-base font-sans max-w-2xl mx-auto leading-relaxed transition-colors duration-500 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        {lead}
      </p>
    </div>
  )
}

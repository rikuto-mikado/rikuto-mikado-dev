import type { KeyboardEvent, ReactNode } from 'react'

// Building blocks shared by the course certificate cards and blog essay cards

interface ThemedProps {
  isDark: boolean
  children: ReactNode
}

interface CardProps extends ThemedProps {
  as?: 'article' | 'div'
  /** Accessible name announced by screen readers (the visible content is too long to serve as one) */
  label: string
  onClick: () => void
}

/** Clickable card that opens a dialog; keyboard-operable like a button (Enter / Space). */
export function Card({ as: Tag = 'div', isDark, label, onClick, children }: CardProps) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <Tag
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={label}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust ${
        isDark
          ? 'bg-night-card border border-night-edge shadow-md hover:shadow-2xl hover:border-sand/50'
          : 'bg-white border border-[#e5ded4] shadow-sm hover:shadow-xl hover:border-sand'
      }`}
    >
      {children}
    </Tag>
  )
}

/** Dimmed overlay with a pill label, revealed when the parent `group` card is hovered or focused. */
export function CardHoverHint({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-[2px]">
      <span className="px-4 py-2 rounded-full bg-white/95 text-gray-900 text-xs font-sans font-semibold tracking-wider uppercase shadow-md flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-300">
        {label}
      </span>
    </div>
  )
}

export function CardBody({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  return (
    <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
      <div className="space-y-3">{children}</div>
      {footer}
    </div>
  )
}

export function CardCategoryBadge({ isDark, children }: ThemedProps) {
  return (
    <div>
      <span
        className={`inline-block uppercase tracking-wider px-2.5 py-0.5 rounded-md transition-colors duration-500 text-[10px] font-semibold font-sans whitespace-nowrap truncate max-w-full ${
          isDark
            ? 'text-apricot bg-[#24211D] border border-night-border'
            : 'text-rust bg-paper border border-cream-line'
        }`}
      >
        {children}
      </span>
    </div>
  )
}

export function CardTitle({ isDark, children }: ThemedProps) {
  return (
    <h3
      className={`font-serif text-lg md:text-xl font-bold leading-snug transition-colors duration-300 line-clamp-2 ${
        isDark ? 'text-ivory group-hover:text-apricot' : 'text-gray-900 group-hover:text-rust'
      }`}
    >
      {children}
    </h3>
  )
}

export function CardExcerpt({ isDark, children }: ThemedProps) {
  return (
    <p
      className={`font-sans text-xs sm:text-sm leading-relaxed font-light transition-colors duration-500 line-clamp-3 ${
        isDark ? 'text-stone' : 'text-gray-600'
      }`}
    >
      {children}
    </p>
  )
}

export function CardFooter({ isDark, children }: ThemedProps) {
  return (
    <div
      className={`pt-3 border-t flex items-center justify-between text-xs font-sans transition-colors duration-500 ${
        isDark ? 'border-night-divider text-gray-400' : 'border-[#f0ebe3] text-gray-600'
      }`}
    >
      {children}
    </div>
  )
}

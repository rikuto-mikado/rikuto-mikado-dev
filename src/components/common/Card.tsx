import type { KeyboardEvent, ReactNode } from 'react'

interface ClickableProps {
  as?: 'article' | 'div' | 'li'
  /** Accessible name announced by screen readers (the visible content is too long to serve as one) */
  label: string
  onClick: () => void
  className?: string
  children: ReactNode
}

/**
 * Unboxed clickable region that opens a dialog: content is "printed" straight onto the page, so the
 * wrapper carries no background or border of its own. Keyboard-operable like a button (Enter / Space).
 */
export function Clickable({ as: Tag = 'div', label, onClick, className = '', children }: ClickableProps) {
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
      className={`group cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      {children}
    </Tag>
  )
}

/** Small-caps kicker above a headline (section / category label). */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span
      className="block font-sans text-[11px] uppercase tracking-[0.16em] font-medium truncate text-accent"
    >
      {children}
    </span>
  )
}

import type { UiText } from '../../data/translations'
import { ChevronDownIcon } from './icons'

interface ReadMoreButtonProps {
  isDark: boolean
  ui: UiText
  isExpanded: boolean
  onToggle: () => void
}

// Expand/collapse toggle shared by the card grids (courses, blog)
export default function ReadMoreButton({ isDark, ui, isExpanded, onToggle }: ReadMoreButtonProps) {
  return (
    <div className="mt-12 text-center">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className={`inline-flex items-center gap-2.5 px-6 py-3 min-h-11 rounded-full text-xs font-sans font-medium uppercase tracking-[0.16em] transition-colors duration-300 cursor-pointer border ${
          isDark
            ? 'text-accent border-night-border hover:border-accent/60 hover:bg-night-card'
            : 'text-accent border-cream-border hover:border-accent/50 hover:bg-white/60'
        }`}
      >
        <span>{isExpanded ? ui.showLess : ui.readMore}</span>
        <ChevronDownIcon
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  )
}

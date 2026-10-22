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
        className={`inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer shadow-sm hover:shadow-md ${
          isDark
            ? 'bg-night-card hover:bg-[#25221E] text-apricot border border-night-border hover:border-sand/60'
            : 'bg-white hover:bg-[#F9F8F5] text-rust border border-[#d8d1c5] hover:border-rust/60'
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

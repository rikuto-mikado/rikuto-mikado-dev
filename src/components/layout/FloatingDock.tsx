import type { UiText } from '../../data/translations'
import { GlobeIcon, ThemeIcon } from '../common/icons'

interface FloatingDockProps {
  isDark: boolean
  ui: UiText
  isHidden: boolean
  isSidebarOpen: boolean
  onToggleTheme: () => void
  onToggleLang: () => void
  onOpenSidebar: () => void
}

function DockSeparator({ isDark }: { isDark: boolean }) {
  return <div className={`h-4 w-px mx-0.5 sm:mx-1 ${isDark ? 'bg-night-border' : 'bg-cream-border'}`} />
}

/** Fixed top-right pill holding the theme toggle, language switcher and menu trigger. */
export default function FloatingDock({
  isDark,
  ui,
  isHidden,
  isSidebarOpen,
  onToggleTheme,
  onToggleLang,
  onOpenSidebar,
}: FloatingDockProps) {
  const themeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <div
      className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] flex items-center p-1 sm:p-1.5 rounded-full border shadow-sm backdrop-blur-md transition-all duration-300 ${
        isHidden ? 'opacity-0 pointer-events-none -translate-y-2' : 'opacity-100'
      } ${
        isDark
          ? 'bg-night-card/80 border-night-border text-linen'
          : 'bg-paper/80 border-cream-border text-ink'
      }`}
    >
      <button
        onClick={onToggleTheme}
        aria-label={themeLabel}
        title={themeLabel}
        className={`p-2 sm:p-2.5 rounded-full transition-colors duration-300 cursor-pointer ${
          isDark ? 'text-sun hover:bg-night-hover' : 'text-accent hover:bg-white/80'
        }`}
      >
        <ThemeIcon isDark={isDark} className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <DockSeparator isDark={isDark} />

      <button
        onClick={onToggleLang}
        aria-label={ui.langSwitchLabel}
        title={ui.langSwitchLabel}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full font-sans text-xs font-medium tracking-wider transition-colors duration-300 cursor-pointer ${
          isDark ? 'text-accent hover:bg-night-hover' : 'text-accent hover:bg-white/80'
        }`}
      >
        <GlobeIcon className="w-3.5 h-3.5" />
        <span>{ui.langSwitchCode}</span>
      </button>

      <DockSeparator isDark={isDark} />

      <button
        onClick={onOpenSidebar}
        aria-label={ui.menu}
        aria-expanded={isSidebarOpen}
        aria-controls="side-navigation"
        className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-sans text-xs font-medium tracking-wider uppercase transition-colors duration-300 cursor-pointer ${
          isSidebarOpen
            ? 'bg-accent-fill text-white'
            : isDark
              ? 'hover:bg-night-hover text-ivory'
              : 'hover:bg-white text-gray-800'
        }`}
      >
        <span className="hidden sm:inline">{ui.menu}</span>
        {/* Hamburger glyph: full-width top bar, short accent bar below */}
        <div className="w-4 h-3.5 flex flex-col justify-between items-end">
          <span className="h-0.5 w-4 rounded-full transition-all duration-300 bg-current" />
          <span
            className="h-0.5 w-2.5 rounded-full transition-all duration-300 group-hover:w-4 bg-accent"
          />
        </div>
      </button>
    </div>
  )
}

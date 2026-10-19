import type { ReactNode } from 'react'
import { CONTACT_EMAIL } from '../../config'
import { navSections } from '../../data/navigation'
import type { SocialLink } from '../../data/socialLinks'
import type { Language } from '../../data/translations'
import { uiText } from '../../data/translations'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { ChevronRightIcon, CloseIcon, ThemeIcon } from '../common/icons'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isDark: boolean
  onToggleTheme: () => void
  lang: Language
  onToggleLang: () => void
  isJapaneseAvailable?: boolean
  activeSection: string
  logoSrc: string
  socialLinks: SocialLink[]
}

interface SettingRowProps {
  isDark: boolean
  /** Accent text color used in dark mode for the badge and button */
  darkAccentClass: string
  badgeClassName?: string
  badge: ReactNode
  title: string
  subtitle: string
  buttonLabel: string
  buttonAriaLabel: string
  onClick: () => void
}

/** Compact settings row (badge, title/subtitle, pill button) in the sidebar footer. */
function SettingRow({
  isDark,
  darkAccentClass,
  badgeClassName = '',
  badge,
  title,
  subtitle,
  buttonLabel,
  buttonAriaLabel,
  onClick,
}: SettingRowProps) {
  return (
    <div
      className={`p-3 rounded-xl border flex items-center justify-between transition-colors duration-300 ${
        isDark ? 'bg-night-card border-night-edge' : 'bg-cream-surface/70 border-[#dcd6c9]'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center ${badgeClassName} transition-colors duration-300 ${
            isDark
              ? `bg-night-hover ${darkAccentClass} border border-night-border`
              : 'bg-white text-rust border border-sand/60 shadow-xs'
          }`}
        >
          {badge}
        </div>
        <div>
          <p className={`text-xs font-sans font-semibold leading-none ${isDark ? 'text-ivory' : 'text-gray-900'}`}>
            {title}
          </p>
          <span className="text-[10px] font-sans text-gray-400">{subtitle}</span>
        </div>
      </div>

      <button
        onClick={onClick}
        aria-label={buttonAriaLabel}
        className={`px-3 py-1 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
          isDark
            ? `bg-[#292622] hover:bg-[#34302b] ${darkAccentClass} border border-night-border`
            : 'bg-white hover:bg-gray-50 text-rust border border-sand/60 shadow-xs'
        }`}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default function Sidebar({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
  lang,
  onToggleLang,
  isJapaneseAvailable = false,
  activeSection,
  logoSrc,
  socialLinks,
}: SidebarProps) {
  const ui = uiText[lang]

  const drawerRef = useFocusTrap<HTMLElement>(isOpen)
  useBodyScrollLock(isOpen)
  useEscapeKey(() => {
    if (isOpen) onClose()
  })

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    onClose()
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    onClose()
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[65] transition-opacity duration-500 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto bg-black/60 backdrop-blur-sm' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-over drawer */}
      <aside
        ref={drawerRef}
        // Keep the off-screen drawer out of the tab order and accessibility tree while closed
        inert={!isOpen}
        id="side-navigation"
        role="dialog"
        aria-label="Navigation Menu"
        aria-modal={isOpen}
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[340px] sm:max-w-[420px] shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${
          isDark
            ? 'bg-night-panel/95 text-linen border-l border-night-rule backdrop-blur-xl'
            : 'bg-[#F9F7F2]/95 text-gray-800 border-l border-sand/50 backdrop-blur-xl'
        }`}
      >
        {/* Decorative accent line along the left edge */}
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-rust via-sand to-transparent opacity-80" />

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-dashed border-sand/30 flex items-center justify-between">
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-3.5 group text-left cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Scroll to top"
          >
            <img
              src={logoSrc}
              alt="Rikuto Mikado"
              className="w-10 h-10 rounded-xl object-cover shadow-sm group-hover:rotate-6 transition-transform duration-300"
            />
            <div>
              <p
                className={`font-serif text-base font-bold tracking-tight leading-none transition-colors duration-300 ${
                  isDark ? 'text-ivory' : 'text-gray-900'
                }`}
              >
                Rikuto Mikado
              </p>
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-rust font-semibold block mt-1">
                {ui.navIndex}
              </span>
            </div>
          </button>

          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            data-autofocus
            className={`p-2.5 rounded-full border transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
              isDark
                ? 'border-night-border text-gray-400 hover:text-white hover:border-sand bg-night-chip/80'
                : 'border-sand/60 text-gray-600 hover:text-gray-900 hover:border-rust bg-white/80'
            }`}
          >
            <CloseIcon className="w-5 h-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="px-6 sm:px-8 py-8 flex-1 flex flex-col justify-center space-y-2">
          <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-rust font-semibold mb-3 px-2">
            {ui.tableOfContents}
          </p>

          <ul className="space-y-1.5">
            {navSections.map((item) => {
              const isActive = activeSection === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full group text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'bg-[#25221F] text-ivory shadow-sm border border-night-border'
                          : 'bg-cream-surface text-gray-900 shadow-sm border border-cream-border'
                        : isDark
                          ? 'hover:bg-[#201D1B] text-gray-300 hover:text-white'
                          : 'hover:bg-cream-surface/60 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-serif italic text-sm transition-colors duration-300 ${
                          isActive
                            ? 'text-rust font-semibold'
                            : isDark
                              ? 'text-apricot/70 group-hover:text-apricot'
                              : 'text-rust/70 group-hover:text-rust'
                        }`}
                      >
                        {item.num}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-serif text-lg sm:text-xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1 ${
                              isActive ? 'text-rust' : ''
                            }`}
                          >
                            {ui[item.labelKey]}
                          </span>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-rust animate-pulse" />}
                        </div>
                        <p
                          className={`text-xs font-sans font-light tracking-wide transition-colors duration-300 ${
                            isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'
                          }`}
                        >
                          {ui[item.subtitleKey]}
                        </p>
                      </div>
                    </div>

                    <ChevronRightIcon
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? 'opacity-100 translate-x-0 text-rust'
                          : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-sand'
                      }`}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer: quick settings, contact & socials */}
        <div className="p-6 sm:p-8 border-t border-dashed border-sand/30 space-y-4">
          <SettingRow
            isDark={isDark}
            darkAccentClass="text-sun"
            badge={<ThemeIcon isDark={isDark} className="w-3.5 h-3.5" />}
            title={isDark ? ui.themeDarkName : ui.themeLightName}
            subtitle={isDark ? ui.themeDarkSub : ui.themeLightSub}
            buttonLabel={isDark ? ui.light : ui.dark}
            buttonAriaLabel="Toggle color theme"
            onClick={onToggleTheme}
          />

          <SettingRow
            isDark={isDark}
            darkAccentClass="text-apricot"
            badgeClassName="font-sans text-[11px] font-bold tracking-wider"
            badge={ui.currentLangCode}
            title={ui.currentLangName}
            subtitle={isJapaneseAvailable ? ui.langSwitchHint : '日本語版は準備中 (Under Review)'}
            buttonLabel={isJapaneseAvailable ? ui.langToggle : '準備中'}
            buttonAriaLabel="Toggle language"
            onClick={onToggleLang}
          />

          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-rust font-semibold block">
              {ui.contactAndLocation}
            </span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`font-serif text-sm hover:underline block truncate transition-colors duration-300 ${
                isDark ? 'text-ivory hover:text-apricot' : 'text-gray-900 hover:text-rust'
              }`}
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-xs font-sans text-gray-400 font-light">{ui.locationText}</p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            {socialLinks.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className={`p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isDark
                    ? 'bg-night-chip text-gray-300 hover:text-white hover:bg-[#2C2925] border border-night-border'
                    : 'bg-white text-gray-700 hover:text-black hover:bg-gray-50 border border-[#dcd6c9] shadow-xs'
                }`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="text-[11px] font-sans text-gray-400 tracking-wide pt-1">{ui.copyright}</div>
        </div>
      </aside>
    </>
  )
}

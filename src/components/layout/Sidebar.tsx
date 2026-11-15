import { Printer } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { CONTACT_EMAIL } from '../../config'
import { navSections } from '../../data/navigation'
import type { SocialLink } from '../../data/socialLinks'
import type { Language } from '../../data/translations'
import { uiText } from '../../data/translations'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { usePrintEdition } from '../../hooks/usePrintEdition'
import { scrollToTarget } from '../../lib/smoothScroll'
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
      className={`p-3 rounded-md border flex items-center justify-between transition-colors duration-300 ${
        isDark ? 'border-night-edge' : 'border-cream-border'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center ${badgeClassName} transition-colors duration-300 ${
            isDark
              ? `bg-night-hover ${darkAccentClass} border border-night-border`
              : 'bg-white text-accent border border-cream-border'
          }`}
        >
          {badge}
        </div>
        <div>
          <p className={`text-xs font-sans font-semibold leading-none ${isDark ? 'text-ivory' : 'text-gray-900'}`}>
            {title}
          </p>
          <span className="text-[11px] font-sans text-gray-400">{subtitle}</span>
        </div>
      </div>

      <button
        onClick={onClick}
        aria-label={buttonAriaLabel}
        className={`px-3 py-1 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
          isDark
            ? `bg-night-chip hover:bg-night-hover ${darkAccentClass} border border-night-border`
            : 'bg-white hover:bg-paper text-accent border border-cream-border'
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
  const { isPrinting, printEdition } = usePrintEdition()
  useBodyScrollLock(isOpen)
  useEscapeKey(() => {
    if (isOpen) onClose()
  })

  // Where to scroll once the drawer has closed. The scroll must wait for the body scroll lock to be
  // released (useBodyScrollLock's cleanup runs before this effect), or the page cannot move.
  const pendingTargetRef = useRef<string | null>(null)
  useEffect(() => {
    if (isOpen || !pendingTargetRef.current) return
    const target = pendingTargetRef.current
    pendingTargetRef.current = null
    if (target === 'top') {
      scrollToTarget('top')
      return
    }
    const section = document.getElementById(target)
    if (section) scrollToTarget(section)
  }, [isOpen])

  const handleNavClick = (id: string) => {
    pendingTargetRef.current = id
    onClose()
  }

  const handleScrollToTop = () => {
    pendingTargetRef.current = 'top'
    onClose()
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        data-print="hide"
        className={`fixed inset-0 z-[65] transition-opacity duration-500 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto bg-black/60 backdrop-blur-sm' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-over drawer */}
      <aside
        ref={drawerRef}
        data-print="hide"
        data-lenis-prevent
        // Keep the off-screen drawer out of the tab order and accessibility tree while closed
        inert={!isOpen}
        id="side-navigation"
        role="dialog"
        aria-label="Navigation Menu"
        aria-modal={isOpen}
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[340px] sm:max-w-[420px] shadow-xl flex flex-col justify-between overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${
          isDark
            ? 'paper text-linen border-l border-night-rule'
            : 'paper text-ink border-l border-cream-border'
        }`}
      >
        {/* Header */}
        <div
          className={`p-6 sm:p-8 border-b flex items-center justify-between ${isDark ? 'border-night-rule' : 'border-cream-line'}`}
        >
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-3.5 group text-left cursor-pointer"
            aria-label="Scroll to top"
          >
            <img
              src={logoSrc}
              alt="Rikuto Mikado"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <p
                className={`font-serif text-base font-medium tracking-tight leading-none transition-colors duration-300 ${
                  isDark ? 'text-ivory' : 'text-gray-900'
                }`}
              >
                Rikuto Mikado
              </p>
              <span className="text-[11px] font-sans uppercase tracking-[0.16em] text-accent font-medium block mt-1">
                {ui.navIndex}
              </span>
            </div>
          </button>

          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            data-autofocus
            className={`p-2.5 rounded-full border transition-colors duration-300 cursor-pointer ${
              isDark
                ? 'border-night-border text-gray-400 hover:text-white hover:border-accent bg-night-chip/80'
                : 'border-cream-border text-gray-600 hover:text-ink hover:border-accent bg-white/60'
            }`}
          >
            <CloseIcon className="w-5 h-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="px-6 sm:px-8 py-8 flex-1 flex flex-col justify-center space-y-2">
          <p className="text-[11px] font-sans uppercase tracking-[0.18em] text-gray-500 font-medium mb-3 px-2">
            {ui.tableOfContents}
          </p>

          <ul className="space-y-1.5">
            {navSections.map((item) => {
              const isActive = activeSection === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full group text-left px-4 py-3 rounded-md transition-colors duration-300 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'bg-night-card text-ivory'
                          : 'bg-cream-surface text-ink'
                        : isDark
                          ? 'hover:bg-night-card text-gray-300 hover:text-white'
                          : 'hover:bg-cream-surface/60 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-xs tabular-nums transition-colors duration-300 ${
                          isActive
                            ? 'text-accent'
                            : isDark
                              ? 'text-accent/70 group-hover:text-accent'
                              : 'text-accent/70 group-hover:text-accent'
                        }`}
                      >
                        {item.page}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-serif text-lg sm:text-xl font-normal tracking-tight transition-transform duration-300 group-hover:translate-x-1 ${
                              isActive ? 'text-accent' : ''
                            }`}
                          >
                            {ui[item.labelKey]}
                          </span>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                        </div>
                        <p
                          className={`text-xs font-sans tracking-wide transition-colors duration-300 ${
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
                          ? 'opacity-100 translate-x-0 text-accent'
                          : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-accent'
                      }`}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer: quick settings, contact & socials */}
        <div className={`p-6 sm:p-8 border-t space-y-4 ${isDark ? 'border-night-rule' : 'border-cream-line'}`}>
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
            darkAccentClass="text-accent"
            badgeClassName="font-sans text-[11px] font-semibold tracking-wider"
            badge={ui.currentLangCode}
            title={ui.currentLangName}
            subtitle={isJapaneseAvailable ? ui.langSwitchHint : '日本語版は準備中 (Under Review)'}
            buttonLabel={isJapaneseAvailable ? ui.langToggle : '準備中'}
            buttonAriaLabel="Toggle language"
            onClick={onToggleLang}
          />

          <SettingRow
            isDark={isDark}
            darkAccentClass="text-accent"
            badge={<Printer className="w-3.5 h-3.5" strokeWidth={1.75} />}
            title={ui.printEdition}
            subtitle={ui.printEditionHint}
            buttonLabel={isPrinting ? ui.printPreparing : 'PDF'}
            buttonAriaLabel={ui.printEditionCta}
            onClick={() => {
              // Close the drawer (and release its scroll lock) before the print layout is captured
              onClose()
              void printEdition()
            }}
          />

          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-sans uppercase tracking-[0.16em] text-gray-500 font-medium block">
              {ui.contactAndLocation}
            </span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`font-serif text-sm hover:underline block truncate transition-colors duration-300 ${
                isDark ? 'text-ivory hover:text-accent' : 'text-gray-900 hover:text-accent'
              }`}
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-xs font-sans text-gray-400">{ui.locationText}</p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            {socialLinks.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
                  isDark
                    ? 'text-gray-300 hover:text-white hover:bg-night-card border border-night-border'
                    : 'text-gray-700 hover:text-ink hover:bg-white/60 border border-cream-border'
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

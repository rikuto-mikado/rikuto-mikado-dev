import { useEffect } from 'react'

interface NavItem {
  id: string
  num: string
  label: string
  subtitle: string
}

const navItems: NavItem[] = [
  {
    id: 'about',
    num: '01',
    label: 'About',
    subtitle: 'Vision & Physical Foundation',
  },
  {
    id: 'trajectory',
    num: '02',
    label: 'Trajectory',
    subtitle: 'Experience & Milestones',
  },
  {
    id: 'courses',
    num: '03',
    label: 'Learning',
    subtitle: 'Courses & Certifications',
  },
  {
    id: 'roadmap',
    num: '04',
    label: 'Roadmap',
    subtitle: 'Strategic 3-Phase Plan',
  },
  {
    id: 'contact',
    num: '05',
    label: 'Contact',
    subtitle: 'Get in Touch & Socials',
  },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isDark: boolean
  onToggleTheme: () => void
  activeSection: string
  logoSrc: string
  socialLinks: {
    name: string
    url: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

export default function Sidebar({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
  activeSection,
  logoSrc,
  socialLinks,
}: SidebarProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle ESC key dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
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
        className={`fixed inset-0 z-40 transition-opacity duration-500 ease-out ${
          isOpen
            ? 'opacity-100 pointer-events-auto bg-black/60 backdrop-blur-sm'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-over Drawer */}
      <aside
        id="side-navigation"
        role="dialog"
        aria-label="Navigation Menu"
        aria-modal={isOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[340px] sm:max-w-[420px] shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${
          isDark
            ? 'bg-[#161413]/95 text-[#E8E4DD] border-l border-[#2E2B27] backdrop-blur-xl'
            : 'bg-[#F9F7F2]/95 text-gray-800 border-l border-[#d4a373]/50 backdrop-blur-xl'
        }`}
      >
        {/* Decorative subtle ambient pattern line */}
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-[#9A4C22] via-[#d4a373] to-transparent opacity-80" />

        {/* Top Header */}
        <div className="p-6 sm:p-8 border-b border-dashed border-[#d4a373]/30 flex items-center justify-between">
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-3.5 group text-left cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Scroll to top"
          >
            <img
              src={logoSrc}
              alt="Rikuto Mikado"
              className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:rotate-6 transition-transform duration-300"
            />
            <div>
              <p
                className={`font-serif text-base font-bold tracking-tight leading-none transition-colors duration-300 ${
                  isDark ? 'text-[#F5F3EE]' : 'text-gray-900'
                }`}
              >
                Rikuto Mikado
              </p>
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9A4C22] font-semibold block mt-1">
                Index
              </span>
            </div>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className={`p-2.5 rounded-full border transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
              isDark
                ? 'border-[#3A352F] text-gray-400 hover:text-white hover:border-[#D4A373] bg-[#22201D]/80'
                : 'border-[#d4a373]/60 text-gray-600 hover:text-gray-900 hover:border-[#9A4C22] bg-white/80'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Navigation Links */}
        <nav className="px-6 sm:px-8 py-8 flex-1 flex flex-col justify-center space-y-2">
          <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#9A4C22] font-semibold mb-3 px-2">
            Table of Contents
          </p>

          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full group text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'bg-[#25221F] text-[#F5F3EE] shadow-sm border border-[#3A352F]'
                          : 'bg-[#EDE7DC] text-gray-900 shadow-sm border border-[#d6ccbd]'
                        : isDark
                        ? 'hover:bg-[#201D1B] text-gray-300 hover:text-white'
                        : 'hover:bg-[#EDE7DC]/60 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Number with serif style */}
                      <span
                        className={`font-serif italic text-sm transition-colors duration-300 ${
                          isActive
                            ? 'text-[#9A4C22] font-semibold'
                            : isDark
                            ? 'text-[#E0A96D]/70 group-hover:text-[#E0A96D]'
                            : 'text-[#9A4C22]/70 group-hover:text-[#9A4C22]'
                        }`}
                      >
                        {item.num}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-serif text-xl sm:text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1 ${
                              isActive ? 'text-[#9A4C22]' : ''
                            }`}
                          >
                            {item.label}
                          </span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9A4C22] animate-pulse" />
                          )}
                        </div>
                        <p
                          className={`text-xs font-sans font-light tracking-wide transition-colors duration-300 ${
                            isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'
                          }`}
                        >
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Arrow hint icon on hover/active */}
                    <svg
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? 'opacity-100 translate-x-0 text-[#9A4C22]'
                          : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#d4a373]'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 sm:p-8 border-t border-dashed border-[#d4a373]/30 space-y-6">
          {/* Quick Theme Switcher Inside Sidebar */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors duration-300 ${
              isDark ? 'bg-[#1C1A18] border-[#2D2A26]' : 'bg-[#EDE7DC]/70 border-[#dcd6c9]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isDark
                    ? 'bg-[#282522] text-[#F5C563] border border-[#3A352F]'
                    : 'bg-white text-[#9A4C22] border border-[#d4a373]/60 shadow-xs'
                }`}
              >
                {isDark ? (
                  <svg className="w-4 h-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 -rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </div>
              <div>
                <p
                  className={`text-xs font-sans font-semibold leading-none ${
                    isDark ? 'text-[#F5F3EE]' : 'text-gray-900'
                  }`}
                >
                  {isDark ? 'Dark Theme' : 'Light Theme'}
                </p>
                <span className="text-[10px] font-sans text-gray-400">
                  {isDark ? 'Midnight charcoal' : 'Warm paper ivory'}
                </span>
              </div>
            </div>

            <button
              onClick={onToggleTheme}
              aria-label="Toggle color theme"
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
                isDark
                  ? 'bg-[#292622] hover:bg-[#34302b] text-[#F5C563] border border-[#3A352F]'
                  : 'bg-white hover:bg-gray-50 text-[#9A4C22] border border-[#d4a373]/60 shadow-xs'
              }`}
            >
              Switch to {isDark ? 'Light' : 'Dark'}
            </button>
          </div>

          {/* Contact & Location info */}
          <div className="space-y-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9A4C22] font-semibold block">
              Contact & Location
            </span>
            <a
              href="mailto:mikadorikuto@gmail.com"
              className={`font-serif text-sm hover:underline block truncate transition-colors duration-300 ${
                isDark ? 'text-[#F5F3EE] hover:text-[#E0A96D]' : 'text-gray-900 hover:text-[#9A4C22]'
              }`}
            >
              mikadorikuto@gmail.com
            </a>
            <p className="text-xs font-sans text-gray-400 font-light">
              Hokkaido, Japan
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2 pt-1">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className={`p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    isDark
                      ? 'bg-[#22201D] text-gray-300 hover:text-white hover:bg-[#2C2925] border border-[#3A352F]'
                      : 'bg-white text-gray-700 hover:text-black hover:bg-gray-50 border border-[#dcd6c9] shadow-xs'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>

          <div className="text-[11px] font-sans text-gray-400 tracking-wide">
            © 2026 Rikuto Mikado
          </div>
        </div>
      </aside>
    </>
  )
}

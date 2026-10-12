import { useState, useEffect, useRef } from 'react'
import LightTrails from './components/LightTrails'
import Sidebar from './components/Sidebar'
import BlogSection from './components/BlogSection'
import type { Language, CourseItem } from './data/translations'
import { timelineEventsData, coursesData, uiText } from './data/translations'
import certFullstackWeb from './assets/cert-fullstack-web.png'
import certIndianCooking from './assets/cert-indian-cooking.png'
import certPythonBootcamp from './assets/cert-python-bootcamp.png'
import certPythonMega from './assets/cert-python-mega.png'
import myfaceImg from './assets/myface.jpeg'
import urakawaLandscape from './assets/urakawa-landscape.png'

const certImages: Record<string, string> = {
  pythonBootcamp: certPythonBootcamp,
  fullstackWeb: certFullstackWeb,
  pythonMega: certPythonMega,
  indianCooking: certIndianCooking,
}

function GithubIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

function LinkedinIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )
}

function InstagramIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function SpotifyIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.297c-.214.351-.673.463-1.024.249-2.809-1.716-6.345-2.104-10.51-1.151-.4.092-.796-.157-.887-.557-.092-.4.157-.796.557-.887 4.567-1.044 8.49-.607 11.615 1.302.351.214.463.673.249 1.024zm1.465-3.262c-.27.439-.844.577-1.282.308-3.218-1.978-8.125-2.55-11.932-1.394-.494.15-1.02-.133-1.17-.626-.15-.494.133-1.02.626-1.17 4.355-1.321 9.778-.68 13.45 1.58.439.27.577.844.308 1.282zm.126-3.41c-3.858-2.29-10.222-2.502-13.896-1.387-.592.179-1.222-.158-1.401-.75-.179-.592.158-1.222.75-1.401 4.225-1.282 11.246-1.036 15.694 1.604.533.316.707 1.01.391 1.543-.316.533-1.01.707-1.543.391z"/>
    </svg>
  )
}

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/rikuto-mikado',
    icon: GithubIcon,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rikuto-mikado',
    icon: LinkedinIcon,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/rikuto_jpn/',
    icon: InstagramIcon,
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/user/31ziidnuokqdfrdhwhyug37jxbli?si=4996df09eae84262',
    icon: SpotifyIcon,
  },
]

export default function App() {
  // Set to true once Japanese translation review is finalized
  const isJapaneseAvailable = true

  const [selectedCert, setSelectedCert] = useState<CourseItem | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred_lang')
      if (isJapaneseAvailable && (saved === 'ja' || saved === 'en')) return saved
    }
    return 'en'
  })
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  // Coming Soon Toast notification state
  const [toastMessage, setToastMessage] = useState<{ main: string; sub: string } | null>(null)
  const toastTimeoutRef = useRef<number | null>(null)

  const triggerToast = (main: string, sub: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }
    setToastMessage({ main, sub })
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  const toggleLang = () => {
    if (!isJapaneseAvailable) {
      triggerToast('日本語版は現在更新中です', 'Japanese translation is currently under review.')
      return
    }
    setLang((prev) => (prev === 'en' ? 'ja' : 'en'))
  }

  const ui = uiText[lang]
  const timelineEvents = timelineEventsData[lang]
  const courses = coursesData[lang]

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    localStorage.setItem('preferred_lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  // Scrollspy: update active section during scroll
  useEffect(() => {
    const sectionIds = ['about', 'trajectory', 'courses', 'blog', 'roadmap', 'contact']
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      className={`relative flex flex-col min-h-screen font-serif transition-colors duration-500 selection:bg-[#9A4C22] selection:text-white ${
        isDark ? 'bg-[#131211] text-[#E8E4DD]' : 'bg-[#F5F4F0] text-gray-800'
      }`}
    >
      {/* Floating Header Dock (Dark Mode Toggle, Language Switcher & Navigation Menu) */}
      <div
        className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] flex items-center p-1 sm:p-1.5 rounded-full border shadow-xl backdrop-blur-md transition-all duration-300 ${
          isDark
            ? 'bg-[#1C1A18]/85 border-[#3A352F] text-[#E8E4DD]'
            : 'bg-[#F5F4F0]/85 border-[#d4a373]/60 text-gray-800'
        }`}
      >
        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setIsDark((prev) => !prev)}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer ${
            isDark
              ? 'text-[#F5C563] hover:bg-[#282522]'
              : 'text-[#9A4C22] hover:bg-white/80'
          }`}
        >
          {isDark ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 -rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Separator */}
        <div className={`h-4 w-px mx-0.5 sm:mx-1 ${isDark ? 'bg-[#3A352F]' : 'bg-[#d4a373]/50'}`} />

        {/* Language Switcher Button (Right next to Dark Mode) */}
        <button
          onClick={toggleLang}
          aria-label={lang === 'en' ? '日本語に切り替える' : 'Switch to English'}
          title={lang === 'en' ? '日本語に切り替える' : 'Switch to English'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full font-sans text-xs font-semibold tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer ${
            isDark
              ? 'text-[#E0A96D] hover:bg-[#282522]'
              : 'text-[#9A4C22] hover:bg-white/80'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5 0 4.5-4 4.5-9s-2-9-4.5-9-4.5 4-4.5 9 2 9 4.5 9zm-9-9h18" />
          </svg>
          <span className="font-bold">{lang === 'en' ? 'JA' : 'EN'}</span>
        </button>

        {/* Separator */}
        <div className={`h-4 w-px mx-0.5 sm:mx-1 ${isDark ? 'bg-[#3A352F]' : 'bg-[#d4a373]/50'}`} />

        {/* Sidebar Menu Trigger Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          aria-label={ui.menu}
          aria-expanded={isSidebarOpen}
          aria-controls="side-navigation"
          className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 transform active:scale-95 cursor-pointer ${
            isSidebarOpen
              ? 'bg-[#9A4C22] text-white'
              : isDark
              ? 'hover:bg-[#282522] text-[#F5F3EE]'
              : 'hover:bg-white text-gray-800'
          }`}
        >
          <span className="hidden sm:inline">{ui.menu}</span>
          <div className="w-4 h-3.5 flex flex-col justify-between items-end">
            <span
              className={`h-0.5 w-4 rounded-full transition-all duration-300 ${
                isDark ? 'bg-current' : 'bg-current'
              }`}
            />
            <span
              className={`h-0.5 w-2.5 rounded-full transition-all duration-300 group-hover:w-4 ${
                isDark ? 'bg-[#E0A96D]' : 'bg-[#9A4C22]'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Floating Coming Soon Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-16 right-4 sm:top-20 sm:right-6 z-50 max-w-sm px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-300 ${
            isDark
              ? 'bg-[#1C1A18]/95 border-[#E0A96D]/50 text-[#F5F3EE]'
              : 'bg-[#FAF8F5]/95 border-[#9A4C22]/50 text-gray-900'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-1.5 rounded-full mt-0.5 shrink-0 ${
                isDark ? 'bg-[#E0A96D]/15 text-[#E0A96D]' : 'bg-[#9A4C22]/15 text-[#9A4C22]'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 pr-1">
              <p className="font-sans text-xs sm:text-sm font-semibold leading-snug">
                {toastMessage.main}
              </p>
              <p className={`font-sans text-[11px] sm:text-xs mt-0.5 leading-snug ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {toastMessage.sub}
              </p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className={`p-1 rounded-md text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
              }`}
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Slide-over Navigation Sidebar Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        lang={lang}
        onToggleLang={toggleLang}
        isJapaneseAvailable={isJapaneseAvailable}
        activeSection={activeSection}
        logoSrc="/site_icon.svg"
        socialLinks={socialLinks}
      />

      {/* Background Light Trails & Flowing Particle Effect */}
      <LightTrails />
      
      {/* 1. Hero Section */}
      <section id="hero" className="relative z-10 w-full min-h-[75vh] md:min-h-[85vh] flex flex-col justify-between items-center py-16 md:py-24 px-6">
        <div className="w-full"></div>

        {/* Hero content card */}
        <div className="max-w-4xl mx-auto text-center space-y-8 my-auto w-full">
          {/* Brand Logo */}
          <div className="flex justify-center items-center">
            <img
              src="/site_icon.svg"
              alt="RIKUTO"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Top dashed divider */}
          <div className={`border-t-2 border-dashed w-3/4 max-w-lg mx-auto transition-colors duration-500 ${
            isDark ? 'border-[#d4a373]/50' : 'border-[#d4a373]'
          }`}></div>

          <div className="space-y-4">
            <h1 className={`text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.08] transition-colors duration-500 ${
              isDark ? 'text-[#F5F3EE]' : 'text-[#231f1d]'
            }`}>
              {ui.heroGreeting} <span className="italic font-normal text-[#9A4C22]">{ui.heroName}</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-sans uppercase tracking-[0.22em] text-[#9A4C22] font-semibold">
              {ui.heroBadge}
            </p>
          </div>

          <p className={`text-base sm:text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-sans font-light px-2 transition-colors duration-500 ${
            isDark ? 'text-[#C4BEB4]' : 'text-gray-700'
          }`}>
            {ui.heroLead}
          </p>

          {/* Bottom dashed divider */}
          <div className={`border-t-2 border-dashed w-3/4 max-w-lg mx-auto transition-colors duration-500 ${
            isDark ? 'border-[#d4a373]/50' : 'border-[#d4a373]'
          }`}></div>
        </div>

        {/* Scroll indicator */}
        <div className={`text-center flex flex-col items-center gap-2 text-xs font-sans uppercase tracking-widest pt-6 transition-colors duration-500 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span>{ui.scrollPrompt}</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#9A4C22] to-transparent"></div>
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" className={`relative z-10 w-full py-24 md:py-32 px-6 border-t transition-colors duration-500 overflow-hidden scroll-mt-6 ${
        isDark ? 'bg-[#181614] border-[#262320]' : 'border-[#e6e2d8]'
      }`}>
        {/* Subtle Atmospheric Landscape Background Layer (Roots & Heritage) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {isDark && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#181614]/80 via-transparent to-[#221c17]/30 z-10 pointer-events-none" />
          )}
          <img
            src={urakawaLandscape}
            alt=""
            className={`w-full h-full object-cover object-[85%_35%] transition-opacity duration-700 ${
              isDark
                ? 'opacity-[0.30] filter contrast-110 brightness-100 saturate-[0.85]'
                : 'opacity-[0.18] filter contrast-105 saturate-[0.9]'
            }`}
            style={{
              maskImage: isDark
                ? 'radial-gradient(ellipse 85% 90% at 75% 45%, black 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.2) 100%)'
                : 'radial-gradient(ellipse 75% 85% at 80% 45%, black 25%, rgba(0,0,0,0.35) 65%, transparent 95%)',
              WebkitMaskImage: isDark
                ? 'radial-gradient(ellipse 85% 90% at 75% 45%, black 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.2) 100%)'
                : 'radial-gradient(ellipse 75% 85% at 80% 45%, black 25%, rgba(0,0,0,0.35) 65%, transparent 95%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Detailed Narrative (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-sans uppercase tracking-widest text-[#9A4C22] font-semibold block">
                {ui.aboutSectionBadge}
              </span>
              <h2 className="text-4xl md:text-5xl text-[#9A4C22] italic font-serif leading-tight">
                {ui.aboutHeading}
              </h2>
            </div>

            {/* Core Mission Statement */}
            <div className={`p-6 rounded-2xl border-l-4 border-[#9A4C22] space-y-2 transition-colors duration-500 ${
              isDark ? 'bg-[#1E1C1A]' : 'bg-[#ede8de]'
            }`}>
              <p className={`text-xl md:text-2xl font-serif italic leading-snug transition-colors duration-500 ${
                isDark ? 'text-[#F5F3EE]' : 'text-gray-900'
              }`}>
                {ui.aboutQuote}
              </p>
            </div>

            {/* Detailed Body Paragraphs */}
            <div className={`space-y-5 font-sans text-base md:text-lg leading-relaxed font-light transition-colors duration-500 ${
              isDark ? 'text-[#C4BEB4]' : 'text-gray-700'
            }`}>
              <p>{ui.aboutP1}</p>
              <p>{ui.aboutP2}</p>
              <p>{ui.aboutP3}</p>
            </div>

            {/* Focus Badges */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-colors duration-500 ${
                isDark
                  ? 'bg-[#22201D] text-[#E0A96D] border border-[#3A352F]'
                  : 'bg-[#eae4da] text-[#783515] border border-[#d6ccbd]'
              }`}>
                {ui.aboutBadge1}
              </span>
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-colors duration-500 ${
                isDark
                  ? 'bg-[#22201D] text-[#E0A96D] border border-[#3A352F]'
                  : 'bg-[#eae4da] text-[#783515] border border-[#d6ccbd]'
              }`}>
                {ui.aboutBadge2}
              </span>
            </div>
          </div>

          {/* Right: Arch Profile Photo */}
          <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-16">
            <div className="relative group">
              {/* Outer decorative dashed frame */}
              <div className="absolute -inset-3 rounded-t-full border-2 border-dashed border-[#d4a373] pointer-events-none"></div>

              {/* Arch container */}
              <div className={`relative w-64 sm:w-72 lg:w-80 xl:w-[22rem] h-84 sm:h-96 lg:h-[28rem] xl:h-[31rem] rounded-t-full overflow-hidden shadow-2xl border-4 transition-all duration-500 ${
                isDark ? 'border-[#2D2A26] bg-[#1E1C1A]' : 'border-white bg-gray-200'
              }`}>
                <img
                  src={myfaceImg}
                  alt="Rikuto Mikado"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="mt-6 text-center space-y-1.5">
              <p className={`font-serif italic text-2xl transition-colors duration-500 ${
                isDark ? 'text-[#F5F3EE]' : 'text-gray-900'
              }`}>{ui.aboutPhotoName}</p>
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#9A4C22] font-semibold">
                {ui.aboutPhotoPlace}
              </p>
              <p className={`font-sans text-xs font-light transition-colors duration-500 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {ui.aboutPhotoDesc}
              </p>
            </div>

            {/* Subtle Roots / Origin card */}
            <div className={`mt-5 px-5 py-3 rounded-xl border text-center transition-colors duration-500 w-full max-w-[280px] sm:max-w-xs ${
              isDark
                ? 'bg-[#181615]/85 border-[#2D2A26] text-gray-400'
                : 'bg-[#ede8de]/80 border-[#dcd6c9] text-gray-600'
            }`}>
              <span className="block text-[11px] font-sans uppercase tracking-widest text-[#9A4C22] font-semibold">
                {ui.aboutOriginTitle}
              </span>
              <p className="text-xs font-sans font-light mt-0.5">
                {ui.aboutOriginDesc}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Background & Experience Section */}
      <section id="trajectory" className={`relative z-10 w-full py-24 md:py-32 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-[#262320]' : 'border-[#e6e2d8]'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-sans uppercase tracking-widest text-[#9A4C22] font-semibold block">
              {ui.trajectoryBadge}
            </span>
            <h2 className="text-4xl md:text-5xl text-[#9A4C22] italic font-serif">
              {ui.trajectoryHeading}
            </h2>
            <p className={`text-base font-sans max-w-2xl mx-auto leading-relaxed transition-colors duration-500 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {ui.trajectoryLead}
            </p>
          </div>
          
          {/* Timeline list */}
          <div className="relative border-l-2 border-[#d4a373] max-w-2xl mx-auto space-y-14 pl-8 py-4">
            {timelineEvents.map((item, index) => (
              <div key={index} className="relative group">
                {/* Horizontal dashed connector */}
                <div className="absolute -left-[34px] top-3.5 w-8 border-t-2 border-dashed border-[#d4a373]"></div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-block text-xs font-sans font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full transition-colors duration-500 ${
                      isDark
                        ? 'text-[#E0A96D] bg-[#22201D] border border-[#3A352F]'
                        : 'text-[#9A4C22] bg-[#eae4da] border border-[#d6ccbd]'
                    }`}>
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
                      <span className={`inline-block text-xs font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors duration-500 ${
                        isDark ? 'text-emerald-300 bg-emerald-950/70 border border-emerald-800/60' : 'text-emerald-800 bg-emerald-100'
                      }`}>
                        {ui.statusCurrent}
                      </span>
                    )}
                    {item.isUpcoming && (
                      <span className={`inline-block text-xs font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors duration-500 ${
                        isDark ? 'text-amber-300 bg-amber-950/70 border border-amber-800/60' : 'text-amber-800 bg-amber-100'
                      }`}>
                        {ui.statusRoadmap}
                      </span>
                    )}
                  </div>

                  <h3 className={`font-serif italic text-xl md:text-2xl font-semibold leading-snug transition-colors duration-500 ${
                    isDark ? 'text-[#F5F3EE]' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`font-sans text-sm md:text-base leading-relaxed font-light transition-colors duration-500 ${
                    isDark ? 'text-[#C4BEB4]' : 'text-gray-700'
                  }`}>
                    {item.narrative}
                  </p>

                  {item.details && item.details.length > 0 && (
                    <ul className="mt-3.5 space-y-2 font-sans text-xs sm:text-sm pl-0.5">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5">
                          <span
                            className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${
                              isDark ? 'bg-[#E0A96D]' : 'bg-[#9A4C22]'
                            }`}
                          />
                          <span
                            className={`leading-relaxed font-light ${
                              isDark ? 'text-[#C4BEB4]' : 'text-gray-700'
                            }`}
                          >
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Courses & Continuous Learning (Udemy Certificates) */}
      <section id="courses" className={`relative z-10 w-full py-24 md:py-32 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-[#262320]' : 'border-[#e6e2d8]'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-sans uppercase tracking-widest text-[#9A4C22] font-semibold block">
              {ui.coursesBadge}
            </span>
            <h2 className="text-4xl md:text-5xl text-[#9A4C22] italic font-serif">
              {ui.coursesHeading}
            </h2>
            <p className={`text-base font-sans max-w-2xl mx-auto leading-relaxed transition-colors duration-500 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {ui.coursesLead}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {courses.map((course, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCert(course)}
                className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#1C1A18] border border-[#2D2A26] shadow-md hover:shadow-2xl hover:border-[#D4A373]/50'
                    : 'bg-white border border-[#e5ded4] shadow-sm hover:shadow-xl hover:border-[#d4a373]'
                }`}
              >
                {/* Certificate image preview container */}
                <div className={`relative aspect-[16/10] overflow-hidden border-b transition-colors duration-500 ${
                  isDark ? 'bg-[#151413] border-[#2D2A26]' : 'bg-gray-100 border-[#ece6dd]'
                }`}>
                  <img
                    src={certImages[course.imageKey]}
                    alt={course.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle hover overlay hint */}
                  <div className="absolute inset-0 bg-[#2b2623]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white/95 text-gray-900 text-xs font-sans font-semibold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                      {ui.viewCert}
                    </span>
                  </div>
                </div>

                {/* Card details */}
                <div className="p-6 md:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-sans font-semibold">
                      <span className={`uppercase tracking-wider px-2.5 py-1 rounded-md transition-colors duration-500 ${
                        isDark
                          ? 'text-[#E0A96D] bg-[#24211D] border border-[#3A352F]'
                          : 'text-[#9A4C22] bg-[#F5F4F0] border border-[#e3dbcd]'
                      }`}>
                        {course.category}
                      </span>
                      <span className={`transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{course.date}</span>
                    </div>

                    <h3 className={`font-serif text-lg md:text-xl font-bold leading-snug transition-colors duration-300 ${
                      isDark
                        ? 'text-[#F5F3EE] group-hover:text-[#E0A96D]'
                        : 'text-gray-900 group-hover:text-[#9A4C22]'
                    }`}>
                      {course.title}
                    </h3>

                    {course.note && (
                      <p className={`font-sans text-xs sm:text-sm leading-relaxed font-light transition-colors duration-500 ${
                        isDark ? 'text-[#C4BEB4]' : 'text-gray-600'
                      }`}>
                        {course.note}
                      </p>
                    )}
                  </div>

                  {/* Metadata footer */}
                  <div className={`pt-3 border-t flex items-center justify-between text-xs font-sans transition-colors duration-500 ${
                    isDark ? 'border-[#262320] text-gray-400' : 'border-[#f0ebe3] text-gray-600'
                  }`}>
                    <span>
                      {ui.instructor}: <strong className={`font-medium transition-colors duration-500 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-800'}`}>{course.instructor}</strong>
                    </span>
                    <span className={`px-2 py-0.5 rounded font-medium transition-colors duration-500 ${
                      isDark ? 'bg-[#262320] text-gray-300' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {course.hours}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className={`relative rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-5 transition-colors duration-300 ${
              isDark ? 'bg-[#181615] text-[#E8E4DD]' : 'bg-white text-gray-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close button */}
            <div className={`flex items-start justify-between border-b pb-4 transition-colors duration-300 ${
              isDark ? 'border-[#2E2B27]' : 'border-gray-200'
            }`}>
              <div>
                <span className="text-xs uppercase tracking-wider font-sans font-semibold text-[#9A4C22]">
                  {selectedCert.platform} {ui.certCompletion}
                </span>
                <h3 className={`font-serif text-2xl font-bold mt-1 transition-colors duration-300 ${
                  isDark ? 'text-[#F5F3EE]' : 'text-gray-900'
                }`}>
                  {selectedCert.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
                className={`text-3xl font-light leading-none p-1 transition-colors cursor-pointer ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-800'
                }`}
              >
                &times;
              </button>
            </div>

            {/* Full certificate image */}
            <div className={`rounded-xl overflow-hidden border shadow-inner transition-colors duration-300 ${
              isDark ? 'border-[#2E2B27] bg-[#121110]' : 'border-gray-200 bg-gray-50'
            }`}>
              <img
                src={certImages[selectedCert.imageKey]}
                alt={selectedCert.title}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Footer metadata */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs font-sans transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <div>
                <span className="block text-gray-400 uppercase text-[10px] tracking-wider">{ui.instructor}</span>
                <span className={`font-semibold transition-colors duration-300 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-800'}`}>{selectedCert.instructor}</span>
              </div>
              <div>
                <span className="block text-gray-400 uppercase text-[10px] tracking-wider">{ui.date}</span>
                <span className={`font-semibold transition-colors duration-300 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-800'}`}>{selectedCert.date}</span>
              </div>
              <div>
                <span className="block text-gray-400 uppercase text-[10px] tracking-wider">{ui.length}</span>
                <span className={`font-semibold transition-colors duration-300 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-800'}`}>{selectedCert.hours}</span>
              </div>
              <div>
                <span className="block text-gray-400 uppercase text-[10px] tracking-wider">{ui.certId}</span>
                <span className={`font-mono truncate block transition-colors duration-300 ${isDark ? 'text-[#D4A373]' : 'text-gray-800'}`} title={selectedCert.certificateId}>
                  {selectedCert.certificateId.slice(0, 15)}...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Blog & Perspectives Section */}
      <BlogSection lang={lang} isDark={isDark} />

      {/* 6. Roadmap & Vision Section */}
      <section id="roadmap" className="relative w-full text-[#F5F4F0] py-28 px-6 scroll-mt-6">
        <div className="absolute inset-0 bg-[#344432] z-0 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-sans uppercase tracking-widest text-[#c29c6d] font-semibold block">
              {ui.roadmapBadge}
            </span>
            <h2 className="text-4xl md:text-5xl italic font-serif">{ui.roadmapHeading}</h2>
            <p className="text-sm sm:text-base font-sans text-[#F5F4F0]/80 max-w-2xl mx-auto leading-relaxed font-light">
              {ui.roadmapLead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 font-sans">
            {/* Column 1: Technical Institution Period */}
            <div className="bg-white/5 p-8 sm:p-9 rounded-2xl border border-white/10 flex flex-col justify-between hover:bg-white/[0.07] transition-colors">
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#c29c6d] block font-sans">
                    {ui.roadmapCol1Tag}
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-[#d4a373] leading-snug">
                    {ui.roadmapCol1Title}
                  </h3>
                </div>
                <div className="border-t border-[#c29c6d]/30 w-16 my-3"></div>
                <p className="text-sm sm:text-base text-[#F5F4F0]/90 leading-relaxed font-light">
                  {ui.roadmapCol1Body}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-[#c29c6d] font-medium">
                {ui.roadmapCol1Footer}
              </div>
            </div>

            {/* Column 2: Field Experience & UK Degree */}
            <div className="bg-white/5 p-8 sm:p-9 rounded-2xl border border-white/10 flex flex-col justify-between hover:bg-white/[0.07] transition-colors">
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#c29c6d] block font-sans">
                    {ui.roadmapCol2Tag}
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-[#d4a373] leading-snug">
                    {ui.roadmapCol2Title}
                  </h3>
                </div>
                <div className="border-t border-[#c29c6d]/30 w-16 my-3"></div>
                <p className="text-sm sm:text-base text-[#F5F4F0]/90 leading-relaxed font-light">
                  {ui.roadmapCol2Body}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-[#c29c6d] font-medium">
                {ui.roadmapCol2Footer}
              </div>
            </div>

            {/* Column 3: Career Leap & Research */}
            <div className="bg-white/5 p-8 sm:p-9 rounded-2xl border border-white/10 flex flex-col justify-between hover:bg-white/[0.07] transition-colors">
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#c29c6d] block font-sans">
                    {ui.roadmapCol3Tag}
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-[#d4a373] leading-snug">
                    {ui.roadmapCol3Title}
                  </h3>
                </div>
                <div className="border-t border-[#c29c6d]/30 w-16 my-3"></div>
                <p className="text-sm sm:text-base text-[#F5F4F0]/90 leading-relaxed font-light">
                  {ui.roadmapCol3Body}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-[#c29c6d] font-medium">
                {ui.roadmapCol3Footer}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer Section */}
      <footer id="contact" className="relative w-full text-[#F5F4F0] py-20 px-6 scroll-mt-6">
        <div className="absolute inset-0 bg-[#9A4C22] z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-10">
          <div className="flex flex-col md:flex-row items-center justify-between w-full border-b border-[#c29c6d]/60 pb-10 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#eed6be] font-sans block mb-1">
                {ui.footerContact}
              </span>
              <a
                href="mailto:mikadorikuto@gmail.com"
                className="font-serif text-2xl sm:text-3xl hover:underline underline-offset-4 transition-all"
              >
                mikadorikuto@gmail.com
              </a>
            </div>

            {/* Social media links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all transform hover:scale-110 text-[#F5F4F0]"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="text-center font-sans text-xs text-[#eed6be]/80 tracking-wide">
            {ui.copyright}
          </div>
        </div>
      </footer>

    </div>
  )
}

import { useState, useEffect } from 'react'
import LightTrails from './components/LightTrails'
import certFullstackWeb from './assets/cert-fullstack-web.png'
import certIndianCooking from './assets/cert-indian-cooking.png'
import certPythonBootcamp from './assets/cert-python-bootcamp.png'
import certPythonMega from './assets/cert-python-mega.png'
import myfaceImg from './assets/myface.jpeg'
import logoForDay from './assets/favicon-02.png'  // Black circular badge for day
import logoForNight from './assets/01-original.png' // Cream circular badge for night
import urakawaLandscape from './assets/urakawa-landscape.png'

interface TimelineItem {
  period: string
  duration?: string
  location?: string
  category: string
  title: string
  narrative: string
  isCurrent?: boolean
  isUpcoming?: boolean
}

interface CourseItem {
  title: string
  instructor: string
  hours: string
  platform: string
  date: string
  category: string
  note?: string
  image: string
  certificateId: string
}

const timelineEvents: TimelineItem[] = [
  {
    period: 'Spring 2027',
    category: 'Future Enrollment',
    location: 'Hokkaido, Japan',
    title: 'Advanced Vocational Technical Institute (Electrical Engineering)',
    narrative:
      'Planned enrollment in an advanced polytechnic institute to master both theoretical foundations and hands-on industrial competencies in electrical engineering.',
    isUpcoming: true,
  },
  {
    period: 'Sep 2026 - Present',
    duration: 'Current',
    category: 'Strategic Pivot & Preparation',
    location: 'Urakawa, Hokkaido, Japan',
    title: 'Physical Infrastructure Pivot & Core Certification Studies',
    narrative:
      'Briefly relocated to Latvia for a Computer Science bachelor’s program, but returned to Japan within weeks after reassessing local living costs and the rapid acceleration of AI technologies. Observing the structural shifts driven by LLMs, strategically pivoted to secure a "physical insurance policy." Transitioned focus to physical infrastructure and electrical engineering—actively preparing for core national licenses including Third-Class Chief Electrical Engineer—while maintaining full-stack development skills as a high-leverage tool for long-term adaptability.',
    isCurrent: true,
  },
  {
    period: 'Jun 2025 - Aug 2026',
    duration: '1 yr 3 mos',
    category: 'Independent Living & Intensive Dev',
    location: 'Sapporo, Hokkaido, Japan',
    title: 'Self-Directed Full-Stack Training & Life Independence',
    narrative:
      'Lived independently in Sapporo with family support, dedicating daily schedules to intensive full-stack development through Udemy while mastering essential life skills such as cooking and personal discipline. Clarified personal priorities and core values, cultivating the autonomous capability to learn and iterate without relying on a mentor.',
  },
  {
    period: 'Jan 2025 - Jun 2025',
    duration: '6 mos',
    category: 'Exploration & Foundation Building',
    location: 'Urakawa, Hokkaido, Japan',
    title: 'Academic Exploration, AI Literacy & Software Initiation',
    narrative:
      'Following early high school graduation, utilized the Sophia learning platform with the initial goal of enrolling in a US distance-learning university. Read research papers, tracked global developments, and used cutting-edge generative AI to accelerate information gathering while gaining hands-on understanding of both AI power and hallucination risks. Shifted from the US distance-degree plan to commit fully to full-stack development, establishing a strict self-management routine.',
  },
  {
    period: 'Jun 2024 - Feb 2025',
    duration: '9 mos',
    category: 'High School Education',
    location: 'Online / US Accredited',
    title: 'Penn Foster Group — Early High School Diploma',
    narrative:
      'Transferred from local schooling to Penn Foster Group and accelerated coursework to graduate early with an official US High School Diploma.',
  },
  {
    period: 'Apr 2023 - May 2024',
    duration: '1 yr 1 mo',
    category: 'Secondary Education',
    location: 'Urakawa, Hokkaido, Japan',
    title: 'Hokkaido Urakawa High School',
    narrative: 'Enrolled in high school education, establishing foundational academic disciplines.',
  },
]

const courses: CourseItem[] = [
  {
    title: 'The Complete Python Bootcamp From Zero to Hero',
    instructor: 'Jose Portilla',
    hours: '22 hrs',
    platform: 'Udemy',
    date: 'May 2025',
    category: 'Python & Software Logic',
    note: 'Foundational programming concepts, OOP, and automation scripts.',
    image: certPythonBootcamp,
    certificateId: 'UC-2564e41c-d6d2-4262-9340-eaef1bad012c',
  },
  {
    title: 'The Complete Full-Stack Web Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    hours: '61.5 hrs',
    platform: 'Udemy',
    date: 'Sep 2025',
    category: 'Full-Stack Architecture',
    note: 'Comprehensive client-server development, databases, REST APIs, and modern frontend.',
    image: certFullstackWeb,
    certificateId: 'UC-edecf7ff-e086-4b2c-b515-04ffa3639a18',
  },
  {
    title: 'Python Mega Course: Build 20 Real-World Apps & AI Agents',
    instructor: 'Ardit Sulce',
    hours: '50.5 hrs',
    platform: 'Udemy',
    date: 'Mar 2026',
    category: 'AI Agents & Production Apps',
    note: 'Practical agentic workflows, API integrations, and standalone production tools.',
    image: certPythonMega,
    certificateId: 'UC-63511031-1538-46ec-87d1-89c031c7ffec',
  },
  {
    title: 'INDIAN COOKING - RESTAURANT STYLE COOKING COURSE',
    instructor: 'Satvir Singh',
    hours: '6.5 hrs',
    platform: 'Udemy',
    date: 'Oct 2026',
    category: 'Life Skills & Culinary Craft',
    note: 'Culinary self-reliance mastered during independent living in Sapporo.',
    image: certIndianCooking,
    certificateId: 'UC-6290b034-8ffd-48a0-b549-9c08c6f18786',
  },
]

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
  const [selectedCert, setSelectedCert] = useState<CourseItem | null>(null)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Dynamically update browser tab favicon (swapped as requested)
    const favicons = document.querySelectorAll<HTMLLinkElement>("link[rel~='icon']")
    favicons.forEach((favicon) => {
      favicon.removeAttribute('media')
      favicon.href = isDark ? '/favicon-light.png' : '/favicon-dark.png'
    })
  }, [isDark])

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
      {/* Fixed Dark Mode Toggle Button */}
      <button
        onClick={() => setIsDark((prev) => !prev)}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`fixed top-5 right-5 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full border shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-md cursor-pointer ${
          isDark
            ? 'bg-[#1C1A18]/85 text-[#F5C563] border-[#3A352F] hover:bg-[#282522] hover:border-[#D4A373]'
            : 'bg-[#F5F4F0]/85 text-[#9A4C22] border-[#d4a373]/60 hover:bg-white hover:border-[#9A4C22]'
        }`}
      >
        {isDark ? (
          <svg className="w-5 h-5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 -rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* Background Light Trails & Flowing Particle Effect */}
      <LightTrails />
      
      {/* 1. Hero Section */}
      <section className="relative z-10 w-full min-h-[75vh] md:min-h-[85vh] flex flex-col justify-between items-center py-16 md:py-24 px-6">
        <div className="w-full"></div>

        {/* Hero content card */}
        <div className="max-w-4xl mx-auto text-center space-y-8 my-auto w-full">
          {/* Brand Logo */}
          <div className="flex justify-center items-center">
            <img
              src={isDark ? logoForNight : logoForDay}
              alt="RIKUTO"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-sm hover:scale-105 transition-transform duration-300"
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
              Hello, I am <span className="italic font-normal text-[#9A4C22]">Rikuto.</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-sans uppercase tracking-[0.22em] text-[#9A4C22] font-semibold">
              Physical Infrastructure & Electrical Engineering • Full-Stack Development
            </p>
          </div>

          <p className={`text-base sm:text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-sans font-light px-2 transition-colors duration-500 ${
            isDark ? 'text-[#C4BEB4]' : 'text-gray-700'
          }`}>
            Securing a physical insurance policy in the AI era. Anchoring software capabilities in the electrical and hardware infrastructure that powers modern civilization.
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
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#9A4C22] to-transparent"></div>
        </div>
      </section>

      {/* 2. About Section */}
      <section className={`relative z-10 w-full py-24 md:py-32 px-6 border-t transition-colors duration-500 overflow-hidden ${
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
                Vision & Roadmap
              </span>
              <h2 className="text-4xl md:text-5xl text-[#9A4C22] italic font-serif leading-tight">
                About Rikuto Mikado
              </h2>
            </div>

            {/* Core Mission Statement */}
            <div className={`p-6 rounded-2xl border-l-4 border-[#9A4C22] space-y-2 transition-colors duration-500 ${
              isDark ? 'bg-[#1E1C1A]' : 'bg-[#ede8de]'
            }`}>
              <p className={`text-xl md:text-2xl font-serif italic leading-snug transition-colors duration-500 ${
                isDark ? 'text-[#F5F3EE]' : 'text-gray-900'
              }`}>
                "My long-term goal is to pursue knowledge, eventually engage in agriculture, and help preserve human creativity."
              </p>
            </div>

            {/* Detailed Body Paragraphs */}
            <div className={`space-y-5 font-sans text-base md:text-lg leading-relaxed font-light transition-colors duration-500 ${
              isDark ? 'text-[#C4BEB4]' : 'text-gray-700'
            }`}>
              <p>
                Although I originally trained in full-stack development, observing the rapid trajectory of large language models and generative AI convinced me to secure a <strong className={`font-semibold transition-colors duration-500 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-900'}`}>"physical insurance policy."</strong> True resilience lies in understanding and operating the physical layer—the electrical grids, circuitry, and physical infrastructure that underpin all digital systems.
              </p>

              <p>
                To realize this transition, I plan to pursue advanced technical institute training in Electrical Engineering. I am actively working toward key national licenses, including <strong className={`font-semibold transition-colors duration-500 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-900'}`}>Third-Class Chief Electrical Engineer</strong> and <strong className={`font-semibold transition-colors duration-500 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-900'}`}>First-Class Electrician</strong>, alongside global network credentials such as <strong className={`font-semibold transition-colors duration-500 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-900'}`}>Cisco CCNP Enterprise</strong>. To support my mid-term international opportunities, I am targeting an <strong className={`font-semibold transition-colors duration-500 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-900'}`}>IELTS Academic score of 6.5+</strong>.
              </p>

              <p>
                In two years, as I enter the industry to accumulate at least 3 years of hands-on field experience, I plan to concurrently advance through the <strong className={`font-semibold transition-colors duration-500 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-900'}`}>OTHM Diploma pathway</strong> toward an accredited UK Bachelor’s degree. Meanwhile, full-stack development remains a high-leverage additional tool, giving me unique cross-disciplinary adaptability.
              </p>
            </div>

            {/* Focus Badges */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-colors duration-500 ${
                isDark
                  ? 'bg-[#22201D] text-[#E0A96D] border border-[#3A352F]'
                  : 'bg-[#eae4da] text-[#783515] border border-[#d6ccbd]'
              }`}>
                ⚡ Electrical Engineering & Infrastructure
              </span>
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-colors duration-500 ${
                isDark
                  ? 'bg-[#22201D] text-[#E0A96D] border border-[#3A352F]'
                  : 'bg-[#eae4da] text-[#783515] border border-[#d6ccbd]'
              }`}>
                💻 Full-Stack Development
              </span>
            </div>
          </div>

          {/* Right: Arch Profile Photo */}
          <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-16">
            <div className="relative group">
              {/* Outer decorative dashed frame */}
              <div className="absolute -inset-3 rounded-t-full border-2 border-dashed border-[#d4a373] pointer-events-none"></div>

              {/* Arch container: compact on mobile, prominently enlarged on desktop */}
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
              }`}>Rikuto Mikado</p>
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#9A4C22] font-semibold">
                Urakawa / Sapporo, Hokkaido, Japan
              </p>
              <p className={`font-sans text-xs font-light transition-colors duration-500 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Physical Layer • Systems • Autonomous Learning
              </p>
            </div>

            {/* Subtle Roots / Origin card connecting to the background scenery */}
            <div className={`mt-5 px-5 py-3 rounded-xl border text-center transition-colors duration-500 w-full max-w-[280px] sm:max-w-xs ${
              isDark
                ? 'bg-[#181615]/85 border-[#2D2A26] text-gray-400'
                : 'bg-[#ede8de]/80 border-[#dcd6c9] text-gray-600'
            }`}>
              <span className="block text-[11px] font-sans uppercase tracking-widest text-[#9A4C22] font-semibold">
                Origin & Landscape
              </span>
              <p className="text-xs font-sans font-light mt-0.5">
                Hidaka Coastal Region • Hokkaido, Japan
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Background & Experience Section */}
      <section className={`relative z-10 w-full py-24 md:py-32 px-6 border-t transition-colors duration-500 ${
        isDark ? 'border-[#262320]' : 'border-[#e6e2d8]'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-sans uppercase tracking-widest text-[#9A4C22] font-semibold block">
              Trajectory
            </span>
            <h2 className="text-4xl md:text-5xl text-[#9A4C22] italic font-serif">
              Experience & Milestones
            </h2>
            <p className={`text-base font-sans max-w-2xl mx-auto leading-relaxed transition-colors duration-500 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              A transparent chronicle of self-directed exploration, strategic recalibrations, and proactive skill acquisition.
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
                        Current Focus
                      </span>
                    )}
                    {item.isUpcoming && (
                      <span className={`inline-block text-xs font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors duration-500 ${
                        isDark ? 'text-amber-300 bg-amber-950/70 border border-amber-800/60' : 'text-amber-800 bg-amber-100'
                      }`}>
                        Roadmap
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Courses & Continuous Learning (Udemy Certificates) */}
      <section className={`relative z-10 w-full py-24 md:py-32 px-6 border-t transition-colors duration-500 ${
        isDark ? 'border-[#262320]' : 'border-[#e6e2d8]'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-sans uppercase tracking-widest text-[#9A4C22] font-semibold block">
              Skill Acquisition
            </span>
            <h2 className="text-4xl md:text-5xl text-[#9A4C22] italic font-serif">
              Courses & Continuous Learning
            </h2>
            <p className={`text-base font-sans max-w-2xl mx-auto leading-relaxed transition-colors duration-500 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Certified coursework completed through intensive independent study across software engineering, AI tooling, and essential life skills. Click any certificate to inspect credentials.
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
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle hover overlay hint */}
                  <div className="absolute inset-0 bg-[#2b2623]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white/95 text-gray-900 text-xs font-sans font-semibold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                      View Certificate 🔍
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
                      Instructor: <strong className={`font-medium transition-colors duration-500 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-800'}`}>{course.instructor}</strong>
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
                  {selectedCert.platform} Certificate of Completion
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
                className={`text-3xl font-light leading-none p-1 transition-colors ${
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
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Footer metadata */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs font-sans transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <div>
                <span className="block text-gray-400 uppercase text-[10px] tracking-wider">Instructor</span>
                <span className={`font-semibold transition-colors duration-300 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-800'}`}>{selectedCert.instructor}</span>
              </div>
              <div>
                <span className="block text-gray-400 uppercase text-[10px] tracking-wider">Date</span>
                <span className={`font-semibold transition-colors duration-300 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-800'}`}>{selectedCert.date}</span>
              </div>
              <div>
                <span className="block text-gray-400 uppercase text-[10px] tracking-wider">Length</span>
                <span className={`font-semibold transition-colors duration-300 ${isDark ? 'text-[#F5F3EE]' : 'text-gray-800'}`}>{selectedCert.hours}</span>
              </div>
              <div>
                <span className="block text-gray-400 uppercase text-[10px] tracking-wider">Certificate ID</span>
                <span className={`font-mono truncate block transition-colors duration-300 ${isDark ? 'text-[#D4A373]' : 'text-gray-800'}`} title={selectedCert.certificateId}>
                  {selectedCert.certificateId.slice(0, 15)}...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Roadmap & Vision Section */}
      <section className="relative w-full text-[#F5F4F0] py-28 px-6">
        <div className="absolute inset-0 bg-[#344432] z-0 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-sans uppercase tracking-widest text-[#c29c6d] font-semibold block">
              Strategic Progression
            </span>
            <h2 className="text-4xl md:text-5xl italic font-serif">Roadmap & Vision</h2>
            <p className="text-sm sm:text-base font-sans text-[#F5F4F0]/80 max-w-2xl mx-auto leading-relaxed font-light">
              A phased progression connecting software logic with physical electrical expertise, targeting high-stakes infrastructure and long-term facility mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 font-sans">
            {/* Column 1: Current Focus */}
            <div className="bg-white/5 p-8 sm:p-9 rounded-2xl border border-white/10 flex flex-col justify-between hover:bg-white/[0.07] transition-colors">
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#c29c6d] block font-sans">
                    Current Phase
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-[#d4a373] leading-snug">
                    "Bridging digital and physical"
                  </h3>
                </div>
                <div className="border-t border-[#c29c6d]/30 w-16 my-3"></div>
                <p className="text-sm sm:text-base text-[#F5F4F0]/90 leading-relaxed font-light">
                  Building upon the structured logical thinking cultivated through full-stack development (React, Django, and modern web architectures), I am currently focused on foundational electrical engineering principles and intensive IELTS English preparation. This phase establishes a grounded baseline to seamlessly understand both the digital software layer and the physical systems beneath it.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-[#c29c6d] font-medium">
                Focus: Electrical Fundamentals • IELTS Academic
              </div>
            </div>

            {/* Column 2: Next 2 Years */}
            <div className="bg-white/5 p-8 sm:p-9 rounded-2xl border border-white/10 flex flex-col justify-between hover:bg-white/[0.07] transition-colors">
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#c29c6d] block font-sans">
                    Next 2 Years
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-[#d4a373] leading-snug">
                    "Deepening domain expertise"
                  </h3>
                </div>
                <div className="border-t border-[#c29c6d]/30 w-16 my-3"></div>
                <p className="text-sm sm:text-base text-[#F5F4F0]/90 leading-relaxed font-light">
                  Over the next two years in advanced vocational training, I will systematically acquire practical electrical engineering and infrastructure competencies. I aim to secure both First-Class Electrician and Third-Class Chief Electrical Engineer licenses while attaining an IELTS score of 6.0–6.5, unlocking direct access to global technical documentation and worldwide engineering networks.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-[#c29c6d] font-medium">
                Target: Chief Electrical Engineer • 1st-Class Electrician
              </div>
            </div>

            {/* Column 3: Long-Term Vision */}
            <div className="bg-white/5 p-8 sm:p-9 rounded-2xl border border-white/10 flex flex-col justify-between hover:bg-white/[0.07] transition-colors">
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#c29c6d] block font-sans">
                    Long-Term Vision
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-[#d4a373] leading-snug">
                    "Expanding the horizon"
                  </h3>
                </div>
                <div className="border-t border-[#c29c6d]/30 w-16 my-3"></div>
                <p className="text-sm sm:text-base text-[#F5F4F0]/90 leading-relaxed font-light">
                  Upon entering the industry, while accumulating field experience in high-reliability environments, I will advance continuous engineering studies through international online degree pathways. Targeting advanced credentials such as Qualified Energy Manager and Cisco CCNP Enterprise, my ultimate aspiration is to become a trusted Critical Facility Engineer managing vital industrial and computational infrastructure.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-[#c29c6d] font-medium">
                Goal: Critical Facility Engineer • UK Degree • Energy Manager
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer Section */}
      <footer className="relative w-full text-[#F5F4F0] py-20 px-6">
        <div className="absolute inset-0 bg-[#9A4C22] z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-10">
          <div className="flex flex-col md:flex-row items-center justify-between w-full border-b border-[#c29c6d]/60 pb-10 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#eed6be] font-sans block mb-1">
                Direct Contact
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
            © 2026 Rikuto Mikado. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  )
}

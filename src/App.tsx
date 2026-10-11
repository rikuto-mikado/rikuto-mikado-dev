import { useState, useEffect } from 'react'
import LightTrails from './components/LightTrails'
import certFullstackWeb from './assets/cert-fullstack-web.png'
import certIndianCooking from './assets/cert-indian-cooking.png'
import certPythonBootcamp from './assets/cert-python-bootcamp.png'
import certPythonMega from './assets/cert-python-mega.png'
import myfaceImg from './assets/myface.jpeg'
import heroLogo from './assets/favicon-02.png'

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
]

export default function App() {
  const [selectedCert, setSelectedCert] = useState<CourseItem | null>(null)

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
    <div className="relative flex flex-col min-h-screen font-serif text-gray-800 bg-[#F5F4F0] selection:bg-[#9A4C22] selection:text-white">
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
              src={heroLogo}
              alt="RIKUTO"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-sm hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Top dashed divider */}
          <div className="border-t-2 border-dashed border-[#d4a373] w-3/4 max-w-lg mx-auto"></div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#231f1d] leading-[1.08]">
              Hello, I am <span className="italic font-normal text-[#9A4C22]">Rikuto.</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-sans uppercase tracking-[0.22em] text-[#9A4C22] font-semibold">
              Physical Infrastructure & Electrical Engineering • Full-Stack Development
            </p>
          </div>

          <p className="text-base sm:text-lg md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-sans font-light px-2">
            Securing a physical insurance policy in the AI era. Anchoring software capabilities in the electrical and hardware infrastructure that powers modern civilization.
          </p>

          {/* Bottom dashed divider */}
          <div className="border-t-2 border-dashed border-[#d4a373] w-3/4 max-w-lg mx-auto"></div>
        </div>

        {/* Scroll indicator */}
        <div className="text-center flex flex-col items-center gap-2 text-xs font-sans text-gray-500 uppercase tracking-widest pt-6">
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#9A4C22] to-transparent"></div>
        </div>
      </section>

      {/* 2. About Section */}
      <section className="relative z-10 w-full py-24 md:py-32 px-6 border-t border-[#e6e2d8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
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
            <div className="p-6 rounded-2xl bg-[#ede8de] border-l-4 border-[#9A4C22] space-y-2">
              <p className="text-xl md:text-2xl font-serif italic text-gray-900 leading-snug">
                "My long-term goal is to pursue knowledge, eventually engage in agriculture, and help preserve human creativity."
              </p>
            </div>

            {/* Detailed Body Paragraphs */}
            <div className="space-y-5 font-sans text-gray-700 text-base md:text-lg leading-relaxed font-light">
              <p>
                Although I originally trained in full-stack development, observing the rapid trajectory of large language models and generative AI convinced me to secure a <strong className="font-semibold text-gray-900">"physical insurance policy."</strong> True resilience lies in understanding and operating the physical layer—the electrical grids, circuitry, and physical infrastructure that underpin all digital systems.
              </p>

              <p>
                To realize this transition, I plan to pursue advanced technical institute training in Electrical Engineering. I am actively working toward key national licenses, including <strong className="font-semibold text-gray-900">Third-Class Chief Electrical Engineer</strong> and <strong className="font-semibold text-gray-900">First-Class Electrician</strong>, alongside global network credentials such as <strong className="font-semibold text-gray-900">Cisco CCNP Enterprise</strong>. To support my mid-term international opportunities, I am targeting an <strong className="font-semibold text-gray-900">IELTS Academic score of 6.5+</strong>.
              </p>

              <p>
                In two years, as I enter the industry to accumulate at least 3 years of hands-on field experience, I plan to concurrently advance through the <strong className="font-semibold text-gray-900">OTHM Diploma pathway</strong> toward an accredited UK Bachelor’s degree. Meanwhile, full-stack development remains a high-leverage additional tool, giving me unique cross-disciplinary adaptability.
              </p>
            </div>

            {/* Focus Badges */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-sans bg-[#eae4da] text-[#783515] border border-[#d6ccbd] font-medium">
                ⚡ Electrical Engineering & Infrastructure
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-sans bg-[#eae4da] text-[#783515] border border-[#d6ccbd] font-medium">
                💻 Full-Stack Development
              </span>
            </div>
          </div>

          {/* Right: Arch Profile Photo */}
          <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-12">
            <div className="relative group">
              {/* Outer decorative dashed frame */}
              <div className="absolute -inset-2.5 rounded-t-full border-2 border-dashed border-[#d4a373] pointer-events-none"></div>

              {/* Arch container */}
              <div className="relative w-64 sm:w-72 h-88 sm:h-96 rounded-t-full overflow-hidden shadow-2xl border-4 border-white bg-gray-200">
                <img
                  src={myfaceImg}
                  alt="Rikuto Mikado"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="mt-6 text-center space-y-1">
              <p className="font-serif italic text-xl text-gray-900">Rikuto Mikado</p>
              <p className="font-sans text-xs uppercase tracking-wider text-[#9A4C22] font-semibold">
                Urakawa / Sapporo, Hokkaido, Japan
              </p>
              <p className="font-sans text-xs text-gray-500 font-light">
                Physical Layer • Systems • Autonomous Learning
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Background & Experience Section */}
      <section className="relative z-10 w-full py-24 md:py-32 px-6 border-t border-[#e6e2d8]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-sans uppercase tracking-widest text-[#9A4C22] font-semibold block">
              Trajectory
            </span>
            <h2 className="text-4xl md:text-5xl text-[#9A4C22] italic font-serif">
              Experience & Milestones
            </h2>
            <p className="text-base font-sans text-gray-600 max-w-2xl mx-auto leading-relaxed">
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
                    <span className="inline-block text-xs font-sans font-semibold uppercase tracking-wider text-[#9A4C22] bg-[#eae4da] px-3 py-0.5 rounded-full border border-[#d6ccbd]">
                      {item.period}
                    </span>
                    {item.duration && (
                      <span className="text-xs font-sans text-gray-500">
                        • {item.duration}
                      </span>
                    )}
                    {item.location && (
                      <span className="text-xs font-sans text-gray-400">
                        • {item.location}
                      </span>
                    )}
                    {item.isCurrent && (
                      <span className="inline-block text-xs font-sans font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Current Focus
                      </span>
                    )}
                    {item.isUpcoming && (
                      <span className="inline-block text-xs font-sans font-semibold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        Roadmap
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif italic text-xl md:text-2xl text-gray-900 font-semibold leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed font-light">
                    {item.narrative}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Courses & Continuous Learning (Udemy Certificates) */}
      <section className="relative z-10 w-full py-24 md:py-32 px-6 border-t border-[#e6e2d8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-sans uppercase tracking-widest text-[#9A4C22] font-semibold block">
              Skill Acquisition
            </span>
            <h2 className="text-4xl md:text-5xl text-[#9A4C22] italic font-serif">
              Courses & Continuous Learning
            </h2>
            <p className="text-base font-sans text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Certified coursework completed through intensive independent study across software engineering, AI tooling, and essential life skills. Click any certificate to inspect credentials.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {courses.map((course, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCert(course)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#e5ded4] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
              >
                {/* Certificate image preview container */}
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden border-b border-[#ece6dd]">
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
                      <span className="uppercase tracking-wider text-[#9A4C22] bg-[#F5F4F0] px-2.5 py-1 rounded-md border border-[#e3dbcd]">
                        {course.category}
                      </span>
                      <span className="text-gray-500">{course.date}</span>
                    </div>

                    <h3 className="font-serif text-lg md:text-xl font-bold text-gray-900 leading-snug group-hover:text-[#9A4C22] transition-colors">
                      {course.title}
                    </h3>

                    {course.note && (
                      <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                        {course.note}
                      </p>
                    )}
                  </div>

                  {/* Metadata footer */}
                  <div className="pt-3 border-t border-[#f0ebe3] flex items-center justify-between text-xs font-sans text-gray-600">
                    <span>
                      Instructor: <strong className="font-medium text-gray-800">{course.instructor}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-gray-100 font-medium">
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
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close button */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-sans font-semibold text-[#9A4C22]">
                  {selectedCert.platform} Certificate of Completion
                </span>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mt-1">
                  {selectedCert.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
                className="text-gray-400 hover:text-gray-800 text-3xl font-light leading-none p-1 transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Full certificate image */}
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-inner">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Footer metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs font-sans text-gray-600">
              <div>
                <span className="block text-gray-400 uppercase text-[10px] tracking-wider">Instructor</span>
                <span className="font-semibold text-gray-800">{selectedCert.instructor}</span>
              </div>
              <div>
                <span className="block text-gray-400 uppercase text-[10px] tracking-wider">Date</span>
                <span className="font-semibold text-gray-800">{selectedCert.date}</span>
              </div>
              <div>
                <span className="block text-gray-400 uppercase text-[10px] tracking-wider">Length</span>
                <span className="font-semibold text-gray-800">{selectedCert.hours}</span>
              </div>
              <div>
                <span className="block text-gray-400 uppercase text-[10px] tracking-wider">Certificate ID</span>
                <span className="font-mono text-gray-800 truncate block" title={selectedCert.certificateId}>
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

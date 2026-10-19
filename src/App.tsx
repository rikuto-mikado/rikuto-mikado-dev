import { useCallback, useState } from 'react'
import Toast from './components/common/Toast'
import FloatingDock from './components/layout/FloatingDock'
import LightTrails from './components/layout/LightTrails'
import LoadingScreen from './components/layout/LoadingScreen'
import Sidebar from './components/layout/Sidebar'
import AboutSection from './components/sections/AboutSection'
import BlogSection from './components/sections/blog/BlogSection'
import CertificateModal from './components/sections/courses/CertificateModal'
import CoursesSection from './components/sections/courses/CoursesSection'
import FooterSection from './components/sections/FooterSection'
import HeroSection from './components/sections/hero/HeroSection'
import RoadmapSection from './components/sections/RoadmapSection'
import TrajectorySection from './components/sections/TrajectorySection'
import { IS_JAPANESE_AVAILABLE, SITE_LOGO_SRC } from './config'
import { sectionIds } from './data/navigation'
import { socialLinks } from './data/socialLinks'
import type { CourseItem } from './data/translations'
import { coursesData, timelineEventsData, uiText } from './data/translations'
import { useEscapeKey } from './hooks/useEscapeKey'
import { useLanguage } from './hooks/useLanguage'
import { useScrollSpy } from './hooks/useScrollSpy'
import { useTheme } from './hooks/useTheme'
import { useToast } from './hooks/useToast'

export default function App() {
  const { isDark, toggleTheme } = useTheme()
  const { lang, toggleLang: switchLang } = useLanguage()
  const { toast, showToast, dismissToast } = useToast()
  const activeSection = useScrollSpy(sectionIds, 'about')

  const [selectedCert, setSelectedCert] = useState<CourseItem | null>(null)
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const ui = uiText[lang]

  const toggleLang = useCallback(() => {
    if (!IS_JAPANESE_AVAILABLE) {
      showToast('日本語版は現在更新中です', 'Japanese translation is currently under review.')
      return
    }
    switchLang()
  }, [showToast, switchLang])

  const openSidebar = useCallback(() => setIsSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])
  const closeCert = useCallback(() => setSelectedCert(null), [])

  useEscapeKey(closeCert)

  return (
    <div
      className={`relative flex flex-col min-h-screen font-serif transition-colors duration-500 selection:bg-rust selection:text-white ${
        isDark ? 'bg-night text-linen' : 'bg-paper text-gray-800'
      }`}
    >
      <LoadingScreen />

      <FloatingDock
        isDark={isDark}
        ui={ui}
        isHidden={isBlogModalOpen || selectedCert !== null}
        isSidebarOpen={isSidebarOpen}
        onToggleTheme={toggleTheme}
        onToggleLang={toggleLang}
        onOpenSidebar={openSidebar}
      />

      <Toast toast={toast} isDark={isDark} onDismiss={dismissToast} />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLang}
        isJapaneseAvailable={IS_JAPANESE_AVAILABLE}
        activeSection={activeSection}
        logoSrc={SITE_LOGO_SRC}
        socialLinks={socialLinks}
      />

      <LightTrails />

      <HeroSection isDark={isDark} ui={ui} />
      <AboutSection isDark={isDark} ui={ui} />
      <TrajectorySection isDark={isDark} ui={ui} events={timelineEventsData[lang]} />
      <CoursesSection isDark={isDark} ui={ui} courses={coursesData[lang]} onSelectCourse={setSelectedCert} />

      {selectedCert && <CertificateModal cert={selectedCert} isDark={isDark} ui={ui} onClose={closeCert} />}

      <BlogSection
        lang={lang}
        isDark={isDark}
        onToggleLang={toggleLang}
        isJapaneseAvailable={IS_JAPANESE_AVAILABLE}
        onModalStateChange={setIsBlogModalOpen}
      />

      <RoadmapSection ui={ui} />
      <FooterSection ui={ui} socialLinks={socialLinks} />
    </div>
  )
}

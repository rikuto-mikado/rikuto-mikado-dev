import { useCallback, useEffect, useMemo, useState } from 'react'
import Toast from './components/common/Toast'
import FloatingDock from './components/layout/FloatingDock'
import LoadingScreen from './components/layout/LoadingScreen'
import Sidebar from './components/layout/Sidebar'
import Masthead from './components/newspaper/Masthead'
import AboutSection from './components/sections/AboutSection'
import BlogSection from './components/sections/blog/BlogSection'
import CertificateModal from './components/sections/courses/CertificateModal'
import CoursesSection from './components/sections/courses/CoursesSection'
import FooterSection from './components/sections/FooterSection'
import HeroSection from './components/sections/hero/HeroSection'
import StudyLogFeed from './components/sections/StudyLogFeed'
import TrajectorySection from './components/sections/TrajectorySection'
import { IS_JAPANESE_AVAILABLE, SITE_LOGO_SRC } from './config'
import { getEditionInfo } from './data/edition'
import { sectionIds } from './data/navigation'
import { socialLinks } from './data/socialLinks'
import type { CourseItem } from './data/translations'
import { coursesData, crossroadsRoutesData, timelineEventsData, uiText } from './data/translations'
import { EditionContext } from './hooks/useEdition'
import { useEscapeKey } from './hooks/useEscapeKey'
import { useLanguage } from './hooks/useLanguage'
import { PrintEditionContext, usePrintEditionState } from './hooks/usePrintEdition'
import { useScrollSpy } from './hooks/useScrollSpy'
import { useTheme } from './hooks/useTheme'
import { useToast } from './hooks/useToast'
import { startSmoothScroll } from './lib/smoothScroll'

export default function App() {
  const { isDark, toggleTheme } = useTheme()
  const { lang, toggleLang: switchLang } = useLanguage()
  const { toast, showToast, dismissToast } = useToast()
  const activeSection = useScrollSpy(sectionIds, 'about')

  const [selectedCert, setSelectedCert] = useState<CourseItem | null>(null)
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const printState = usePrintEditionState()
  // The print edition is always set on white paper, whatever theme is on screen
  const isDarkView = isDark && !printState.isPrinting

  const ui = uiText[lang]
  const editionValue = useMemo(() => ({ lang, edition: getEditionInfo(lang) }), [lang])

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
  useEffect(() => startSmoothScroll(), [])
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkView)
  }, [isDarkView])

  return (
    <PrintEditionContext.Provider value={printState}>
      <EditionContext.Provider value={editionValue}>
        <div
          className={`desk relative min-h-screen font-serif transition-colors duration-500 selection:bg-accent-fill selection:text-white ${
            isDark ? 'text-linen' : 'text-ink'
          }`}
        >
          <LoadingScreen />

          <FloatingDock
            isDark={isDarkView}
            ui={ui}
            isHidden={isBlogModalOpen || selectedCert !== null}
            isSidebarOpen={isSidebarOpen}
            onToggleTheme={toggleTheme}
            onToggleLang={toggleLang}
            onOpenSidebar={openSidebar}
          />

          <Toast toast={toast} isDark={isDarkView} onDismiss={dismissToast} />

          <Sidebar
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
            isDark={isDarkView}
            onToggleTheme={toggleTheme}
            lang={lang}
            onToggleLang={toggleLang}
            isJapaneseAvailable={IS_JAPANESE_AVAILABLE}
            activeSection={activeSection}
            logoSrc={SITE_LOGO_SRC}
            socialLinks={socialLinks}
          />

          {/* The newspaper itself: one sheet on the desk */}
          <div className="paper sheet flex flex-col">
            <Masthead isDark={isDarkView} ui={ui} />
            <HeroSection isDark={isDarkView} ui={ui} courses={coursesData[lang]} />
            <AboutSection isDark={isDarkView} ui={ui} />
            <TrajectorySection
              isDark={isDarkView}
              ui={ui}
              events={timelineEventsData[lang]}
              routes={crossroadsRoutesData[lang]}
            />
            <CoursesSection isDark={isDarkView} ui={ui} courses={coursesData[lang]} onSelectCourse={setSelectedCert} />

            {selectedCert && <CertificateModal cert={selectedCert} isDark={isDarkView} ui={ui} onClose={closeCert} />}

            <BlogSection
              lang={lang}
              isDark={isDarkView}
              onToggleLang={toggleLang}
              isJapaneseAvailable={IS_JAPANESE_AVAILABLE}
              onModalStateChange={setIsBlogModalOpen}
            />

            <StudyLogFeed isDark={isDarkView} ui={ui} lang={lang} />

            <FooterSection isDark={isDarkView} ui={ui} socialLinks={socialLinks} />
          </div>
        </div>
      </EditionContext.Provider>
    </PrintEditionContext.Provider>
  )
}

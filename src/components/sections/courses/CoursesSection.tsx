import { useState } from 'react'
import { sectionPage } from '../../../data/navigation'
import type { CourseItem, UiText } from '../../../data/translations'
import ReadMoreButton from '../../common/ReadMoreButton'
import PageHead from '../../newspaper/PageHead'
import { usePrintEdition } from '../../../hooks/usePrintEdition'
import CourseCard from './CourseCard'

const INITIAL_VISIBLE_COUNT = 4

interface CoursesSectionProps {
  isDark: boolean
  ui: UiText
  courses: CourseItem[]
  onSelectCourse: (course: CourseItem) => void
}

export default function CoursesSection({ isDark, ui, courses, onSelectCourse }: CoursesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  // The print edition carries every certificate
  const { isPrinting } = usePrintEdition()
  // Courses are stored oldest first; show the most recent certificates first
  const newestFirstCourses = [...courses].reverse()
  const visibleCourses = isExpanded || isPrinting ? newestFirstCourses : newestFirstCourses.slice(0, INITIAL_VISIBLE_COUNT)

  return (
    <section
      id="courses"
      className={`relative w-full py-20 md:py-28 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-night-divider' : 'border-cream-divider'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <PageHead
          isDark={isDark}
          page={sectionPage('courses')}
          section={ui.navLearning}
          kicker={ui.coursesBadge}
          heading={ui.coursesHeading}
          deck={ui.coursesLead}
        />

        {/* Register of certificates, ruled like a printed table */}
        <ol
          className={`border-t-[3px] border-b border-double divide-y transition-colors duration-500 ${
            isDark ? 'border-night-border divide-night-border' : 'border-cream-border divide-cream-border'
          }`}
        >
          {visibleCourses.map((course) => (
            <li key={course.certificateId}>
              <CourseCard course={course} isDark={isDark} ui={ui} onSelect={onSelectCourse} />
            </li>
          ))}
        </ol>

        {courses.length > INITIAL_VISIBLE_COUNT && (
          <ReadMoreButton
            isDark={isDark}
            ui={ui}
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded((prev) => !prev)}
          />
        )}
      </div>
    </section>
  )
}

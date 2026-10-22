import { useState } from 'react'
import type { CourseItem, UiText } from '../../../data/translations'
import ReadMoreButton from '../../common/ReadMoreButton'
import SectionHeader from '../../common/SectionHeader'
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
  // Courses are stored oldest first; show the most recent certificates first
  const newestFirstCourses = [...courses].reverse()
  const visibleCourses = isExpanded ? newestFirstCourses : newestFirstCourses.slice(0, INITIAL_VISIBLE_COUNT)

  return (
    <section
      id="courses"
      className={`relative z-10 w-full py-24 md:py-32 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-night-divider' : 'border-cream-divider'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader isDark={isDark} badge={ui.coursesBadge} heading={ui.coursesHeading} lead={ui.coursesLead} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {visibleCourses.map((course) => (
            <CourseCard key={course.certificateId} course={course} isDark={isDark} ui={ui} onSelect={onSelectCourse} />
          ))}
        </div>

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

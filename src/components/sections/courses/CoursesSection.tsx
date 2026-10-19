import type { CourseItem, UiText } from '../../../data/translations'
import SectionHeader from '../../common/SectionHeader'
import CourseCard from './CourseCard'

interface CoursesSectionProps {
  isDark: boolean
  ui: UiText
  courses: CourseItem[]
  onSelectCourse: (course: CourseItem) => void
}

export default function CoursesSection({ isDark, ui, courses, onSelectCourse }: CoursesSectionProps) {
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
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} isDark={isDark} ui={ui} onSelect={onSelectCourse} />
          ))}
        </div>
      </div>
    </section>
  )
}

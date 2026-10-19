import { certImages } from '../../../data/images'
import type { CourseItem, UiText } from '../../../data/translations'
import { Card, CardBody, CardCategoryBadge, CardExcerpt, CardFooter, CardHoverHint, CardTitle } from '../../common/Card'

interface CourseCardProps {
  course: CourseItem
  isDark: boolean
  ui: UiText
  onSelect: (course: CourseItem) => void
}

export default function CourseCard({ course, isDark, ui, onSelect }: CourseCardProps) {
  return (
    <Card isDark={isDark} label={`${ui.viewCert}: ${course.title}`} onClick={() => onSelect(course)}>
      <div
        className={`relative aspect-[16/10] overflow-hidden border-b transition-colors duration-500 ${
          isDark ? 'bg-[#151413] border-night-edge' : 'bg-gray-100 border-[#ece6dd]'
        }`}
      >
        <img
          src={certImages[course.imageKey]}
          alt={course.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <CardHoverHint label={ui.viewCert} />
      </div>

      <CardBody
        footer={
          <CardFooter isDark={isDark}>
            <span className="truncate pr-2">
              {ui.instructor}:{' '}
              <strong className={`font-medium transition-colors duration-500 ${isDark ? 'text-ivory' : 'text-gray-800'}`}>
                {course.instructor}
              </strong>
            </span>
            <span
              className={`shrink-0 px-2 py-0.5 rounded font-medium transition-colors duration-500 ${
                isDark ? 'bg-night-divider text-gray-300' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {course.hours}
            </span>
          </CardFooter>
        }
      >
        <div className={`flex items-center justify-between text-[11px] font-sans ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <span className="font-medium">{course.date}</span>
        </div>
        <CardCategoryBadge isDark={isDark}>{course.category}</CardCategoryBadge>
        <CardTitle isDark={isDark}>{course.title}</CardTitle>
        {course.note && <CardExcerpt isDark={isDark}>{course.note}</CardExcerpt>}
      </CardBody>
    </Card>
  )
}

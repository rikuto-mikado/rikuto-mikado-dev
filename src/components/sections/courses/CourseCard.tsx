import { certImages } from '../../../data/images'
import type { CourseItem, UiText } from '../../../data/translations'
import { Clickable, Kicker } from '../../common/Card'

interface CourseCardProps {
  course: CourseItem
  isDark: boolean
  ui: UiText
  onSelect: (course: CourseItem) => void
}

/**
 * One row of the certificate register: thumbnail, date, course title and the particulars.
 * Phones get a compact two-column row; from md up the particulars spread into their own columns.
 */
export default function CourseCard({ course, isDark, ui, onSelect }: CourseCardProps) {
  const muted = isDark ? 'text-gray-400' : 'text-gray-500'
  const strong = isDark ? 'text-linen' : 'text-ink'

  return (
    <Clickable
      label={`${ui.viewCert}: ${course.title}`}
      onClick={() => onSelect(course)}
      className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[8rem_1fr] md:grid-cols-[8rem_5.5rem_1fr_10rem_5.5rem] gap-x-5 md:gap-x-8 py-6 items-start"
    >
      <figure
        className={`overflow-hidden border transition-colors duration-500 ${
          isDark ? 'border-night-border' : 'border-cream-border'
        }`}
      >
        <img
          src={certImages[course.imageKey]}
          alt=""
          loading="lazy"
          className="w-full aspect-[4/3] object-cover object-top"
        />
      </figure>

      {/* md+: date column */}
      <time className={`hidden md:block pt-1 font-mono text-xs tabular-nums ${muted}`}>{course.date}</time>

      <div className="min-w-0 space-y-1.5">
        {/* Phones: date and hours ride above the title */}
        <p className={`md:hidden font-mono text-[11px] tabular-nums ${muted}`}>
          {course.date} &nbsp;·&nbsp; {course.hours}
        </p>
        <Kicker>{course.category}</Kicker>
        <h3
          className={`font-serif font-normal text-lg sm:text-xl leading-snug tracking-tight text-balance transition-colors duration-300 ${
            isDark ? 'text-ivory group-hover:text-accent' : 'text-ink group-hover:text-accent'
          }`}
        >
          {course.title}
        </h3>
        {course.note && (
          <p
            className={`hidden sm:block font-news text-[15px] leading-relaxed line-clamp-2 ${
              isDark ? 'text-stone' : 'text-gray-600'
            }`}
          >
            {course.note}
          </p>
        )}
        <p className={`md:hidden font-sans text-xs ${muted}`}>
          {ui.instructor}: <span className={strong}>{course.instructor}</span>
        </p>
      </div>

      {/* md+: particulars */}
      <p className={`hidden md:block pt-1 font-sans text-sm leading-snug ${strong}`}>
        <span className={`block font-sans text-[11px] uppercase tracking-[0.14em] mb-1 ${muted}`}>{ui.instructor}</span>
        {course.instructor}
      </p>
      <p className={`hidden md:flex pt-1 items-baseline justify-end gap-2 whitespace-nowrap font-mono text-xs tabular-nums ${strong}`}>
        {course.hours}
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5 text-accent"
        >
          &rarr;
        </span>
      </p>
    </Clickable>
  )
}

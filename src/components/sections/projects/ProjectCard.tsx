import { projectImages } from '../../../data/images'
import type { ProjectItem, UiText } from '../../../data/translations'
import HalftoneImage from '../../newspaper/HalftoneImage'

interface ProjectCardProps {
  project: ProjectItem
  /** Position in the catalogue, printed as the figure number */
  index: number
  isDark: boolean
  ui: UiText
}

/**
 * One exhibit in the projects catalogue, self-contained (no modal): figure line, screenshot plate,
 * headline and overview, a spec table of the stack, and outbound links in the bottom-right corner.
 * Hovering anywhere on the card (or focusing one of its links) sharpens the halftone plate.
 */
export default function ProjectCard({ project, index, isDark, ui }: ProjectCardProps) {
  const muted = isDark ? 'text-gray-400' : 'text-gray-500'
  const strong = isDark ? 'text-linen' : 'text-ink'
  const figure = String(index + 1).padStart(2, '0')

  const links = [
    { label: ui.projectSource, url: project.githubUrl },
    ...(project.demoUrl ? [{ label: ui.projectDemo, url: project.demoUrl }] : []),
  ]

  return (
    <article className="group flex flex-col h-full">
      {/* Figure line: number and category on the left, period on the right */}
      <header
        className={`flex items-baseline justify-between gap-4 pb-2 mb-4 border-b font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-500 ${
          isDark ? 'border-night-border' : 'border-cream-border'
        }`}
      >
        <span className="min-w-0 truncate">
          <span className="text-accent">
            {ui.projectFigure} {figure}
          </span>
          <span className={muted}> · {project.category}</span>
        </span>
        <span className={`shrink-0 tabular-nums ${muted}`}>{project.period}</span>
      </header>

      {/* Screenshot plate: every capture is 1600 × 830, so the frame matches it and nothing is cropped */}
      <figure
        className={`border transition-colors duration-500 ${isDark ? 'border-night-border' : 'border-cream-border'}`}
      >
        <HalftoneImage
          src={projectImages[project.imageKey]}
          alt={project.title}
          isDark={isDark}
          className="w-full aspect-[160/83]"
          cell={2.6}
        />
      </figure>

      <h3
        className={`mt-6 font-serif font-normal text-3xl md:text-[2rem] leading-tight tracking-tight transition-colors duration-500 ${
          isDark ? 'text-ivory' : 'text-ink'
        }`}
      >
        {project.title}
      </h3>
      <p
        className={`news-body mt-2 font-news text-base md:text-[17px] leading-[1.65] transition-colors duration-500 ${
          isDark ? 'text-stone' : 'text-gray-700'
        }`}
      >
        {project.description}
      </p>

      {/* Technical stack, set as a dot-leader spec table */}
      <div className="mt-5">
        <h4 className={`font-sans text-[11px] uppercase tracking-[0.18em] font-semibold mb-2 ${muted}`}>
          {ui.projectStack}
        </h4>
        <dl className="space-y-1.5">
          {project.stack.map((row) => (
            <div key={row.label} className={`flex items-baseline font-mono text-xs ${strong}`}>
              <dt className={`shrink-0 uppercase tracking-wider text-[11px] ${muted}`}>{row.label}</dt>
              <span className="leader" aria-hidden="true" />
              <dd className="min-w-0 text-right">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Outbound links, bottom-right */}
      <div className="mt-auto pt-6 flex justify-end gap-6">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title}: ${link.label} (${ui.opensInNewTab})`}
            className={`inline-flex items-baseline gap-1 font-sans text-xs uppercase tracking-[0.16em] font-semibold border-b border-transparent hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent transition-colors ${strong}`}
          >
            {link.label}
            <span aria-hidden="true" className="text-accent">
              ↗
            </span>
          </a>
        ))}
      </div>
    </article>
  )
}

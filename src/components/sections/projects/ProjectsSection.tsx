import { sectionPage } from '../../../data/navigation'
import type { ProjectItem, UiText } from '../../../data/translations'
import PageHead from '../../newspaper/PageHead'
import ProjectCard from './ProjectCard'

interface ProjectsSectionProps {
  isDark: boolean
  ui: UiText
  projects: ProjectItem[]
}

export default function ProjectsSection({ isDark, ui, projects }: ProjectsSectionProps) {
  const hairline = isDark ? 'border-night-border' : 'border-cream-border'

  return (
    <section
      id="projects"
      className={`relative w-full py-20 md:py-28 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-night-divider' : 'border-cream-divider'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <PageHead
          isDark={isDark}
          page={sectionPage('projects')}
          section={ui.navProjects}
          kicker={ui.projectsBadge}
          heading={ui.projectsHeading}
          deck={ui.projectsLead}
        />

        {/* Exhibition catalogue: double rules top and bottom, two columns split by a hairline from md up */}
        <ol
          className={`grid grid-cols-1 md:grid-cols-2 border-t-[3px] border-b border-double transition-colors duration-500 ${hairline}`}
        >
          {projects.map((project, index) => {
            const isRightColumn = index % 2 === 1
            return (
              <li
                key={project.id}
                className={`py-8 md:py-10 transition-colors duration-500 ${hairline} ${index > 0 ? 'border-t' : ''} ${
                  index === 1 ? 'md:border-t-0' : ''
                } ${isRightColumn ? 'md:pl-8 lg:pl-10 md:border-l' : 'md:pr-8 lg:pr-10'}`}
              >
                <ProjectCard project={project} index={index} isDark={isDark} ui={ui} />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

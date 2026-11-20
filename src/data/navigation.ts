import type { UiTextKey } from './translations'

interface NavSection {
  id: string
  /** Newspaper page ("folio") the section is printed on */
  page: string
  labelKey: UiTextKey
  subtitleKey: UiTextKey
}

// Page sections in scroll order; drives both the sidebar menu and the scrollspy
export const navSections = [
  { id: 'about', page: 'A2', labelKey: 'navAbout', subtitleKey: 'navAboutSub' },
  { id: 'trajectory', page: 'A3', labelKey: 'navTrajectory', subtitleKey: 'navTrajectorySub' },
  { id: 'projects', page: 'B1', labelKey: 'navProjects', subtitleKey: 'navProjectsSub' },
  { id: 'courses', page: 'B2', labelKey: 'navLearning', subtitleKey: 'navLearningSub' },
  { id: 'blog', page: 'C1', labelKey: 'navBlog', subtitleKey: 'navBlogSub' },
  { id: 'study-log', page: 'D1', labelKey: 'navStudyLog', subtitleKey: 'navStudyLogSub' },
  { id: 'contact', page: 'D2', labelKey: 'navContact', subtitleKey: 'navContactSub' },
] as const satisfies readonly NavSection[]

export type SectionId = (typeof navSections)[number]['id']

export const sectionIds: readonly SectionId[] = navSections.map((section) => section.id)

/** The front page is A1; every other section's folio comes from the table above. */
export const FRONT_PAGE = 'A1'

/** Newspaper page a section is printed on, e.g. "B1". */
export function sectionPage(id: SectionId): string {
  return navSections.find((section) => section.id === id)?.page ?? ''
}

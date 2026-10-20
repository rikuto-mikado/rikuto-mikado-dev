import type { UiTextKey } from './translations'

interface NavSection {
  id: string
  num: string
  labelKey: UiTextKey
  subtitleKey: UiTextKey
}

// Page sections in scroll order; drives both the sidebar menu and the scrollspy
export const navSections = [
  { id: 'about', num: '01', labelKey: 'navAbout', subtitleKey: 'navAboutSub' },
  { id: 'trajectory', num: '02', labelKey: 'navTrajectory', subtitleKey: 'navTrajectorySub' },
  { id: 'courses', num: '03', labelKey: 'navLearning', subtitleKey: 'navLearningSub' },
  { id: 'blog', num: '04', labelKey: 'navBlog', subtitleKey: 'navBlogSub' },
  { id: 'study-log', num: '05', labelKey: 'navStudyLog', subtitleKey: 'navStudyLogSub' },
  { id: 'roadmap', num: '06', labelKey: 'navRoadmap', subtitleKey: 'navRoadmapSub' },
  { id: 'contact', num: '07', labelKey: 'navContact', subtitleKey: 'navContactSub' },
] as const satisfies readonly NavSection[]

export type SectionId = (typeof navSections)[number]['id']

export const sectionIds: readonly SectionId[] = navSections.map((section) => section.id)

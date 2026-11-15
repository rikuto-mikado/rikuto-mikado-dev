import type { UpcomingPost } from '../../../data/blogPosts'
import type { UiText } from '../../../data/translations'

interface UpcomingPostCardProps {
  post: UpcomingPost
  isDark: boolean
  ui: UiText
}

/** "Next issue" notice: a boxed, non-interactive teaser for the essay currently being written. */
export default function UpcomingPostCard({ post, isDark, ui }: UpcomingPostCardProps) {
  const muted = isDark ? 'text-gray-400' : 'text-gray-500'

  return (
    <aside
      aria-label={ui.upcomingLabel}
      className={`flex flex-col gap-3 p-5 border-[3px] border-double transition-colors duration-500 ${
        isDark ? 'border-night-border' : 'border-cream-border'
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-medium text-accent">
          {ui.upcomingLabel}
        </span>
        <span className={`font-mono text-[11px] ${muted}`}>{ui.comingSoon}</span>
      </div>

      <h3
        className={`font-serif italic font-light text-[1.4rem] leading-snug tracking-tight text-balance ${
          isDark ? 'text-linen' : 'text-ink'
        }`}
      >
        {post.title}
      </h3>

      <p className={`font-news text-[15px] leading-relaxed ${isDark ? 'text-stone' : 'text-gray-600'}`}>{post.excerpt}</p>

      <p
        className={`mt-auto pt-3 border-t font-mono text-[11px] flex items-center justify-between gap-3 ${
          isDark ? 'border-night-border' : 'border-cream-border'
        } ${muted}`}
      >
        <span>#NextEssay</span>
        <span className="text-accent">{post.status || ui.inProgress}</span>
      </p>
    </aside>
  )
}

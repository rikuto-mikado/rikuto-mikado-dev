import type { BlogPost } from '../../../data/blogPosts'
import { blogCoverImages } from '../../../data/images'
import type { UiText } from '../../../data/translations'
import { Clickable, Kicker } from '../../common/Card'
import HalftoneImage from '../../newspaper/HalftoneImage'

interface StoryProps {
  post: BlogPost
  isDark: boolean
  ui: UiText
  onSelect: (postId: string) => void
}

const headlineColor = (isDark: boolean) =>
  isDark ? 'text-ivory group-hover:text-accent' : 'text-ink group-hover:text-accent'
const bodyColor = (isDark: boolean) => (isDark ? 'text-stone' : 'text-gray-700')
const metaColor = (isDark: boolean) => (isDark ? 'text-gray-400' : 'text-gray-500')

function ReadLink({ ui }: { ui: UiText }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-sans text-xs font-medium uppercase tracking-[0.14em] transition-transform duration-300 group-hover:translate-x-0.5 text-accent"
    >
      {ui.readShort} <span aria-hidden="true">&rarr;</span>
    </span>
  )
}

function Dateline({ post, isDark }: { post: BlogPost; isDark: boolean }) {
  const primaryTag = post.tags[0]
  return (
    <p className={`font-mono text-[11px] tabular-nums tracking-wide ${metaColor(isDark)}`}>
      {post.date}
      {primaryTag && <> &nbsp;·&nbsp; #{primaryTag}</>}
    </p>
  )
}

/** Front-page lead: large photo, big headline and a drop-capped opening paragraph. */
export function LeadStory({ post, isDark, ui, onSelect }: StoryProps) {
  const coverImg = blogCoverImages[post.id]
  const opening = post.paragraphs[0] || post.excerpt

  return (
    <Clickable
      as="article"
      label={`${ui.readEssay}: ${post.title}`}
      onClick={() => onSelect(post.id)}
      className="lead-story grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10"
    >
      {coverImg && (
        <figure className="lg:col-span-7">
          <HalftoneImage src={coverImg} alt="" isDark={isDark} className="w-full aspect-[4/3]" cell={3.3} />
        </figure>
      )}

      <div className={`${coverImg ? 'lg:col-span-5' : 'lg:col-span-12 max-w-3xl'} flex flex-col gap-4`}>
        <Kicker>{post.category}</Kicker>
        <h3
          className={`font-serif font-normal text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] tracking-tight text-balance transition-colors duration-300 ${headlineColor(isDark)}`}
        >
          {post.title}
        </h3>
        <Dateline post={post} isDark={isDark} />
        <p
          className={`news-body drop-cap font-news text-[17px] leading-[1.7] line-clamp-[8] transition-colors duration-500 ${bodyColor(isDark)}`}
        >
          {opening}
        </p>
        <div className="pt-1">
          <ReadLink ui={ui} />
        </div>
      </div>
    </Clickable>
  )
}

/** Secondary story set in a ruled column: small photo, headline, short excerpt. */
export default function BlogCard({ post, isDark, ui, onSelect }: StoryProps) {
  const coverImg = blogCoverImages[post.id]

  return (
    <Clickable
      as="article"
      label={`${ui.readEssay}: ${post.title}`}
      onClick={() => onSelect(post.id)}
      className="flex flex-col gap-3"
    >
      {coverImg && (
        <figure className="mb-1">
          <HalftoneImage src={coverImg} alt="" isDark={isDark} className="w-full aspect-[16/10]" />
        </figure>
      )}
      <Kicker>{post.category}</Kicker>
      <h3
        className={`font-serif font-normal text-[1.4rem] leading-snug tracking-tight text-balance transition-colors duration-300 ${headlineColor(isDark)}`}
      >
        {post.title}
      </h3>
      <Dateline post={post} isDark={isDark} />
      <p className={`news-body font-news text-[15px] leading-relaxed line-clamp-4 transition-colors duration-500 ${bodyColor(isDark)}`}>
        {post.paragraphs[0] || post.excerpt}
      </p>
      <div className="mt-auto pt-2">
        <ReadLink ui={ui} />
      </div>
    </Clickable>
  )
}

import type { UpcomingPost } from '../../../data/blogPosts'
import type { UiText } from '../../../data/translations'
import { CardBody } from '../../common/Card'
import { PencilSquareIcon } from '../../common/icons'

interface UpcomingPostCardProps {
  post: UpcomingPost
  isDark: boolean
  ui: UiText
}

/** Non-interactive "draft" card; mirrors the article card layout so grid rows stay even. */
export default function UpcomingPostCard({ post, isDark, ui }: UpcomingPostCardProps) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border border-dashed flex flex-col justify-between transition-all duration-300 opacity-75 hover:opacity-100 ${
        isDark
          ? 'border-night-border bg-night-panel/40 text-gray-400 hover:border-sand/50'
          : 'border-[#d8d1c5] bg-paper/40 text-gray-500 hover:border-sand'
      }`}
    >
      <div
        className={`relative aspect-[16/10] overflow-hidden border-b border-dashed transition-colors duration-500 flex flex-col justify-between p-5 ${
          isDark
            ? 'bg-gradient-to-br from-[#1F1D1A]/80 via-[#191715]/60 to-[#141211]/80 border-night-rule'
            : 'bg-gradient-to-br from-[#ECE8E1]/80 via-[#E8E3DA]/60 to-[#DFD9CD]/80 border-cream-line'
        }`}
      >
        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full border border-dashed border-rust/20 pointer-events-none" />
        <div className="absolute right-6 bottom-6 w-14 h-14 rounded-full border border-dotted border-rust/25 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-full w-full pointer-events-none">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-rust/80">
              {ui.upcomingLabel}
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-apricot/60 animate-pulse" />
          </div>
          <div className="flex items-center justify-center my-auto py-2 opacity-35">
            <PencilSquareIcon className="w-8 h-8 text-rust" />
          </div>
        </div>
      </div>

      <CardBody
        footer={
          <div
            className={`pt-3 border-t border-dashed flex items-center justify-between text-xs font-sans ${
              isDark ? 'border-night-edge text-gray-500' : 'border-[#e6e0d5] text-gray-400'
            }`}
          >
            <span className="font-mono text-[11px]">#NextEssay</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-[11px] text-rust/80">
              <span className="w-1.5 h-1.5 rounded-full bg-rust/60 animate-ping" />
              {post.status || ui.inProgress}
            </span>
          </div>
        }
      >
        <div className={`text-[11px] font-sans ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          <span className="font-medium">{ui.comingSoon}</span>
        </div>

        <div>
          <span
            className={`inline-block uppercase tracking-wider px-2.5 py-0.5 rounded-md text-[10px] font-semibold font-sans border border-dashed ${
              isDark ? 'text-stone bg-[#221F1C]/70 border-night-border' : 'text-gray-600 bg-white/70 border-gray-300'
            }`}
          >
            {ui.inProgress}
          </span>
        </div>

        <h3
          className={`font-serif italic text-lg md:text-xl font-bold leading-snug line-clamp-2 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {post.title}
        </h3>

        <p
          className={`font-sans text-xs sm:text-sm leading-relaxed font-light italic line-clamp-3 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          {post.excerpt}
        </p>
      </CardBody>
    </div>
  )
}

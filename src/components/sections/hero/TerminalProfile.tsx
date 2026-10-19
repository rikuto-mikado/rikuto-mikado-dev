import type { ReactNode } from 'react'

interface TerminalProfileProps {
  isDark: boolean
  className?: string
}

// Profile rendered as a Python class; string values become `self.x = "..."`, arrays become list literals
const profileAttributes: [name: string, value: string | string[]][] = [
  ['name', 'Rikuto Mikado'],
  ['pronouns', 'He/Him'],
  ['location', 'Hokkaido, Japan'],
  ['status', 'Preparing for Electrical & Construction Engineering school'],
  ['strategy', 'Securing a ticket to blue-collar trades as a hedge against AGI disruption'],
  ['academic_goals', ["Earn Bachelor's & Master's degrees", 'Prepare for IELTS & achieve target score']],
  ['dream', 'Live in the countryside with a cat'],
  [
    'hobbies',
    [
      'Gaming',
      'Walking & strolling',
      'Strength training (Workout)',
      'Continuous learning (books & research papers)',
      'Exploring unfamiliar places',
      'Spending time in solitude',
    ],
  ],
]

// One Dark–style syntax colors
const keyword = (text: string) => <span className="text-[#C678DD] font-semibold">{text}</span>
const punct = (text: string) => <span className="text-[#ABB2BF]">{text}</span>
const str = (text: string) => <span className="text-[#98C379]">{`"${text}"`}</span>
const self = <span className="text-[#E06C75] italic">self</span>

const ATTR_INDENT = '        '
const ITEM_INDENT = '            '

function buildLines(): ReactNode[] {
  const lines: ReactNode[] = [
    <>
      {keyword('class')} <span className="text-[#E5C07B] font-bold">Developer</span>:
    </>,
    <>
      {'    '}
      {keyword('def')} <span className="text-[#61AFEF] font-semibold">__init__</span>({self}):
    </>,
  ]

  for (const [name, value] of profileAttributes) {
    const assignment = (
      <>
        {ATTR_INDENT}
        {self}.<span className="text-linen">{name}</span> {punct('=')}
      </>
    )

    if (typeof value === 'string') {
      lines.push(
        <>
          {assignment} {str(value)}
        </>,
      )
      continue
    }

    lines.push(<>{assignment} [</>)
    for (const item of value) {
      lines.push(
        <>
          {ITEM_INDENT}
          {str(item)}
          {punct(',')}
        </>,
      )
    }
    lines.push(
      <>
        {ATTR_INDENT}
        {punct(']')}
      </>,
    )
  }

  return lines
}

// Static content: build once at module load instead of on every render
const lines = buildLines()

export default function TerminalProfile({ isDark, className = '' }: TerminalProfileProps) {
  return (
    <div
      className={`w-full rounded-2xl overflow-hidden border shadow-2xl transition-all duration-500 font-mono text-left ${
        isDark
          ? 'bg-[#121110]/95 border-night-edge shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]'
          : 'bg-night-section/95 border-sand/60 shadow-[0_25px_60px_-15px_rgba(154,76,34,0.22)]'
      } ${className}`}
    >
      {/* Window chrome: traffic lights only */}
      <div className="h-9 px-4 bg-[#1B1917] border-b border-[#2A2724] flex items-center select-none">
        <div className="flex items-center gap-2 group/dots">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center text-[8px] text-black/70 font-bold opacity-85 group-hover/dots:opacity-100 transition-opacity">
            <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity">✕</span>
          </div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center text-[8px] text-black/70 font-bold opacity-85 group-hover/dots:opacity-100 transition-opacity">
            <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity">−</span>
          </div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center text-[8px] text-black/70 font-bold opacity-85 group-hover/dots:opacity-100 transition-opacity">
            <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity">+</span>
          </div>
        </div>
      </div>

      {/* Code body */}
      <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-[13px] leading-[1.65] font-mono selection:bg-rust/40 selection:text-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="min-w-full inline-block">
          {lines.map((content, index) => (
            <div key={index} className="flex items-start hover:bg-white/[0.03] rounded px-1 transition-colors">
              <span className="w-6 sm:w-8 shrink-0 text-right pr-3 select-none text-[#524B43] text-[11px] sm:text-xs">
                {index + 1}
              </span>
              <span className="text-linen whitespace-pre">{content}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

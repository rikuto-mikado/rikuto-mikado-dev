import type { ReactNode } from 'react'

interface TerminalProfileProps {
  isDark: boolean
  /** Listing caption shown in light (print) mode */
  caption: string
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

interface SyntaxPalette {
  keyword: string
  punct: string
  string: string
  self: string
  className: string
  func: string
  attr: string
}

// Dark: warm editor palette. Light: printed in ink on the paper, like a code listing in a journal.
const palettes: Record<'dark' | 'light', SyntaxPalette> = {
  dark: {
    keyword: 'text-accent',
    punct: 'text-[#8A8178]',
    string: 'text-[#B5BD8F]',
    self: 'text-[#C4BEB4]',
    className: 'text-ivory',
    func: 'text-[#C4BEB4]',
    attr: 'text-linen',
  },
  light: {
    keyword: 'text-accent',
    punct: 'text-gray-500',
    string: 'text-[#56602a]',
    self: 'text-gray-600',
    className: 'text-ink font-medium',
    func: 'text-gray-700',
    attr: 'text-ink',
  },
}

const ATTR_INDENT = '        '
const ITEM_INDENT = '            '

function buildLines(c: SyntaxPalette): ReactNode[] {
  const keyword = (text: string) => <span className={c.keyword}>{text}</span>
  const punct = (text: string) => <span className={c.punct}>{text}</span>
  const str = (text: string) => <span className={c.string}>{`"${text}"`}</span>
  const self = <span className={`${c.self} italic`}>self</span>

  const lines: ReactNode[] = [
    <>
      {keyword('class')} <span className={c.className}>Developer</span>:
    </>,
    <>
      {'    '}
      {keyword('def')} <span className={c.func}>__init__</span>({self}):
    </>,
  ]

  for (const [name, value] of profileAttributes) {
    const assignment = (
      <>
        {ATTR_INDENT}
        {self}.<span className={c.attr}>{name}</span> {punct('=')}
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

// Static content: build once per theme at module load instead of on every render
const darkLines = buildLines(palettes.dark)
const lightLines = buildLines(palettes.light)

export default function TerminalProfile({ isDark, caption, className = '' }: TerminalProfileProps) {
  const lines = isDark ? darkLines : lightLines
  const fadeFrom = isDark ? 'from-ink-deep' : 'from-paper'

  return (
    <figure
      className={`w-full overflow-hidden font-mono text-left transition-colors duration-500 ${
        isDark ? 'rounded-lg border border-night-border bg-ink-deep text-linen' : 'border-y-[3px] border-double border-cream-border text-ink'
      } ${className}`}
    >
      {/* Caption bar: editor tab in dark mode, a listing caption in light mode */}
      <figcaption
        className={`h-10 flex items-center justify-between select-none text-[11px] tracking-wide border-b ${
          isDark ? 'px-4 border-white/[0.07] text-[#C4BEB4]' : 'px-1 border-cream-border text-gray-600'
        }`}
      >
        <span>{isDark ? 'profile.py' : caption}</span>
        <span className={isDark ? 'text-[#6b635b]' : 'text-gray-500'}>python</span>
      </figcaption>

      {/* Code body; scrolls sideways on narrow screens, with a fade hinting at the overflow */}
      <div className="relative">
        <div
          className={`py-4 sm:py-5 pr-4 overflow-x-auto text-[11.5px] sm:text-[13px] leading-[1.7] selection:bg-accent-fill/30 [scrollbar-width:thin] ${
            isDark ? '[scrollbar-color:#3a352f_transparent]' : '[scrollbar-color:#c7b795_transparent]'
          }`}
        >
          <div className="min-w-full inline-block">
            {lines.map((content, index) => (
              <div key={index} className="flex items-start">
                <span
                  className={`w-9 sm:w-12 shrink-0 text-right pr-4 select-none tabular-nums ${
                    isDark ? 'text-[#4a443e]' : 'text-gray-400'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="whitespace-pre">{content}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l ${fadeFrom} to-transparent sm:hidden`}
        />
      </div>
    </figure>
  )
}

interface TerminalProfileProps {
  isDark: boolean
  className?: string
}

export default function TerminalProfile({ isDark, className = '' }: TerminalProfileProps) {
  const lines = [
    {
      num: 1,
      content: (
        <>
          <span className="text-[#C678DD] font-semibold">class</span>{' '}
          <span className="text-[#E5C07B] font-bold">Developer</span>:
        </>
      ),
    },
    {
      num: 2,
      content: (
        <>
          {'    '}
          <span className="text-[#C678DD] font-semibold">def</span>{' '}
          <span className="text-[#61AFEF] font-semibold">__init__</span>(
          <span className="text-[#E06C75] italic">self</span>):
        </>
      ),
    },
    {
      num: 3,
      content: (
        <>
          {'        '}
          <span className="text-[#E06C75] italic">self</span>.
          <span className="text-[#E8E4DD]">name</span>{' '}
          <span className="text-[#ABB2BF]">=</span>{' '}
          <span className="text-[#98C379]">"Rikuto Mikado"</span>
        </>
      ),
    },
    {
      num: 4,
      content: (
        <>
          {'        '}
          <span className="text-[#E06C75] italic">self</span>.
          <span className="text-[#E8E4DD]">pronouns</span>{' '}
          <span className="text-[#ABB2BF]">=</span>{' '}
          <span className="text-[#98C379]">"He/Him"</span>
        </>
      ),
    },
    {
      num: 5,
      content: (
        <>
          {'        '}
          <span className="text-[#E06C75] italic">self</span>.
          <span className="text-[#E8E4DD]">location</span>{' '}
          <span className="text-[#ABB2BF]">=</span>{' '}
          <span className="text-[#98C379]">"Hokkaido, Japan"</span>
        </>
      ),
    },
    {
      num: 6,
      content: (
        <>
          {'        '}
          <span className="text-[#E06C75] italic">self</span>.
          <span className="text-[#E8E4DD]">status</span>{' '}
          <span className="text-[#ABB2BF]">=</span>{' '}
          <span className="text-[#98C379]">
            "Preparing for Electrical &amp; Construction Engineering school"
          </span>
        </>
      ),
    },
    {
      num: 7,
      content: (
        <>
          {'        '}
          <span className="text-[#E06C75] italic">self</span>.
          <span className="text-[#E8E4DD]">strategy</span>{' '}
          <span className="text-[#ABB2BF]">=</span>{' '}
          <span className="text-[#98C379]">
            "Securing a ticket to blue-collar trades as a hedge against AGI disruption"
          </span>
        </>
      ),
    },
    {
      num: 8,
      content: (
        <>
          {'        '}
          <span className="text-[#E06C75] italic">self</span>.
          <span className="text-[#E8E4DD]">academic_goals</span>{' '}
          <span className="text-[#ABB2BF]">=</span> [
        </>
      ),
    },
    {
      num: 9,
      content: (
        <>
          {'            '}
          <span className="text-[#98C379]">
            "Earn Bachelor's &amp; Master's degrees"
          </span>
          <span className="text-[#ABB2BF]">,</span>
        </>
      ),
    },
    {
      num: 10,
      content: (
        <>
          {'            '}
          <span className="text-[#98C379]">
            "Prepare for IELTS &amp; achieve target score"
          </span>
          <span className="text-[#ABB2BF]">,</span>
        </>
      ),
    },
    {
      num: 11,
      content: (
        <>
          {'        '}
          <span className="text-[#ABB2BF]">]</span>
        </>
      ),
    },
    {
      num: 12,
      content: (
        <>
          {'        '}
          <span className="text-[#E06C75] italic">self</span>.
          <span className="text-[#E8E4DD]">dream</span>{' '}
          <span className="text-[#ABB2BF]">=</span>{' '}
          <span className="text-[#98C379]">"Live in the countryside with a cat"</span>
        </>
      ),
    },
    {
      num: 13,
      content: (
        <>
          {'        '}
          <span className="text-[#E06C75] italic">self</span>.
          <span className="text-[#E8E4DD]">hobbies</span>{' '}
          <span className="text-[#ABB2BF]">=</span> [
        </>
      ),
    },
    {
      num: 14,
      content: (
        <>
          {'            '}
          <span className="text-[#98C379]">"Gaming"</span>
          <span className="text-[#ABB2BF]">,</span>
        </>
      ),
    },
    {
      num: 15,
      content: (
        <>
          {'            '}
          <span className="text-[#98C379]">"Walking &amp; strolling"</span>
          <span className="text-[#ABB2BF]">,</span>
        </>
      ),
    },
    {
      num: 16,
      content: (
        <>
          {'            '}
          <span className="text-[#98C379]">"Strength training (Workout)"</span>
          <span className="text-[#ABB2BF]">,</span>
        </>
      ),
    },
    {
      num: 17,
      content: (
        <>
          {'            '}
          <span className="text-[#98C379]">
            "Continuous learning (books &amp; research papers)"
          </span>
          <span className="text-[#ABB2BF]">,</span>
        </>
      ),
    },
    {
      num: 18,
      content: (
        <>
          {'            '}
          <span className="text-[#98C379]">"Exploring unfamiliar places"</span>
          <span className="text-[#ABB2BF]">,</span>
        </>
      ),
    },
    {
      num: 19,
      content: (
        <>
          {'            '}
          <span className="text-[#98C379]">"Spending time in solitude"</span>
          <span className="text-[#ABB2BF]">,</span>
        </>
      ),
    },
    {
      num: 20,
      content: (
        <>
          {'        '}
          <span className="text-[#ABB2BF]">]</span>
        </>
      ),
    },
  ]

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden border shadow-2xl transition-all duration-500 font-mono text-left ${
        isDark
          ? 'bg-[#121110]/95 border-[#2D2A26] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]'
          : 'bg-[#181614]/95 border-[#d4a373]/60 shadow-[0_25px_60px_-15px_rgba(154,76,34,0.22)]'
      } ${className}`}
    >
      {/* 1. Minimal Terminal Header Chrome: Left Traffic Lights Only */}
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

      {/* 2. Terminal Body */}
      <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-[13px] leading-[1.65] font-mono selection:bg-[#9A4C22]/40 selection:text-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="min-w-full inline-block">
          {lines.map((line) => (
            <div key={line.num} className="flex items-start hover:bg-white/[0.03] rounded px-1 transition-colors">
              <span className="w-6 sm:w-8 shrink-0 text-right pr-3 select-none text-[#524B43] text-[11px] sm:text-xs">
                {line.num}
              </span>
              <span className="text-[#E8E4DD] whitespace-pre">{line.content}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

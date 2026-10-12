import type { Language } from './translations'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  tags: string[]
  paragraphs: string[]
}

export const blogPostsData: Record<Language, BlogPost[]> = {
  en: [
    {
      id: 'why-our-generation-cannot-ignore-agi',
      title: 'Why Our Generation Cannot Ignore AGI',
      excerpt:
        'Young people today should not blindly trust optimistic claims. The core threat of AGI is not just whether jobs will be lost, but a fundamental attack on human self-esteem and identity.',
      date: 'Oct 2026',
      readTime: '3 min read',
      category: 'AI & Strategic Horizons',
      tags: ['AGI', 'Physical Layer', 'Identity', 'Career Strategy'],
      paragraphs: [
        'This might be a personal take, but I strongly believe that young people today should not blindly trust the optimistic voices claiming, "AGI (Artificial General Intelligence) won\'t happen anytime soon" or "AI won\'t take our jobs."',
        'If you look back, goals that experts once thought would take 30 years to achieve are now shifting to a timeline of just a few years. We are already seeing AI making massive contributions to the natural sciences—like OpenAI outputting hundreds of research papers (even if some contain errors)—and highly advanced AI-driven cyberattacks are happening on an almost weekly basis. The reason some people don\'t feel a sense of crisis is simply that their resolution for understanding AI is too low.',
        'Furthermore, AI development has evolved into a geopolitical race. Even if there are groups who want to slow it down or deny it, nations and tech giants will forcefully push toward AGI. We can already see them pushing forward despite massive electricity shortages. Therefore, treating AGI as a mere conspiracy theory or extreme pessimism is a mistake.',
        'Because of this reality, I believe my career strategy is highly rational. I am building a "safety net" by getting certified and gaining hands-on experience in the blue-collar sector (specifically electrical engineering)—a physical field that has a solid barrier to entry against AI, at least for the next 10 to 15 years. While securing this foundation, I also plan to earn my bachelor\'s and master\'s degrees.',
        'Even if my prediction is entirely wrong and the grand vision of AGI collapses, the trajectory won\'t stop. Considering the room for growth in existing AI models and the potential rise of new AI technologies from other regions like the Middle East, there is more than enough evidence to suggest that we will be surrounded by incredibly advanced AI right before we reach the prime of our careers.',
        'But here is the most important point.',
        'The core issue isn\'t just whether AGI will be created or if it will simply "steal jobs." The biggest threat is to our self-esteem and our identity.',
        'Most of us find our sense of purpose and existential value by contributing to society and helping others. We feel we belong and are needed when someone simply says "thank you" for our work. The idea that this fundamental human experience could be completely destroyed from the ground up by AI might be hard to imagine right now. But unfortunately, I believe this is a reality that our generation must start thinking about seriously.',
      ],
    },
  ],
  ja: [
    {
      id: 'why-our-generation-cannot-ignore-agi',
      title: 'なぜ私たちの世代はAGIを無視できないのか',
      excerpt:
        '「AGIはすぐには来ない」「AIに仕事を奪われない」という楽観論を盲信すべきではない。核心的な脅威は、職の喪失以上に私たちの自尊心とアイデンティティに向けられている。',
      date: '2026年10月',
      readTime: '読了目安 3分',
      category: 'AI・戦略的展望',
      tags: ['AGI', '物理レイヤー', 'アイデンティティ', 'キャリア戦略'],
      paragraphs: [
        '個人的な見解かもしれないが、今日の若者は「AGI（汎用人工知能）はすぐには実現しない」「AIに仕事を奪われることはない」といった楽観的な声を盲信すべきではないと強く思っている。',
        '振り返ってみれば、かつて専門家が達成に30年かかると考えていた目標が、今やわずか数年というタイムラインにシフトしている。私たちはすでに、AIが自然科学に多大な貢献をしているのを目の当たりにしている。例えば、OpenAIが何百もの研究論文を出力したり（その一部にエラーが含まれていたとしても）、高度なAI主導のサイバー攻撃がほぼ毎週のように発生したりしている。一部の人々が危機感を抱かない理由は、単にAIに対する解像度が低すぎるからである。',
        'さらに、AI開発は今や地政学的な競争へと発展している。進化を遅らせたい、あるいは否定したいと考える集団がいたとしても、国家や巨大テック企業は強引にAGIに向けて突き進むだろう。深刻な電力不足にもかかわらず、彼らが開発を推し進める姿はすでに観測されている。したがって、AGIを単なる陰謀論や極端な悲観論として片付けるのは間違いだ。',
        'こうした現実を踏まえると、私のキャリア戦略は極めて合理的だと考えている。私は、少なくとも今後10年から15年はAIに対して強固な参入障壁を持つ物理的な分野であるブルーカラー（具体的には電気工学関係）の市場で資格を取り、実務経験を積むことで「安全網」を構築している。この基盤を確保しながら、学士号や修士号の取得も計画しているのだ。',
        'たとえ私の予測が完全に外れ、AGIという壮大な構想そのものが破綻したとしても、その進化の軌道が止まることはない。既存のAIモデルの伸び代や、中東など他の地域から新たなAI技術が台頭してくる可能性を考慮すれば、私たちがキャリアの全盛期を迎える手前には、信じられないほど高度なAIに取り囲まれていることを示唆する証拠は十分に揃っている。',
        'だが、ここで最も重要なポイントがある。',
        '核心的な問題は、AGIが誕生するかどうかや、単に「仕事を奪うか」ということだけではない。最大の脅威は、私たちの自尊心とアイデンティティに対するものだ。',
        '私たちの多くは、社会に貢献し他者を助けることによって、生きがいや実存的価値を見出している。自分の仕事に対して誰かがシンプルに「ありがとう」と言ってくれる時、私たちは自分の居場所があり、必要とされていると感じるのだ。このような人間の根本的な経験が、AIによって根底から完全に破壊されるかもしれないという考えは、今はまだ想像し難いかもしれない。しかし残念ながら、これは私たちの世代が本気で考え始めなければならない現実であると私は考えている。',
      ],
    },
  ],
}

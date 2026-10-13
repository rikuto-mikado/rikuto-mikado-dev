import type { Language } from './translations'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
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
        'This might be a personal take, but I strongly believe that young people today should not blindly trust the optimistic voices claiming, "AGI (Artificial General Intelligence) won\'t happen anytime soon" or "AI won\'t take our jobs."',
      date: 'Oct 2026',
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
    {
      id: 'why-masses-happier-without-ai',
      title: 'Why I Believe the Masses Would Be Happier Without AI',
      excerpt:
        "You’ve probably heard the prevalent mantra: 'Those who master AI will win,' or 'Adapting to AI is the only way to survive.' What I am about to share is an antithesis to this narrative.",
      date: 'Oct 2026',
      category: 'AI & Human Nature',
      tags: ['AI Literacy', 'Hallucinations', 'Psychology', 'Humanity'],
      paragraphs: [
        "You’ve probably heard the prevalent mantra: 'Those who master AI will win,' or 'Adapting to AI is the only way to survive.' What I am about to share is an antithesis to this narrative. It may be difficult for some to accept, so feel free to stop reading here. I firmly believe that most people would actually be happier living without AI.",
        "First, truly mastering AI is exceptionally difficult. People often forget that current AI (specifically Narrow AI—leaving aside the debate on whether Artificial General Intelligence will one day develop true consciousness) merely generates responses based on statistical inference. It does not genuinely understand human emotions or the core intent behind our prompts. Put simply, it is nothing more than humanity forcibly distilled into mathematical formulas, which inevitably creates an illusion of intelligence to the general public.",
        "Given this premise, entrusting AI with moral judgments or major life choices is extraordinarily dangerous. Take life or relationship advice, for instance. Seeking advice itself isn't the issue. The danger lies in the fact that LLMs are deliberately designed not to be overly critical. (Think of it this way: no one wants to interact with someone who, while logical, is relentlessly harsh or tactless.) Consequently, AI will rarely challenge a user significantly, even if the user's logic or perspective is objectively absurd.",
        "This uncritical validation intertwines with 'hallucinations'—the AI's subtle lies—making them incredibly difficult to detect. I fear a future where even experts armed with extensive background knowledge and primary sources will be unable to resist its remarkably clever rhetoric.",
        "In short, when innocent children or unsuspecting adults interact with this technology, it is entirely unrealistic to expect them to defend themselves against the AI's fabrications or heavily skewed interpretations of facts. Depending on a person’s psychological state, it is dangerous enough to warp their very personality. Therefore, I return to my initial point: I believe the majority of people would be much happier if they never touched AI at all.",
      ],
    },
    {
      id: 'on-existential-crisis',
      title: 'On Existential Crisis',
      excerpt:
        'Have you ever heard of the term "existential crisis"? It is a concept often discussed in philosophy. Roughly speaking, it refers to the deep anxiety and struggle we face when questioning whether our lives have any meaning or purpose.',
      date: 'Oct 2026',
      category: 'Philosophy & Identity',
      tags: ['Existential Crisis', 'Philosophy', 'Identity', 'Grit'],
      paragraphs: [
        'Have you ever heard of the term "existential crisis"? It is a concept often discussed in philosophy. Roughly speaking, it refers to the deep anxiety and struggle we face when questioning whether our lives have any meaning or purpose. I believe I went through this feeling myself quite some time ago.',
        'Since I want this blog to explore topics of genuine value, I decided this was a subject worth writing about.',
        'As I may have mentioned before, as long as we live in a society, most people tend to base their sense of purpose and "existential value" on how society evaluates them.',
        'After graduating early from high school, before figuring out what I wanted to do in the future, I spent a period trying to define or clarify my own existential value. I explored various philosophical ideas. I vaguely remember reading Michel Foucault\'s Discipline and Punish. My approach was to touch upon fragments of philosophical concepts and dive deeper into the ones that sparked my interest. I was also inspired by public figures like Yusuke Narita—I still remember his thought that "you are often happier when you stop thinking about whether you are happy or not." I don\'t fully remember why I was so obsessed with these thoughts back then, but I feel it was a necessary process for building my identity today.',
        'Through this pursuit, I realized something. No matter how deeply you explore these ideas, if you cannot articulate what you actually want—if you don\'t know where your existence should land in this society—you cannot genuinely crave a destination. Seeking an answer presented by someone else felt like a passive action, and I began to question whether there was any existential value in that. A philosophy is ultimately just one way of thinking or experiencing the world. While some people might be able to forcefully convince themselves that a certain philosophy defines their entire life, I simply wasn\'t that clever.',
        'In my case, I believe this crisis happened simply because I had too much free time to think. But looking ahead, I believe many people will start experiencing similar emotions in response to AI. We shouldn\'t forget the positive aspects—its contribution to technological innovation will likely be incredible. However, to protect our self-esteem, I think it is crucial to keep thinking for ourselves. I honestly cannot offer a clear-cut answer, and since this topic is quite abstract, probably only a limited number of people will fully grasp it.',
        'I know this might sound extreme or like relying purely on willpower. But moving forward, I believe you need the grit to keep validating yourself, no matter what anyone else says. Without that strong mindset, I fear people will suffer a lot in the future—especially those who work closely with artificial intelligence.',
      ],
    },
  ],
  ja: [
    {
      id: 'why-our-generation-cannot-ignore-agi',
      title: 'なぜ私たちの世代はAGIを無視できないのか',
      excerpt:
        '個人的な見解かもしれないが、今日の若者は「AGI（汎用人工知能）はすぐには実現しない」「AIに仕事を奪われることはない」といった楽観的な声を盲信すべきではないと強く思っている。',
      date: '2026年10月',
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
    {
      id: 'why-masses-happier-without-ai',
      title: '大衆はAIを使わない方が幸せであると信じる理由',
      excerpt:
        '「AIを使いこなす者が勝つ」「AIに適応することこそが生き残る道だ」といった決まり文句を、おそらく一度は耳にしたことがあるだろう。これから私が語るのは、こうした言説に対するアンチテーゼである。',
      date: '2026年10月',
      category: 'AIと人間性',
      tags: ['AIリテラシー', 'ハルシネーション', '心理・人間性', '考察'],
      paragraphs: [
        '「AIを使いこなす者が勝つ」「AIに適応することこそが生き残る道だ」といった決まり文句を、おそらく一度は耳にしたことがあるだろう。これから私が語るのは、こうした言説に対するアンチテーゼである。人によっては受け入れがたいかもしれないので、ここで読むのをやめてもらっても構わない。私は、大多数の人々はAIなしで生きる方が実際には幸せであると固く信じている。',
        '第一に、AIを真に使いこなすことは極めて困難である。現在のAI（汎用人工知能がいつの日か真の意識を持つかどうかの議論はさておき、特化型AIのことである）は、あくまで統計的推論に基づいて回答を生成しているに過ぎないということを、人々はしばしば忘れてしまう。AIは人間の感情や、私たちが投げかける言葉の背後にある根本的な意図を心から理解しているわけではない。簡単に言えば、それは人間性のようなものを無理やり数式に落とし込んだものに過ぎず、その結果として一般大衆には知性という幻想を抱かせてしまうのだ。',
        'この前提を踏まえると、道徳的な判断や人生の大きな選択をAIに委ねることは極めて危険である。例えば、人生相談や恋愛相談を例にとってみよう。相談すること自体が問題なのではない。危険なのは、LLM（大規模言語モデル）が過度に批判的にならないよう意図的に設計されているという事実にある。（こう考えてみてほしい。論理的ではあっても、容赦なく厳しかったり無神経だったりする相手とは、誰も関わりたいとは思わないだろう。）その結果、ユーザーの論理や視点が客観的に見ていかに馬鹿げたものであろうと、AIが真正面からユーザーを大きく批判することは滅多にない。',
        'この無批判な肯定は、「ハルシネーション」——AIの巧妙な嘘——と結びつき、それらを見破ることを信じられないほど困難にする。豊富な背景知識と一次情報で武装した専門家でさえ、その驚くほど巧妙なレトリックに抗えなくなる未来を私は危惧している。',
        '要するに、無垢な子供や何も知らない大人がこの技術に触れたとき、AIの作り話や極端に偏った事実の解釈に対抗できると期待するのは、全くの非現実的である。その人の心理状態によっては、人格そのものを歪めてしまうほどに危険なのだ。したがって、私は最初の主張に戻る。大部分の人々は、AIに全く触れない方がずっと幸せであると私は信じている。',
      ],
    },
    {
      id: 'on-existential-crisis',
      title: '実存的危機について',
      excerpt:
        '「実存的危機（Existential crisis）」という言葉を聞いたことはあるだろうか。これは哲学の領域でよく議論される概念だ。ざっくり言えば、自分の人生に意味や目的があるのかと問い詰めたときに直面する、深い不安や葛藤のことを指す。',
      date: '2026年10月',
      category: '哲学・アイデンティティ',
      tags: ['実存的危機', '哲学', 'アイデンティティ', 'マインドセット'],
      paragraphs: [
        '「実存的危機（Existential crisis）」という言葉を聞いたことはあるだろうか。これは哲学の領域でよく議論される概念だ。ざっくり言えば、自分の人生に意味や目的があるのかと問い詰めたときに直面する、深い不安や葛藤のことを指す。私自身、ずいぶん前にこの感覚を経験したように思う。',
        'このブログでは真に価値のあるトピックを探求したいと思っているため、このテーマは書くに値すると判断した。',
        '以前どこかで触れたかもしれないが、私たちが社会の中で生きている以上、大半の人は自分の存在意義や「実存的価値」を、社会からどう評価されるかに委ねてしまう傾向がある。',
        '私は高校を早期卒業した後、将来何をしたいのかを見定める前に、自分自身の実存的価値を定義し、明確にしようともがいた時期があった。さまざまな哲学的な考えを探求し、ミシェル・フーコーの『監獄の誕生』を読んだのもおぼろげに記憶している。私のやり方は、哲学的な概念の断片に触れ、興味を惹かれたものをさらに深掘りしていくというアプローチだった。また、成田悠輔氏のような著名人の発言にもインスピレーションを受けており、「幸せかどうかを考えるのをやめた方が、結果的に幸せになれることが多い」という彼の考えは今でも覚えている。当時の自分がなぜそこまでこれらの思考にのめり込んでいたのか、今となってははっきりと思い出せないが、現在のアイデンティティ（人格）を形成するためには必要なプロセスだったと感じている。',
        'こうした探求を通して、私はあることに気がついた。どれほど深く思想を探求しようとも、自分が実際に何を欲しているのかを言語化できなければ——つまり、この社会のどこに自分の存在を着地させるべきかが分かっていなければ——目的地を心から渇望することなどできないのだ。誰かが提示した答えを求めることは受動的な行為に感じられ、そこに実存的な価値があるのかと疑問を抱くようになった。哲学も結局のところ、世界を捉え、経験するための一つの思考法にすぎない。特定の哲学が自分の人生のすべてを定義づけるものだと、無理やり自分に思い込ませることができる人もいるかもしれないが、私はそこまで器用ではなかった。',
        '私の場合は、単に考えるための自由な時間が多すぎたためにこの危機が生じたのだと思う。しかし将来を見据えると、今後多くの人がAIに対してこれと似たような感情を抱き始めるのではないかと考えている。もちろん、AIのポジティブな側面を忘れるべきではない。技術革新への貢献は間違いなく素晴らしいものになるだろう。しかし、私たちの自尊心を守るためには、自分自身の頭で考え続けることが極めて重要だと思う。正直なところ、明確な答えを提示することはできないし、この話題自体が非常に抽象的であるため、完全に理解できる人は限られるだろう。',
        '極端な暴論や、単なる根性論のように聞こえるかもしれない。しかしこれからの時代、誰に何を言われようと、自分だけは自分を肯定し続けるくらいの「気概（Grit）」が必要になるはずだ。その強靭なマインドセットがなければ、将来多くの人が——特に人工知能と密接に関わる人間ほど——深く苦しむことになると危惧している。',
      ],
    },
  ],
}

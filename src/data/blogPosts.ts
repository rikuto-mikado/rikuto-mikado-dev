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

export interface UpcomingPost {
  title: string
  status?: string
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
        'Have you ever heard the term "existential crisis"? It is a concept often discussed in philosophy. Roughly speaking, it refers to the deep anxiety and struggle you face when you question whether your life has any meaning or purpose. Since I have experienced this feeling myself, I decided to write about it here.',
      date: 'Oct 2026',
      category: 'Philosophy & Identity',
      tags: ['Existential Crisis', 'Philosophy', 'Identity', 'Grit'],
      paragraphs: [
        'Have you ever heard the term "existential crisis"? It is a concept often discussed in philosophy. Roughly speaking, it refers to the deep anxiety and struggle you face when you question whether your life has any meaning or purpose. Since I have experienced this feeling myself, I decided to write about it here.',
        'In this blog, I want to explore topics that have genuine value, even if they are based on my subjective views. That is why I chose this theme, drawing on my own experiences.',
        'As I might have mentioned somewhere before, most people basically tend to base their reason for being—their "existential value"—on how society evaluates them. Finding a motive to live through societal evaluation is not a bad thing in itself. However, if you rely too heavily on this system and a passive mindset becomes your norm, it is easy to fall into the trap of thinking that society\'s evaluation directly equals your own worth.',
        'Or, if your personal values strongly conflict with society\'s evaluation system in the first place, relying on that social standard can cause a significant psychological burden.',
        'In my case, graduating early from high school simply gave me a lot of free time to think, which likely triggered this process. If I had stayed at my local high school, I don\'t think I would have encountered these existential feelings or struggled with them so early on.',
        'Before figuring out what I wanted to do—or what I wanted to avoid—in the future, I went through a period where I struggled to define and clarify my own existential value. In a way, the gap between common sense and my own thoughts was so large that I might have been trying to justify that my thoughts weren\'t crazy. Or perhaps I was just looking for an environment (whether an educational institution, an organization, or in a broader sense) where I could spread my wings.',
        'I explored various philosophical ideas, and I remember reading Michel Foucault\'s Discipline and Punish. Even recently, I bought a paperback copy of J.S. Mill\'s On Liberty and am planning to read it. So, the exploration I am talking about here is still ongoing.',
        'I was also inspired by remarks from public figures like Yusuke Narita. I still remember a phrase he said on YouTube or somewhere: "I think you end up happier if you stop thinking about whether you are happy or not." I can\'t quite remember why I was so absorbed in these thoughts back then, but I feel it was a necessary process to form my current identity.',
        'The foundation of my exploration involves the use of LLMs (Large Language Models). I touch upon philosophical concepts, even if just in fragments, and pick up the ones that catch my interest.',
        'However, keeping in mind that the information output by LLMs is merely statistical inference, I set evaluation criteria such as: "Does this phenomenon really exist?" or "Can the ideology the LLM is talking about actually be confirmed as a primary source?" I pick up potential hallucination spots in advance and use them for a paradoxical approach (a method of deriving a highly pure answer by starting with a denial) when accessing primary sources. I believe this approach is highly rational because it eliminates the need to scrutinize massive amounts of information from scratch.',
        'However, through this exploration, I realized something.',
        'No matter how deeply you explore ideas, if you cannot articulate what you actually want—that is, if you don\'t know where your existence should land in this society—you cannot truly crave a destination from the bottom of your heart. Seeking an answer presented by someone else felt like a passive act, and I began to doubt if there was any existential value in that.',
        'Philosophy, in the end, is just one way of thinking to understand and experience the world. Some people might be able to force themselves to believe that a specific philosophy defines their entire life, but I was not that clever.',
        'To digress a little, we shouldn\'t forget the positive aspects of AI. I already feel that the contribution of artificial intelligence to technological innovation is undeniably revolutionary. If we look solely at the development of society, I believe things like humanity achieving decades\' worth of great feats in just a few weeks could actually happen.',
        'But that is strictly a macro-level story about society. To protect our self-esteem on a micro level, I think it is extremely important to keep thinking with our own heads.',
        'Honestly, I cannot offer a clear answer to others regarding such existential concepts, nor do I have any sense that I have found a perfectly rational interpretation within myself.',
        'This might sound like extreme logic or just sheer willpower. I actually think it is. I am aware that I am waving around an existential resolution that, objectively speaking, might seem illogical or irrational—claiming that no matter what anyone says to me, "I alone will continue to like myself, and I alone will continue to validate myself."',
        'However, I believe that continuously directing this kind of unconditional validation toward yourself is incredibly important, especially when facing things like artificial intelligence.',
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
        '「実存的危機（Existential crisis）」という言葉を聞いたことはあるだろうか。これは哲学の領域でよく議論される概念だ。ざっくり言えば、自分の人生に意味や目的があるのかと問い詰めたときに直面する、深い不安や葛藤のことを指す。私自身はこの感情を経験したことがあるため、ここに記していこうと思う。',
      date: '2026年10月',
      category: '哲学・アイデンティティ',
      tags: ['実存的危機', '哲学', 'アイデンティティ', 'マインドセット'],
      paragraphs: [
        '「実存的危機（Existential crisis）」という言葉を聞いたことはあるだろうか。これは哲学の領域でよく議論される概念だ。ざっくり言えば、自分の人生に意味や目的があるのかと問い詰めたときに直面する、深い不安や葛藤のことを指す。私自身はこの感情を経験したことがあるため、ここに記していこうと思う。',
        'ここでのブログの記事では、あくまで主観ではあるができるだけ価値のあるであろう内容を取り扱おうとは思っているため、今回は自身の経験も踏まえながらこのテーマを選んだ。',
        'どこかで前述したことがあるかもしれないが、基本的には多くの人間は自分の存在意義や「実存的価値」を、社会からどう評価されるかに委ねてしまう傾向がある。社会からの評価から生きていく動機を見出すということ自体は決して悪いことではないが、この評価体系に依存しすぎて受動的価値観が常態化すると、社会の評価が自分の価値に直結するなどという考えに陥りやすくなる。',
        'もしくは、そもそも社会的な評価体系と自分の価値観が強く乖離している場合、社会の評価軸に依存すること自体がその個人にとってはかなり心理的な負荷を伴うことになる。',
        '私の場合は、高校の早期卒業により単に考えるための自由な時間があったが故に、考えるきっかけにはなったのだろう。もし地元の高校にずっと属し続けていた場合、このような実存的感情に早くから遭遇し、悩み葛藤することはなかったと感じている。',
        '将来何をしたいのか、何を避けたいのかを見定める前に、自分自身の実存的価値を定義し、明確にしようともがいた時期があった。ある意味結果的には、社会の常識と自身の考えの乖離が大きく、自身の考えはおかしなものではないと正当化したかった、もしくは羽を伸ばせる環境（教育機関や組織など広い定義で捉えている）を探していたとも取れるかもしれない。',
        '私はさまざまな哲学的な考えを探求し、ミシェル・フーコーの『監獄の誕生』を読んだのも記憶している。最近でもJ・S・ミルの『自由論』の文庫本を購入し読もうとしており、今でもここで話している探求というのは続いている。',
        'また、成田悠輔氏のような著名人の発言にもインスピレーションを受けており、「幸せかどうかを考えるのをやめた方が、結果的に幸せになれると思う」とYoutubeかどこかで彼が発していた言葉は今でも覚えている。当時の自分がなぜそこまでこれらの思考にのめり込んでいたのか、今となってははっきりと思い出せないが、現在のアイデンティティ（人格）を形成するためには必要なプロセスだったと感じている。',
        '私の探求のベースには、LLMs（大規模言語モデル）の活用がある。断片的にでも哲学的な概念に触れ、興味を惹かれたものをピックアップしていく。',
        'ただし、LLMsが出力する情報はあくまで統計的推論であるというのを念頭に置き、「この事象は本当に存在するのか」「LLMsが話しているこの主義主張は実際に一次情報として存在が確認できるのか」といった評価軸を設けている。ハルシネーションの可能性がある場所を事前にピックアップしておき、その要素を用いた逆説的なアプローチ（否定から入っていくことで極めて純度の高い一つの答えを導く手法）で一次情報にアクセスしていく。このアプローチは、膨大な情報を一から精査していく必要がないため極めて合理的であると考えている。',
        'しかし、こうした探求を通して、私はあることに気がついた。',
        'どれほど深く思想を探求しようとも、自分が実際に何を欲しているのかを言語化できなければ、つまり、この社会のどこに自分の存在を着地させるべきかが分かっていなければ、目的地を心から渇望することなどできないのだ。誰かが提示した答えを求めることは受動的な行為に感じられ、そこに実存的な価値があるのかと疑問を抱くようになった。',
        '哲学も結局のところ、世界を捉え、経験するための一つの思考法にすぎない。特定の哲学が自分の人生のすべてを定義づけるものだと、無理やり自分に思い込ませることができる人もいるかもしれないが、私はそこまで器用ではなかった。',
        '少し話が逸れることになるが、AIのポジティブな側面を忘れるべきではない。人工知能による技術革新への貢献は間違いなく革新的なものであると今ですら感じるし、社会の発展という一点で見れば、人類が数十年かけて成し遂げるような偉業を数週間で達成するなどということも起こりうると思っている。',
        'しかし、それはあくまで社会の（マクロの）話であり、ミクロ視点での私たちの自尊心を守るためには、自分自身の頭で考え続けることが極めて重要だと思う。',
        '正直なところ、私自身からも他者に対してこのような実存的な概念に対して明確な答えを提示することはできないし、また私自身も合理性を伴った解釈を自身の中で提示できているといった自覚は全くない。',
        '極端な暴論や、単なる根性論のように聞こえるかもしれない。実際にその通りだと思うし、私は誰に何を言われようと、「自分だけは自分を好きで居続け、自分だけは自分を肯定し続ける」などと謳うような、客観的に見れば非論理的で非合理的とも取れうるような実存的決意を振りかざしている自覚はある。',
        'しかし、このような無条件の肯定を自身に向け続けるというのは、特に人工知能とやらに向き合う上では非常に重要であるように思っている。',
      ],
    },
  ],
}

export const upcomingPostData: Record<Language, UpcomingPost | null> = {
  en: {
    title: 'Unfortunately, I Am Young',
    status: 'In Progress • Soon',
  },
  ja: {
    title: '私は残念ながら若者だ',
    status: '執筆予定 (In Progress)',
  },
}

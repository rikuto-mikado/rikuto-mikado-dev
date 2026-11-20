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
  excerpt: string
  status?: string
}

export const blogPostsData: Record<Language, BlogPost[]> = {
  en: [
    {
      id: 'why-our-generation-cannot-ignore-agi',
      title: 'Why Our Generation Cannot Ignore AGI',
      excerpt:
        'This might just be my personal opinion, but I strongly believe that young people today should not blindly trust optimistic claims like "AGI (Artificial General Intelligence) will not happen anytime soon" or "AI will not take our jobs."',
      date: 'Oct 2026',
      category: 'AI & Strategic Horizons',
      tags: ['AGI', 'Physical Layer', 'Identity', 'Career Strategy'],
      paragraphs: [
        'This might just be my personal opinion, but I strongly believe that young people today should not blindly trust optimistic claims like "AGI (Artificial General Intelligence) will not happen anytime soon" or "AI will not take our jobs."',
        'If you look back, goals that experts once thought would take 30 years are now expected to happen within just a few years. We can already see AI making huge contributions to science—for example, OpenAI generating hundreds of research papers (even if some have errors)—and advanced AI-driven cyberattacks happening almost every week. The reason some people do not feel a sense of crisis is simply that they do not understand AI clearly enough.',
        'Moreover, AI development has become a geopolitical race. Even if some groups want to slow it down or deny its impact, governments and major tech companies will keep pushing toward AGI. We can already see them moving forward despite serious electricity shortages. Therefore, it is a mistake to dismiss AGI as a conspiracy theory or extreme pessimism.',
        'Because of this reality, I believe my career strategy is very rational. I am building a "safety net" by getting certified and gaining hands-on experience in a blue-collar field (specifically electrical engineering). This is a physical area that will be hard for AI to replace, at least for the next 10 to 15 years. While building this foundation, I also plan to earn my bachelor\'s and master\'s degrees.',
        'Even if my prediction is completely wrong and the grand vision of AGI fails, AI progress will not stop. Existing AI models still have a lot of room to grow, and new AI technologies may also rise from other regions like the Middle East. There is more than enough evidence to suggest that we will be surrounded by extremely advanced AI before we even reach the peak of our careers.',
        'However, here is the most important point.',
        'The main issue is not just whether AGI will be created or whether it will simply "take our jobs." The biggest threat is to our self-esteem and our identity.',
        'Most of us find meaning and value in life by contributing to society and helping others. We feel needed and like we belong when someone simply says "thank you" for our work. Right now, it might be hard to imagine AI completely destroying this basic human experience. Unfortunately, though, I believe this is a reality that our generation must start taking seriously.',
      ],
    },
    {
      id: 'why-masses-happier-without-ai',
      title: 'Why I Believe Most People Would Be Happier Without AI',
      excerpt:
        'You have probably heard common sayings like "Those who master AI will win" or "Adapting to AI is the only way to survive." What I am about to share is the exact opposite view.',
      date: 'Oct 2026',
      category: 'AI & Human Nature',
      tags: ['AI Literacy', 'Hallucinations', 'Psychology', 'Humanity'],
      paragraphs: [
        'You have probably heard common sayings like "Those who master AI will win" or "Adapting to AI is the only way to survive." What I am about to share is the exact opposite view. It may be hard for some people to accept, so feel free to stop reading here. I firmly believe that most people would actually be happier living without AI.',
        'First, truly mastering AI is extremely difficult. People often forget that current AI (specifically Narrow AI—putting aside the debate over whether AGI will ever gain real consciousness) only creates answers using statistical patterns. It does not truly understand human emotions or the real intention behind our words. Simply put, it is just an attempt to turn human behavior into math, which naturally gives the public the illusion that it is truly intelligent.',
        'Because of this, trusting AI with moral decisions or major life choices is very dangerous. Take life or relationship advice, for example. Asking for advice itself is not the problem. The danger is that LLMs are intentionally designed not to be too critical. (Think about it: nobody wants to talk to someone who is logical but always harsh and insensitive.) As a result, AI rarely pushes back strongly against a user, even when the user\'s logic or view is clearly unreasonable.',
        'This uncritical support mixes with "hallucinations"—the AI\'s believable lies—making them very hard to spot. I worry about a future where even experts with deep background knowledge and primary sources will struggle to resist its clever wording.',
        'In short, when children or everyday adults use this technology, it is unrealistic to expect them to protect themselves from AI\'s false claims or biased views of the facts. Depending on a person\'s mental state, it can be dangerous enough to twist their personality. Therefore, I come back to my original point: I believe most people would be much happier if they never used AI at all.',
      ],
    },
    {
      id: 'on-existential-crisis',
      title: 'On Existential Crisis',
      excerpt:
        'Have you ever heard the term "existential crisis"? It is a concept often discussed in philosophy. Roughly speaking, it refers to the deep anxiety and struggle you feel when you question whether your life has any meaning or purpose. Because I have experienced this feeling myself, I decided to write about it here.',
      date: 'Oct 2026',
      category: 'Philosophy & Identity',
      tags: ['Existential Crisis', 'Philosophy', 'Identity', 'Grit'],
      paragraphs: [
        'Have you ever heard the term "existential crisis"? It is a concept often discussed in philosophy. Roughly speaking, it refers to the deep anxiety and struggle you feel when you question whether your life has any meaning or purpose. Because I have experienced this feeling myself, I decided to write about it here.',
        'On this blog, I want to write about topics that have real value, even if they are based on my personal views. That is why I chose this theme, drawing from my own experiences.',
        'As I may have mentioned before, most people tend to base their reason for living—their "existential value"—on how society judges them. Finding motivation through social approval is not bad by itself. However, if you rely on it too much and become passive, it is easy to fall into the trap of believing that society\'s judgment equals your true worth.',
        'Also, if your personal values strongly clash with society\'s standards in the first place, relying on those standards can create a heavy mental burden.',
        'In my case, graduating early from high school gave me a lot of free time to think, which probably started this process. If I had stayed at my local high school, I do not think I would have faced these existential feelings or struggled with them so early.',
        'Before I figured out what I wanted to do—or what I wanted to avoid—in the future, I went through a period of struggling to define my own value. In a way, the gap between common sense and my own ideas was so wide that I may have been trying to prove my thoughts were not crazy. Or perhaps I was simply looking for an environment (such as a school, an organization, or something broader) where I could grow freely.',
        'I explored many philosophical ideas, and I remember reading Michel Foucault\'s Discipline and Punish. Recently, I also bought a paperback copy of J.S. Mill\'s On Liberty and plan to read it. So, the search I am talking about here is still going on.',
        'Comments from public figures like Yusuke Narita also inspired me. I still remember something he said on YouTube or somewhere similar: "I think you end up happier if you stop thinking about whether you are happy or not." Looking back, I cannot quite remember why I was so absorbed in these thoughts, but I feel it was a necessary step in shaping who I am today.',
        'The base of my exploration is using LLMs (Large Language Models). Through them, I touch on different philosophical ideas, even in small pieces, and pick up the ones that interest me.',
        'However, I always keep in mind that LLM outputs are only statistical guesses. Because of this, I ask myself critical questions like "Does this really exist?" or "Can this idea actually be confirmed in a primary source?" I look for possible hallucinations in advance and check the original sources by questioning the AI\'s claims first. I think this method is very rational because it saves me from having to check huge amounts of information from scratch.',
        'Still, through this search, I realized something.',
        'No matter how deeply you study different ideas, if you cannot put into words what you actually want—and if you do not know where you want to fit in society—you cannot truly desire a goal from the bottom of your heart. Looking for an answer prepared by someone else felt passive, and I started to doubt whether there was any real meaning in that.',
        'In the end, philosophy is just one way of looking at and experiencing the world. Some people may be able to convince themselves that a single philosophy defines their whole life, but I was not that clever.',
        'To step aside for a moment, we should not forget the positive sides of AI. I already feel that AI\'s role in technological progress is truly revolutionary. Looking only at the growth of society, humanity might actually achieve decades of major breakthroughs in just a few weeks.',
        'However, that is strictly a big-picture story about society. On a personal level, to protect our self-esteem, I believe it is very important to keep thinking with our own minds.',
        'Honestly, I cannot give others a clear answer to these existential questions, and I do not feel that I have found a completely logical answer for myself either.',
        'This might sound like an extreme argument or just pure willpower. In fact, I think it is. I know I am holding on to a mindset that might look illogical from the outside—telling myself that no matter what anyone says, "I alone will keep liking myself, and I alone will keep accepting myself."',
        'Even so, I believe that giving yourself this kind of unconditional support is extremely important, especially when facing something like artificial intelligence.',
      ],
    },
    {
      id: 'education-complexity-and-information-gap',
      title: 'The Complexity of Education and the Information Gap',
      excerpt:
        'Many problems in Japan\'s education system are often discussed, and looking at "English education" as one example clearly shows its deeper flaws. Some parts of it may be useful, but looking at the whole picture, I strongly doubt whether the current way of teaching English is worth spending so much time on as a school subject.',
      date: 'Oct 2026',
      category: 'Education & Social Structures',
      tags: ['Education System', 'English Education', 'Information Gap', 'Self-Determination'],
      paragraphs: [
        'Many problems in Japan\'s education system are often discussed, and looking at "English education" as one example clearly shows its deeper flaws. Some parts of it may be useful, but looking at the whole picture, I strongly doubt whether the current way of teaching English is worth spending so much time on as a school subject.',
        'In reality, adults who cannot even speak English properly often stand in front of classrooms, taking up students\' time with daily vocabulary tests. If students end up thinking "this is what English is" from those lessons, it completely misses the point. I do not want to criticize everything about English education in Japan, but I am so critical because this situation has hardly changed since our parents\' generation. People talk about "education reform," yet real progress in classrooms is far too slow.',
        'Of course, there are structural reasons why the system stays focused on entrance exams and why few adults try to change it from the inside. Teachers are legally banned from political or group actions like strikes, so it is understandable that the adults closest to the classroom feel stuck. At least around me, I almost never saw teachers speak out against the system. Still, no matter what rules limit them, I felt it was very immature for adults to stay silent and inactive while constantly telling children to "take initiative" and "make a change." If adults themselves cannot act, what do they expect children to do?',
        'Looking at the environment around students today, differences in family background are nothing new. However, the two biggest factors right now are the rise of AI and the huge amount of entertainment available. In a world where information and instant pleasure are always within reach, I think many people just sit at their desks out of habit, without ever asking why they are studying in the first place.',
        'The clearest example of this is how Japanese universities have basically become "job-hunting prep schools." The belief that "entering a good university leads to a good job" is still deeply rooted. Because so many people repeat this without questioning it, it has turned into a vague kind of "common sense." For those who cannot find reliable information on their own, going to a well-known university might indeed be a safe option. However, if we think about it from scratch, there is another strong possibility: people do not become capable because they went to a good university. Instead, people who were already smart and curious simply passed through top universities and ended up at good companies. Following the crowd and common sense is easy, but it often means living by other people\'s standards. In a fast-changing capitalist society, I feel this mindset will leave many people with deep regrets later on.',
        'That said, if we look at this from a bigger, national perspective, there is an argument that Japan\'s education system is fine as it is. As a national system, it has clearly succeeded in producing large numbers of serious, reliable workers who faithfully do their jobs, keeping society running smoothly. Most people are ordinary, and society is built and maintained by that majority.',
        'Of course, in countries like the United States, the culture values rare geniuses rising to the top and leading the nation forward. However, even in a society like Japan that values uniformity, on an individual level there are always people who reject the one-size-fits-all system—and there may actually be quite a lot of them beneath the surface.',
        'If we want to help individuals who do not fit into the traditional mold, the remaining option is to make education more diverse and complex. If more alternative schools and private learning programs appear, and taking paths outside regular schools becomes normal, children will have more choices in how they learn. However, this complexity would also widen the "information gap" dramatically, so it is natural that some people are doubtful about it.',
        'In the end, it comes down to what we prioritize. If our goal is to keep society stable for the majority, the traditional uniform system makes sense. On the other hand, if we value freedom for the minority and individual potential, we should choose a more diverse system, even if it brings the risk of wider gaps.',
        'Of course, aiming for traditional success involves a lot of luck—such as social conditions, financial crashes, and the way AI is now heavily affecting white-collar work. Still, whichever way society or the system goes, there is only one conclusion we must face as individuals: nothing will ever change unless we think for ourselves and take action.',
      ],
    },
    {
      id: 'the-ideal-of-diversity',
      title: 'The Ideal of Diversity',
      excerpt:
        'Among the general public, there are people who easily look down on other countries based on emotion or illogical personal experiences. They might truly believe what they say, or they might not be thinking deeply at all, just using it as casual talk within their friend groups.',
      date: 'Oct 2026',
      category: 'Geopolitics & Society',
      tags: ['Diversity', 'Geopolitics', 'National Identity', 'Public Discourse'],
      paragraphs: [
        'Among the general public, there are people who easily look down on other countries based on emotion or illogical personal experiences. They might truly believe what they say, or they might not be thinking deeply at all, just using it as casual talk within their friend groups.',
        'Take China as an example. It has one of the largest populations in the world. Even if it had the same percentage of immoral people as Japan, the total number would be much larger, so it would naturally stand out more. On top of that, shocking content tends to get more attention on social media, which makes this worse. As a result, even when a problem only happens in one area or involves a few incidents, many people criticize the entire country without forming a logical argument. We often see this on social media, and I remember a few people like this around me as well.',
        'From my personal point of view, living in different places or having different cultures and norms is not a good reason to discriminate against others. I think it is basically very foolish. I am not sure if this behavior is just crowd psychology or some kind of unspoken physical reaction, but right now it feels more like the former.',
        'Another common opinion I see is "I hate Russia," often with the reason "because they occupy the Northern Territories." However, I think we should judge this more carefully.',
        'As I mentioned earlier, we should separate a government from its citizens. Even beyond that, from a geopolitical view, the Northern Territories serve as an important base for Russia to send nuclear submarines into the Pacific Ocean. We have to recognize that they have strong national defense reasons to hold onto them.',
        'In the first place, history is mainly the personal views and interpretations of scholars from that time. Its legitimacy is often argued using documents and records that just happened to survive. Because of this, it is very hard to define a truly neutral history. What I mean is that claiming you are right based only on your own side\'s historical view is not as strong an argument as many people think.',
        'Of course, between countries, governments still need to keep making claims to protect their reputation. Considering Japan\'s national pride and the people who still ask for the return of the Northern Territories, it is clear why this stance matters. Ideally, governments would handle formal disputes while ordinary people get along with each other, though in reality it does not seem to work that smoothly.',
        'On a related note, there is something I want to say even if it might be misunderstood. Of course, the basic rule is that discrimination is wrong, including against foreigners. However, as an exception on a national level, I think it is better to set certain "boundaries" or "limits." The reason is simple: too much diversity can break people and society.',
        'The word "diversity" sounds convenient. I am not against diversity itself, and I am generally positive about foreigners coming to Japan. However, what happens if we ban every action that might be called racism and push for unlimited diversity? I think it leads to the kinds of problems that European countries are facing today.',
        'When many different groups enter a country, depending on the situation, local environments can get worse, national identity can weaken, and traditional culture can be affected. The biggest impact is on public safety. The UK and France are clear examples of diversity going too far. In fact, the influence of immigration has become so strong that people complain about immigrants (including highly skilled ones) taking their jobs, in addition to rising safety concerns.',
        'Of course, there is a reason behind this: these countries began accepting immigrants to fight declining birth rates. The US, Canada, and Australia are also using immigration to boost their populations while native birth rates fall. However, even if it has not been smooth, those countries have a long history of different racial groups living together, so in some cases they are able to adapt.',
        'My point is that in a country like Japan, which has operated almost as a single-ethnic nation for a long time, accepting immigrants without clear rules is dangerous. It is not just a question of "anyone is fine as long as they are skilled." Take an extreme example: if a large number of fundamentalist Muslims moved in next door to you and you could not avoid them, would you be able to adapt? This is not about racism, but a practical question of balance from the public\'s perspective: "Can they adapt to the culture of this country?"',
        'Accepting people with completely different backgrounds without any conditions can damage a country in some cases. We need to face that reality. At the same time, choosing total rejection will certainly not lead to a bright future either.',
      ],
    },
    {
      id: 'on-unfounded-confidence',
      title: 'On Unfounded Confidence',
      excerpt:
        'I believe that "unfounded confidence" is essential for anyone taking on a challenge, especially for those of us who are still students.',
      date: 'Nov 2026',
      category: 'Philosophy & Identity',
      tags: ['Self-Belief', 'Independence', 'Conformity', 'Youth'],
      paragraphs: [
        'I believe that "unfounded confidence" is essential for anyone taking on a challenge, especially for those of us who are still students.',
        'This kind of confidence basically comes from ignorance—from not knowing much yet. Even so, that feeling of being able to do anything, or feeling ahead of others, plays a very important role when starting something new. At the same time, it is also true that young people in my generation (including myself) are finding it harder to feel this way. As superintelligence spreads through society, layoffs will surely become obvious to everyone. However, if we wait until then to act, it will already be too late in many ways.',
        'I think everyone should have this unfounded confidence. Of course, if you overestimate yourself, it turns into arrogance; if you underestimate yourself, it turns into putting yourself down. Still, at the very least, once you decide to do something different from everyone else, this feeling becomes necessary.',
        'To be clear, this feeling is not about looking down on others. It might sound cold, but I think it actually comes down to a complete lack of interest in what others are doing. In the end, unless you can take care of yourself and have some breathing room, you cannot really care for the people around you. It is easy to imagine how exhausting it is to worry about others while wearing yourself out.',
        'Many people listen to trends and popular opinions, go along with them, copy others, and try to fit in. As a way of getting along in society, I think that is a useful skill. However, we should remember that it can also lead to giving up your independence and "living by other people\'s standards." I do not mean all of it is like that, but from my perspective, keeping up with my generation\'s trends and opinions is exhausting, and honestly, I am not very interested in them in the first place (even if I am happy to be friends with those people).',
        'Many people feel unhappy with society, the job market, or the system, and sense that something is wrong. Yet far too many of them never take action and just end up complaining. In group psychology, this might be completely natural, but to me it looks strange and even a little scary.',
        'The way I see it, every person has their own life. Even if adults criticize or lecture you, you should not let go of your own core values or the things you want to protect. I think those feelings are worth keeping, whether they come from a positive goal like "this is how I want to live" or from a negative one like "this is a way of life I refuse to accept."',
        'Not being understood by people around you is completely normal, so there is no need to force others to understand you. However, in situations where understanding really matters—such as explaining your choices to your parents—emotional arguments will not work. There will be moments when you need solid, clear logic.',
        'Getting listeners to set aside common assumptions so they can truly understand your ideas from the ground up is extremely difficult. I know that very well, yet I believe it is a skill you will definitely need in life.',
      ],
    },
    {
      id: 'how-to-break-preconceptions',
      title: 'How to Break Preconceptions and Prejudices',
      excerpt:
        'Because I continue to walk a path very different from mainstream choices, I know that I am quite unfamiliar with the common sense and prejudices widely accepted by society.',
      date: 'Nov 2026',
      category: 'Perspectives & Society',
      tags: ['Preconceptions', 'Perspective', 'Multiple Markets', 'Common Sense'],
      paragraphs: [
        'Because I continue to walk a path very different from mainstream choices, I know that I am quite unfamiliar with the common sense and prejudices widely accepted by society.',
        'Many people, including my friends, are controlled by invisible rules and ideas of "common sense." They convince themselves that this is simply how things are, give up, and force themselves to fit in. Once you get used to it, that is the end of it, and I think it is actually the easiest way to live. In fact, going against this flow is usually more harmful than helpful for most people.',
        'The reason is simple: most people want to protect their own space, status, and position. Because of this, they can easily dismiss outside norms as "strange" or unconsciously look away from them. If they actually face those different ideas, they feel as if their own experiences and hard work are being denied—and sometimes they really are—which likely creates an unconscious fear.',
        'However, as people grow older and their social circles become more fixed—leaving places like school, which for better or worse hold many different viewpoints—they start to believe that the view in front of them is normal and represents the entire world. Eventually, they stop noticing the doubts or conflicts inside their own values. Some people might even mistake this for a purely personal issue.',
        'I am not a particularly kind person, so even if I meet people like that, I would not try to help or advise them unless I have a personal reason to do so. (People are naturally self-centered. As a basic rule, you cannot care for others until you care for yourself first. Also, well-meaning advice that is actually selfish can distort people more than anything else.) Still, I would like to share a few thoughts on this topic here.',
        'First, I personally believe that having as few assumptions as possible helps you live a happier life. When your world is wider, you gain more choices, more possibilities, and a clearer understanding of everyday events.',
        'In my view, the fastest and most practical way to do this is to avoid staying in just one industry or market. Instead, it is very important to stay involved in at least two completely different fields.',
        'To give a rough example, the values, habits, and common sense of the construction industry might look strange or funny to researchers and academics. Of course, the exact opposite is also true.',
        'In the end, people unconsciously want to believe that what they see is normal and true. I do not think this is a bad thing; in fact, it is completely natural. However, precisely for that reason, it seems very important to keep seeing completely different markets and norms with your own eyes, and to build up those experiences.',
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
        '私の探求の基盤には、LLMs（大規模言語モデル）の活用がある。断片的にでも哲学的な概念に触れ、興味を惹かれたものをピックアップしていく。',
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
    {
      id: 'education-complexity-and-information-gap',
      title: '教育の複雑化と情報格差',
      excerpt:
        '日本の教育制度が抱える問題は数多く議論されているが、その中の一つの要素として「英語教育」を切り取ってみたとき、そこには構造的な歪みが象徴的に表れているように思う。部分的に見れば意味のある取り組みも含まれているのかもしれないが、総合的に俯瞰したとき、現在のやり方が「一つの教科」として多くの時間を割いてまで学ぶ意義のあるものかといえば、甚だ疑問である。',
      date: '2026年10月',
      category: '教育・社会構造',
      tags: ['教育制度', '英語教育', '情報格差', '自己決定'],
      paragraphs: [
        '日本の教育制度が抱える問題は数多く議論されているが、その中の一つの要素として「英語教育」を切り取ってみたとき、そこには構造的な歪みが象徴的に表れているように思う。部分的に見れば意味のある取り組みも含まれているのかもしれないが、総合的に俯瞰したとき、現在のやり方が「一つの教科」として多くの時間を割いてまで学ぶ意義のあるものかといえば、甚だ疑問である。',
        '現実問題として、教育現場では英語をまともに話せない大人が教壇に立ち、毎日のように単語テストばかりを繰り返して生徒の時間を奪っているケースが少なくない。もし生徒たちがその授業を通じて「これが英語というものだ」と思い込んでしまうのであれば、これほど本末転倒な話はないだろう。日本の英語教育のすべてを否定するつもりはないが、私がここまで批判的に捉えているのは、こうした光景が私たちの親世代からほとんど変わっていないからである。表向きには「教育改革」が叫ばれているものの、現場の改善はあまりにも遅すぎる。',
        'もっとも、背景に根強い「受験至上主義」の体系があり、それを内側から崩そうと奮起する大人が見当たらないのには、構造的な理由もあるのだろう。教員という立場にはストライキなどの政治的・集団的な行動が法律で禁じられているといった制約があり、現場に最も近い大人たちが身動きを取れないでいること自体は理解できなくもない。少なくとも私の身の回りでは、現場の大人が制度に対して声を上げている例は皆無に等しかった。しかし、どれほど制度上の縛りがあるにせよ、大人自身が動けないままでいるにもかかわらず、子どもたちに対してばかり「主体性」や「変革」を促すような風潮は、あまりにも大人気ないと感じた。大人が動けない環境の中で、一体子どもに何をしろというのだろうか。',
        'また、学ぶ側を取り巻く環境的要因に目を向けると、家庭環境による差などは今に始まった話ではないが、現代において特に影響が大きいのは「AIの勃興」と「娯楽の充実」である。あらゆる情報や快楽が即座に手に入る環境の中で、そもそも「なぜ学ぶのか」という目的意識を持たないまま、惰性で机に向かっている人は非常に多いように思う。',
        'その最たる例が、日本の大学が事実上の「就職予備校」のような構造に陥っていることだ。「良い大学に入れば、良い就職先に就ける」という言説はいまだに根強く、多くの人がそれを疑わずに語るがゆえに、実態のよくわからない一種の「常識」として社会に定着してしまっている。自ら一次情報を辿ることができない人にとってみれば、世間的に評価される大学へ行くことは確かに一つの安全策なのかもしれない。しかしゼロベースで考えてみれば、「大学に入ったから優秀になった」のではなく、「もともと知的好奇心や処理能力の高かった人間が、たまたま世間的に良いとされる大学を通過し、結果として良い企業に就職しているだけ」という可能性は十分にあり得る。世間の常識という「大衆思想」に身を委ねるのは楽ではあるが、それは必然的に他者軸の生き方になりやすく、変化の激しい資本主義社会を生きていく上では、後から深い後悔を生むことになる気がする。',
        'ただ、視点を変えてマクロな「国家論」として見た場合、現在の日本の教育はこのままでも良いという見方も成り立つ。なぜなら、真面目で素直に、与えられた仕事を忠実にこなす人材を大量に生み出し、その大衆層によって社会が破綻なく運営されている時点で、国家のシステムとしては間違いなく「成功」しているからだ。大半の人間はいわゆる凡人であり、社会というものはそうした多数派によって作られ、維持されている。',
        'もちろん、アメリカのように突出した一部の天才が台頭し、国全体を牽引していくことが良しとされる環境もあるだろう。しかし、日本のように均質性を重んじる社会であっても、個人のレベルで見れば、既存の画一的なシステムを拒絶する人間は一定数存在する。あるいは、潜在的にはかなりの数がいるのかもしれない。',
        'そうした既存の枠組みに収まらない個人を救う道を考えるのであれば、残された選択肢は「教育の複雑化（多様化）」である。フリースクールや民間団体による教育機関などが数多く設置され、既存の学校以外のルートが当たり前になれば、子どもたちが自らに適した「学び」を選択できるようになる。ただし、この複雑化は同時に「情報格差」を爆発的に助長することにもなるため、懐疑的な目を向ける人が出るのも自然なことだろう。',
        '結局のところ、これは「何を最優先に求めるか」というトレードオフの問題である。多数派のための社会維持や存続を重んじるのであれば従来の画一的な教育が合理的であり、マイノリティの自由や個人の可能性を求めるのであれば、格差のリスクを許容してでも教育の複雑化を選ぶべきだということになる。',
        'もちろん、世間一般で言われる「大衆的な成功」を目指そうとすれば、そこには個人の努力だけではどうにもならない「運の要素」が大きく絡んでくる。その時々の社会情勢や金融市場の暴落、さらには近年AIが知的労働のあり方に劇的な影響を与え始めていることなど、外部環境の波は避けようがないからだ。だが、社会や制度がどちらへ転ぼうとも、個人として向き合うべき帰結は一つしかない。自らの頭で思考し、行動を起こさなければ、何も変わらないのだと強く感じる。',
      ],
    },
    {
      id: 'the-ideal-of-diversity',
      title: '多様性という理想論',
      excerpt:
        '大衆の中には、感情論（あるいは非論理的な経験論）によって他国を躊躇なく卑下する人が実際にいる。彼らは本気でそう思っているのかもしれないし、実は深く考えておらず、仲間内で通じる一種のコミュニケーションとして消費しているだけなのかもしれない。',
      date: '2026年10月',
      category: '地政学・社会',
      tags: ['多様性', '地政学', '国家と社会', '大衆心理'],
      paragraphs: [
        '大衆の中には、感情論（あるいは非論理的な経験論）によって他国を躊躇なく卑下する人が実際にいる。彼らは本気でそう思っているのかもしれないし、実は深く考えておらず、仲間内で通じる一種のコミュニケーションとして消費しているだけなのかもしれない。',
        '例えば中国を例にとると、世界トップクラスに人口が多い国である。仮に日本と同じ割合で非道徳的な人がいたとしても、絶対数が多いぶんどうしても目立ってしまう。さらにSNSでは刺激的な内容が大衆受けしやすいという性質も起因しているだろう。そのため、その国の問題が特定の場所や一部の出来事に過ぎない場合でも、多くの人は自ら論理を組み立てられるか否かに関係なく、国家そのものを叩く傾向にある。そのような状況はSNSでもよく見られるし、私の身の回りにも何人かいたのを覚えている。',
        '私個人の主観で答えるならば、住んでいる場所や文化、常識が違うという事実は、他者を差別する要素として全く説得力を持たないし、基本的にはとても愚かしいことだと思う。この事象が単なる群集心理なのか、非言語的な生理的反応のような別ベクトルの話なのかはわからないが、少なくとも現段階の私の主観では前者のように感じている。',
        'また、よく見る論述として「ロシア嫌い」があり、「理由は北方領土を占領しているからだ」といったものが挙げられるが、私はこれについても慎重に判断すべきだと思う。',
        '前述の通り、国家と国民は分けて考えるべきという前提はあるにせよ、まず地政学的な観点から見れば、ロシアにとって北方領土は原子力潜水艦を太平洋側に展開させるための重要な拠点として機能している。彼らには維持すべき国防上の強い理由があることを考慮しなければならない。',
        'そもそも歴史というものは、あくまでその時その場所にいた学者の主観や解釈であり、たまたま残っていた資料や文献などから正当性が主張される性質のものだ。そのため、真に中立的な歴史を定義することは原則として難しい。つまり何を言いたいかというと、各々の歴史認識に基づく正当性の主張というのは、多くの人が思っている以上にそこまで強い根拠にはなり得ないということだ。',
        'もちろん、国家間では国の顔を立てるためにも主張し続ける必要はある。日本においても国家のメンツや、今でも北方領土返還を訴える人々がいることを踏まえれば、その姿勢自体が重要であることは明らかだ。理想論を言えば、政府同士はある種形式的な争いを繰り広げながらも、大衆層はお互い仲良くできるのが一番いいのだが、現実にはそう上手くはいかないらしい。',
        'この話題に関連して、誤解を恐れずに言及しておきたいことがある。当然、外国人であろうと差別は良くないという大前提はあるが、例外的に国家規模の話になってくると、一定の「区別」や「制限」は設けた方がいいと考えている。理由は単純で、大きくなりすぎた多様性は人を壊すからだ。',
        '「多様性」という言葉は便利だ。私自身、多様性というものに否定的ではないし、日本に外国人が入ってくることにも基本的には肯定的である。しかし、ある種の人種差別とも取られかねない行為までを徹底して規制し、無制限に多様性を促進し続けることがどうなるか。それは現在のヨーロッパ諸国などが経験している事態につながると思う。',
        '多様な人種が国に入ってくれば、場合によっては街の環境が悪化したり、国民性のようなものが形骸化したり、伝統文化に影響が出たりする。一番影響として大きいのは治安の問題だ。行きすぎた多様性の典型例としては、イギリスやフランスなどを挙げればわかりやすいだろう。現に治安の悪化だけでなく、「移民（優秀な移民も含む）によって職を奪われた」という声が出るくらいには移民の力は大きい。',
        'もちろん、これらの国も少子化対策の一環として移民を受け入れ始めたという背景がある。アメリカ、カナダ、オーストラリアなども、原住民の出生率が下がる中で移民によって人口を無理やり「嵩増し（かさまし）」し続けている状態だ。ただ、彼らの場合はいびつであっても、かなり長い期間にわたって多様な人種が共存してきた歴史的背景があるため、国として適応できるケースもある。',
        '私が言いたいのは、日本のように長きにわたって単一民族国家に近い形でやってきた国において、一定の規定を設けずに受け入れるのは危険だということだ。これは単に「優秀であれば誰でもいい」という話でもない。極端な話をしよう。もし家の隣に、原理主義に近いイスラム教徒が大量に移住してきて避けようがない状況になった時、あなたは適応できるだろうか。これは人種差別の話ではなく、大衆目線で「この国家の文化に適応できるか」というさじ加減の問題だ。',
        'あまりにもバックグラウンドが異なる存在を無条件に許容することは、場合によっては国を壊すことになり得る。その現実は知っておかなければならない。かと言って、完全な拒絶の道が明るい未来につながるわけでも決してないのだが。',
      ],
    },
    {
      id: 'on-unfounded-confidence',
      title: '根拠のない自信',
      excerpt:
        '私は「根拠のない自信」というのは、何かに挑戦する人や、特にまだ学生であるような人たちには必要不可欠なものだと思う。',
      date: '2026年11月',
      category: '哲学・アイデンティティ',
      tags: ['自信', '主体性', '同調圧力', '若者'],
      paragraphs: [
        '私は「根拠のない自信」というのは、何かに挑戦する人や、特にまだ学生であるような人たちには必要不可欠なものだと思う。',
        'この根拠のない自信というのは、基本的には何も知らない「無知」から来るものだ。しかし、この万能感や優越感のようなものは、何かをスタートする上である意味でとても大事な役割を果たす。ただ同時に、いまの世代の若者（私も含むが）は、この万能感を感じにくくなってきつつあるというのも事実なんだと思う。超知能が社会に浸透していけば、レイオフは確実に表面化し、誰の目にもわかりやすい形で世の中に知れ渡ることになるだろう。だが、その状況になってから手を打つようでは、色々と手遅れであると思う。',
        '私は、この根拠のない自信は誰もが持つべきものだと考えている。もちろん、これが自分を過大評価しすぎれば「傲慢」になり、過小評価すれば「卑下」にもなる。しかし、少なくとも「人と違うことをする」と決めたなら、このような感覚はどうしても必要になる。',
        '前提として、この感覚は他者を見下すためのものではない。どちらかというとかなり冷酷な言い方にはなるが、基本的には他者への「徹底的な無理解・無関心」に達するものなんだと思う。結局のところ、人は自分自身を大事にできなければ、あるいは自分自身に余裕がなければ、他者や周りに気を配ることなどできない。自分をすり減らしながら他者を気遣うことがどれほどの労力を要するかは、想像に難くない。',
        '多くの人は、周りの流行や主義主張に耳を傾け、同調し、擬態し、馴染もうとする。これは社会生活を営む上での処世術としては必要な要素であるとは思う。しかし、それは主体性や自立性を捨てて放棄し、「他者軸で生きる」という選択にもなりかねないことは注視すべきである。もちろん全部がそうだと言うつもりはないが、私から見ると、同世代の流行や主義主張についていくのはかなり大変だし、そもそもあまり興味がない（友人として関わる気はあってもだ）。',
        '社会や市場、あるいは体制に対して不満がある、おかしいと思っている。そういった感情を持っていても行動に移せず、ただ愚痴を吐いて終わってしまう人たちがあまりにも多い。これは社会という大衆心理においては極めて自然な事象なのかもしれないが、私から見るとかなり不気味だし、怖くも映る。',
        '私から見れば、個々にはそれぞれの人生がある。たとえ大人たちに何かを言われたり罵倒されたりしても、自分の軸や、人生において大事にしたいものを手放すべきではない。それは「こういう風に生きたい」という理想だけでなく、「こういう生き方は嫌だ」という逆説的な動機から生まれる感情であっても、大事にすべきだとは思う。',
        '周りの人に理解されないというのは当たり前のことだ。だから、無理に理解してもらおうと努める必要もない。ただし、どうしても理解が必要な場（例えば親に対する説明など）では、感情論ではどうにもならず、徹底的な「理詰め」が必要になる場面が出てくる。',
        '聞き手に覆いかぶさっている一般論を剥ぎ取ってもらい、自分の考えを根本から理解してもらうというのは、至難の業だ。それは重々理解しているが、生きていく上では確実に必要な要素なのだと思う。',
      ],
    },
    {
      id: 'how-to-break-preconceptions',
      title: '先入観や偏見を壊す方法',
      excerpt:
        '今の私にとっては、大衆的な選択とはかなり異なった道を歩き続けている以上、世間一般的に謳われるような常識や偏見みたいなものにはかなり疎いという自覚はある。',
      date: '2026年11月',
      category: '視点・社会考察',
      tags: ['先入観', '視点', '複数市場', '常識'],
      paragraphs: [
        '今の私にとっては、大衆的な選択とはかなり異なった道を歩き続けている以上、世間一般的に謳われるような常識や偏見みたいなものにはかなり疎いという自覚はある。',
        '私の友達を含む多くの人は、目に見えない当たり前や常識といった言葉や形式に振り回され、それが当たり前だと自身を納得させ、諦めさせ、押し込んで生きている。これに慣れてしまえばそれまでだし、それが一番楽な生き方だとも思う。実際、この波に逆らった生き方というのは、基本的に多くの人にとっては毒でしかないと思う。',
        '理由は単純で、多くの人は自身のテリトリーや身分、立場を守りたがるからだ。それゆえに、外から入ってきた別の常識のようなものを「異端」として驚くほど冷徹に切り捨てたり、無意識に目を背けたりできてしまう。向き合ってしまうと、自身の経験論や積み上げてきた努力のようなものが否定される感覚（実質的にそうなる事象もあると思うが）があり、無意識にでも恐怖を感じてしまうからだろう。',
        'ただ、これでは人は大人になって歳を重ねていく上で、コミュニティが固まっていく（学校のような、良くも悪くも多様な考えが溢れている領域から離れる）につれて、どんどん自分の見えている景色こそが当たり前であり、世界のすべてであると錯覚していく。そして、自身の中にある価値観の揺らぎや不協和音自体に目を向けられなくなっていく。この問題を、単なる個人の内在的な問題だと錯覚する人もいるかもしれない。',
        '私は別にそこまで優しい人間ではないので、仮にそんな人を見かけたり関わることになっても、何かしら利害や理由が上乗せされたりしない限りは、助けたり助言したりすることはないと思う（人は基本的に自分中心であり、大原則として自分をまず大事にできないと他者のことは大事にできないと思うし、そもそも無意識に行われる、善意による身勝手な他者へのアドバイスほど人を歪めるものはないからだ）。ただ、ここでは少しだけ話してみようと思っている。',
        'まず私は個人的に、この先入観みたいなものはできるだけない方が幸せであれると思っている。世界が広くあれるということは、それだけ選択肢も、可能性も、また日常的な事象に対する解像度も上がるからだ。',
        '私として一番手っ取り早い方法は、「一つの業界や市場に囚われず、最低でも2つ以上の全く異なる市場と関わるようにすること」であり、これはすごく大事だと思う。',
        'すごくざっくりした例を挙げると、建設業界で大事にされていることや気をつけていること、その業界で広く謳われている常識のようなものは、研究職に就いている人たちや学術的な機関に属しているような人たちからすれば、滑稽に映るかもしれない。もちろん、これは逆も然りだ。',
        '結局のところ、人は無意識に自分が見えているものが当たり前であり、真実であると思い込もうとする。これ自体は悪いことではないし、極めて自然なことであると思う。だがだからこそ、常にこの「全く異なる市場や常識の存在」を目の前で感じ続けること、そういった体験を積み重ねるという経験は、とても大事に見える。',
      ],
    },
  ],
}

// Essays in progress, shown as "next issue" notices beside the latest stories (in display order)
export const upcomingPostData: Record<Language, UpcomingPost[]> = {
  en: [
    {
      title: 'Two Weeks in Latvia',
      excerpt:
        'What daily life was like during my two weeks in Latvia, before I eventually decided to return to Japan.',
      status: 'In Progress • Soon',
    },
    {
      title: 'On the Advantage of a Degree',
      excerpt:
        'As AI reshapes the job market, can young people still rely on the power of a university degree the way they once did?',
      status: 'In Progress • Soon',
    },
  ],
  ja: [
    {
      title: 'ラトビアでの2週間',
      excerpt: '結果的に帰国を選んだ、ラトビアで過ごした2週間の生活がどんなものだったのか。',
      status: '執筆予定 (In Progress)',
    },
    {
      title: '学位の優位性について',
      excerpt:
        'AIによる市場の変動を前に、特に若者たちは、学位という権威をこれまでと同じ効力を持つものとして振りかざし続けられるのか。',
      status: '執筆予定 (In Progress)',
    },
  ],
}

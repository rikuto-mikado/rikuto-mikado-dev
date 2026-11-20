export type Language = 'en' | 'ja'

export interface TimelineItem {
  period: string
  duration?: string
  location?: string
  category: string
  title: string
  narrative: string
  details?: string[]
  isCurrent?: boolean
  isUpcoming?: boolean
  // Plan is likely to change; rendered behind a fog overlay
  isTentative?: boolean
  /** Set on the first (earliest) entry of a phase: a phase heading is printed just before it */
  phase?: {
    title: string
    period: string
  }
}

export interface CrossroadsRoute {
  id: string
  title: string
  timing: string
  points: string[]
}

export type CertImageKey =
  | 'highschool'
  | 'pythonBootcamp'
  | 'fullstackWeb'
  | 'pythonMega'
  | 'indianCooking'
  | 'mba'
  | 'sqlBootcamp'

export interface CourseItem {
  /** 'course' (default): online course certificate; 'diploma': formal academic credential */
  kind?: 'course' | 'diploma'
  title: string
  /** Instructor for a course, issuing institution for a diploma */
  instructor: string
  /** Study length for a course (e.g. "22 hrs"), credential type for a diploma (e.g. "Diploma") */
  hours: string
  platform: string
  date: string
  category: string
  note?: string
  imageKey: CertImageKey
  /** Issuer's certificate ID; credentials without one show `verification` instead */
  certificateId?: string
  /** Shown in place of a certificate ID, e.g. "Verified Diploma · Nashville, TN" */
  verification?: string
}

export type ProjectImageKey = 'typbox' | 'talonbox' | 'warbox'

export interface ProjectItem {
  id: string
  title: string
  /** Short category printed in the card's figure line, e.g. "Full-Stack Application" */
  category: string
  /** When the project was built, e.g. "Oct 2026 –" */
  period: string
  /** 2–3 line overview */
  description: string
  /** Spec table: one row per layer, e.g. { label: 'Frontend', value: 'React · TypeScript' } */
  stack: { label: string; value: string }[]
  imageKey: ProjectImageKey
  githubUrl: string
  /** Live deployment, when there is one */
  demoUrl?: string
}

export const timelineEventsData: Record<Language, TimelineItem[]> = {
  en: [
    {
      period: 'c. 2036 & Beyond',
      duration: 'Year 5+ at work',
      location: 'Japan / Global',
      category: 'Career Freedom',
      title: 'Freedom of Choice in Career and Life',
      narrative:
        'With a well-paid, non-field management role at a global or major company securing both income and work–life balance, I can step freely into what comes next.',
      details: [
        'Complete a U.S. online Master’s degree',
        'Launch a small business that combines full-stack development with electrical-infrastructure knowledge',
        'Found an agricultural business',
      ],
      isUpcoming: true,
    },
    {
      period: 'c. 2033 – 2036',
      duration: 'Years 3–5 at work',
      location: 'Japan / Global',
      category: 'Move into Management',
      title: 'Promotion into Non-Field Management',
      narrative:
        'Once the set is complete (3–5 years of field experience × a bachelor’s degree × Chief Electrical Engineer and Energy Manager licences × CCNP × English × development skills), I move into a fully non-field role, such as a commissioning manager overseeing the design and validation of new sites, or a capacity planner, through internal promotion or a move between global firms.',
      details: [
        'Internal promotion, or a move between global firms',
        'Target roles: Commissioning Manager / Capacity Planner',
      ],
      isUpcoming: true,
    },
    {
      period: 'Apr 2031 – Mar 2034',
      duration: 'Years 1–3 at work',
      location: 'Global data centres / Major infrastructure',
      category: 'Field Experience',
      title: 'Banking Field Experience and Earning Trust',
      narrative:
        'Join a global data-centre operator or a major infrastructure company as an engineer. Running high-voltage substations and cooling systems day to day builds the years of field experience required to be issued the First-Class Electrician and Energy Manager licences.',
      details: [
        'Licences issued: First-Class Electrician, Qualified Energy Manager',
        'Use IELTS 6.5+ English for technical negotiation and reporting with engineers at overseas headquarters',
        'Outside work, study for the Second-Class (then First-Class) Chief Electrical Engineer exam',
        'Earn credits toward a U.S. online Master’s through edX',
      ],
      isUpcoming: true,
      phase: {
        title: 'From First Job to Non-Field Management',
        period: 'Apr 2031 onward',
      },
    },
    {
      period: 'Apr 2030 – Mar 2031',
      duration: 'Year 4',
      location: 'Hokkaido · The Open University of Japan',
      category: 'Graduation & Head Start',
      title: 'Job Offer, Graduation and a Head Start on What’s Next',
      narrative:
        'Earn the last few credits, meet the four-year enrolment requirement and graduate with a Bachelor of Liberal Arts. With job hunting behind me, I use the spare time to begin the next phase early.',
      details: [
        'The Open University of Japan: 124 credits in total, graduation (B.A. in Liberal Arts)',
        'Begin studying for the Second-Class Chief Electrical Engineer exam',
        'Begin edX MicroBachelors / MicroMasters programs',
      ],
      isUpcoming: true,
    },
    {
      period: 'Apr 2029 – Mar 2030',
      duration: 'Year 3',
      location: 'Hokkaido · The Open University of Japan',
      category: 'Networking & Early Recruiting',
      title: 'A Networking Credential and Early Recruiting',
      narrative:
        'Complete most of the 124 credits required to graduate, including the mandatory online classes. Earn the CCNP, the trump card for non-field and upstream roles, and from summer into winter take part in internships and early selection at global data centres and major infrastructure companies.',
      details: [
        'The Open University of Japan: 118 credits in total',
        'Earn the CCNP',
        'Internships and early selection at global data centres and major infrastructure companies',
      ],
      isUpcoming: true,
    },
    {
      period: 'Apr 2028 – Mar 2029',
      duration: 'Year 2',
      location: 'Hokkaido · The Open University of Japan',
      category: 'English & Facility Licences',
      title: 'Hitting the English Target and a Run of Facility Licences',
      narrative:
        'Focus on specialised courses and clear about 70% of the credits needed to graduate. Reach IELTS 6.5+, and add the licences most valued in data-centre operations to the Energy Manager exam, whose scope overlaps with the Third-Class Chief Electrical Engineer.',
      details: [
        'The Open University of Japan: 88 credits in total',
        'Achieve IELTS 6.5+',
        'Qualified Energy Manager (Electrical)',
        'Hazardous Materials Engineer (Class B, Category 4)',
        'Third-Class Refrigeration Machinery Engineer',
      ],
      isUpcoming: true,
    },
    {
      period: 'Apr 2027 – Mar 2028',
      duration: 'Year 1',
      location: 'Hokkaido · The Open University of Japan',
      category: 'Foundations & Top Priorities',
      title: 'Building Foundations and Clearing the Top-Priority Licences',
      narrative:
        'Enrol at The Open University of Japan as a full-time student (or via the route that counts time as a non-degree student toward the four years), earning credits from home with a focus on foundation and introductory courses. Study centres on the two top priorities, the Third-Class Chief Electrical Engineer exam and IELTS 6.5+.',
      details: [
        'The Open University of Japan: target 44 credits',
        'Core study: Third-Class Chief Electrical Engineer and IELTS 6.5+',
        'Obtain a standard driver’s licence',
        'Pass the Second-Class and First-Class Electrician exams',
      ],
      isUpcoming: true,
      phase: {
        title: 'Four Years at The Open University of Japan',
        period: 'Apr 2027 – Mar 2031',
      },
    },
    {
      period: 'Sep 2026 – Present',
      duration: 'Current',
      category: 'Hands-On Transition & Preparation',
      location: 'Urakawa, Hokkaido, Japan',
      title: 'Transition to Physical Infrastructure & Exam Preparation',
      narrative:
        'Briefly relocated to Latvia for a Computer Science bachelor’s program, but returned to Japan within weeks after reassessing local living costs and the rapid acceleration of AI technologies. Seeing the fast changes driven by LLMs, I decided to build a dependable foundation in the physical world. I redirected my focus toward electrical engineering and infrastructure—actively preparing for core national licenses including Third-Class Chief Electrical Engineer—while keeping full-stack development as a valuable skill that keeps me flexible for the future.',
      isCurrent: true,
    },
    {
      period: 'Jun 2025 – Aug 2026',
      duration: '1 yr 3 mos',
      category: 'Independent Living & Intensive Dev',
      location: 'Sapporo, Hokkaido, Japan',
      title: 'Self-Directed Full-Stack Training & Life Independence',
      narrative:
        'Lived independently in Sapporo with family support, dedicating daily schedules to intensive full-stack development through Udemy while mastering essential life skills such as cooking and personal discipline. Clarified personal priorities and core values, cultivating the autonomous capability to learn and iterate without relying on a mentor.',
    },
    {
      period: 'Jan 2025 – Jun 2025',
      duration: '6 mos',
      category: 'Exploration & Foundation Building',
      location: 'Urakawa, Hokkaido, Japan',
      title: 'Academic Exploration, AI Literacy & Software Initiation',
      narrative:
        'Following early high school graduation, utilized the Sophia learning platform with the initial goal of enrolling in a US distance-learning university. Read research papers, tracked global developments, and used generative AI tools to accelerate information gathering while gaining hands-on understanding of both AI power and hallucination risks. Shifted from the US distance-degree plan to commit fully to full-stack development, establishing a strict self-management routine.',
    },
    {
      period: 'Jun 2024 – Feb 2025',
      duration: '9 mos',
      category: 'High School Education',
      location: 'Online / US Accredited',
      title: 'Penn Foster Group — Early High School Diploma',
      narrative:
        'Transferred from local schooling to Penn Foster Group and accelerated coursework to graduate early with an official US High School Diploma.',
    },
    {
      period: 'Apr 2023 – May 2024',
      duration: '1 yr 1 mo',
      category: 'Secondary Education',
      location: 'Urakawa, Hokkaido, Japan',
      title: 'Hokkaido Urakawa High School',
      narrative: 'Enrolled in high school education, establishing foundational academic disciplines.',
    },
  ],
  ja: [
    {
      period: '2036年頃 以降',
      duration: '入社5年目以降',
      location: '日本 / 海外',
      category: 'キャリアの自由化',
      title: 'キャリアと暮らしの自由化',
      narrative:
        '外資や大企業の非現場管理職として、高い給与水準とワークライフバランスを確保しながら、次の挑戦へ自由に踏み出す。',
      details: [
        '米国オンライン修士（Master）の学位取得',
        'フルスタック開発と電気インフラの知識を活かしたスモールビジネスの立ち上げ',
        '農業法人の立ち上げ',
      ],
      isUpcoming: true,
    },
    {
      period: '2033年頃 – 2036年頃',
      duration: '入社3〜5年目',
      location: '日本 / 海外',
      category: '非現場・管理職へ',
      title: '非現場・マネジメント職への抜擢',
      narrative:
        '「実務経験3〜5年 × 学士号 × 電験・エネ管 × CCNP × 英語 × 開発スキル」が揃った段階で、社内昇格または外資間の転職により、新設拠点の設計・検証を統括するコミッショニングマネージャーやキャパシティプランナーなど、完全な非現場職へ移行する。',
      details: [
        '社内昇格、または外資間の転職',
        '想定職種：コミッショニングマネージャー / キャパシティプランナー',
      ],
      isUpcoming: true,
    },
    {
      period: '2031年4月 – 2034年3月',
      duration: '入社1〜3年目',
      location: '外資系データセンター / 大手インフラ企業',
      category: '実務経験の回収',
      title: '実務経験の回収と社内評価の確立',
      narrative:
        '外資系データセンターや大手インフラ企業に技術職として入社。高圧受変電設備や冷却システムの運用管理を通じて、第一種電気工事士やエネルギー管理士の免状交付に必要な実務経験年数を満たす。',
      details: [
        '免状交付：第一種電気工事士、エネルギー管理士',
        'IELTS 6.5+の英語力を活かし、海外本社エンジニアとの技術折衝やレポート業務を担う',
        '業務外で電験二種（さらにその先の電験一種）の学習',
        'edXを活用した米国オンライン修士課程（Master）の単位修得',
      ],
      isUpcoming: true,
      phase: {
        title: '就職から非現場・管理職への移行',
        period: '2031年4月 以降',
      },
    },
    {
      period: '2030年4月 – 2031年3月',
      duration: '4年目',
      location: '北海道・放送大学',
      category: '卒業と先回り',
      title: '内定獲得と次のフェーズへの先回り',
      narrative:
        '残りの数単位を修得して4年間の在学要件を満たし、学士（教養）の学位を取得する。就職活動を終えた後の時間を使い、次のフェーズの準備を前倒しで始める。',
      details: [
        '放送大学：累計124単位・卒業（学士〈教養〉）',
        '電験二種の学習を開始',
        'edX（MicroBachelors / MicroMasters）の履修を開始',
      ],
      isUpcoming: true,
    },
    {
      period: '2029年4月 – 2030年3月',
      duration: '3年目',
      location: '北海道・放送大学',
      category: 'ネットワーク資格と就活',
      title: 'ネットワーク資格と早期の就職活動',
      narrative:
        'オンライン授業の必修枠を含め、卒業要件124単位の大半を取り切る。非現場・上流職への切り札となるCCNPを取得し、夏から秋冬にかけて外資系データセンターや大手インフラ企業のインターンシップ・早期選考に臨む。',
      details: [
        '放送大学：累計118単位',
        'CCNP 取得',
        '外資系データセンター・大手インフラ企業のインターンシップ／早期選考',
      ],
      isUpcoming: true,
    },
    {
      period: '2028年4月 – 2029年3月',
      duration: '2年目',
      location: '北海道・放送大学',
      category: '英語とファシリティ資格',
      title: '英語の目標達成とファシリティ資格の連続取得',
      narrative:
        '専門科目を中心に履修を進め、卒業所要単位の約7割を消化する。IELTS 6.5+を達成し、電験三種と試験範囲が重なるエネルギー管理士（電気分野）に加えて、データセンター実務で重宝される資格を揃える。',
      details: [
        '放送大学：累計88単位',
        'IELTS 6.5+ 達成',
        'エネルギー管理士（電気分野）',
        '危険物取扱者 乙種4類',
        '第三種冷凍機械責任者',
      ],
      isUpcoming: true,
    },
    {
      period: '2027年4月 – 2028年3月',
      duration: '1年目',
      location: '北海道・放送大学',
      category: '基礎固めと最優先資格',
      title: '基礎固めと最優先資格の突破',
      narrative:
        '放送大学に全科履修生（または選科履修生からの修業年限通算ルート）として入学し、基盤科目と導入科目を中心に自宅で単位を修得する。学習は、最優先とする電験三種とIELTS 6.5+を軸に据える。',
      details: [
        '放送大学：目標44単位',
        '学習の軸：電験三種、IELTS 6.5+',
        '普通自動車運転免許の取得',
        '第二種・第一種電気工事士（試験合格）',
      ],
      isUpcoming: true,
      phase: {
        title: '放送大学在学中の4年間',
        period: '2027年4月 – 2031年3月',
      },
    },
    {
      period: '2026年9月 – 現在',
      duration: '現在',
      category: '物理インフラへの転換',
      location: '北海道 浦河町',
      title: '物理インフラへの転換と国家資格の準備',
      narrative:
        'ラトビアの大学コンピュータサイエンス学科への進学準備のため一時渡航したものの、現地の物価やAIの急激な進化を直視して数週間で帰国。LLMがもたらす構造変化を踏まえ、地に足のついた「物理的な保険」を確保すべく方針を転換した。電験三種をはじめとする国家資格の取得準備を開始し、電気関係の市場で必要な知識と技術の習得へ舵を切りました。',
      isCurrent: true,
    },
    {
      period: '2025年6月 – 2026年8月',
      duration: '1年3ヶ月',
      category: '自立生活と開発特訓',
      location: '北海道 札幌市',
      title: '札幌での自立生活とフルスタック開発の集中特訓',
      narrative:
        '家族の支援を得ながら札幌で一人暮らしを経験。自炊や自己規律といった生活の自立力を高めつつ、Udemyを活用して毎日フルスタックWeb開発の学習に没頭。人に頼らず自走して学び続ける力と、自身の価値観を明確に確立した期間だった。',
    },
    {
      period: '2025年1月 – 2025年6月',
      duration: '6ヶ月',
      category: '基礎固めと探求',
      location: '北海道 浦河町',
      title: '学術探求、AIリテラシーの獲得とソフトウェア開発への着手',
      narrative:
        '高校早期卒業後、当初は米国のオンライン大学進学を目指してSophiaプラットフォームで学習。論文講読や情報収集に生成AIをフル活用し、その利便性とハルシネーションリスクの双方を体感。その後、米国大学進学を検討していたが、フルスタック開発への一本化を決断し、厳格な生活習慣を確立した。',
    },
    {
      period: '2024年6月 – 2025年2月',
      duration: '9ヶ月',
      category: '高校教育',
      location: 'オンライン（米国認定）',
      title: 'Penn Foster Group — 米国正規高校卒業資格の早期取得',
      narrative:
        '地元の高校から米国認可の通信制教育機関Penn Foster Groupへ転校。学習を前倒しで進め、正規の米国高校卒業資格を早期取得した。',
    },
    {
      period: '2023年4月 – 2024年5月',
      duration: '1年1ヶ月',
      category: '中等教育',
      location: '北海道 浦河町',
      title: '北海道浦河高等学校',
      narrative: '地元の高校に入学し、基礎的な学業と生活習慣の基盤を築いた。',
    },
  ],
}

// Employers worth aiming for beyond global data centres, shown after the plan as one group of options
export const crossroadsRoutesData: Record<Language, CrossroadsRoute[]> = {
  en: [
    {
      id: 'A',
      title: 'Facility Management at Global Real-Estate Firms',
      timing: 'e.g. CBRE, JLL',
      points: [
        'Run the facilities of global IT, finance and pharma offices and research sites',
        'Chief Electrical Engineer + Energy Manager + IELTS 6.5+ leads early to desk-based facility-manager roles',
      ],
    },
    {
      id: 'B',
      title: 'Renewable Energy & Battery-Storage Infrastructure',
      timing: 'Global and trading-house affiliated',
      points: [
        'Develop and remotely monitor solar, wind and large battery-storage sites',
        'Chief Electrical Engineer + CCNP + English are valued as they are',
        'Little overtime, high pay',
      ],
    },
    {
      id: 'C',
      title: 'Facility Arms of Major Telecom & IT Groups',
      timing: 'e.g. NTT, KDDI, SoftBank, major electronics groups',
      points: [
        'Generous benefits: housing allowance, plenty of days off',
        'Electrical licences + CCNP open the planning teams that design both telecom and power systems',
      ],
    },
    {
      id: 'D',
      title: 'Plant Engineering at Chip, Pharma & Chemical Makers',
      timing: 'Global and major Japanese firms',
      points: [
        'Manage and design factory utilities: power, HVAC, pure water, refrigeration',
        'Chief Electrical Engineer, Energy Manager, refrigeration and hazardous-materials licences map directly',
        'Stable, high pay from early on',
      ],
    },
  ],
  ja: [
    {
      id: 'A',
      title: '外資系総合不動産のファシリティマネジメント',
      timing: '例：CBRE・JLL',
      points: [
        '外資系IT・金融・製薬企業のオフィスや研究施設の設備統括を受託',
        '電験三種・エネ管・IELTS 6.5+で、早期からデスクワーク中心のファシリティマネージャーに',
      ],
    },
    {
      id: 'B',
      title: '再生可能エネルギー＆蓄電インフラ',
      timing: '外資系・商社系',
      points: [
        '太陽光・風力発電所や大型蓄電所の開発・遠隔監視',
        '電験三種・二種 × CCNP × 英語がそのまま評価される',
        '残業が少なく、給与水準も高い',
      ],
    },
    {
      id: 'C',
      title: '大手通信・IT系のファシリティ統括会社',
      timing: '例：NTT・KDDI・ソフトバンク・大手電機系列',
      points: [
        '住宅手当や休日数など、福利厚生が手厚い',
        '電験三種・エネ管 × CCNPで、通信と電力設備の両方を設計・管理する企画部門へ',
      ],
    },
    {
      id: 'D',
      title: '半導体・製薬・化学メーカーのプラントエンジニアリング',
      timing: '外資・日系大手',
      points: [
        '工場のユーティリティ（電力・空調・純水・冷凍機）を管理・設計',
        '電験三種・エネ管・第三種冷凍・危険物乙4の組み合わせが直結',
        '若手から安定した高年収',
      ],
    },
  ],
}

export const coursesData: Record<Language, CourseItem[]> = {
  en: [
    {
      kind: 'diploma',
      title: 'High School Diploma',
      instructor: 'Penn Foster High School',
      hours: 'Diploma',
      platform: 'Penn Foster',
      date: 'Feb 2025',
      category: 'Academic Credential',
      note: 'Completed the full course of study prescribed by Penn Foster High School; diploma awarded in Nashville, Tennessee.',
      imageKey: 'highschool',
      verification: 'Verified Diploma · Nashville, TN',
    },
    {
      title: 'The Complete Python Bootcamp From Zero to Hero',
      instructor: 'Jose Portilla',
      hours: '22 hrs',
      platform: 'Udemy',
      date: 'May 2025',
      category: 'Python & Software Logic',
      note: 'Foundational programming concepts, OOP, and automation scripts.',
      imageKey: 'pythonBootcamp',
      certificateId: 'UC-2564e41c-d6d2-4262-9340-eaef1bad012c',
    },
    {
      title: 'The Complete Full-Stack Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      hours: '61.5 hrs',
      platform: 'Udemy',
      date: 'Sep 2025',
      category: 'Full-Stack Architecture',
      note: 'Comprehensive client-server development, databases, REST APIs, and modern frontend.',
      imageKey: 'fullstackWeb',
      certificateId: 'UC-edecf7ff-e086-4b2c-b515-04ffa3639a18',
    },
    {
      title: 'Python Mega Course: Build 20 Real-World Apps & AI Agents',
      instructor: 'Ardit Sulce',
      hours: '50.5 hrs',
      platform: 'Udemy',
      date: 'Mar 2026',
      category: 'AI Agents & Production Apps',
      note: 'Practical agentic workflows, API integrations, and standalone production tools.',
      imageKey: 'pythonMega',
      certificateId: 'UC-63511031-1538-46ec-87d1-89c031c7ffec',
    },
    {
      title: 'INDIAN COOKING - RESTAURANT STYLE COOKING COURSE',
      instructor: 'Satvir Singh',
      hours: '6.5 hrs',
      platform: 'Udemy',
      date: 'Oct 2026',
      category: 'Life Skills & Culinary Craft',
      note: 'Pursued out of genuine interest in Indian cuisine, mastering authentic spices and restaurant-style cooking techniques.',
      imageKey: 'indianCooking',
      certificateId: 'UC-6290b034-8ffd-48a0-b549-9c08c6f18786',
    },
    {
      title: 'An Entire MBA in 1 Course: Award Winning Business School Prof',
      instructor: 'Chris Haroun',
      hours: '8 hrs',
      platform: 'Udemy',
      date: 'Oct 2026',
      category: 'Business & Management',
      note: 'Core business school fundamentals spanning strategy, finance, marketing, and management.',
      imageKey: 'mba',
      certificateId: 'UC-d2363b0e-340b-48f1-bc72-373d4ac347a4',
    },
    {
      title: 'The Complete SQL Bootcamp: Go from Zero to Hero',
      instructor: 'Jose Portilla',
      hours: '9 hrs',
      platform: 'Udemy',
      date: 'Oct 2026',
      category: 'Databases & SQL',
      note: 'Querying, joins, aggregations, and database design with PostgreSQL, from fundamentals to advanced commands.',
      imageKey: 'sqlBootcamp',
      certificateId: 'UC-c85c8d83-7d38-4d78-8bf4-f454fb36b447',
    },
  ],
  ja: [
    {
      kind: 'diploma',
      title: '高等学校卒業証書（High School Diploma）',
      instructor: 'Penn Foster High School',
      hours: '卒業証書',
      platform: 'Penn Foster',
      date: '2025年2月',
      category: '学歴・卒業資格',
      note: 'Penn Foster High School の所定の課程をすべて修了し、米国テネシー州ナッシュビルにて卒業証書を授与。',
      imageKey: 'highschool',
      verification: '認証済み卒業証書 · 米国テネシー州ナッシュビル',
    },
    {
      title: 'The Complete Python Bootcamp From Zero to Hero',
      instructor: 'Jose Portilla',
      hours: '22時間',
      platform: 'Udemy',
      date: '2025年5月',
      category: 'Pythonとソフトウェア論理',
      note: 'プログラミングの基礎概念、オブジェクト指向（OOP）、自動化スクリプトの作成。',
      imageKey: 'pythonBootcamp',
      certificateId: 'UC-2564e41c-d6d2-4262-9340-eaef1bad012c',
    },
    {
      title: 'The Complete Full-Stack Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      hours: '61.5時間',
      platform: 'Udemy',
      date: '2025年9月',
      category: 'フルスタック・アーキテクチャ',
      note: 'クライアント・サーバー開発、リレーショナルDB、REST API、モダンフロントエンドの包括的習得。',
      imageKey: 'fullstackWeb',
      certificateId: 'UC-edecf7ff-e086-4b2c-b515-04ffa3639a18',
    },
    {
      title: 'Python Mega Course: Build 20 Real-World Apps & AI Agents',
      instructor: 'Ardit Sulce',
      hours: '50.5時間',
      platform: 'Udemy',
      date: '2026年3月',
      category: 'AIエージェント＆実践アプリ',
      note: '実用的なエージェントワークフロー、外部API連携、プロダクションツールの構築。',
      imageKey: 'pythonMega',
      certificateId: 'UC-63511031-1538-46ec-87d1-89c031c7ffec',
    },
    {
      title: 'INDIAN COOKING - RESTAURANT STYLE COOKING COURSE',
      instructor: 'Satvir Singh',
      hours: '6.5時間',
      platform: 'Udemy',
      date: '2026年10月',
      category: '生活技術＆料理の技法',
      note: 'インド料理への純粋な興味から受講。本格的なスパイス使いとレストランスタイルの調理技法を修得。',
      imageKey: 'indianCooking',
      certificateId: 'UC-6290b034-8ffd-48a0-b549-9c08c6f18786',
    },
    {
      title: 'An Entire MBA in 1 Course: Award Winning Business School Prof',
      instructor: 'Chris Haroun',
      hours: '8時間',
      platform: 'Udemy',
      date: '2026年10月',
      category: 'ビジネス＆マネジメント',
      note: '戦略、財務、マーケティング、マネジメントなど、ビジネススクールの基礎を横断的に習得。',
      imageKey: 'mba',
      certificateId: 'UC-d2363b0e-340b-48f1-bc72-373d4ac347a4',
    },
    {
      title: 'The Complete SQL Bootcamp: Go from Zero to Hero',
      instructor: 'Jose Portilla',
      hours: '9時間',
      platform: 'Udemy',
      date: '2026年10月',
      category: 'データベース＆SQL',
      note: 'PostgreSQLを用いたクエリ、結合、集計、データベース設計を基礎から応用まで習得。',
      imageKey: 'sqlBootcamp',
      certificateId: 'UC-c85c8d83-7d38-4d78-8bf4-f454fb36b447',
    },
  ],
}

export const projectsData: Record<Language, ProjectItem[]> = {
  en: [
    {
      id: 'typbox',
      title: 'TYPBOX',
      category: 'Full-Stack Application',
      period: 'Oct 2026 –',
      description:
        'A study-time tracker that turns hours into progress: log sessions by subject, read the analytics, and earn BITS for buffs, boss raids and a pixel room. It also powers the Study Log on page D1.',
      stack: [
        { label: 'Frontend', value: 'React 19 · TypeScript · Vite · Tailwind CSS v4' },
        { label: 'Backend', value: 'Django · Django REST Framework · SimpleJWT' },
        { label: 'Database', value: 'PostgreSQL' },
        { label: 'Hosting', value: 'Render' },
      ],
      imageKey: 'typbox',
      githubUrl: 'https://github.com/rikuto-mikado/typbox-dev',
      demoUrl: 'https://typbox.me',
    },
    {
      id: 'talonbox',
      title: 'TALONBOX',
      category: 'Browser Game Collection',
      period: 'Nov 2026',
      description:
        'Fifty-four classic card games in the browser, from solitaire to casino and table games against the computer. Each game’s rules are pure, tested functions behind one shared engine with undo, hints and seeded deals.',
      stack: [
        { label: 'Frontend', value: 'React · TypeScript · Vite · Tailwind CSS' },
        { label: 'State', value: 'Zustand · Motion' },
        { label: 'Testing', value: 'Vitest · Playwright' },
        { label: 'Hosting', value: 'Render' },
      ],
      imageKey: 'talonbox',
      githubUrl: 'https://github.com/rikuto-mikado/deck-hub',
      demoUrl: 'https://deck-hub.onrender.com/#/',
    },
    {
      id: 'warbox',
      title: 'WARBOX',
      category: 'Full-Stack Strategy Game',
      period: 'Nov 2026',
      description:
        'A real-time medieval strategy game: raise armies from your castles, pick a commander and a mix of troops, then march across a tilted 3D map with fog of war, across five game modes.',
      stack: [
        { label: 'Frontend', value: 'React · TypeScript · Three.js · Tailwind CSS v4' },
        { label: 'Backend', value: 'Django 5.2 · Django REST Framework' },
        { label: 'Database', value: 'PostgreSQL' },
      ],
      imageKey: 'warbox',
      githubUrl: 'https://github.com/rikuto-mikado/web-rts-engine',
    },
  ],
  ja: [
    {
      id: 'typbox',
      title: 'TYPBOX',
      category: 'フルスタック・アプリケーション',
      period: '2026年10月 –',
      description:
        '学習時間を「積み上がる成果」に変える学習トラッカー。科目別にセッションを記録して分析でき、貯めた BITS でバフやボスレイド、ピクセルルームを楽しめます。D1面の学習ログもこのアプリから配信しています。',
      stack: [
        { label: 'フロントエンド', value: 'React 19 · TypeScript · Vite · Tailwind CSS v4' },
        { label: 'バックエンド', value: 'Django · Django REST Framework · SimpleJWT' },
        { label: 'データベース', value: 'PostgreSQL' },
        { label: 'ホスティング', value: 'Render' },
      ],
      imageKey: 'typbox',
      githubUrl: 'https://github.com/rikuto-mikado/typbox-dev',
      demoUrl: 'https://typbox.me',
    },
    {
      id: 'talonbox',
      title: 'TALONBOX',
      category: 'ブラウザゲーム集',
      period: '2026年11月',
      description:
        'ソリティアからカジノ、CPU対戦のテーブルゲームまで、54種類のクラシックなカードゲームをブラウザで。各ゲームのルールはテスト済みの純粋関数として実装し、アンドゥ・ヒント・シード付き配札を備えた共通エンジンで動かしています。',
      stack: [
        { label: 'フロントエンド', value: 'React · TypeScript · Vite · Tailwind CSS' },
        { label: '状態管理', value: 'Zustand · Motion' },
        { label: 'テスト', value: 'Vitest · Playwright' },
        { label: 'ホスティング', value: 'Render' },
      ],
      imageKey: 'talonbox',
      githubUrl: 'https://github.com/rikuto-mikado/deck-hub',
      demoUrl: 'https://deck-hub.onrender.com/#/',
    },
    {
      id: 'warbox',
      title: 'WARBOX',
      category: 'フルスタック・戦略ゲーム',
      period: '2026年11月',
      description:
        '中世を舞台にしたリアルタイムストラテジー。城から軍を編成し、指揮官と兵種の組み合わせを選んで、霧に包まれた立体マップを進軍します。5つのゲームモードを収録。',
      stack: [
        { label: 'フロントエンド', value: 'React · TypeScript · Three.js · Tailwind CSS v4' },
        { label: 'バックエンド', value: 'Django 5.2 · Django REST Framework' },
        { label: 'データベース', value: 'PostgreSQL' },
      ],
      imageKey: 'warbox',
      githubUrl: 'https://github.com/rikuto-mikado/web-rts-engine',
    },
  ],
}

export const uiText = {
  en: {
    menu: 'Menu',
    light: 'Light',
    dark: 'Dark',
    themeDarkName: 'Dark Theme',
    themeLightName: 'Light Theme',
    themeDarkSub: 'Midnight charcoal',
    themeLightSub: 'Warm paper ivory',
    langToggle: '日本語',
    navIndex: 'Navigation & Index',
    tableOfContents: 'Table of Contents',
    contactAndLocation: 'Contact & Location',
    locationText: 'Hokkaido, Japan',
    copyright: '© 2026 Rikuto Mikado. All rights reserved.',

    // Nav items
    navAbout: 'About',
    navAboutSub: 'Vision & Physical Foundation',
    navTrajectory: 'Trajectory',
    navTrajectorySub: 'Experience & Milestones',
    navProjects: 'Projects',
    navProjectsSub: 'Full-Stack Applications & Works',
    navLearning: 'Credentials',
    navLearningSub: 'Diplomas & Certifications',
    navBlog: 'Blog',
    navBlogSub: 'Essays on AI & Society',
    navStudyLog: 'Study Log',
    navStudyLogSub: 'Live Feed from typbox',
    navContact: 'Contact',
    navContactSub: 'Get in Touch & Socials',

    // Hero
    heroGreeting: 'Hello, I am',
    heroName: 'Rikuto.',
    heroBadge: 'Physical Infrastructure & Electrical Engineering • Full-Stack Development',
    heroLead:
      "Securing a 'physical insurance policy' in the AI era. Establishing electrical and hardware infrastructure as my absolute foundation, while keeping software engineering as a standalone tool for long-term adaptability.",

    // About
    aboutSectionBadge: 'Vision & Roadmap',
    aboutHeading: 'About Rikuto Mikado',
    aboutQuote:
      '"My long-term goal is to pursue knowledge, eventually engage in agriculture, and help preserve human creativity."',
    aboutP1:
      'Although I originally trained in full-stack development, watching the rapid evolution of generative AI and large language models led me to build a dependable foundation in the physical world. I believe real-world resilience comes from understanding and working with the hands-on layer—the electrical equipment, power systems, and physical facilities that keep all digital technology running.',
    aboutP2:
      'To make this transition, I will enter a specialized technical institution in Electrical Engineering. I am methodically working toward essential Japanese national licenses, including Third-Class Chief Electrical Engineer and First-Class Electrician, alongside networking credentials such as Cisco CCNP Enterprise. To keep international pathways open, I am also consistently preparing for the IELTS Academic exam.',
    aboutP3:
      'Following this institutional training period, as I enter the industry to accumulate three years of practical field experience, I plan to concurrently advance through the UK OTHM diploma pathway toward an accredited Bachelor’s degree, with future graduate studies remaining an open long-term aspiration. At the same time, full-stack development remains a versatile secondary skill, giving me a solid bridge between software logic and physical systems.',
    aboutBadge1: 'Electrical Engineering & Infrastructure',
    aboutBadge2: 'Full-Stack Development',
    aboutPhotoName: 'Rikuto Mikado',

    // Trajectory
    trajectoryBadge: 'Trajectory',
    trajectoryHeading: 'Experience & Milestones',
    trajectoryLead:
      'A transparent chronicle of self-directed learning, practical course corrections, and step-by-step milestones toward a grounded career.',
    statusCurrent: 'Current Focus',
    statusRoadmap: 'Roadmap',
    statusTentative: 'Tentative',
    statusConsidering: 'Considering',
    crossroadsPeriod: 'Beyond Data Centres',
    crossroadsTitle: 'Other Employers Worth Aiming For',
    crossroadsLead: 'Beyond global data centres: options that combine good conditions, high pay and a repeatable path in.',
    crossroadsFooter: 'Four doors, one key: the same licences and English open every one of them.',

    // Projects
    projectsBadge: 'Works & Exhibits',
    projectsHeading: 'Projects Built From the Ground Up',
    projectsLead:
      'Full-stack applications and games designed, built and shipped independently, from the database schema to the last pixel. Hover over any plate to bring the screenshot into focus.',
    projectFigure: 'Fig.',
    projectStack: 'Technical Specifications',
    projectSource: 'GitHub',
    projectDemo: 'Live',
    opensInNewTab: 'opens in a new tab',

    // Courses
    coursesBadge: 'Credentials & Certifications',
    coursesHeading: 'Certificates & Academic Credentials',
    coursesLead:
      'A register of formal academic diplomas and independently earned certifications, spanning software engineering, AI tooling, business, and essential life skills. Click any entry to inspect the credential.',
    viewCert: 'View Credential',
    instructor: 'Instructor',
    institution: 'Institution',
    date: 'Date',
    length: 'Duration / Type',
    certId: 'Certificate ID',
    verification: 'Verification',
    certCompletion: 'Certificate of Completion',
    diplomaAward: 'Academic Diploma',

    // Blog
    blogBadge: 'Perspectives & Essays',
    blogHeading: 'Essays & Observations',
    blogLead:
      'Just a collection of personal thoughts and reflections on everyday topics and observations.',
    readEssay: 'Read Essay',

    // Study log feed
    studyLogBadge: 'Study Log Feed',
    studyLogHeading: 'Recent Sessions',
    studyLogLead: 'Live telemetry from typbox, the tool I use to log every study session.',
    studyLogLoading: 'Fetching telemetry…',
    studyLogError: 'Could not reach the log server. Please try again later.',
    studyLogEmpty: 'No sessions logged yet.',
    studyLogTotal: 'Total',
    studyLogSessions: 'Sessions',
    studyLogDays: 'Days',
    studyLogByCategory: 'This Week by Category',
    studyLogWeekEmpty: 'No sessions logged this week yet.',
    studyLogRecentEmpty: 'No sessions logged in the last 7 days.',
    studyLogSource: 'Study log from my TYPBOX account',
    studyLogThisWeek: 'This Week',
    studyLogLast7Days: 'Last 7 Days',
    studyLogDailyLog: 'Daily Log',
    studyLogToday: 'Today',

    // Newspaper furniture (masthead, folios, jump lines, back page)
    paperMotto: 'Notes on the physical layer, learning, and life',
    insideLabel: 'Inside',
    todaysStudy: "Today's Study",
    bylineBy: 'By',
    continuedOn: 'Continued on {page}',
    continuedFrom: 'Continued from {page}',
    inThisEdition: 'In This Edition',
    latestEssayLabel: 'Latest Essay',
    latestCertLabel: 'Newest Certificate',
    studyFiguresLabel: 'The Week in Study',
    vsLastWeek: 'vs. last week',
    colophonTitle: 'Colophon',
    colophonText:
      'The R.M. Journal is written, edited and published by Rikuto Mikado in Hokkaido, Japan. Set in Fraunces, Newsreader and Inter.',
    lettersTitle: 'Get in Touch',
    lettersText: 'For questions, collaboration or opportunities, feel free to reach out by email.',
    listingCaption: 'Listing 1 — profile.py',
    specialtiesLabel: 'Specialties',
    chronologyLabel: 'Chronology',
    frontPhotoCaption: 'Urakawa, Hokkaido, Japan',
    nightEdition: 'Night Edition',
    printEdition: 'Print Edition',
    printEditionCta: 'Download PDF',
    printEditionHint: 'Opens the print dialog. Choose “Save as PDF”.',
    printPreparing: 'Typesetting…',

    // Footer
    footerContact: 'Direct Contact',

    // Language switcher
    langSwitchCode: 'JA',
    langSwitchLabel: '日本語に切り替える',
    currentLangCode: 'EN',
    currentLangName: 'English',
    langSwitchHint: 'Switch to Japanese',

    // Blog cards & reader
    readShort: 'Read',
    readMore: 'Read more',
    showLess: 'Show less',
    upcomingLabel: 'UPCOMING',
    comingSoon: 'Coming Soon',
    inProgress: 'In Progress',
    closeModal: 'Close modal',
    closeArticle: 'Close Article',
  },
  ja: {
    menu: 'メニュー',
    light: 'ライト',
    dark: 'ダーク',
    themeDarkName: 'ダークテーマ',
    themeLightName: 'ライトテーマ',
    themeDarkSub: 'ダークグレー',
    themeLightSub: 'ペーパーアイボリー',
    langToggle: 'English',
    navIndex: 'ナビゲーション ＆ 目次',
    tableOfContents: '目次',
    contactAndLocation: 'お問い合わせ ＆ 拠点',
    locationText: '日本、北海道',
    copyright: '© 2026 Rikuto Mikado. All rights reserved.',

    // Nav items
    navAbout: '自己紹介',
    navAboutSub: 'ビジョンと物理レイヤーへの転換',
    navTrajectory: '経歴・進路',
    navTrajectorySub: 'これまでの歩みと今後の展望',
    navProjects: '制作物',
    navProjectsSub: 'フルスタック開発の作品集',
    navLearning: '資格・修了証',
    navLearningSub: '卒業証書・各種認定証',
    navBlog: 'ブログ',
    navBlogSub: '思考録とエッセイ',
    navStudyLog: '学習ログ',
    navStudyLogSub: 'typbox の学習記録',
    navContact: '連絡先',
    navContactSub: 'お問い合わせ・SNSリンク',

    // Hero
    heroGreeting: 'Hello, I am',
    heroName: 'Rikuto.',
    heroBadge: '電気工学・社会基盤インフラ • フルスタック開発',
    heroLead:
      'AI時代における『物理的な保険』を確保する。社会を支える電気・ハードウェアインフラの運用能力を最優先の基盤として獲得し、ソフトウェア構築のスキルは、自身の長期的適応力を高めるための独立した武器として保持し続ける。',

    // About
    aboutSectionBadge: 'ビジョンと方向性',
    aboutHeading: 'About Rikuto Mikado',
    aboutQuote:
      '「生涯を通じて知の探求を深め、将来は自ら農業を営みながら、無形文化という視点から人類の創造性を未来へ継承していくことに貢献したい」',
    aboutP1:
      '2年間ほどフルスタックWeb開発を学んでいましたが、生成AIの指数関数的な進化を目の当たりにし、私自身まだ若いことから（来年で20歳）一つの市場への依存を減らし、まずは第一として「物理的な保険（Physical insurance policy）」を確保すべきだと考えました。既存のLLMsが数年後に社会に浸透するだけでも大きな社会的変動は避けられないことからも、早めに動いて先行者利益を得るために動くことを決断しました。',
    aboutP2:
      '自身の客観的な考えに従い、私は電気工学を専門的に学ぶための進学を決定しました。現在は電験三種や第一種電気工事士といった中核となる国家資格の学習を本格化させています。また、将来的なグローバルネットワークへのアクセスを担保するため、IELTS AcademicやCisco CCNP Enterpriseの取得に向けた準備も並行して進めています。',
    aboutP3:
      'インフラエンジニアとして絶対的な安全圏を築くことは、最終的な目標である「農業や創造性の追求」を自由に行うための手段でもあります。現場での実務経験を積みながら英国大学の学位（OTHMプログラム）を取得し、長期的には修士課程への進学も見据えています。ソフトウェアの論理と物理設備の双方を理解する独自の強みを武器に、自身のキャリアをデザインしていきます。',
    aboutBadge1: '電気工学・社会基盤インフラ',
    aboutBadge2: 'フルスタック開発',
    aboutPhotoName: '三角 陸人(Rikuto Mikado)',

    // Trajectory
    trajectoryBadge: '経歴と歩み',
    trajectoryHeading: 'これまでの軌跡と進路計画',
    trajectoryLead:
      '独学による探求、AIの進化を見据えた戦略的な軌道修正、そして主体的なスキル獲得のプロセスを、透明性をもって記録したタイムライン。',
    statusCurrent: '現在進行中',
    statusRoadmap: '今後の計画',
    statusTentative: '未確定',
    statusConsidering: '検討中',
    crossroadsPeriod: '就職先の候補',
    crossroadsTitle: '外資系データセンター以外で狙える就職先',
    crossroadsLead: '「ホワイト × 高収入 × 再現性の高さ」を軸に、データセンター以外で視野に入れている候補です。',
    crossroadsFooter: '扉は四つ、鍵は一つ。積み上げた資格と英語が、どの扉にもそのまま通用する。',

    // Projects
    projectsBadge: '制作物・作品展示',
    projectsHeading: 'ゼロから作り上げたプロダクト',
    projectsLead:
      'データベース設計から細部のUIまで、すべてを一人で設計・開発・公開したフルスタックアプリケーションとゲーム。画像にカーソルを合わせると、スクリーンショットが鮮明に浮かび上がります。',
    projectFigure: '図',
    projectStack: '技術仕様',
    projectSource: 'GitHub',
    projectDemo: '公開版',
    opensInNewTab: '新しいタブで開きます',

    // Courses
    coursesBadge: '資格・修了認定',
    coursesHeading: '取得資格・卒業証書・修了証',
    coursesLead:
      '正式な卒業証書から、独学で取得した各種認定証まで。ソフトウェアエンジニアリング、AIツール、ビジネス、そして生活を支える実践的スキルにわたる資格の記録です。クリックすると証書の詳細を確認できます。',
    viewCert: '証書を確認',
    instructor: '講師',
    institution: '発行機関',
    date: '取得時期',
    length: '期間・種別',
    certId: '修了証ID',
    verification: '認証',
    certCompletion: '修了認定証',
    diplomaAward: '卒業証書',

    // Blog
    blogBadge: '思考録 ＆ エッセイ',
    blogHeading: '思考録・エッセイ',
    blogLead:
      '日々の思考や関心事を書き留めた、ただの個人的な考察録。',
    readEssay: '記事を読む',

    // Study log feed
    studyLogBadge: '学習ログ',
    studyLogHeading: '最近の学習記録',
    studyLogLead: '学習記録ツール typbox から受信している、日々の学習セッションのログ。',
    studyLogLoading: 'ログを取得中…',
    studyLogError: 'ログサーバーに接続できませんでした。時間をおいて再度お試しください。',
    studyLogEmpty: 'まだ記録がありません。',
    studyLogTotal: '合計',
    studyLogSessions: '回数',
    studyLogDays: '日数',
    studyLogByCategory: '今週のカテゴリ別学習時間',
    studyLogWeekEmpty: '今週の記録はまだありません。',
    studyLogRecentEmpty: '直近7日間の記録はありません。',
    studyLogSource: '私の TYPBOX アカウントの学習ログ',
    studyLogThisWeek: '今週',
    studyLogLast7Days: '直近7日間',
    studyLogDailyLog: '日別の記録',
    studyLogToday: '今日',

    // Newspaper furniture (masthead, folios, jump lines, back page)
    paperMotto: '物理レイヤー、学び、そして暮らしの記録',
    insideLabel: '本日の紙面',
    todaysStudy: '本日の学習',
    bylineBy: '文',
    continuedOn: '{page}面へ続く',
    continuedFrom: '{page}面から続く',
    inThisEdition: '今号の紙面から',
    latestEssayLabel: '最新のエッセイ',
    latestCertLabel: '最新の修了証',
    studyFiguresLabel: '今週の学習',
    vsLastWeek: '先週比',
    colophonTitle: '奥付',
    colophonText:
      'The R.M. Journal は、北海道で Rikuto Mikado が執筆・編集・発行しています。書体は Fraunces、Newsreader、Inter。',
    lettersTitle: 'お問い合わせ',
    lettersText: 'ご質問やご相談、お仕事のご依頼などは、メールでお気軽にご連絡ください。',
    listingCaption: 'リスト1 — profile.py',
    specialtiesLabel: '専門分野',
    chronologyLabel: '年表',
    frontPhotoCaption: '日本、北海道浦河町',
    nightEdition: '夜版',
    printEdition: '紙面版',
    printEditionCta: 'PDFで保存',
    printEditionHint: '印刷画面で「PDFに保存」を選んでください。',
    printPreparing: '組版中…',

    // Footer
    footerContact: 'お問い合わせ',

    // Language switcher
    langSwitchCode: 'EN',
    langSwitchLabel: 'Switch to English',
    currentLangCode: 'JP',
    currentLangName: '日本語',
    langSwitchHint: '英語表示に切り替え',

    // Blog cards & reader
    readShort: '読む',
    readMore: 'もっと見る',
    showLess: '閉じる',
    upcomingLabel: '次回執筆予定',
    comingSoon: '近日公開予定',
    inProgress: '執筆中',
    closeModal: '閉じる',
    closeArticle: '閉じる',
  },
}

export type UiText = (typeof uiText)[Language]
export type UiTextKey = keyof UiText

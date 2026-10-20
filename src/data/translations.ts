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
}

export type CertImageKey = 'pythonBootcamp' | 'fullstackWeb' | 'pythonMega' | 'indianCooking'

export interface CourseItem {
  title: string
  instructor: string
  hours: string
  platform: string
  date: string
  category: string
  note?: string
  imageKey: CertImageKey
  certificateId: string
}

export const timelineEventsData: Record<Language, TimelineItem[]> = {
  en: [
    {
      period: '2031 & Beyond',
      category: 'Career Transition & Research',
      location: 'Sapporo / Kanto / Global',
      title: 'Career Transition: Mission-Critical Data Centers & Global Enterprises',
      narrative:
        'After establishing a proven track record in field engineering, I plan to transition into mission-critical facilities, such as enterprise data centers or global multinational firms, utilizing platforms like LinkedIn. Given Japan’s aging technical workforce and the ongoing expansion of digital infrastructure, this career approach is grounded in strong, structural market demand. In the longer run, I also maintain a personal aspiration to explore graduate studies internationally as a future horizon for deeper academic inquiry.',
      details: [
        'Transition to multinational corporations, major domestic enterprises, or mission-critical data centers in Sapporo or the Kanto metropolitan area.',
        'Take and pass the second-stage practical examination for 2nd-Class Electrical Construction Management Engineer after completing 3 years of verified field experience.',
        'Keep open the possibility of pursuing overseas graduate studies over the longer term to broaden academic and personal horizons.',
      ],
      isUpcoming: true,
    },
    {
      period: 'Apr 2031 – Mar 2032',
      duration: 'Field Year 3',
      category: 'Professional Milestone',
      location: 'Hokkaido / Kanto, Japan',
      title: 'Third-Year Field Capstone: Facility Management & Network Credentials',
      narrative:
        'My third year of field experience focuses on acquiring key qualifications widely respected across Japan’s facilities management industry, while reinforcing networking capabilities to connect physical electrical systems with data networks.',
      details: [
        'Take and obtain the Building Environmental Hygiene Management Engineer (Building Manager) license in October upon completing the required two years of practical experience, a vital credential in Japan’s qualification-driven facility market.',
        'Target Cisco Certified Network Professional (CCNP Enterprise) during this third year to solidify network and systems competencies, maintaining alternative plans if adjustments are necessary.',
        'Retake the IELTS exam as the two-year validity period approaches, aiming to maintain or improve upon my initial benchmark score.',
        'Submit the formal application for the First-Class Electrician license upon fulfilling the full three years of practical on-site experience.',
      ],
      isUpcoming: true,
    },
    {
      period: 'Apr 2029 – Mar 2031',
      duration: 'Field Years 1–2',
      category: 'Employment & Degree Studies',
      location: 'Japan & UK (Distance)',
      title: 'Industry Employment & Concurrent UK OTHM Degree Pathway',
      narrative:
        'Entering full-time industry employment as an electrical engineer, I will accumulate mandatory hands-on field experience while simultaneously advancing through an accredited British degree pathway through distance learning.',
      details: [
        'Begin the UK OTHM Level 4/5 Diploma program, equivalent to the first two years of an accredited British Bachelor’s degree, aiming to complete a full Bachelor’s via a Top-up year while keeping further academic study as a potential future aspiration.',
        'Sit for the Qualified Energy Manager examination around August of my second year of practical experience, taking advantage of curriculum overlap with the Chief Electrical Engineer syllabus.',
        'Maintain disciplined, daily English study routines to stay prepared for the 2-year IELTS renewal cycle.',
      ],
      isUpcoming: true,
    },
    {
      period: 'Apr 2028 – Mar 2029',
      duration: 'Technical Institution (Year 2)',
      category: 'Advanced Technical Training',
      location: 'Hokkaido, Japan',
      title: 'Technical Institution Year 2: Advanced Electrical Licenses & Examination Milestones',
      narrative:
        'My second year at the technical institution is dedicated to passing advanced electrical and facility certifications, balancing study loads carefully to manage examination pressure effectively.',
      details: [
        'Sit for the First-Class Electrician examination around October, allocating generous study time to ensure thorough preparation without undue stress.',
        'Take the first-stage exam of 2nd-Class Electrical Construction Management Engineer around June to earn the official Assistant Management Engineer qualification.',
        'Take and obtain the Fire Defense Equipment Officer Category A4 certification during the winter term.',
        'Complete all remaining subject requirements for Third-Class Chief Electrical Engineer across these two years of institutional training (with flexibility to adapt later targets like Energy Manager if extra focus is needed).',
        'Continue consistent English learning in preparation for my second IELTS sitting.',
      ],
      isUpcoming: true,
    },
    {
      period: 'Apr 2027 – Mar 2028',
      duration: 'Technical Institution (Year 1)',
      category: 'Technical Institution Enrollment',
      location: 'Hokkaido, Japan',
      title: 'Technical Institution Enrollment: Foundations, 2nd-Class License & English Benchmark',
      narrative:
        'Entering a specialized technical training institution in electrical engineering, establishing foundational theory, hands-on workshop competencies, and securing early licensing and language milestones.',
      details: [
        'Take my first official IELTS exam in the second half of Year 1 (targeting a testing venue in Tokyo) to establish an academic proficiency benchmark.',
        'Sit for and obtain the Second-Class Electrician license near the end of Year 1.',
        'Leverage the twice-yearly exam schedule for Third-Class Chief Electrical Engineer, methodically passing subjects as preparation matures.',
      ],
      isUpcoming: true,
    },
    {
      period: 'Sep 2026 - Present',
      duration: 'Current',
      category: 'Hands-On Transition & Preparation',
      location: 'Urakawa, Hokkaido, Japan',
      title: 'Transition to Physical Infrastructure & Core Exam Preparation',
      narrative:
        'Briefly relocated to Latvia for a Computer Science bachelor’s program, but returned to Japan within weeks after reassessing local living costs and the rapid acceleration of AI technologies. Seeing the fast changes driven by LLMs, I decided to build a dependable foundation in the physical world. I redirected my focus toward electrical engineering and infrastructure—actively preparing for core national licenses including Third-Class Chief Electrical Engineer—while keeping full-stack development as a valuable skill that keeps me flexible for the future.',
      isCurrent: true,
    },
    {
      period: 'Jun 2025 - Aug 2026',
      duration: '1 yr 3 mos',
      category: 'Independent Living & Intensive Dev',
      location: 'Sapporo, Hokkaido, Japan',
      title: 'Self-Directed Full-Stack Training & Life Independence',
      narrative:
        'Lived independently in Sapporo with family support, dedicating daily schedules to intensive full-stack development through Udemy while mastering essential life skills such as cooking and personal discipline. Clarified personal priorities and core values, cultivating the autonomous capability to learn and iterate without relying on a mentor.',
    },
    {
      period: 'Jan 2025 - Jun 2025',
      duration: '6 mos',
      category: 'Exploration & Foundation Building',
      location: 'Urakawa, Hokkaido, Japan',
      title: 'Academic Exploration, AI Literacy & Software Initiation',
      narrative:
        'Following early high school graduation, utilized the Sophia learning platform with the initial goal of enrolling in a US distance-learning university. Read research papers, tracked global developments, and used generative AI tools to accelerate information gathering while gaining hands-on understanding of both AI power and hallucination risks. Shifted from the US distance-degree plan to commit fully to full-stack development, establishing a strict self-management routine.',
    },
    {
      period: 'Jun 2024 - Feb 2025',
      duration: '9 mos',
      category: 'High School Education',
      location: 'Online / US Accredited',
      title: 'Penn Foster Group — Early High School Diploma',
      narrative:
        'Transferred from local schooling to Penn Foster Group and accelerated coursework to graduate early with an official US High School Diploma.',
    },
    {
      period: 'Apr 2023 - May 2024',
      duration: '1 yr 1 mo',
      category: 'Secondary Education',
      location: 'Urakawa, Hokkaido, Japan',
      title: 'Hokkaido Urakawa High School',
      narrative: 'Enrolled in high school education, establishing foundational academic disciplines.',
    },
  ],
  ja: [
    {
      period: '2031年 以降',
      category: 'キャリア転換と研究',
      location: '札幌 / 関東 / 海外',
      title: '大企業・データセンターへの転職と海外大学院（修士）進学',
      narrative:
        '現場エンジニアとしての実績を築いたのち、LinkedIn等を活用して札幌や関東圏の大企業、ミッションクリティカルなデータセンター、外資系企業への転職を実行する。日本の技術者の高齢化とデジタルインフラ需要の急増を背景に、このアプローチは現時点では再現性が高いと考えている。転職後のキャリアと並行して、イギリスやオーストラリア等の大学院（オンライン通信制も視野）に進学し、修士号（マスター）を取得して長期的な研究にも携わることを目指す。',
      details: [
        'LinkedInを活用し、札幌または関東圏の大手企業、データセンター、外資系企業への転職を実行',
        '実務経験3年を満たした段階で、2級電気工事施工管理技士の第二次検定を受験・取得',
        '業務と並行して海外大学院（イギリス・豪州等）の修士課程に進学し、長期的な技術研究にアクセスする',
      ],
      isUpcoming: true,
    },
    {
      period: '2031年4月 – 2032年3月',
      duration: '実務 3年目',
      category: '実務マイルストーン',
      location: '北海道 / 関東',
      title: '実務3年目の総仕上げ：ビル管理士・CCNP・第一種電工免状交付',
      narrative:
        '実務経験3年目では、日本の施設管理市場において極めて重宝される資格の取得を完了させるとともに、物理的な電気設備とデータ通信網を繋ぐネットワーク技術の習得を進める。',
      details: [
        '実務経験2年を満たした10月に「建築物環境衛生管理技術者（ビル管理士）」を受験・取得（日本の施設管理市場において必須級の資格）',
        '実務3年目の段階で「CCNP Enterprise」の取得を目指し、ネットワークスキルを強化（難航した場合の代替案も準備）',
        '1回目から2年が経過するためIELTSを再受験し、スコアの現状維持以上を目指す',
        '実務経験3年を満了した時点で「第一種電気工事士」の正式な免状交付申請を行う',
      ],
      isUpcoming: true,
    },
    {
      period: '2029年4月 – 2031年3月',
      duration: '実務 1〜2年目',
      category: '就職と学位履修',
      location: '日本国内 ＆ 英国（通信）',
      title: '電気業界への就職（実務開始）と英国OTHM学士課程の並行履修',
      narrative:
        '電気エンジニアとして企業に就職し、必須の実務経験を蓄積しながら、通信教育を活用して英国の正規学士号を目指すプログラムを並行して開始する。',
      details: [
        '英国大学の1〜2年次に相当する「OTHM Level 4/5」プログラムを開始。将来的にTop-up制度で学士号を取得し、修士課程へ進む計画',
        '電験と学習範囲が重なる「エネルギー管理士」を、実務2年目の8月頃に受験・取得',
        '2年ごとのスコア更新に向けて、日々の英語学習を習慣化して継続',
      ],
      isUpcoming: true,
    },
    {
      period: '2028年4月 – 2029年3月',
      duration: '技術専門校 2年目',
      category: '高度専門技術研修',
      location: '北海道',
      title: '技術専門校 2年目：第一種電工・電験三種完遂・施工管理技士補・消防設備士',
      narrative:
        '技術専門機関での2年目は、上位の国家資格や施工管理資格の合格に集中。学習負荷とプレッシャーを考慮し、余裕を持ったスケジュールで着実に合格を狙う。',
      details: [
        '10月頃に「第一種電気工事士」を受験・取得（精神的なプレッシャーを考慮して多めに時間を確保）',
        '6月頃に「2級電気工事施工管理技士」の第一次検定を受験し、「技士補」資格を取得',
        '2年目の冬に「消防設備士 甲種4類」を受験・取得',
        '電験三種はこの2年間での全科目合格を目標とする（難航した場合は後のエネルギー管理士の時期を調整）',
        '2回目のIELTS受験に向けた英語学習を継続',
      ],
      isUpcoming: true,
    },
    {
      period: '2027年4月 – 2028年3月',
      duration: '技術専門校 1年目',
      category: '技術研修機関への入学',
      location: '北海道',
      title: '技術専門機関への入学：電気工学の基礎・第二種電工取得・IELTS初挑戦',
      narrative:
        '北海道の技術専門校（公設の技術研修機関）に入学し、電気工学の理論と実践技術の習得を開始。早い段階から国家資格と英語の基準スコア取得に挑む。',
      details: [
        '1年目の後半に1回目のIELTSを受験（東京を想定）、目標スコアの取得を目指す',
        '1年目の修了時期に「第二種電気工事士」の試験を受けて取得',
        '年2回ある「電験三種」の受験機会を活かし、仕上がった科目から順次合格を積み上げる',
      ],
      isUpcoming: true,
    },
    {
      period: '2026年9月 – 現在',
      duration: '現在',
      category: '物理インフラへの転換',
      location: '北海道 浦河町',
      title: '物理インフラへの転換と中核国家資格の準備',
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

export const coursesData: Record<Language, CourseItem[]> = {
  en: [
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
  ],
  ja: [
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
    navLearning: 'Learning',
    navLearningSub: 'Courses & Certifications',
    navRoadmap: 'Roadmap',
    navRoadmapSub: 'Strategic 3-Phase Plan',
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
    aboutPhotoPlace: 'Urakawa / Sapporo, Hokkaido, Japan',
    aboutPhotoDesc: 'Physical Layer • Systems • Autonomous Learning',

    // Trajectory
    trajectoryBadge: 'Trajectory',
    trajectoryHeading: 'Experience & Milestones',
    trajectoryLead:
      'A transparent chronicle of self-directed learning, practical course corrections, and step-by-step milestones toward a grounded career.',
    statusCurrent: 'Current Focus',
    statusRoadmap: 'Roadmap',

    // Courses
    coursesBadge: 'Skill Acquisition',
    coursesHeading: 'Courses & Continuous Learning',
    coursesLead:
      'Certified coursework completed through intensive independent study across software engineering, AI tooling, and essential life skills. Click any certificate to inspect credentials.',
    viewCert: 'View Certificate',
    instructor: 'Instructor',
    date: 'Date',
    length: 'Length',
    certId: 'Certificate ID',
    certCompletion: 'Certificate of Completion',

    // Roadmap
    roadmapBadge: 'Strategic Progression',
    roadmapHeading: 'Roadmap & Vision',
    roadmapLead:
      'A practical, step-by-step roadmap connecting software skills with electrical engineering, hands-on field experience, and international degree pathways.',

    roadmapCol1Tag: 'Years 2027 – 2029',
    roadmapCol1Title: '"Hands-on foundations"',
    roadmapCol1Body:
      'Entering an advanced technical institute in Hokkaido to build practical electrical engineering competencies. Over these two years, I plan to secure the Second-Class and First-Class Electrician licenses, systematically complete subjects for Third-Class Chief Electrical Engineer, obtain safety qualifications (Fire Defense A4 & Assistant Management Engineer), and sit for the IELTS Academic exam.',
    roadmapCol1Footer: 'Focus: Electrician 1st & 2nd • Chief Electrical Eng. • IELTS',

    roadmapCol2Tag: 'Years 2029 – 2032',
    roadmapCol2Title: '"Field practice & degree studies"',
    roadmapCol2Body:
      'Beginning full-time electrical field employment to accumulate three years of required on-site experience. In parallel, I will study through the UK OTHM diploma program toward an accredited British Bachelor’s degree, sit for the Qualified Energy Manager and Building Manager exams, prepare for Cisco CCNP Enterprise, and maintain IELTS scores within the 2-year renewal window.',
    roadmapCol2Footer: 'Target: 3-Year Field Work • UK OTHM Degree • Facility Licenses',

    roadmapCol3Tag: '2031 & Beyond',
    roadmapCol3Title: '"Data centers & future horizons"',
    roadmapCol3Body:
      'Transitioning into mission-critical facilities, such as enterprise data centers or multinational corporations, leveraging platforms like LinkedIn to address Japan’s aging technical workforce shortage. Over the long horizon, I also hold an aspiration to explore graduate-level study internationally as a future milestone for lifelong intellectual pursuit.',
    roadmapCol3Footer: 'Goal: Data Centers • Infrastructure Leadership • Future Graduate Horizons',

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
    navLearning: '取得スキル',
    navLearningSub: 'Udemy修了証と学習実績',
    navRoadmap: 'ロードマップ',
    navRoadmapSub: '3段階の中長期キャリア戦略',
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
    aboutPhotoPlace: '日本、北海道',
    aboutPhotoDesc: '物理レイヤー • システム • 独学と実践',

    // Trajectory
    trajectoryBadge: '経歴と歩み',
    trajectoryHeading: 'これまでの軌跡と進路計画',
    trajectoryLead:
      '独学による探求、AIの進化を見据えた戦略的な軌道修正、そして主体的なスキル獲得のプロセスを、透明性をもって記録したタイムライン。',
    statusCurrent: '現在進行中',
    statusRoadmap: '今後の計画',

    // Courses
    coursesBadge: 'スキルの修得',
    coursesHeading: '受講コースと修得スキル',
    coursesLead:
      'ソフトウェアエンジニアリングからAIツールの活用、さらには自立生活を支える実践的スキルに至るまで、徹底した独学によって修了した認定コース群。クリックして修了証の詳細を確認できます。',
    viewCert: '修了証を確認',
    instructor: '講師',
    date: '取得時期',
    length: '総学習時間',
    certId: '修了証ID',
    certCompletion: '修了認定証',

    // Roadmap
    roadmapBadge: '段階的キャリア構想',
    roadmapHeading: 'ロードマップと展望',
    roadmapLead:
      'ソフトウェアスキル、電気工学、現場実務、そして海外学位プログラムを繋ぐ、地に足のついた3段階のキャリアロードマップ。',

    roadmapCol1Tag: '2027年 – 2029年（技術専門機関期）',
    roadmapCol1Title: '「確かな基礎と資格の習得」',
    roadmapCol1Body:
      '技術専門機関にて、電気工学の理論と現場技術の基礎を徹底的に体得します。この2年間で第一種電気工事士や電験三種の科目合格など、インフラエンジニアとしての必須資格を戦略的に取得し、同時にIELTSのスコアメイクを行うことで、デジタルと物理を繋ぐ強固な基盤を構築します。',
    roadmapCol1Footer: '重点: 電気工事士第1種・2種 • 電験三種 • IELTS',

    roadmapCol2Tag: '2029年 – 2032年（実務＆大学並行期）',
    roadmapCol2Title: '「現場実務と海外学士号の並行」',
    roadmapCol2Body:
      'インフラ業界へ入り、ミッションクリティカルな現場で3年間の実務経験を蓄積します。並行して通信制の英国OTHMプログラムを通じて学士号の取得を進め、エネルギー管理士等の上位資格にも挑戦します。実務と学術調査を両立させ、より高度な専門性を深めるフェーズです。',
    roadmapCol2Footer: '目標: 実務3年 • 英国OTHM学士 • エネ管・ビル管',

    roadmapCol3Tag: '2031年 以降（キャリアの飛躍）',
    roadmapCol3Title: '「データセンター転職と大学院研究」',
    roadmapCol3Body:
      '実務経験と資格を武器に、日本の技術者高齢化による構造的需要を捉え、大手データセンターや外資系企業へアクセスします。さらに将来的には海外大学院の修士課程へ進学し、生涯にわたる知の探求と技術研究を継続。最終的には「自身の創造性と自由」を完全に保護できる、揺るぎないポジションの確立を目指します。',
    roadmapCol3Footer: '展望: データセンター • 海外大学院修士 • 長期研究',

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

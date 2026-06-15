import { RobloxGame, FullStackProject, ResearchPaper, CourseTaught, ESPLesson, Certification, MSITSubject, MSITProject } from "./types";

export const ROBLOX_GAMES: RobloxGame[] = [
  {
    id: "game1",
    title: "BayanLife: Philippine Roleplay",
    description: "Experience life in the Philippines through immersive roleplay—serve as police or army, live as a citizen, work, shop for groceries, and build your own story. Choose your path and shape the nation through everyday life and duty.",
    plays: "1.8M+",
    genre: "Town & City Roleplay",
    techStacked: ["Luau (OOP)", "Team & Duty Frameworks", "Custom Rigging", "DataStore v2", "DataStream Replication"],
    gamePlayInstructions: "Select your starting role (Pulis, Philippine Army, or Citizen). Report to the municipal Police Station or barracks to equip your gear. Complete daily tasks such as patrolling, grocery shopping, or trading to earn currency and build your reputation.",
    luaSnippet: `-- BayanLife Roleplay Duty Management system
local Players = game:GetService("Players")
local Teams = game:GetService("Teams")

local DutyManager = {}
DutyManager.__index = DutyManager

function DutyManager.new(player: Player, teamName: string)
    local self = setmetatable({}, DutyManager)
    self.Player = player
    local targetTeam = Teams:FindFirstChild(teamName)
    if targetTeam then
        player.Team = targetTeam
        print("[BAYANLIFE] Assigned " .. player.Name .. " to: " .. teamName)
    end
    return self
end

function DutyManager:SpawnDutyGear()
    local character = self.Player.Character
    if character and character:FindFirstChild("Humanoid") then
        local gear = game.ServerStorage.Gear:FindFirstChild(self.Player.Team.Name)
        if gear then
            local gearClone = gear:Clone()
            gearClone.Parent = character
            print("[BAYANLIFE] Equipped official duty gear for " .. self.Player.Name)
        end
    end
end

return DutyManager`,
    visualThumbnailUrl: "/src/assets/images/bayanlife_thumbnail_1781498461530.png",
    url: "https://www.roblox.com/games/82288089871948/BayanLife-Philippine-Roleplay"
  },
  {
    id: "game2",
    title: "Killer's Mansion [INDEV]",
    description: "Can you survive the mansion? You are trapped in a dark, sprawling estate with a relentless creature hunting you down. To escape, you must explore the rooms, outsmart the killer, and find the randomly hidden key to unlock the main doors.",
    plays: "450K+",
    genre: "Survival Horror / Escape",
    techStacked: ["Luau (OOP)", "First-Person Camera", "System-Weighted Spawners", "Dynamic Pathfinding", "Sprint Control"],
    gamePlayInstructions: "Explore the eerie mansion and carefully manage your stamina. Discover the hidden key hidden inside randomly generated spawning blocks to unlock the heavy double doors and escape before the creature captures you.",
    luaSnippet: `-- Killer's Mansion Key Spawning & Survival system
local Workspace = game:GetService("Workspace")
local Players = game:GetService("Players")

local MansionGame = {}
local keySpawnPoints = Workspace.Mansion.KeySpawns:GetChildren()

-- Randomly spawn the mansion door key in one of the hidden rooms
function MansionGame.SpawnKey()
    local randomIndex = math.random(1, #keySpawnPoints)
    local chosenPoint = keySpawnPoints[randomIndex]
    
    local keyModel = game.ServerStorage.Items.MansionKey:Clone()
    keyModel:SetPrimaryPartCFrame(chosenPoint.CFrame)
    keyModel.Parent = Workspace
    print("[MANSION] Key spawned at location: " .. chosenPoint.Name)
end

-- Stamina sprint control for survival speed
function MansionGame.ApplySprintSpeed(player: Player, isSprinting: boolean)
    local humanoid = player.Character and player.Character:FindFirstChild("Humanoid")
    if humanoid then
        humanoid.WalkSpeed = isSprinting and 22 or 16
    end
end

return MansionGame`,
    visualThumbnailUrl: "/src/assets/images/killers_mansion_thumbnail_1781498669353.png",
    url: "https://www.roblox.com/games/84289214205055/Killers-Mansion"
  }
];

export const FULLSTACK_PROJECTS: FullStackProject[] = [
  {
    id: "fs1",
    title: "Ellie's Cookies Cost Calculator & Order System",
    description: "A beautiful, operational cost calculation, wholesale order administration, and sales insights platform custom-designed for a specialized home bakery ('Ellie's Cookies'). Empowering precision batching with ingredient utility weights, multi-channel customer order dispatching, and dynamic income reporting.",
    techStack: ["Vite", "React", "Firebase Firestore", "Firebase Authentication", "TailwindCSS"],
    liveUrl: "https://ellies-cookies.dev",
    features: [
      "Precision batch-cost analysis modeling individual ingredient weight rates and custom proportional overhead utilities distributions (Philippine Peso ₱).",
      "Dynamic wholesale order collection and serverless status tracking across real-time Firestore database states.",
      "Fully responsive business dashboard presenting sales matrices, active recipes breakdown, and total revenue tracking."
    ],
    visualThumbnailUrl: "/src/assets/images/ellies_cookies_thumbnail_1781499386080.jpg",
    databaseSchema: [
      {
        table: "recipes_collection",
        columns: [
          { name: "id", type: "string (DocID)", desc: "Unique recipe document identifier in Firestore" },
          { name: "name", type: "string", desc: "Title of the recipe, e.g., Chocolate Chip Cookie" },
          { name: "batchSize", type: "number", desc: "Standard batch volume count, e.g., 12 pieces" },
          { name: "overheadCost", type: "number", desc: "Flat utility rates per baking cycle in ₱" }
        ]
      },
      {
        table: "orders_collection",
        columns: [
          { name: "id", type: "string (DocID)", desc: "Unique Firestore Order identifier" },
          { name: "customerName", type: "string", desc: "Client first and last name details" },
          { name: "totalCost", type: "number", desc: "Grand total price in Philippine Pesos" },
          { name: "status", type: "string", desc: "Current workflow state: Pending, Baking, Completed" }
        ]
      }
    ]
  },

  {
    id: "fs3",
    title: "Teacher Tools: Online Interactive LMS & Whiteboard",
    description: "An advanced, collaborative Learning Management System (LMS) designed specifically for online educators. Featuring a fully featured vector drawing canvas, modern rich-file sharing widgets, seamless PDF lesson loaded views, dynamic image canvas uploads, and a highly interactive star reward feedback panel to gamify lessons in real-time.",
    techStack: ["Vite", "React", "State Synchronization", "HTML5 Canvas", "Lucide React", "File Parser"],
    liveUrl: "https://teacher-tools-three.vercel.app/",
    visualThumbnailUrl: "/src/assets/images/teacher_tools_thumbnail_1781500289639.jpg",
    features: [
      "Dynamic interactive Magic Whiteboard canvas with custom brush, highlighter glow mode, typography layer placements, text layout injections, and one-click board wipe controllers.",
      "Secure lesson scheduler widget with fluid PDF document preview, asset presentation scaling, and dynamic side-by-side presentation views.",
      "Highly responsive class log with status tracking, customizable reward system featuring animated milestone banners, and persistent session timers."
    ]
  },
  {
    id: "fs4",
    title: "ER Lifestyles: Premium Wellness & POS Order System",
    description: "An elegant, production-grade e-commerce storefront paired with a comprehensive POS Management System. Features an interactive product catalog for health essentials (Intra, FibreLife, NutriaPlus), real-time cart checkout calculations, dynamic client reviews presentation, an offline-resilient Order Registry console with database seeding, inventory levels monitoring, and customer feedback tracking.",
    techStack: ["Vite", "React", "TailwindCSS", "State Persistence", "Lucide React", "POS Engine"],
    liveUrl: "https://erlifestyles.vercel.app/",
    visualThumbnailUrl: "/src/assets/images/er_lifestyles_thumbnail_1781500765140.jpg",
    features: [
      "Exquisite modern e-commerce storefront showcasing Lifestyles' premium formulation line (Intra, FibreLife, NutriaPlus, CardioLife) with dynamic pricing (Philippine Peso ₱), interactive filter tags, and functional client testimonial sections.",
      "Comprehensive POS Management Dashboard including a real-time Order Registry to manage sales transactions, order volume value, tracking agent status, and active system cloud-connectivity states.",
      "Functional Inventory Control tracker detailing stock updates, automatic product category classifications, and instant one-click seed mock data catalog buttons to populate records dynamically."
    ]
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    title: "Gamifying Linguistic Comprehension in Roblox Meta-Environments: A Practical Model for ESL within Information Technology Curricula",
    journal: "International Journal of Computer-Assisted Language Learning (IJCALL)",
    abstract: "This study surveys the integration of customized educational metaverse zones inside traditional IT curricula. By building targeted Roblox environments mapping Holy Cross of Davao College's department infrastructure, students engagement with tech-comm vocabulary surged by 42%. The research designs an engine structure that couples gamified quest outcomes directly with practical syntax assessments for technical writing.",
    date: "March 2026",
    keywords: ["Roblox Education", "Linguistic Gamification", "Information Technology Curriculum", "Metaspheres", "ESL"],
    findings: "Demonstrates that spatial context dramatically stabilizes abstract technical English vocabulary acquisition compared to two-dimensional textbook modules."
  },
  {
    title: "Micro-Container Orchestration in Secondary Educational Intranets: Building Lightweight, Offline-Resilient Grading Portlets",
    journal: "IEEE ASEAN IT Student Forum 2025",
    abstract: "Focuses on deploying cost-efficient Node.js container environments across limited-bandwidth network segments in rural computer laboratories. The study provides structural patterns for locally cached student grading frameworks, enabling seamless sync sequences once WAN uplinks recover.",
    date: "October 2025",
    keywords: ["Edge Containers", "PostgreSQL Core Sync", "Campus Orchestration", "Node Services"],
    findings: "Reduces offline record packet loss to less than 0.1% while maintaining responsive UI execution speeds on outdated lab workstations."
  }
];

export const COURSES_TAUGHT: CourseTaught[] = [
  {
    id: "c1",
    code: "EMST",
    title: "Living in the IT Era",
    level: "Undergraduate",
    description: "An essential minor subject introducing students to emerging digital technologies, modern computer logic, and strategies for protective cyber security hygiene against common network-based attacks.",
    semester: "First Semester, Academic Year 2025-2026",
    syllabus: [
      "Unit 1: Foundations of Information Systems and Computing History",
      "Unit 2: Emerging Digital Technologies (Cloud, Web3, & AI Integrations)",
      "Unit 3: Personal Cybersecurity Literacy & Common Cyber Attacks Protection",
      "Unit 4: Digital Citizenship, Legal Frameworks, and Online Identity Protection"
    ],
    activeStudents: 52
  },
  {
    id: "c2",
    code: "ICT",
    title: "ICT Laboratory",
    level: "Undergraduate",
    description: "A specialized laboratory subject for Maritime Education concerning Information Communication and Technology: software applications, vessel satellite configurations, and network systems used globally in seagoing ships.",
    semester: "First Semester, Academic Year 2025-2026",
    syllabus: [
      "Unit 1: Marine Communication Interfaces & Shipboard Network Hardware",
      "Unit 2: Standard Software Applications for Seagoing Vessel Personnel",
      "Unit 3: Satellite Comms, GPS Integrations, and Ship-to-Shore Network Connections",
      "Unit 4: Security Protocols, Diagnostics, and Troubleshooting On-board Informatics"
    ],
    activeStudents: 30
  },
  {
    id: "c3",
    code: "BEC103",
    title: "IT Application Tools in Business",
    level: "Undergraduate",
    description: "A practical subject for the Bachelor of Science in Accountancy, training students to utilize advanced spreadsheets, business automated ledgers, dynamic billing formulas, and financial software arrays.",
    semester: "Second Semester, Academic Year 2025-2026",
    syllabus: [
      "Unit 1: Enterprise Spreadsheets and Data Modeling Foundations",
      "Unit 2: Advanced Financial Calculations and Lookup Functions",
      "Unit 3: Relational Accounting Collections, Databases, and Ledger Systems",
      "Unit 4: Business Intelligence, Auditing Logs, and Reporting Automation"
    ],
    activeStudents: 40
  },
  {
    id: "c4",
    code: "HCI101",
    title: "Introduction to Human Computer Interaction",
    level: "Undergraduate",
    description: "A foundational Bachelor of Science in Information Technology 1st year subject regarding human-centered UI/UX design, wireframing paradigms, empirical usability assessments, and interactive flow guidelines.",
    semester: "Second Semester, Academic Year 2025-2026",
    syllabus: [
      "Unit 1: Fundamental Principles of Human-Computer Interaction (HCI)",
      "Unit 2: Visual Hierarchy, Interface Layout Design, and Prototyping Systems",
      "Unit 3: Cognitive Overload Prevention and Interaction Design Paradigms",
      "Unit 4: Empirical Usability Testing, Heuristic Reviews, and Accessibility Guidelines"
    ],
    activeStudents: 35
  }
];

export const ESP_LESSONS: ESPLesson[] = [
  {
    id: "esp1",
    topic: "Fluent English Conversation & Speech Flow",
    targetProfession: "Chinese ESL Students & Professionals",
    objectives: [
      "Master high-frequency vocabulary and daily speech patterns to build instant conversation fluency.",
      "Identify and correct common phonetic misalignments, clarifying natural English intonation.",
      "Formulate comfortable, structured response sentence tracks during active real-time discussions."
    ],
    vocabularyList: [
      {
        word: "Coherence",
        definition: "The quality of being logical and consistent, allowing spoken ideas to flow seamlessly with clear semantic connection.",
        example: "Using transitional phrases in English helps maintain coherence when explaining complex procedures."
      },
      {
        word: "Intonation",
        definition: "The rising and falling pattern of voice pitch during active speaking, vital for sounding expressive and conveying precise meaning.",
        example: "Correct intonation turns a flat statement into an engaging, friendly conversation starter."
      },
      {
        word: "Enunciation",
        definition: "The act of pronouncing words clearly and distinctly, ensuring your listeners easily understand every syllable.",
        example: "Slowing down your speech rate slightly ensures perfect enunciation of challenging consonant endings."
      }
    ],
    interactiveQuiz: [
      {
        question: "Select the most natural and fluent way to offer collaborative assistance in an English conversation:",
        options: [
          "I will do this task for you because you do not know English.",
          "Would you like me to run through that or help you get started?",
          "Give me the task, I do it now.",
          "I am helper for you today."
        ],
        correctIndex: 1,
        explanation: "Academic ESL guidelines highlight that using comfortable conversational markers (e.g. 'run through that', 'help you get started') builds a warm, native flow to your interaction."
      },
      {
        question: "Identify the word that represents 'the precise articulation of speech sounds so that listeners can comprehend your voice clearly':",
        options: [
          "Translation",
          "Enunciation",
          "Grammar",
          "Vocalization"
        ],
        correctIndex: 1,
        explanation: "'Enunciation' is the precise terminology for articulative clarity, which is a major pillar of conversational fluency."
      },
      {
        question: "When a speaker is offering friendly feedback during active English practice, which constructive phrasing is most fluent and encouraging?",
        options: [
          "Your pronunciation here is wrong and breaks your English.",
          "I suggest adjusting your word stress on 'development' to place the emphasis on the second syllable for a more natural flow.",
          "You must rewrite this sentence completely.",
          "Please check this. It is bad English."
        ],
        correctIndex: 1,
        explanation: "Polite constructive directions ('I suggest adjusting...', 'for a more natural flow') are emphasized in advanced ESP coaching to encourage confidence and continuous improvement."
      }
    ]
  },
  {
    id: "esp2",
    topic: "Structured English Presentations & Public Speaking",
    targetProfession: "ESL Presenters & Learners",
    objectives: [
      "Construct high-impact presentation introductions utilizing supportive transitional vocabulary.",
      "Overcome presentation and speaking anxieties through targeted starting sentence frameworks.",
      "Deliver professional, fluent updates with natural pacing, correct stress, and clear voice projection."
    ],
    vocabularyList: [
      {
        word: "Transition",
        definition: "Smoothly navigating from one subject, slide, or concept to the next using friendly conversational connectors.",
        example: "A clear transition signals to your audience that you are moving on to the next major project step."
      },
      {
        word: "Fluency",
        definition: "The capacity to speak or write a language easily, smoothly, and with comfortable expression and pacing.",
        example: "Practicing your presentation outline aloud several times increases vocal consistency and overall fluency."
      },
      {
        word: "Confidence",
        definition: "A state of feeling self-assured and calm while expressing ideas in public settings.",
        example: "With a structured introduction script, your confidence in speaking English improves instantly."
      }
    ],
    interactiveQuiz: [
      {
        question: "Which transitional phrasing is most professional and fluent to introduce a new slides segment or idea?",
        options: [
          "Now look at this new page.",
          "Let's turn our attention to the next key highlight, which illustrates...",
          "I am done talking about the last slide.",
          "Next design picture is showing information."
        ],
        correctIndex: 1,
        explanation: "Compound native transitional phrases (e.g. 'Let's turn our attention to...') guide listeners smoothly and show great stylistic control."
      },
      {
        question: "Select the sentence that indicates high fluency when explaining a minor speaking delay to your audience:",
        options: [
          "Wait, I forgot English.",
          "Let me take a brief moment to pull up our latest presentation charts...",
          "I stop now because of error.",
          "My computer is dead, cannot speak."
        ],
        correctIndex: 1,
        explanation: "Polite filler phrases ('Let me take a brief moment to...') allow the speaker to stay positive and collected while managing active slides."
      }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert1",
    title: "Certificate of Recognition: Best Research Presenter",
    issuer: "Holy Cross of Davao College (Center for Research and Publication)",
    issueDate: "May 2, 2025",
    credentialId: "HCDC-CRP-JRC-2025-THEME1",
    skillsVerified: [
      "Data Innovation",
      "Academic Presentation",
      "Maritime IT Systems",
      "Sustainability Engineering",
      "Operational Security",
      "Archdiocesan Informatics"
    ],
    description: "Awarded as Best Research Presenter for the Parallel Theme 1 - Data Innovation during the Joint Research Conference of the College of Maritime Education, College of Criminal Justice Education, and College of Engineering and Technology with the theme 'Advancing Sustainability: Innovation, Engineering, Technology, Maritime Shipping Operations, Security and Justice in the Archdiocesan Institution'.",
    certType: "Academic"
  },
  {
    id: "cert2",
    title: "CSS Complete Course For Beginners",
    issuer: "Udemy (Proper Dot Institute)",
    issueDate: "March 19, 2025",
    credentialId: "UC-48bd9708-e4ae-46fa-b5a4-3df12b5d2f80",
    skillsVerified: [
      "CSS Cascading & Specificity",
      "Fluid Box Model",
      "Flexbox & Grid Layouts",
      "Responsive Web Design",
      "UI Component Styling",
      "Web Layout Fundamentals"
    ],
    description: "Comprehensive professional verification demonstrating mastery over Cascading Style Sheets (CSS), visual layer layouts, adaptive design, and fundamental front-end user experience parameters.",
    certType: "Technical"
  },
  {
    id: "cert3",
    title: "EF SET English Certificate (C2 Proficient)",
    issuer: "EF Standard English Test (EF SET)",
    issueDate: "January 22, 2026",
    credentialId: "FZMRRb",
    skillsVerified: [
      "CEFR C2 Proficiency",
      "Standard English Writing (97/100)",
      "Standard English Speaking (81/100)",
      "Grammar & Sentence Mechanics",
      "Professional Vocabulary Mastery",
      "Global EFL/ESL Fluency Standards"
    ],
    description: "Successfully completed the EF SET Certificate, earning the absolute highest level of the Common European Framework of Reference for Languages (CEFR): C2 Proficient. Achieved an aggregate score of 89/100, with outstanding scores in Writing (97/100) and Speaking (81/100).",
    certType: "Educational"
  },
  {
    id: "cert4",
    title: "Java And C++ Complete Course for Java And C++ Beginners",
    issuer: "Udemy (Crunch Coding)",
    issueDate: "March 19, 2025",
    credentialId: "UC-23ec65ed-8bbf-4db3-b6e1-3ebc389d7732",
    skillsVerified: [
      "Java OOP Paradigms",
      "C++ Memory Management",
      "Object-Oriented Programming",
      "Pointers & References",
      "Control Structures & Data Types",
      "Console Application Development"
    ],
    description: "Comprehensive professional validation certifying underlying programming capabilities across Java and C++ frameworks. Focuses on OOP models, structure control patterns, memory management concepts, and runtime engineering methodologies.",
    certType: "Technical"
  },
  {
    id: "cert5",
    title: "Certificate of Recognition: Capstone Exhibit Champion",
    issuer: "Holy Cross of Davao College (College of Engineering and Technology)",
    issueDate: "March 25, 2025",
    credentialId: "HCDC-CET-TECHNOFAIR-2025-CHAMPION",
    skillsVerified: [
      "CAPSTONE App Development",
      "Fruit Identification System",
      "Diabetic Nutrient Analysis",
      "Sustainable Technology Design",
      "Systems Engineering",
      "Technical Innovation Pitching"
    ],
    description: "Awarded as the CHAMPION in the Capstone Exhibit for 'Diabeticare: Fruit Identification and Nutrient Analysis App for Diabetic Patients' during the CET TechnoFair with the theme 'Fueling a Sustainable Tomorrow by Harnessing Innovation, Technology, and Talents in Addressing Global Challenges'.",
    certType: "Academic"
  },
  {
    id: "cert6",
    title: "120-Hour TEFL Course Certificate (with Distinction)",
    issuer: "TEFL Professional Institute - Teacher Record",
    issueDate: "February 2026",
    credentialId: "TR1164231286",
    skillsVerified: [
      "TEFL / TESOL Pedagogy",
      "EFL Lesson Planning",
      "English Grammar Instruction",
      "Classroom Management",
      "Linguistic Assessment",
      "Global Instruction Standards"
    ],
    description: "Awarded with academic Distinction for the successful completion of the comprehensive 120-Hour Teaching English as a Foreign Language (TEFL) course, certifying expertise in standard ESL pedagogy, classroom mechanics, student assessment, and dynamic English instruction.",
    certType: "Educational"
  },
  {
    id: "cert7",
    title: "Professional Certificate of Agile and Scrum Business Analyst",
    issuer: "Udemy (MTF Institute of Management, Technology and Finance)",
    issueDate: "March 19, 2025",
    credentialId: "UC-5241afef-53c2-4402-a898-6e0a151b5d08",
    skillsVerified: [
      "Agile Frameworks",
      "Scrum Methodology",
      "Business Systems Analysis",
      "Requirements Refinement",
      "Sprint Management",
      "SDLC Coordination"
    ],
    description: "Professional certification from the MTF Institute verifying domain knowledge in core Agile principles, Scrum lifecycle mechanics, requirement elicitation, and product backlog management for enterprise software initiatives.",
    certType: "Technical"
  }
];

export const MSIT_SUBJECTS: MSITSubject[] = [
  // FIRST YEAR: First Semester
  {
    code: "MIT 001",
    title: "Advanced Operating System and Networking",
    description: "In-depth study of distributed operating systems, container orchestration architectures on localized intranets, parallel processing capabilities, network core socket bindings, and network speed optimization pipelines.",
    year: "First Year",
    semester: "First Semester",
    rating: "—",
    projects: [
      {
        title: "Davao Intranet Proxy Routing Terminal",
        description: "A lightweight proxy caching terminal simulating routing optimization. Relies on dynamic packet redirection structures to prevent frame lag over local area networks.",
        techStack: ["Node.js", "Express", "Socket.io", "Docker Containers"],
        findings: "Demonstrates automatic local cache routing when WAN limits drop below 512 Kbps.",
        visualThumbnailUrl: "/src/assets/images/lints_brackets_1781159527422.png"
      }
    ]
  },
  {
    code: "MIT 002",
    title: "Advanced Database Systems",
    description: "Operational cloud database architectures, NoSQL schema organization, real-time client state synchronization, security rules configurations, and high-concurrency transactional indices using Google Firebase.",
    year: "First Year",
    semester: "First Semester",
    rating: "—",
    projects: [
      {
        title: "Firebase-Powered Distributed Real-time Sync Ledger",
        description: "A secure state-matching transactional ledger querying structured analytical collections. Performs collection caching over JSON payload boundaries and automatically synchronizes client updates.",
        techStack: ["Firebase", "Firestore DB", "TypeScript", "Node.js"],
        findings: "Successfully synchronized multi-tenant ledger records under simulated offline connections with zero packet leakage.",
        visualThumbnailUrl: "/src/assets/images/classflow_dash_1781159509505.png"
      }
    ]
  },
  {
    code: "MIT 003",
    title: "Advanced Systems Design and Implementation",
    description: "Advanced engineering design paradigms, unified architectural modeling, event-driven state scheduler maps, and compile-state testing threads to validate performance standards in web environments.",
    year: "First Year",
    semester: "First Semester",
    rating: "—",
    projects: [
      {
        title: "Luau AST AST Grammar Resolver & Parser",
        description: "A high-fidelity parser and analyzer compiling Roblox Luau scripts. Translates and checks syntax variables and alerts users of unreferenced variables in local scopes.",
        techStack: ["TypeScript", "Esbuild", "Vite JS", "Automata Theory"],
        findings: "Compiles Lua threads dynamically in-browser and provides detailed tracebacks highlighting syntax bugs under 45ms.",
        visualThumbnailUrl: "/src/assets/images/lints_brackets_1781159527422.png"
      }
    ]
  },
  // FIRST YEAR: Second Semester
  {
    code: "MIT 004",
    title: "Technology and Project Management",
    description: "Software engineering project methodologies, cost estimation modeling, milestone tracking matrices, agile container delivery practices, and academic training syllabus structures.",
    year: "First Year",
    semester: "Second Semester",
    rating: "1.0",
    projects: [
      {
        title: "Agile Workspace Milestone Monitor",
        description: "An interactive, elegant kanban dashboard plotting task complexities and student grading averages against timeline estimates.",
        techStack: ["React", "Tailwind CSS", "Gantt-D3 Core"],
        findings: "Optimizes agile classroom delivery parameters, accelerating student task progress tracking.",
        visualThumbnailUrl: "/src/assets/images/classflow_dash_1781159509505.png"
      }
    ]
  },
  {
    code: "MITS 001",
    title: "Machine Learning",
    description: "Introduction to training models, statistical classification, neural networking synapses, backpropagation parameters, and diagnostic predictive analysis algorithms used to forecast linguistic outcomes.",
    year: "First Year",
    semester: "Second Semester",
    rating: "1.2",
    projects: [
      {
        title: "Predictive ESP Language Acquisition Assessor",
        description: "A custom machine learning classifier predicting student vocabulary retention score weights based on in-game Roblox quest engagement metrics.",
        techStack: ["Python", "Numpy", "React Charting Engine", "Linguistic Models"],
        findings: "Maintains 94.2% diagnostic accuracy when estimating curriculum vocabulary retention curves.",
        visualThumbnailUrl: "/src/assets/images/mits_001_ml_1781497150701.jpg"
      }
    ]
  },
  {
    code: "MITS 002",
    title: "Data Mining",
    description: "K-means clustering models, NLP semantic text indexing, data warehouse extraction pipelines, structured CSV mapping, and pattern discovery across diverse learning profiles.",
    year: "First Year",
    semester: "Second Semester",
    rating: "1.2",
    projects: [
      {
        title: "Academic Syllabus Semantic Clustermap",
        description: "An automated clustering workspace indexing Holy Cross of Davao College's IT syllabi. Aggregates and clusters overlapping jargon units into interactive vector structures.",
        techStack: ["D3.js", "Python Pandas", "Tailwind CSS", "Semantic NLP"],
        findings: "Discovered and visualizes multi-disciplinary terminology clusters to eliminate administrative lecture redundancy.",
        visualThumbnailUrl: "/src/assets/images/mits_002_mining_1781497168366.jpg"
      }
    ]
  },
  // FIRST YEAR: Summer
  {
    code: "MITS 003",
    title: "Computer Vision",
    description: "Computational image parsing, facial landmark coordinate maps, real-time posture tracking models, and image matrix filters optimized for translation into game spaces.",
    year: "First Year",
    semester: "Summer",
    rating: "—",
    projects: [
      {
        title: "Real-time Avatar Expression Rig",
        description: "Tracks student camera feeds via MediaPipe, converting eye-blinks, hand-coordinates, and face gestures directly into customizable 3D blocky character gestures.",
        techStack: ["MediaPipe", "WebRTC", "Three.js Editor", "Roblox JSON Rigging"],
        findings: "Provides low-latency dynamic avatar expression replicating student visual gestures at 30+ FPS directly in sandboxed viewports.",
        visualThumbnailUrl: "/src/assets/images/hcdc_odyssey_1781159471306.png"
      }
    ]
  },
  {
    code: "MITS 004",
    title: "Cybersecurity Emerging Technologies",
    description: "Honeypot configurations, distributed port scan diagnostics, cryptographic signature verification networks, firewalls, and sandboxed thread protections against malware.",
    year: "First Year",
    semester: "Summer",
    rating: "—",
    projects: [
      {
        title: "Autonomous Firewall Hack Simulator",
        description: "A gamified 3D tower defense simulator. Glowing neon firewall ports intercept hostile virus packet coordinate spiders, providing secure logs tracing intrusion parameters.",
        techStack: ["Roblox Studs Engine", "Luau Sandbox", "Network Log Auditing"],
        findings: "Improves student understanding of TCP/IP port vulnerabilities and intrusion mitigation strategies by 68%.",
        visualThumbnailUrl: "/src/assets/images/cybersec_simulator_1781159449061.png"
      }
    ]
  },
  // SECOND YEAR: Residency (CP1 & CP2)
  {
    code: "CP1 RES",
    title: "CP1 RESIDENCY",
    description: "First-stage practical residency at Holy Cross of Davao College, consolidating advanced technology curriculum standards with administrative data syncing systems.",
    year: "Second Year",
    semester: "Residency",
    rating: "—",
    projects: [
      {
        title: "HCDC Administration Record Syncer",
        description: "Connecting local registrar transaction logs safely to cloud database endpoints without losing packet order in volatile WAN contexts.",
        techStack: ["Docker", "SQLite Local Sync", "PostgreSQL Cloud", "WebSocket"],
        findings: "Achieved zero trace conflicts over 10,000 mocked grades transactions during internet brownouts.",
        visualThumbnailUrl: "/src/assets/images/classflow_dash_1781159509505.png"
      }
    ]
  },
  {
    code: "CP2 RES",
    title: "CP2 RESIDENCY",
    description: "Second-stage immersion focusing on active laboratory management, localized software compilation diagnostics, and teacher-interaction assistance tools.",
    year: "Second Year",
    semester: "Residency",
    rating: "—",
    projects: [
      {
        title: "Automated Laboratory Diagnostics Hub",
        description: "Centrally monitoring operating stats and compiling warnings for lab system devices running client-side academic environments.",
        techStack: ["Rust Core", "Express Web Interface", "Tailwind CSS", "Systems Monitoring"],
        findings: "Replaces manual monitoring, detecting network lag threads and unreferenced server variables immediately.",
        visualThumbnailUrl: "/src/assets/images/lints_brackets_1781159527422.png"
      }
    ]
  },
  // SECOND YEAR: First Semester
  {
    code: "MITS 005",
    title: "Internet of Things",
    description: "Microcontroller wiring, hardware signal modulators, local mesh routing architectures, ambient physical telemetry sensors, and sensor-to-server transaction queues.",
    year: "Second Year",
    semester: "First Semester",
    rating: "—",
    projects: [
      {
        title: "Physical Classroom Sensor Grid Emulator",
        description: "Simulates hardware nodes monitoring laboratory sound metrics and classroom ambient light feeds, syncing directly with a real-time web interface.",
        techStack: ["IoT Firmware mock", "Express Gateway", "Relational Loggers", "D3.js gauges"],
        findings: "Demonstrates micro-orchestration efficiency with continuous data syncing over a localized campus network.",
        visualThumbnailUrl: "/src/assets/images/mits_005_iot_1781497186167.jpg"
      }
    ]
  },
  {
    code: "MITS 006",
    title: "Mobile Programming",
    description: "Asynchronous client architectures, mobile state caches, offline-first syncing schemas, responsive touch-target designs, and lightweight cross-platform compilation.",
    year: "Second Year",
    semester: "First Semester",
    rating: "—",
    projects: [
      {
        title: "ClassFlow Android Companion",
        description: "A gorgeous, responsive mobile application for Android. Provides academic vocabulary tests, syncs grades records, and allows offline quiz submissions.",
        techStack: ["React Native", "Tailwind CSS Mobile", "SQLite Local Engine", "JSON Sync protocol"],
        findings: "Enables students to continue testing offline; exams are uploaded immediately once a wifi signal is restored.",
        visualThumbnailUrl: "/src/assets/images/code_knights_1781159490432.png"
      }
    ]
  },
  // SECOND YEAR: Second Semester
  {
    code: "MIT 011A",
    title: "Capstone I",
    description: "Comprehensive software prototype design, requirements gathering phase, secure database schema planning, UML architecture mapping, and proof-of-concept testing.",
    year: "Second Year",
    semester: "Second Semester",
    rating: "—",
    projects: [
      {
        title: "ClassFlow: Unified LMS & AST Syntax Diagnostic Suite",
        description: "Capstone Phase I focusing on backend API security foundations, database structural definitions (Firebase), and Luau syntax compilation trees.",
        techStack: ["Express API Gateway", "Firebase Firestore", "Roblox AST Parser", "React Board"],
        findings: "Validated primary schema structure and Rojo format script compiler mechanics during departmental peer previews.",
        visualThumbnailUrl: "/src/assets/images/classflow_dash_1781159509505.png"
      }
    ]
  },
  // SECOND YEAR: Summer
  {
    code: "MIT 011B",
    title: "Capstone II",
    description: "Polishing systems functionalities, final deployment strategies, data-collection campaigns to test user acquisition, and oral research defense preparations.",
    year: "Second Year",
    semester: "Summer",
    rating: "—",
    projects: [
      {
        title: "ClassFlow: Immersive Roblox HCDC Meta-Campus & ESP Engine",
        description: "The full, high-fidelity deployment: Combining a 3D simulated HCDC meta-campus, localized syncing nodes, and specialized vocabulary modules.",
        techStack: ["Roblox Multiplayer Engine", "Luau Server Sync", "Node.js Cloud Run Proxy", "Firebase Core Dashboard"],
        findings: "Successfully tested in school computer labs, increasing language retention levels of IT students by 42% on average.",
        visualThumbnailUrl: "/src/assets/images/hcdc_odyssey_1781159471306.png"
      }
    ]
  }
];

export function calculateCumulativeGPA(): { scoreString: string; scoreNum: number; takenCount: number; totalCount: number } {
  const gradedSubjects = MSIT_SUBJECTS.filter(s => s.rating && s.rating !== "—" && s.rating !== "");
  const totalCount = MSIT_SUBJECTS.length;
  const takenCount = gradedSubjects.length;

  if (takenCount === 0) {
    return { scoreString: "4.00", scoreNum: 4.00, takenCount: 0, totalCount };
  }

  // Philippine college scale translation:
  // 1.0 -> 4.0 GPA
  // 1.1 -> 3.9 GPA
  // 1.2 -> 3.8 GPA
  // and so on.
  // Formula: GPA = 4.0 - (Rating - 1.0)
  let totalPoints = 0;
  gradedSubjects.forEach(s => {
    const rate = parseFloat(s.rating);
    if (!isNaN(rate)) {
      totalPoints += (4.0 - (rate - 1.0));
    }
  });

  const avg = totalPoints / takenCount;
  return {
    scoreString: avg.toFixed(2),
    scoreNum: parseFloat(avg.toFixed(2)),
    takenCount,
    totalCount
  };
}



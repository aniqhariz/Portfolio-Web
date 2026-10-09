import {
  SectionData,
  SkillCategory,
  ToolItem,
  ProjectItem,
  ExperienceItem,
  EducationItem,
  CompetitionItem,
  AchievementItem,
  ContactInfo,
} from '@/types/portfolio';

export const portfolioSections: SectionData[] = [
  {
    id: 'about',
    index: 0,
    number: '',
    label: 'ABOUT ME',
    headline: 'Where Curiosity Meets Code and Thoughtful Design.',
    subheadline:  'Informatics Student at Gunadarma University',
    description:
      'Hi my name is Aniq Hariz Afief, i am an Informatics student with a curiosity for technology and a passion for creating things that feel different. I enjoy exploring the intersection of code, design, and digital experiences.',
    metadata: [],
    modalActionLabel: 'Read More About Me',
  },
  {
    id: 'skills',
    index: 1,
    number: '',
    label: 'SKILLS',
    headline: 'Balancing Functionality with Thoughtful Design.',
    subheadline: 'Code & Visual Craft',
    description:
      'I enjoy working across code and design, combining technical problem-solving with a strong interest in visual details. For me, good work is not just about making things look right, but making them work right.',
    metadata: [],
    modalActionLabel: 'View My Skills & Tool',
  },
  {
    id: 'works',
    index: 2,
    number: '',
    label: 'SELECTED WORKS',
    headline: 'Turning Ideas into Functional Digital Experiences.',
    subheadline: 'Projects & Explorations',
    description:
      'Every project starts with an idea, but what matters is how it takes shape. Here are some of the projects I have worked on, from web experiences to interface design.',
    metadata: [],
    modalActionLabel: 'Explore Selected Works',
  },
  {
    id: 'experiments',
    index: 3,
    number: '',
    label: 'EXPERIENCE',
    headline: 'Learning, Experimenting, and Building Through Practice.',
    subheadline: 'Journey & Practice',
    description:
      'My journey so far has been shaped by learning, experimenting, and building things through practice. As an Informatics student, I continue to develop my skills through personal projects, academic work, and collaborative experiences.',
    metadata: [],
    modalActionLabel: 'View My Journey',
  },
  {
    id: 'contact',
    index: 4,
    number: '',
    label: 'CONTACT',
    headline: 'Good Ideas Often Start with a Conversation.',
    subheadline: 'Let’s Connect',
    description:
      'Whether you want to collaborate, discuss a project, or simply connect, I am always open to meeting people who enjoy creating meaningful things. Feel free to reach out.',
    metadata: [],
    modalActionLabel: 'Get in Touch with Me',
  },
];

export const aboutDetails = {
  narrative: [
    'I am an Informatics student with a curiosity for technology and a passion for creating things that feel different. I enjoy exploring the intersection of code, design, and digital experiences.',
    'I am interested in web development, UI/UX design, and interactive experiences. I love experimenting with ideas and building things that balance functionality with thoughtful design.',
    'Outside of coding, I spend my time listening to music, discovering new artists, playing video games, and getting lost in books. These interests inspire my creativity and shape the way I see the world.',
  ],
  principles: [
    {
      title: 'Curiosity Over Comfort',
      desc: 'Embracing new challenges, learning from scratch, and exploring what lies beyond the familiar.',
    },
    {
      title: 'Stay True to My Taste',
      desc: 'Building my own perspective instead of following every trend, both in what I create and what I love.',
    },
    {
      title: 'Progress at My Own Pace',
      desc: 'Growing through mistakes and experiences without measuring my journey against someone else’s.',
    },
    {
      title: 'Create, Not Just Consume',
      desc: 'Turning the things that inspire me into something of my own, with purpose and identity.',
    },
  ],
};

export const proficientTools: ToolItem[] = [
  { id: 'python', name: 'Python' },
  { id: 'golang', name: 'Go (Golang)' },
  { id: 'java', name: 'Java' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'react', name: 'React' },
  { id: 'nextjs', name: 'Next.js' },
  { id: 'tailwind', name: 'Tailwind CSS' },
  { id: 'html5', name: 'HTML5' },
  { id: 'css3', name: 'CSS3' },
  { id: 'figma', name: 'Figma' },
  { id: 'git', name: 'Git' },
  { id: 'github', name: 'GitHub' },
  { id: 'vscode', name: 'VS Code' },
];

export const skillsData: SkillCategory[] = [
  {
    title: 'Web Development',
    description: 'Building clean, responsive, and functional web experiences',
    skills: [
      { name: 'HTML5 & Modern CSS / Tailwind CSS', notes: 'Responsive layouts, clean styling, subtle motion' },
      { name: 'JavaScript & TypeScript', notes: 'Modern ECMAScript, structured component logic' },
      { name: 'React & Next.js', notes: 'Component-driven architecture, state management' },
      { name: 'Interactive Web & 3D Elements', notes: 'Three.js, WebGL integration, Web Audio API' },
      { name: 'Git & Version Control', notes: 'Branching, collaboration, clean commit workflows' },
    ],
  },
  {
    title: 'UI/UX Design',
    description: 'Designing intuitive, user-centered digital interfaces',
    skills: [
      { name: 'Interface Design & Prototyping (Figma)', notes: 'Wireframing, interactive flows, layout mockups' },
      { name: 'Visual Hierarchy & Typography', notes: 'Pacing, whitespace, accessible reading contrast' },
      { name: 'Design Systems & UI Components', notes: 'Consistent reusable elements, design tokens' },
      { name: 'Interaction & Micro-interactions', notes: 'Thoughtful hover states, feedback, and transitions' },
    ],
  },
  {
    title: 'Graphic Design & Creative Exploration',
    description: 'Crafting visual assets, digital graphics, and creative ideas',
    skills: [
      { name: 'Visual Layouts & Composition', notes: 'Editorial grids, poster and screen layouts' },
      { name: 'Digital Asset Preparation', notes: 'Icons, vector illustrations, web assets' },
      { name: 'Creative Experimentation', notes: 'Testing new tools, aesthetic moods, color palettes' },
      { name: 'Learning & Adapting', notes: 'Constantly exploring better ways to bring ideas to life' },
    ],
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: 'project-wayin',
    title: 'Wayin',
    tagline: 'Accessible Navigation & Map for People with Disabilities',
    category: 'Accessibility & Interactive Mapping',
    year: '2026',
    link: 'https://wayinapp.vercel.app/',
    description:
      'An accessible interactive digital mapping platform designed specifically for people with disabilities. Built as our competitive solution for the UPNVJ Hackathon under the theme "Exploration, Empathy & Social Innovation".',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Map APIs', 'Accessible UI (a11y)'],
    highlights: [
      'Interactive mapping platform built for people with disabilities and mobility needs',
      'Developed as our hackathon project for UPNVJ (Exploration, Empathy & Social Innovation)',
      'Emphasizes empathetic, inclusive navigation and community accessibility awareness',
    ],
  },
  {
    id: 'project-circlo',
    title: 'Circlo',
    tagline: 'Curated Marketplace Platform for Preloved Goods',
    category: 'E-Commerce & Marketplace',
    year: '2026',
    link: 'https://circlo-1m7.pages.dev/',
    description:
      'A curated peer-to-peer marketplace platform for buying and selling preloved items, fostering circular commerce and sustainable lifestyle choices through a clean digital shopping experience.',
    technologies: ['React', 'Tailwind CSS', 'Cloudflare Pages', 'TypeScript', 'E-Commerce UX'],
    highlights: [
      'Specialized marketplace interface for exploring and trading curated preloved goods',
      'Promotes sustainable shopping habits and circular economy principles',
      'Intuitive product catalog, filtering, and seamless modern commerce layout',
    ],
  },
  {
    id: 'project-sevenpm',
    title: 'Sevenpm',
    tagline: 'Creative Digital Web Agency Portfolio',
    category: 'Agency Portfolio & Collaborative Studio',
    year: '2026',
    link: 'https://sevenpm.my.id',
    description:
      'The official portfolio website for our creative digital agency co-founded with 4 teammates, showcasing our collective work in custom web development, UI/UX design, and creative direction.',
    technologies: ['Web Development', 'UI/UX Design', 'Creative Direction', 'Team Collaboration'],
    highlights: [
      'Agency studio portfolio co-founded and built alongside 4 close teammates',
      'Showcases client digital solutions, bespoke creative web experiences, and case studies',
      'Focuses on strong visual identity, responsive typography, and tactile digital craftsmanship',
    ],
  },
];

export const educationData: EducationItem[] = [
  {
    id: 'edu-1',
    institution: 'Gunadarma University',
    degree: 'Undergraduate Degree in Informatics (Computer Science)',
    period: '2024 – Present',
    description:
      'Focusing on software development, web engineering, and core computer science fundamentals. Bridging academic principles with practical, hands-on development in modern frontend engineering and interactive user experiences.',
    focus: [
      'Core Computer Science',
      'Web Development & Modern UI',
      'Software Engineering Principles',
      'Human-Computer Interaction',
    ],
  },
];

export const competitionsData: CompetitionItem[] = [
  {
    id: 'comp-1',
    title: 'National Mini Competition UI/UX Series',
    organizer: 'GDGoC Gunadarma University',
    date: '2025',
    role: 'UI/UX Designer',
    projectName: '2nd Place Winner',
    description:
      'Competed in a national-level UI/UX design challenge hosted by GDGoC Gunadarma University, designing an intuitive user journey and interactive prototype under competitive criteria.',
  },
  {
    id: 'comp-2',
    title: 'UPNVJ Hackathon',
    organizer: 'UPN "Veteran" Jakarta',
    date: '2026',
    role: 'Hackathon Participant',
    projectName: 'Theme: Exploration, Empathy & Social Innovation',
    description:
      'Collaborated in an intensive hackathon centered on "Exploration, Empathy & Social Innovation", developing a technology-driven digital solution addressing community challenges through empathetic, human-centered design and rapid prototyping.',
  },
];

export const achievementsData: AchievementItem[] = [
  {
    id: 'achieve-1',
    title: '2nd Place Winner — National Mini Competition UI/UX Series',
    issuer: 'GDGoC Gunadarma University',
    date: '2025',
    description:
      'Awarded 2nd place in the national UI/UX competition series hosted by Google Developer Groups on Campus (GDGoC) Gunadarma University, recognized for user-centered research, intuitive interface architecture, and high-fidelity prototype design.',
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    title: 'Informatics Degree & Academic Foundations',
    role: 'Undergraduate Student',
    period: 'Ongoing',
    context: 'University Studies',
    description:
      'Studying core computer science and informatics principles, data structures, algorithms, and software development fundamentals while applying theory to hands-on projects.',
    highlights: [
      'Building strong foundational knowledge in programming logic and software concepts',
      'Applying academic principles directly into practical personal web projects',
    ],
  },
  {
    id: 'exp-2',
    title: 'Personal Projects & Creative Practice',
    role: 'Self-Directed Developer & Designer',
    period: '2023 - Present',
    context: 'Independent Explorations',
    description:
      'Designing and developing interactive web applications, experimenting with 3D on the web, modern CSS, and component architectures to turn ideas into functional experiences.',
    highlights: [
      'Created interactive web experiences blending code, design, and audio',
      'Consistently learning new frontend tooling, frameworks, and design methods',
    ],
  },
  {
    id: 'exp-3',
    title: 'Collaborative Academic Projects',
    role: 'Frontend & UI Contributor',
    period: '2023 - Present',
    context: 'Coursework & Team Challenges',
    description:
      'Collaborating with peers on university group projects, coordinating code with Git, and translating user needs into clean, functional digital interfaces.',
    highlights: [
      'Practiced team collaboration, code reviews, and Git version control',
      'Balanced technical constraints with thoughtful interface design in group settings',
    ],
  },
  {
    id: 'exp-4',
    title: 'Continuous Learning & Self-Study',
    role: 'Lifelong Learner',
    period: 'Always Ongoing',
    context: 'Personal Curiosity',
    description:
      'Deepening skills in UI/UX design tools, exploring new frontend libraries, reading design literature, and drawing creative inspiration from music, gaming, and books.',
    highlights: [
      'Exploring the intersection of technology, aesthetic craft, and user experience',
      'Constantly testing new ideas and finding better ways to build meaningful things',
    ],
  },
];

export const contactData: ContactInfo = {
  email: 'info@harizafief.xyz',
  availability: 'Open for projects, collaborations, or simply connecting',
  location: 'Indonesia · Open to remote opportunities',
  note: 'Good ideas often start with a conversation. Whether you want to collaborate, discuss a project, or simply connect, feel free to reach out.',
  socials: [
    { label: 'GitHub', url: 'https://github.com/aniqhariz', handle: '@aniqhariz' },
    { label: 'Instagram', url: 'https://instagram.com/harizafief_', handle: '@harizafief_' },
    { label: 'Discord', url: 'https://discord.com/users/598109305853444117', handle: 'rixzeruuuu' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@rixzeruuuu', handle: '@rixzeruuuu' },
  ],
};

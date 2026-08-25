export interface TimelineEntry {
  label: string;
  text: string;
  now?: boolean;
}

export interface ArchNode {
  title: string;
  sub: string;
  dark?: boolean;
}

export interface Screenshot {
  src: string;
  alt: string;
  dark?: boolean;
}

export interface CaseStudy {
  slug: string;
  name: string;
  oneLiner: string;
  meta: { label: string; value: string }[];
  liveUrl?: string;
  liveLabel?: string;
  screenshots: Screenshot[];
  problem: string;
  story: string;
  timeline: TimelineEntry[];
  architecture: ArchNode[];
  tools: string[];
  accent: 'mint' | 'coral' | 'lavender';
}

// Order = site order (matches lib/projects.ts).
export const caseStudies: CaseStudy[] = [
  {
    slug: 'persono',
    name: 'Persono',
    oneLiner:
      'An AI journaling and self-development platform that surfaces patterns in how you think and live — designed and built end to end, web and native iOS.',
    meta: [
      { label: 'TIMELINE', value: 'Oct 2025 — now' },
      { label: 'COMMITS', value: '700+' },
      { label: 'PLATFORMS', value: 'Web + iOS' },
      { label: 'STATUS', value: 'Live beta' },
    ],
    liveUrl: 'https://www.persono.app',
    liveLabel: 'persono.app',
    screenshots: [
      { src: '/work/persono/landing.jpg', alt: 'Persono web landing page' },
      {
        src: '/work/persono/mobile-today.jpg',
        alt: 'Persono iOS app home screen',
        dark: true,
      },
    ],
    problem:
      'Journaling apps capture what you write and do nothing with it. The patterns — what drains you, what repeats, what actually moved you forward — stay buried in your own archive.',
    story:
      'Persono pairs a fast, private journal with an AI layer that reads across entries — spotting recurring themes, tracking habits and goals, and turning reflection into a daily practice. Built solo from first commit to live beta, then extended to a native iOS app with a home-screen widget.',
    timeline: [
      {
        label: 'OCT 2025',
        text: 'First commit. Core journal, dashboard, Supabase auth.',
      },
      {
        label: 'OCT 21, 2025',
        text: 'Beta QA complete, staging deployed to Vercel.',
      },
      {
        label: 'SPRING 2026',
        text: 'Security hardening, invite-gated beta, admin dashboard.',
      },
      {
        label: 'JUL 2026',
        text: 'Native iOS app (Expo), production DB migrations.',
      },
      {
        label: 'NOW',
        text: 'Live beta at persono.app — 700+ commits.',
        now: true,
      },
    ],
    architecture: [
      { title: 'React 18 SPA', sub: 'Vite · Tailwind · Zustand' },
      { title: 'Vercel serverless', sub: 'API routes · edge deploys' },
      { title: 'Supabase', sub: 'Postgres · Auth · RLS' },
      { title: 'n8n workflows', sub: 'AI orchestration' },
      { title: 'Claude API', sub: 'insights · patterns', dark: true },
    ],
    tools: [
      'REACT 18',
      'VITE',
      'TAILWIND',
      'SUPABASE',
      'VERCEL',
      'N8N',
      'CLAUDE API',
      'EXPO / iOS',
    ],
    accent: 'mint',
  },
  {
    slug: 'runit',
    name: 'RunIt',
    oneLiner:
      'Turn any run-of-show document into a living schedule on your phone — photograph the doc, and every block, duty, and alert is built for you.',
    meta: [
      { label: 'TIMELINE', value: 'Aug 2026' },
      { label: 'V1 SHIPPED IN', value: '4 days' },
      { label: 'PLATFORMS', value: 'iPhone + Android' },
      { label: 'STATUS', value: 'TestFlight pipeline' },
    ],
    screenshots: [
      {
        src: '/work/runit/onboarding.jpg',
        alt: 'RunIt account creation screen',
      },
    ],
    problem:
      "Events run on crumpled run-of-show printouts. When the schedule slips — and it always slips — everyone's copy is instantly wrong, and nobody knows who owns what.",
    story:
      'Photograph the document (or answer a guided survey) and Claude builds the schedule: timed blocks, duties attached to names, alerts before each block. Show mode puts the current block front and center with "running late?" buttons that push everything back and reschedule alerts. Say a change like you\'d say it to your stage manager — "push everything after dinner back 15" — and the AI applies it in place. From first commit to release-ready v1 in four days, then grew accounts, crew chat, and guest lists in the week after.',
    timeline: [
      {
        label: 'AUG 19, 2026',
        text: 'Core app: AI document scan, guided survey, show mode, exports.',
      },
      {
        label: 'AUG 19, 2026',
        text: 'RunIt Cloud backend, AI live edits, TestFlight pipeline + CI.',
      },
      {
        label: 'AUG 20–21',
        text: 'Postgres on Vercel, crew invites, no-account web viewer.',
      },
      {
        label: 'AUG 22',
        text: 'Security audit; owner-only writes, entitlements.',
      },
      {
        label: 'AUG 23',
        text: 'Accounts, check-in, DMs, guest lists, password reset.',
        now: true,
      },
    ],
    architecture: [
      { title: 'React Native app', sub: 'Expo · TypeScript' },
      { title: 'RunIt Cloud', sub: 'Node · Express' },
      { title: 'Postgres', sub: 'Neon · versioned sync' },
      {
        title: 'Claude API',
        sub: 'Sonnet 5 gen · Haiku 4.5 edits',
        dark: true,
      },
    ],
    tools: [
      'REACT NATIVE',
      'EXPO',
      'TYPESCRIPT',
      'NODE',
      'POSTGRES',
      'CLAUDE API',
      'ZOD',
      'EAS / TESTFLIGHT',
    ],
    accent: 'coral',
  },
  {
    slug: 'cut-order-manager',
    name: 'Cut & Order Manager',
    oneLiner:
      'Order management, inventory tracking, and production scheduling built for cut-to-order and hardware shops — live as a working demo.',
    meta: [
      { label: 'BUILT', value: 'Aug 2025' },
      { label: 'TYPE', value: 'Working demo' },
      { label: 'DATA', value: 'Sample data mode' },
      { label: 'STATUS', value: 'Live' },
    ],
    liveUrl: 'https://demo1.solvdaisolutions.com',
    liveLabel: 'demo1.solvdaisolutions.com',
    screenshots: [
      {
        src: '/work/cut-order-manager/dashboard.jpg',
        alt: 'Cut & Order Manager dashboard',
      },
    ],
    problem:
      'Cutting jobs at a hardware store run on napkin math: pricing guessed per job, tickets that go missing, and stock levels discovered the hard way.',
    story:
      "A focused management system: create a cut job with pricing that accounts for labor and waste, track it through the shop, watch inventory as it depletes, and see the day's numbers at a glance. Deployed as a live sample-data demo anyone can click through.",
    timeline: [
      { label: 'AUG 2025', text: 'Built and deployed as a live demo.' },
      {
        label: 'AUG 2025',
        text: 'Wired into solvdaisolutions.com as a featured demo.',
      },
      {
        label: '2026',
        text: 'Folded into the Solvd portfolio as a case study.',
        now: true,
      },
    ],
    architecture: [
      { title: 'React SPA', sub: 'demo mode · sample data' },
      { title: 'Vercel', sub: 'live at demo1', dark: true },
    ],
    tools: ['REACT', 'VERCEL', 'DEMO MODE'],
    accent: 'lavender',
  },
  {
    slug: 'pet-bio-generator',
    name: 'Pet Bio Generator',
    oneLiner:
      'Generates adoption-ready pet bios from photos and a few details — for shelters that need heartwarming copy fast.',
    meta: [
      { label: 'BUILT', value: 'Aug 2025' },
      { label: 'TYPE', value: 'Working demo' },
      { label: 'PANELS', value: '5-step flow' },
      { label: 'STATUS', value: 'Live' },
    ],
    liveUrl: 'https://instant-pet-bio-generator.vercel.app',
    liveLabel: 'instant-pet-bio-generator.vercel.app',
    screenshots: [
      {
        src: '/work/pet-bio-generator/form.jpg',
        alt: 'Pet Bio Generator intake form',
      },
    ],
    problem:
      "Writing a heartwarming adoption bio is harder than it looks — and at a shelter, the pets whose bios don't get written are the ones that wait longest.",
    story:
      "A five-panel flow: enter the pet's details, add photos, generate an adoption-focused bio, format it as a shareable card, export. The AI drafts; a human approves — the review step is part of the flow, not an afterthought.",
    timeline: [
      { label: 'AUG 2025', text: 'Built and deployed.' },
      {
        label: '2026',
        text: 'Folded into the Solvd portfolio as a case study.',
        now: true,
      },
    ],
    architecture: [
      { title: 'React app', sub: '5-panel flow' },
      { title: 'AI bio drafting', sub: 'photo + details in' },
      { title: 'Vercel', sub: 'live demo', dark: true },
    ],
    tools: ['REACT', 'VERCEL', 'AI DRAFTING'],
    accent: 'mint',
  },
  {
    slug: 'resume-writing-agent',
    name: 'AI Resume Writing Agent',
    oneLiner:
      'A Microsoft 365 Copilot agent that matches a resume against open roles and rewrites it around the keywords that actually get past the screen.',
    meta: [
      { label: 'BUILT', value: 'Apr 2026' },
      { label: 'PLATFORM', value: 'Microsoft 365 Copilot' },
      { label: 'REACH', value: 'In use org-wide' },
      { label: 'TYPE', value: 'Custom agent' },
    ],
    screenshots: [],
    problem:
      "Every job posting wants a differently-tuned resume, and keyword screens reject good candidates whose wording doesn't match. Tailoring by hand for every application doesn't scale.",
    story:
      'The agent compares a resume against open postings, surfaces the top three roles the candidate is genuinely qualified for, and mines postings for the same title to find the keywords and phrases that recur. It asks follow-up questions to personalize toward the target role, then writes the resume into a set template. Built with Claude and Microsoft Copilot; shared with colleagues and leadership, now in active use across the organization.',
    timeline: [
      { label: 'APR 2026', text: 'Built as a custom M365 Copilot agent.' },
      { label: 'APR 2026', text: 'Shared with colleagues and leadership.' },
      {
        label: 'NOW',
        text: 'In active use across the organization.',
        now: true,
      },
    ],
    architecture: [
      { title: 'M365 Copilot agent', sub: 'custom instructions' },
      {
        title: 'Job-posting analysis',
        sub: 'top-3 fit · keyword mining',
      },
      {
        title: 'Templated resume output',
        sub: 'follow-up Q&A',
        dark: true,
      },
    ],
    tools: ['M365 COPILOT', 'CUSTOM AGENT', 'CLAUDE', 'TEMPLATES'],
    accent: 'coral',
  },
  {
    slug: 'life-imitates-thought',
    name: 'Life Imitates Thought',
    oneLiner:
      "A city-wide QR scavenger hunt for mindset shifts — scan a code on a bench or a wall, get a reframe, and track which ones you've found.",
    meta: [
      { label: 'LAUNCHED', value: 'May 2026' },
      { label: 'TYPE', value: 'Side quest' },
      { label: 'MECHANIC', value: 'QR codes in the wild' },
      { label: 'STATUS', value: 'Live' },
    ],
    liveUrl: 'https://lifeimitatesthought.quest',
    liveLabel: 'lifeimitatesthought.quest',
    screenshots: [
      {
        src: '/work/life-imitates-thought/home.jpg',
        alt: 'Life Imitates Thought homepage',
        dark: true,
      },
    ],
    problem:
      'Paradigm-shifting ideas mostly reach people who already went looking for them. Everyone else walks right past.',
    story:
      'QR codes posted around the city — benches, walls, street corners. Scanning one reveals a single idea: a mindset shift, a reframe, a piece of encouragement, a practical step. An account tracks which "nuggets" you\'ve found, the community votes on submitted shifts, and a leaderboard keeps the side quest going. Life imitates thought: what we hold in our minds shapes what we build in the world.',
    timeline: [
      { label: 'MAY 2026', text: 'Domain registered, site launched.' },
      { label: '2026', text: 'Voting and leaderboard live.' },
      { label: 'NOW', text: 'Codes in the wild, quest ongoing.', now: true },
    ],
    architecture: [
      { title: 'QR codes in the wild', sub: 'benches · walls · corners' },
      { title: 'Next.js app', sub: 'accounts · tracking' },
      { title: 'Vote + leaderboard', sub: 'community', dark: true },
    ],
    tools: ['NEXT.JS', 'VERCEL', 'QR CODES'],
    accent: 'lavender',
  },
  {
    slug: 'solvd-ai-solutions-site',
    name: 'This Website',
    oneLiner:
      "The site you're reading right now — consulting pitch and living portfolio, built end to end with Claude Code, animation and all.",
    meta: [
      { label: 'FIRST DEPLOY', value: 'Aug 2025' },
      { label: 'REBUILT', value: 'Aug 2026' },
      { label: 'STACK', value: 'Next.js on Vercel' },
      { label: 'STATUS', value: "You're on it" },
    ],
    liveUrl: 'https://www.solvdaisolutions.com',
    liveLabel: 'solvdaisolutions.com',
    screenshots: [],
    problem:
      "A consultancy's site has to be two things at once: a clear pitch for the services, and living proof the person behind it actually ships.",
    story:
      'Version one shipped in Aug 2025. In Aug 2026 it was rebuilt end to end with Claude Code: real services content, this portfolio and its case-study system, a year-old deployment blocker diagnosed and fixed, a site-wide invisible-navigation bug found in the CSS and repaired, and finally this Tangram × Soft redesign — whose hero breathes with the actual processing animation from Persono, checkmarks and all.',
    timeline: [
      { label: 'AUG 2025', text: 'First production deploy.' },
      {
        label: 'AUG 24, 2026',
        text: 'Services + portfolio shipped; deploys unblocked (Next 15.5.23).',
      },
      {
        label: 'AUG 24, 2026',
        text: 'Site-wide nav CSS bug found and fixed.',
      },
      {
        label: 'NOW',
        text: "Tangram × Soft redesign — the page you're on.",
        now: true,
      },
    ],
    architecture: [
      { title: 'Next.js Pages Router', sub: 'React 19 · TS' },
      { title: 'Hand-tuned CSS', sub: 'no framework generator' },
      { title: 'Vercel', sub: 'solvdaisolutions.com', dark: true },
    ],
    tools: ['NEXT.JS 15', 'TYPESCRIPT', 'JEST / RTL', 'VERCEL', 'CLAUDE CODE'],
    accent: 'mint',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.slug === slug);
}

export function getNextCaseStudy(slug: string): CaseStudy {
  const index = caseStudies.findIndex(cs => cs.slug === slug);
  const nextIndex = (index + 1) % caseStudies.length;
  return caseStudies[nextIndex];
}

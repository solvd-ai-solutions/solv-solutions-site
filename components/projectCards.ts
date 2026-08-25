import type { ProjectCardData } from './ProjectCard';

// Single source of truth for every project's card content — status,
// statusColor, description, tags, headerBg, motif (and initialLetter where
// relevant) — keyed by slug.
//
// Two grids render project cards: the homepage teaser
// (components/home/WorkGrid.tsx, 4 curated slugs in the mockup's own order)
// and the full /work index (pages/work/index.tsx, all 7 in site order). Both
// import PROJECT_CARDS/getProjectCard and supply their OWN slug order —
// neither derives its order from the other, and neither derives it from
// lib/projects.ts's `featured` flag. A naive `.filter(p => p.featured)` over
// site order would silently swap Life Imitates Thought and Cut & Order
// Manager on the homepage (site order interleaves them with non-featured
// projects), which is exactly the kind of divergence this module exists to
// prevent — the content is shared, the order is each consumer's choice.
export const PROJECT_CARDS: Record<string, ProjectCardData> = {
  persono: {
    slug: 'persono',
    name: 'Persono',
    status: '2025 — now',
    statusColor: '#2aa08f',
    description:
      'AI journaling & self-development platform — web + native iOS, 700+ commits and counting.',
    tags: ['PRODUCT', 'CLAUDE API'],
    headerBg: '#2aa08f',
    motif: 'persono',
  },
  runit: {
    slug: 'runit',
    name: 'RunIt',
    status: '4-day ship',
    statusColor: '#ef6a4b',
    description:
      'Photograph a run-of-show document, get a live event schedule on your phone — iPhone & Android.',
    tags: ['iOS + ANDROID', 'AI SCHEDULING'],
    headerBg: '#ef6a4b',
    motif: 'runit',
  },
  'cut-order-manager': {
    slug: 'cut-order-manager',
    name: 'Cut & Order Manager',
    status: 'live demo',
    statusColor: '#4a443b',
    description:
      'Order management, inventory, and production scheduling built for cut-to-order and hardware shops.',
    tags: ['LIVE DEMO', 'SMALL BUSINESS'],
    headerBg: '#1c1915',
    motif: 'com',
  },
  'pet-bio-generator': {
    slug: 'pet-bio-generator',
    name: 'Pet Bio Generator',
    status: 'live demo',
    statusColor: '#2aa08f',
    description:
      'Generates adoption-ready pet bios from photos and a few details — for shelters that need heartwarming copy fast.',
    tags: ['LIVE DEMO', 'AI DRAFTING'],
    headerBg: '#2aa08f',
    motif: 'initial',
    initialLetter: 'P',
  },
  'resume-writing-agent': {
    slug: 'resume-writing-agent',
    name: 'AI Resume Writing Agent',
    status: 'org-wide',
    statusColor: '#ef6a4b',
    description:
      'A Microsoft 365 Copilot agent that matches a resume to open roles and rewrites it around the keywords that get past the screen.',
    tags: ['M365 COPILOT', 'CUSTOM AGENT'],
    headerBg: '#ef6a4b',
    motif: 'initial',
    initialLetter: 'A',
  },
  'life-imitates-thought': {
    slug: 'life-imitates-thought',
    name: 'Life Imitates Thought',
    status: 'live',
    statusColor: '#8d6fe0',
    description:
      "A city-wide QR scavenger hunt for mindset shifts — scan a code, get a reframe, track what you've found.",
    tags: ['SIDE QUEST', 'NEXT.JS'],
    headerBg: '#8d6fe0',
    motif: 'lit',
  },
  'solvd-ai-solutions-site': {
    slug: 'solvd-ai-solutions-site',
    name: 'This Website',
    status: "you're on it",
    statusColor: '#2aa08f',
    description:
      "The site you're reading right now — consulting pitch and living portfolio, built end to end with Claude Code.",
    tags: ['NEXT.JS 15', 'CLAUDE CODE'],
    headerBg: '#2aa08f',
    motif: 'initial',
    initialLetter: 'T',
  },
};

export function getProjectCard(slug: string): ProjectCardData {
  const card = PROJECT_CARDS[slug];
  if (!card) {
    throw new Error(`getProjectCard: no card content for slug "${slug}"`);
  }
  return card;
}

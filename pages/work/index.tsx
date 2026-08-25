import Head from 'next/head';
import Link from 'next/link';
import { SiteNav } from '../../components/SiteNav';
import { SiteFooter } from '../../components/SiteFooter';
import {
  ProjectCard,
  type ProjectCardData,
} from '../../components/ProjectCard';

// All 7 projects, in site order (matches lib/projects.ts / lib/caseStudies.ts).
// The 4 with a bespoke mockup motif reuse it verbatim from
// components/home/WorkGrid.tsx's homepage teaser; the other 3 (pet-bio,
// resume-agent, this site) fall back to a simple accent header with their
// initial letter, per task-6-brief.md.
const CARDS: ProjectCardData[] = [
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
];

export default function WorkIndex() {
  return (
    <div className='ts-page'>
      <Head>
        <title>Work — Solvd AI Solutions</title>
        <meta
          name='description'
          content='Real AI apps built by Solvd AI Solutions — journaling tools, event schedulers, business demos, and more.'
        />
      </Head>

      <SiteNav />

      <div className='ts-section' style={{ paddingTop: 72, paddingBottom: 48 }}>
        <h1
          className='ts-display'
          style={{
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 64px)',
            letterSpacing: '-2px',
            margin: 0,
          }}
        >
          Real apps, really shipped.
        </h1>
        <p
          style={{
            fontSize: 19,
            lineHeight: 1.55,
            color: '#4a443b',
            maxWidth: 640,
            marginTop: 20,
          }}
        >
          Every project here is real, working software — not a hypothetical case
          study. Seven builds, from a solo AI journaling app to a four-day event
          scheduler.
        </p>
      </div>

      <div className='ts-section' style={{ paddingBottom: 96 }}>
        <div className='ts-grid-2'>
          {CARDS.map(card => (
            <ProjectCard key={card.slug} card={card} />
          ))}
        </div>
      </div>

      <div
        className='ts-section'
        style={{
          paddingTop: 48,
          paddingBottom: 96,
          borderTop: '3px solid #1c1915',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        <div className='ts-display' style={{ fontWeight: 800, fontSize: 28 }}>
          Want one built for you?
        </div>
        {/* Contrast-required pill: ink bg needs paper text even on hover,
            so an inline color here is the documented exception. */}
        <Link
          href='/#contact'
          style={{
            background: '#1c1915',
            color: '#f7f2e8',
            fontWeight: 600,
            fontSize: 16,
            padding: '14px 30px',
            borderRadius: 999,
            boxShadow: '5px 5px 0 #ef6a4b',
          }}
        >
          Start a project
        </Link>
      </div>

      <SiteFooter />
    </div>
  );
}

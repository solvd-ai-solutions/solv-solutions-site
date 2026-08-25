import Link from 'next/link';
import { ProjectCard, type ProjectCardData } from '../ProjectCard';

// Card copy and header motifs ported verbatim from
// docs/superpowers/specs/mockups/homepage.mockup.html. Rendering (the outer
// card shape, header motif dispatch, and body layout) lives in
// components/ProjectCard.tsx, shared with the full /work index.
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
];

export function WorkGrid() {
  return (
    <div
      id='work'
      className='ts-section'
      style={{ paddingTop: 96, paddingBottom: 140 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 56,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
          <div
            className='ts-display'
            style={{ fontWeight: 800, fontSize: 18, color: '#2aa08f' }}
          >
            02
          </div>
          <div
            className='ts-display'
            style={{ fontWeight: 800, fontSize: 46, letterSpacing: '-1.5px' }}
          >
            Real apps, really shipped.
          </div>
        </div>
        <Link
          href='/work'
          style={{
            fontWeight: 600,
            fontSize: 16,
            border: '3px solid #1c1915',
            borderRadius: 999,
            padding: '12px 26px',
            background: '#ffffff',
          }}
        >
          All 7 projects →
        </Link>
      </div>

      <div className='ts-grid-2'>
        {CARDS.map(card => (
          <ProjectCard key={card.slug} card={card} />
        ))}
      </div>
    </div>
  );
}

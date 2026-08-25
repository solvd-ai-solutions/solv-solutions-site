import Link from 'next/link';
import { projects } from '../../lib/projects';

type Motif = 'persono' | 'runit' | 'lit' | 'com';

interface CardContent {
  slug: string;
  name: string;
  status: string;
  statusColor: string;
  description: string;
  tags: [string, string];
  headerBg: string;
  motif: Motif;
}

// Card copy and header motifs ported verbatim from
// docs/superpowers/specs/mockups/homepage.mockup.html; the `slug` is used
// to look up each project's `caseHref` from lib/projects.ts so the card
// links stay wired to real case-study routes.
const CARDS: CardContent[] = [
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

function getCaseHref(slug: string): string {
  const project = projects.find(p => p.slug === slug);
  if (!project) {
    throw new Error(`WorkGrid: no project found for slug "${slug}"`);
  }
  return project.caseHref;
}

const tagStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.06em',
  border: '2px solid #1c1915',
  borderRadius: 999,
  padding: '5px 12px',
};

function PersonoMotif() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 36,
          width: 120,
          height: 120,
          border: '3px solid #f7f2e8',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 120,
          width: 120,
          height: 120,
          border: '3px solid #f7f2e8',
          borderRadius: '50%',
          opacity: 0.6,
        }}
      />
      <div
        className='ts-display'
        style={{
          position: 'absolute',
          top: 26,
          right: 48,
          fontWeight: 800,
          fontSize: 96,
          color: '#f7f2e8',
          opacity: 0.3,
        }}
      >
        P
      </div>
    </>
  );
}

function RunItMotif() {
  return (
    <>
      <svg
        style={{ position: 'absolute', top: 36, left: 40 }}
        width={110}
        height={104}
        viewBox='0 0 110 104'
        fill='none'
      >
        <path
          d='M14 8 L96 52 L14 96 Z'
          fill='#f7f2e8'
          stroke='#1c1915'
          strokeWidth={0}
          strokeLinejoin='round'
          opacity={0.85}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 52,
          left: 170,
          width: 54,
          height: 20,
          background: '#f7f2e8',
          borderRadius: 999,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 82,
          left: 170,
          width: 82,
          height: 20,
          background: '#f7f2e8',
          opacity: 0.7,
          borderRadius: 999,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 112,
          left: 170,
          width: 38,
          height: 20,
          background: '#f7f2e8',
          opacity: 0.45,
          borderRadius: 999,
        }}
      />
    </>
  );
}

function LifeImitatesThoughtMotif() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 28,
        left: 40,
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 26px)',
        gap: 9,
      }}
    >
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          style={{
            width: 26,
            height: 26,
            background: '#f7f2e8',
            opacity: i % 2 === 0 ? 1 : 0.35,
            borderRadius: 8,
          }}
        />
      ))}
    </div>
  );
}

function CutOrderManagerMotif() {
  const bars: Array<{ top: number; width: number; background: string }> = [
    { top: 36, width: 180, background: '#2aa08f' },
    { top: 66, width: 120, background: '#ef6a4b' },
    { top: 96, width: 150, background: '#8d6fe0' },
    { top: 126, width: 90, background: '#f7f2e8' },
  ];
  return (
    <>
      {bars.map(bar => (
        <div
          key={bar.top}
          style={{
            position: 'absolute',
            top: bar.top,
            left: 40,
            width: bar.width,
            height: 5,
            background: bar.background,
            borderRadius: 999,
          }}
        />
      ))}
    </>
  );
}

function CardHeaderMotif({ motif }: { motif: Motif }) {
  switch (motif) {
    case 'persono':
      return <PersonoMotif />;
    case 'runit':
      return <RunItMotif />;
    case 'lit':
      return <LifeImitatesThoughtMotif />;
    case 'com':
      return <CutOrderManagerMotif />;
  }
}

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
          <Link
            key={card.slug}
            href={getCaseHref(card.slug)}
            style={{
              border: '3px solid #1c1915',
              background: '#ffffff',
              borderRadius: 24,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                height: 180,
                background: card.headerBg,
                borderBottom: '3px solid #1c1915',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <CardHeaderMotif motif={card.motif} />
            </div>
            <div
              style={{
                padding: '28px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <div
                  className='ts-display'
                  style={{ fontWeight: 700, fontSize: 26 }}
                >
                  {card.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: card.statusColor,
                  }}
                >
                  {card.status}
                </div>
              </div>
              <div style={{ fontSize: 16, lineHeight: 1.55, color: '#4a443b' }}>
                {card.description}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {card.tags.map(tag => (
                  <span key={tag} style={tagStyle}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

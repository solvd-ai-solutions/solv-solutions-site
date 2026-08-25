import Link from 'next/link';
import { ProjectCard } from '../ProjectCard';
import { getProjectCard } from '../projectCards';

// The homepage teaser shows 4 curated projects in the mockup's own order
// (docs/superpowers/specs/mockups/homepage.mockup.html) — NOT site order.
// Card content itself lives in components/projectCards.ts, shared with the
// full /work index; this array only decides which 4 slugs appear here and
// in what order.
const HOMEPAGE_SLUGS = [
  'persono',
  'runit',
  'life-imitates-thought',
  'cut-order-manager',
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
          <h2
            className='ts-display'
            style={{
              fontWeight: 800,
              fontSize: 46,
              letterSpacing: '-1.5px',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Real apps, really shipped.
          </h2>
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
        {HOMEPAGE_SLUGS.map(slug => (
          <ProjectCard key={slug} card={getProjectCard(slug)} />
        ))}
      </div>
    </div>
  );
}

import Link from 'next/link';
import { projects } from '../lib/projects';

// Shared card shape for every "real apps, really shipped" grid on the site
// (the homepage teaser in components/home/WorkGrid.tsx, and the full /work
// index in pages/work/index.tsx). Extracted so the motif-header card markup
// exists exactly once — see task-6-brief.md.
export type Motif = 'persono' | 'runit' | 'lit' | 'com' | 'initial';

export interface ProjectCardData {
  slug: string;
  name: string;
  status: string;
  statusColor: string;
  description: string;
  tags: [string, string];
  headerBg: string;
  motif: Motif;
  // Required when motif === 'initial': the single letter drawn low-opacity
  // in the card header, e.g. "P" for Pet Bio Generator.
  initialLetter?: string;
}

// Looks up a project's real case-study route from lib/projects.ts so every
// card link stays wired to an actual page rather than a hardcoded guess.
export function getCaseHref(slug: string): string {
  const project = projects.find(p => p.slug === slug);
  if (!project) {
    throw new Error(`ProjectCard: no project found for slug "${slug}"`);
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

// Fallback header for projects that don't have a bespoke mockup motif: a
// single low-opacity initial letter, consistent with the "P" already
// hiding inside PersonoMotif above.
function InitialMotif({ letter }: { letter: string }) {
  return (
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
      {letter}
    </div>
  );
}

function CardHeaderMotif({
  motif,
  initialLetter,
}: {
  motif: Motif;
  initialLetter?: string;
}) {
  switch (motif) {
    case 'persono':
      return <PersonoMotif />;
    case 'runit':
      return <RunItMotif />;
    case 'lit':
      return <LifeImitatesThoughtMotif />;
    case 'com':
      return <CutOrderManagerMotif />;
    case 'initial':
      return <InitialMotif letter={initialLetter ?? '?'} />;
  }
}

export function ProjectCard({ card }: { card: ProjectCardData }) {
  return (
    <Link
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
        <CardHeaderMotif
          motif={card.motif}
          initialLetter={card.initialLetter}
        />
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
          <h3
            className='ts-display'
            style={{
              fontWeight: 700,
              fontSize: 26,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {card.name}
          </h3>
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
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {card.tags.map(tag => (
            <span key={tag} style={tagStyle}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

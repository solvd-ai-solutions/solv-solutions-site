import { useEffect, useRef } from 'react';

// Two nbsp characters, matching the mockup's `&nbsp;&nbsp;` separators
// exactly (as literal U+00A0 characters, not JSX-text entities, so the
// string is immune to prettier/JSX whitespace collapsing).
const NBSP = '  ';
const DOT = '●';

const TRACK_TEXT =
  `CUSTOM AI APPS${NBSP}${DOT}${NBSP}ADOPTION PLANS${NBSP}${DOT}${NBSP}` +
  `TEAM TRAINING${NBSP}${DOT}${NBSP}WORKFLOW DESIGN${NBSP}${DOT}${NBSP}` +
  `GOVERNANCE${NBSP}${DOT}${NBSP}SHIPPED IN WEEKS${NBSP}${DOT}${NBSP}`;

const runStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 21,
  color: '#f7f2e8',
  letterSpacing: '0.04em',
};

function TrackRun() {
  return (
    <div className='ts-display' style={runStyle}>
      {TRACK_TEXT}
    </div>
  );
}

// The words scroll on their own (`.ts-marquee-track`'s CSS animation); the
// black band beneath them wipes in left-to-right as the strip scrolls into
// view, sliding beneath the already-scrolling words.
export function MarqueeBand() {
  const bandRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const reveal = revealRef.current;
    if (!band || !reveal) return;

    const setClip = (prog: number) => {
      const clip = `inset(0 ${(1 - prog) * 100}% 0 0)`;
      reveal.style.clipPath = clip;
      reveal.style.setProperty('-webkit-clip-path', clip);
    };

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setClip(1);
      return;
    }

    const onScroll = () => {
      const rect = band.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const prog = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.45)));
      setClip(prog);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={bandRef}
      id='marquee-band'
      aria-hidden='true'
      style={{ position: 'relative', height: 58, overflow: 'hidden' }}
    >
      <div
        ref={revealRef}
        id='marquee-reveal'
        style={{
          position: 'absolute',
          inset: 0,
          background: '#1c1915',
          display: 'flex',
          alignItems: 'center',
          clipPath: 'inset(0 100% 0 0)',
          WebkitClipPath: 'inset(0 100% 0 0)',
        }}
      >
        <div className='ts-marquee-track'>
          <TrackRun />
          <TrackRun />
        </div>
      </div>
    </div>
  );
}

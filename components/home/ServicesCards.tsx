const cardStyle = (shadowColor: string): React.CSSProperties => ({
  border: '3px solid #1c1915',
  background: '#ffffff',
  borderRadius: 24,
  boxShadow: `10px 10px 0 ${shadowColor}`,
  padding: 36,
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

const titleStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 24,
  lineHeight: 1.15,
  margin: 0,
};

const bodyStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.6,
  color: '#4a443b',
};

// Rendered as a sibling of #hero-section, inside Hero's shared relative
// wrapper — see components/home/Hero.tsx for why.
export function ServicesCards() {
  return (
    <div
      id='services'
      className='ts-section'
      style={{ position: 'relative', paddingTop: 120, paddingBottom: 140 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 24,
          marginBottom: 56,
        }}
      >
        <div
          className='ts-display'
          style={{ fontWeight: 800, fontSize: 18, color: '#ef6a4b' }}
        >
          01
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
          What we do
        </h2>
      </div>

      <div className='ts-grid-3'>
        <div style={cardStyle('#2aa08f')}>
          <div
            style={{
              width: 64,
              height: 64,
              background: '#2aa08f',
              border: '3px solid #1c1915',
              borderRadius: '50%',
            }}
          />
          <h3 className='ts-display' style={titleStyle}>
            AI Enablement &amp; Training
          </h3>
          <div style={bodyStyle}>
            Adoption plans, hands-on training with your team&apos;s real
            documents, governance that fits on one page. Signature deliverable:
            the AI Operations Adoption Plan.
          </div>
        </div>

        <div style={cardStyle('#ef6a4b')}>
          <svg width={68} height={62} viewBox='0 0 68 62' fill='none'>
            <path
              d='M34 4 L64 58 L4 58 Z'
              fill='#ef6a4b'
              stroke='#1c1915'
              strokeWidth={3}
              strokeLinejoin='round'
            />
          </svg>
          <h3 className='ts-display' style={titleStyle}>
            Custom AI-Powered Tools
          </h3>
          <div style={bodyStyle}>
            Purpose-built apps, document generation systems, and instruction
            sets that keep AI output consistent with your voice — human review
            built in.
          </div>
        </div>

        <div style={cardStyle('#8d6fe0')}>
          <div
            style={{
              width: 60,
              height: 60,
              background: '#8d6fe0',
              border: '3px solid #1c1915',
              borderRadius: 16,
            }}
          />
          <h3 className='ts-display' style={titleStyle}>
            Custom Non-AI Digital Tools
          </h3>
          <div style={bodyStyle}>
            Invoicing systems, trackers, dashboards, and small web tools — plain
            logic where AI isn&apos;t the answer.
          </div>
        </div>
      </div>
    </div>
  );
}

const CONTACT_EMAIL = 'geoff@persono.app';

// Copied verbatim from components/ContactSection.tsx's "Get AI Quote"
// handler — this is the quote mailto, not the "Discuss a Project" one.
const QUOTE_MAILTO = `mailto:${CONTACT_EMAIL}?subject=AI Quote Request&body=Hi Geoff,%0D%0A%0D%0AI'm interested in getting an AI quote for my project.%0D%0A%0D%0AProject Description:%0D%0A%0D%0A%0D%0A%0D%0ABest regards,%0D%0A[Your Name]`;

export function ContactBand() {
  return (
    <div
      id='contact'
      className='ts-section'
      style={{ paddingTop: 24, paddingBottom: 120 }}
    >
      <div
        style={{
          background: '#1c1915',
          borderRadius: 40,
          padding: '80px 72px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -70,
            right: -50,
            width: 300,
            height: 300,
            background: '#2aa08f',
            opacity: 0.25,
            borderRadius: '50%',
          }}
        />
        <svg
          style={{
            position: 'absolute',
            bottom: -40,
            right: 200,
            opacity: 0.22,
          }}
          width={240}
          height={210}
          viewBox='0 0 240 210'
          fill='none'
        >
          <path
            d='M120 8 L232 202 L8 202 Z'
            fill='#ef6a4b'
            strokeLinejoin='round'
          />
        </svg>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
          <div
            className='ts-display'
            style={{ fontWeight: 800, fontSize: 18, color: '#8d6fe0' }}
          >
            03
          </div>
          <div
            className='ts-display'
            style={{
              fontWeight: 800,
              fontSize: 64,
              letterSpacing: '-2px',
              color: '#f7f2e8',
              lineHeight: 1.02,
            }}
          >
            Ready when you are.
          </div>
        </div>
        <div
          style={{
            fontSize: 19,
            color: '#b3aa9c',
            maxWidth: 560,
            lineHeight: 1.55,
          }}
        >
          Get a quote or talk through a project. Pricing and scope get worked
          out together — not on this page.
        </div>
        <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          <a
            href={QUOTE_MAILTO}
            style={{
              background: '#2aa08f',
              color: '#f7f2e8',
              fontWeight: 600,
              fontSize: 17,
              padding: '17px 36px',
              border: '3px solid #f7f2e8',
              borderRadius: 999,
              boxShadow: '7px 7px 0 #ef6a4b',
            }}
          >
            Get a quote
          </a>
          <span style={{ fontSize: 17, color: '#f7f2e8', fontWeight: 500 }}>
            {CONTACT_EMAIL}
          </span>
        </div>
        <div
          style={{
            borderTop: '1px solid #4a443b',
            paddingTop: 22,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 13,
            color: '#857c6d',
          }}
        >
          <span>© 2026 Solvd AI Solutions</span>
          <span>
            Custom AI apps &amp; adoption consulting for small business
          </span>
        </div>
      </div>
    </div>
  );
}

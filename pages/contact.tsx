import Head from 'next/head';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';

const CONTACT_EMAIL = 'geoff@persono.app';

const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Project inquiry&body=Hi Geoff,%0D%0A%0D%0AI'd like to talk about a project.%0D%0A%0D%0AProject Description:%0D%0A%0D%0A%0D%0A%0D%0ABest regards,%0D%0A[Your Name]`;

const steps: Array<{ label: string; text: string }> = [
  {
    label: '01',
    text: "We'll talk through what you're trying to build and whether it's a fit.",
  },
  {
    label: '02',
    text: "You'll get a simple plan — scope, timeline, and what it takes to ship it.",
  },
  {
    label: '03',
    text: 'We get to work, and you stay looped in the whole way — no black box.',
  },
];

export default function ContactPage() {
  return (
    <div className='ts-page'>
      <Head>
        <title>Contact — Solvd AI Solutions</title>
        <meta
          name='description'
          content="Get in touch about a custom AI app or AI adoption project — send a note and let's talk."
        />
      </Head>

      <SiteNav />

      <div className='ts-section' style={{ paddingTop: 72, paddingBottom: 64 }}>
        <h1
          className='ts-display'
          style={{
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 64px)',
            letterSpacing: '-2px',
            lineHeight: 1,
            margin: 0,
          }}
        >
          Let&apos;s build something.
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
          Have a project in mind? Send a note with what you&apos;re trying to
          build, and let&apos;s talk about scope and timeline together.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 20,
            alignItems: 'center',
            marginTop: 36,
          }}
        >
          {/* Contrast-required pill: ink-bordered coral bg needs paper text
              even on hover, so an inline color here is the documented
              exception (see ContactBand/SiteNav for the same pattern). */}
          <a
            href={CONTACT_MAILTO}
            style={{
              background: '#ef6a4b',
              color: '#f7f2e8',
              fontWeight: 600,
              fontSize: 17,
              padding: '17px 36px',
              border: '3px solid #1c1915',
              borderRadius: 999,
              boxShadow: '7px 7px 0 #1c1915',
            }}
          >
            Email {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div className='ts-section' style={{ paddingBottom: 96 }}>
        <h2
          className='ts-display'
          style={{
            fontWeight: 800,
            fontSize: 32,
            letterSpacing: '-1px',
            lineHeight: 1.5,
            margin: 0,
            marginBottom: 40,
          }}
        >
          What happens next
        </h2>
        <div className='ts-grid-3'>
          {steps.map(step => (
            <div
              key={step.label}
              style={{
                border: '3px solid #1c1915',
                background: '#ffffff',
                borderRadius: 24,
                boxShadow: '10px 10px 0 #2aa08f',
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div
                className='ts-display'
                style={{ fontWeight: 800, fontSize: 18, color: '#ef6a4b' }}
              >
                {step.label}
              </div>
              <div style={{ fontSize: 16, lineHeight: 1.6, color: '#4a443b' }}>
                {step.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

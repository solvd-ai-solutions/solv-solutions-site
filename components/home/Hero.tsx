import Link from 'next/link';
import type { MouseEvent } from 'react';
import { ReflectionField } from '../ReflectionField';
import { ServicesCards } from './ServicesCards';

// Mirrors SiteNav's route-aware contact-link handler: on a plain left-click,
// intercept the jump and smooth-scroll to #contact instead. Hero only ever
// renders on the homepage, so there's no route check or closeMenu to thread
// through — just the same click-intercept + scrollIntoView pattern.
function handleContactClick(e: MouseEvent<HTMLAnchorElement>) {
  const isPlainLeftClick =
    e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
  if (!isPlainLeftClick) return;

  e.preventDefault();
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}

// Hero + "What we do" share one reflection-field zone: the shapes drift past
// the hero's edge and dissolve downward via a vertical mask on the canvas
// itself — no clip line. ServicesCards renders as a sibling of #hero-section
// but INSIDE this same relative wrapper so the field's fade tail passes
// behind it (ported verbatim from docs/superpowers/specs/mockups/homepage.mockup.html).
export function Hero() {
  return (
    <div style={{ position: 'relative' }}>
      <ReflectionField height={1150} fadeTargetId='hero-section' />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 700,
          pointerEvents: 'none',
          background:
            'linear-gradient(90deg, rgba(247, 242, 232, 0.92) 0%, rgba(247, 242, 232, 0.5) 40%, rgba(247, 242, 232, 0) 62%)',
        }}
      />
      <div id='hero-section' style={{ position: 'relative' }}>
        <div
          className='ts-hero-grid ts-section'
          style={{
            position: 'relative',
            paddingTop: 84,
            paddingBottom: 120,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#ffffff',
                border: '3px solid #1c1915',
                borderRadius: 999,
                padding: '9px 20px',
                width: 'fit-content',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#2aa08f',
                }}
              />
              Custom AI, actually shipped
            </div>
            <h1
              className='ts-display'
              style={{
                fontWeight: 800,
                fontSize: 'clamp(44px, 8vw, 88px)',
                lineHeight: 0.98,
                letterSpacing: '-3px',
                margin: 0,
              }}
            >
              AI that earns its keep.
            </h1>
            <div
              style={{
                fontSize: 20,
                lineHeight: 1.55,
                maxWidth: 490,
                color: '#4a443b',
              }}
            >
              Custom AI apps and adoption consulting for small business —
              designed, built, and shipped by the person you actually talk to.
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <Link
                href='/work'
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
                See the work
              </Link>
              <Link
                href='/#contact'
                onClick={handleContactClick}
                style={{
                  background: '#ffffff',
                  color: '#1c1915',
                  fontWeight: 600,
                  fontSize: 17,
                  padding: '17px 36px',
                  border: '3px solid #1c1915',
                  borderRadius: 999,
                }}
              >
                Start a project
              </Link>
            </div>
          </div>

          {/* Tangram cluster, softened. Hidden below 768px (see
              .ts-hide-mobile in globals.css) — no inline `display` here so
              the class can actually control it. */}
          <div
            className='ts-hide-mobile'
            style={{ position: 'relative', height: 520 }}
          >
            <div
              style={{
                position: 'absolute',
                top: 20,
                right: 60,
                width: 220,
                height: 220,
                background: '#2aa08f',
                border: '3px solid #1c1915',
                borderRadius: 28,
                boxShadow: '10px 10px 0 #1c1915',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 130,
                right: 220,
                width: 200,
                height: 200,
                background: '#ef6a4b',
                border: '3px solid #1c1915',
                borderRadius: '50%',
                boxShadow: '10px 10px 0 #1c1915',
              }}
            />
            <svg
              style={{ position: 'absolute', top: 276, right: 30 }}
              width={256}
              height={222}
              viewBox='0 0 256 222'
              fill='none'
            >
              <path
                d='M128 10 L246 212 L10 212 Z'
                fill='#8d6fe0'
                stroke='#1c1915'
                strokeWidth={3}
                strokeLinejoin='round'
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                top: 40,
                right: 340,
                width: 130,
                height: 130,
                background: '#ffffff',
                border: '3px solid #1c1915',
                borderRadius: '999px 24px 24px 24px',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 330,
                right: 300,
                width: 150,
                height: 150,
                background: '#1c1915',
                borderRadius: 28,
              }}
            />
            <svg
              style={{ position: 'absolute', top: 356, right: 326 }}
              width={98}
              height={98}
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M4 13 L10 19 L21 5'
                stroke='#f7f2e8'
                strokeWidth={3.4}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      </div>

      <ServicesCards />
    </div>
  );
}

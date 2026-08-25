import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { SiteNav } from '../../components/SiteNav';
import { SiteFooter } from '../../components/SiteFooter';
import {
  caseStudies,
  getCaseStudy,
  getNextCaseStudy,
  type CaseStudy,
} from '../../lib/caseStudies';

const ACCENT_HEX: Record<CaseStudy['accent'], string> = {
  mint: '#2aa08f',
  coral: '#ef6a4b',
  lavender: '#8d6fe0',
};

const CONTACT_EMAIL = 'geoff@persono.app';

interface CaseStudyPageProps {
  study: CaseStudy;
  next: CaseStudy;
  index: number;
}

// Three static, paper-colored shapes echoing the ReflectionField vocabulary
// (a line, the logo check, a triangle) — used as the hero motif for
// case studies that ship without screenshots.
function NoScreenshotMotif() {
  return (
    <>
      <svg
        style={{ position: 'absolute', top: 64, left: 72 }}
        width={150}
        height={12}
        viewBox='0 0 150 12'
      >
        <line
          x1={2}
          y1={6}
          x2={148}
          y2={6}
          stroke='#f7f2e8'
          strokeWidth={4}
          strokeLinecap='round'
          opacity={0.85}
        />
      </svg>
      <svg
        style={{ position: 'absolute', top: 150, left: 300 }}
        width={54}
        height={54}
        viewBox='0 0 24 24'
        fill='none'
      >
        <path
          d='M4 13 L10 19 L21 5'
          stroke='#f7f2e8'
          strokeWidth={4.5}
          strokeLinecap='round'
          strokeLinejoin='round'
          opacity={0.85}
        />
      </svg>
      <svg
        style={{ position: 'absolute', top: 48, right: 140 }}
        width={100}
        height={88}
        viewBox='0 0 100 88'
        fill='none'
      >
        <path
          d='M50 6 L94 82 L6 82 Z'
          stroke='#f7f2e8'
          strokeWidth={4}
          strokeLinejoin='round'
          opacity={0.7}
        />
      </svg>
    </>
  );
}

export default function CaseStudyPage({
  study,
  next,
  index,
}: CaseStudyPageProps) {
  const accent = ACCENT_HEX[study.accent];
  const kicker = `WORK / ${String(index).padStart(2, '0')}`;

  return (
    <div className='ts-page'>
      <Head>
        <title>{`${study.name} — Work — Solvd AI Solutions`}</title>
        <meta name='description' content={study.oneLiner} />
      </Head>

      <SiteNav />

      {/* Breadcrumb bar (mockup's compact top row, minus the duplicate logo
          — SiteNav above already renders it). The coral color lives on this
          wrapping span, not the anchor, so `.ts-page a:hover` still governs
          the link itself. */}
      <div
        className='ts-section'
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          borderBottom: '3px solid #1c1915',
        }}
      >
        <span
          style={{
            color: '#ef6a4b',
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: '0.04em',
          }}
        >
          <Link href='/work'>← ALL WORK</Link>
        </span>
      </div>

      {/* Case hero */}
      <div
        className='ts-section'
        style={{
          paddingTop: 72,
          paddingBottom: 56,
          borderBottom: '3px solid #1c1915',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 260,
            height: 260,
            background: accent,
            borderRadius: '50%',
            opacity: 0.14,
          }}
        />
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: accent,
            marginBottom: 20,
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxWidth: 820,
            }}
          >
            <h1
              className='ts-display'
              style={{
                fontWeight: 800,
                fontSize: 'clamp(48px, 7vw, 84px)',
                lineHeight: 0.95,
                letterSpacing: '-2.5px',
                margin: 0,
              }}
            >
              {study.name}
            </h1>
            <div style={{ fontSize: 22, lineHeight: 1.5, color: '#4a443b' }}>
              {study.oneLiner}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              minWidth: 300,
              border: '3px solid #1c1915',
              borderRadius: 20,
              background: '#ffffff',
              padding: 24,
              boxShadow: `8px 8px 0 ${accent}`,
            }}
          >
            {study.meta.map(row => (
              <div
                key={row.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 16,
                  fontSize: 14,
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: '#6e6558',
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    color: row.label === 'STATUS' ? accent : undefined,
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
            {study.liveUrl && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 16,
                  fontSize: 14,
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: '#6e6558',
                  }}
                >
                  LIVE
                </span>
                <a
                  href={study.liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ fontWeight: 600 }}
                >
                  {study.liveLabel}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <div className='ts-section' style={{ paddingTop: 64, paddingBottom: 64 }}>
        {study.screenshots.length === 2 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: 32,
              alignItems: 'start',
            }}
          >
            {study.screenshots.map((shot, i) => (
              <div
                key={shot.src}
                style={{
                  border: '3px solid #1c1915',
                  borderRadius: 20,
                  boxShadow:
                    i === 0 ? '10px 10px 0 #1c1915' : '10px 10px 0 #ef6a4b',
                  overflow: 'hidden',
                  background: shot.dark ? '#0d1117' : '#ffffff',
                  height: 528,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </div>
        )}
        {study.screenshots.length === 1 && (
          <div
            style={{
              border: '3px solid #1c1915',
              borderRadius: 20,
              boxShadow: '10px 10px 0 #1c1915',
              overflow: 'hidden',
              background: study.screenshots[0].dark ? '#0d1117' : '#ffffff',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={study.screenshots[0].src}
              alt={study.screenshots[0].alt}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: 620,
                objectFit: 'cover',
                objectPosition: 'top',
                display: 'block',
              }}
            />
          </div>
        )}
        {study.screenshots.length === 0 && (
          <div
            style={{
              border: '3px solid #1c1915',
              borderRadius: 20,
              boxShadow: '10px 10px 0 #1c1915',
              background: accent,
              height: 360,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <NoScreenshotMotif />
          </div>
        )}
      </div>

      {/* Problem + story */}
      <div className='ts-section' style={{ paddingTop: 16, paddingBottom: 72 }}>
        <div className='ts-grid-2' style={{ gap: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              className='ts-display'
              style={{
                fontWeight: 800,
                fontSize: 26,
                borderBottom: '3px solid #ef6a4b',
                paddingBottom: 10,
                width: 'fit-content',
              }}
            >
              The problem
            </div>
            <div style={{ fontSize: 17, lineHeight: 1.65, color: '#4a443b' }}>
              {study.problem}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              className='ts-display'
              style={{
                fontWeight: 800,
                fontSize: 26,
                borderBottom: '3px solid #2aa08f',
                paddingBottom: 10,
                width: 'fit-content',
              }}
            >
              The story
            </div>
            <div style={{ fontSize: 17, lineHeight: 1.65, color: '#4a443b' }}>
              {study.story}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className='ts-section' style={{ paddingBottom: 72 }}>
        <div
          className='ts-display'
          style={{ fontWeight: 800, fontSize: 26, marginBottom: 36 }}
        >
          Timeline
        </div>
        <div
          className='ts-timeline'
          style={{
            gridTemplateColumns: `repeat(${study.timeline.length}, minmax(0, 1fr))`,
            gap: 0,
            border: '3px solid #1c1915',
            borderRadius: 20,
            overflow: 'hidden',
            background: '#ffffff',
          }}
        >
          {study.timeline.map((entry, i) => (
            <div
              key={`${entry.label}-${i}`}
              style={{
                padding: '26px 24px',
                borderRight:
                  i === study.timeline.length - 1
                    ? 'none'
                    : '3px solid #1c1915',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                background: entry.now ? accent : 'transparent',
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  color: entry.now ? '#f7f2e8' : '#ef6a4b',
                }}
              >
                {entry.label}
              </div>
              <div
                style={{
                  fontSize: 15,
                  lineHeight: 1.5,
                  fontWeight: 500,
                  color: entry.now ? '#f7f2e8' : undefined,
                }}
              >
                {entry.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture */}
      <div className='ts-section' style={{ paddingBottom: 72 }}>
        <div
          className='ts-display'
          style={{ fontWeight: 800, fontSize: 26, marginBottom: 36 }}
        >
          How it&apos;s built
        </div>
        <div className='ts-arch-flow'>
          {study.architecture.map((node, i) => (
            <Fragment key={node.title}>
              <div
                style={{
                  border: '3px solid #1c1915',
                  borderRadius: 16,
                  background: node.dark ? '#1c1915' : '#ffffff',
                  padding: '22px 26px',
                  textAlign: 'center',
                  flex: 1,
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: node.dark ? '#f7f2e8' : undefined,
                  }}
                >
                  {node.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: node.dark ? '#b3aa9c' : '#6e6558',
                    marginTop: 4,
                  }}
                >
                  {node.sub}
                </div>
              </div>
              {i < study.architecture.length - 1 && (
                <div
                  className='ts-display'
                  style={{
                    fontWeight: 800,
                    fontSize: 22,
                    padding: '0 14px',
                    color: '#ef6a4b',
                  }}
                >
                  →
                </div>
              )}
            </Fragment>
          ))}
        </div>
        <div
          style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}
        >
          {study.tools.map(tool => (
            <span
              key={tool}
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.06em',
                border: '2px solid #1c1915',
                borderRadius: 999,
                padding: '6px 14px',
                background: '#ffffff',
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Next project */}
      <div
        className='ts-section'
        style={{
          background: '#1c1915',
          color: '#f7f2e8',
          paddingTop: 56,
          paddingBottom: 56,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: '#b3aa9c',
            }}
          >
            NEXT PROJECT
          </div>
          {/* No inline color here: the ink band above sets `color: '#f7f2e8'`
              and `.ts-page a { color: inherit }` carries it down, so
              `.ts-page a:hover` can still swap it to coral. */}
          <Link
            href={`/work/${next.slug}`}
            className='ts-display'
            style={{
              fontWeight: 800,
              fontSize: 44,
              textTransform: 'uppercase',
            }}
          >
            {next.name} →
          </Link>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            flexWrap: 'wrap',
          }}
        >
          {/* Contrast-required pill: coral bg needs paper text even on
              hover, so an inline color here is the documented exception. */}
          <Link
            href='/#contact'
            style={{
              background: '#ef6a4b',
              color: '#f7f2e8',
              fontWeight: 600,
              fontSize: 16,
              padding: '16px 32px',
              border: '3px solid #f7f2e8',
              borderRadius: 999,
            }}
          >
            Want one like this?
          </Link>
          <span style={{ fontSize: 16, fontWeight: 500 }}>{CONTACT_EMAIL}</span>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: caseStudies.map(cs => ({ params: { slug: cs.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CaseStudyPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const study = getCaseStudy(slug);
  if (!study) {
    return { notFound: true };
  }
  const next = getNextCaseStudy(slug);
  const index = caseStudies.findIndex(cs => cs.slug === slug) + 1;
  return { props: { study, next, index } };
};

import Head from 'next/head';
import Link from 'next/link';
import { SiteNav } from '../../components/SiteNav';
import { SiteFooter } from '../../components/SiteFooter';
import { ProjectCard } from '../../components/ProjectCard';
import { getProjectCard } from '../../components/projectCards';
import { projects } from '../../lib/projects';

export default function WorkIndex() {
  return (
    <div className='ts-page'>
      <Head>
        <title>Work — Solvd AI Solutions</title>
        <meta
          name='description'
          content='Real AI apps built by Solvd AI Solutions — journaling tools, event schedulers, business demos, and more.'
        />
      </Head>

      <SiteNav />

      <div className='ts-section' style={{ paddingTop: 72, paddingBottom: 48 }}>
        <h1
          className='ts-display'
          style={{
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 64px)',
            letterSpacing: '-2px',
            margin: 0,
          }}
        >
          Real apps, really shipped.
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
          Every project here is real, working software — not a hypothetical case
          study. Seven builds, from a solo AI journaling app to a four-day event
          scheduler.
        </p>
      </div>

      <div className='ts-section' style={{ paddingBottom: 96 }}>
        <div className='ts-grid-2'>
          {projects.map(project => (
            <ProjectCard
              key={project.slug}
              card={getProjectCard(project.slug)}
            />
          ))}
        </div>
      </div>

      <div
        className='ts-section'
        style={{
          paddingTop: 48,
          paddingBottom: 96,
          borderTop: '3px solid #1c1915',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        <div className='ts-display' style={{ fontWeight: 800, fontSize: 28 }}>
          Want one built for you?
        </div>
        {/* Contrast-required pill: ink bg needs paper text even on hover,
            so an inline color here is the documented exception. */}
        <Link
          href='/#contact'
          style={{
            background: '#1c1915',
            color: '#f7f2e8',
            fontWeight: 600,
            fontSize: 16,
            padding: '14px 30px',
            borderRadius: 999,
            boxShadow: '5px 5px 0 #ef6a4b',
          }}
        >
          Start a project
        </Link>
      </div>

      <SiteFooter />
    </div>
  );
}

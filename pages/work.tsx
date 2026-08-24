import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { ContactSection } from '../components/ContactSection';
import { SectionDivider } from '../components/SectionDivider';
import { OutlineCard, OutlineCardContent } from '../components/ui/outline-card';
import { projects, ICON_BOX_CLASSES } from '../lib/projects';

export default function Work() {
  return (
    <>
      <Head>
        <title>Work — Solvd AI Solutions</title>
        <meta
          name='description'
          content='Real AI apps built by Solvd AI Solutions — journaling tools, event schedulers, business demos, and more.'
        />
      </Head>
      <Navigation />
      <section className='pt-32 pb-16 px-6'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-black mb-4'>
              Real Apps We&apos;ve Built
            </h1>
            <p className='text-xl text-black max-w-3xl mx-auto leading-relaxed'>
              Every project here is real, working software — not a hypothetical
              case study.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {projects.map(project => {
              const Icon = project.icon;
              const card = (
                <OutlineCard hover accentColor={project.color}>
                  <OutlineCardContent className='p-6 h-full flex flex-col'>
                    <div
                      className={`${ICON_BOX_CLASSES[project.color]} rounded-lg p-3 w-fit mb-4`}
                      style={{
                        outline: `2px solid var(--color-${project.color})`,
                        outlineOffset: '0',
                      }}
                    >
                      <Icon className='w-6 h-6 text-white' />
                    </div>
                    <h3 className='text-xl font-semibold text-black mb-2'>
                      {project.name}
                    </h3>
                    <p className='text-base text-black leading-relaxed'>
                      {project.tagline}
                    </p>
                  </OutlineCardContent>
                </OutlineCard>
              );

              if (!project.externalUrl) {
                return <div key={project.slug}>{card}</div>;
              }

              const isExternal = project.externalUrl.startsWith('http');
              return (
                <a
                  key={project.slug}
                  href={project.externalUrl}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className='block'
                >
                  {card}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider pattern='dots' color='mint' />

      <ContactSection />
    </>
  );
}

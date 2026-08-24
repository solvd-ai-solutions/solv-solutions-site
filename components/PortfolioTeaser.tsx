import { useRouter } from 'next/router';
import { OutlineCard, OutlineCardContent } from './ui/outline-card';
import { OutlineButton } from './ui/outline-button';
import { projects, ICON_BOX_CLASSES } from '../lib/projects';

export function PortfolioTeaser() {
  const router = useRouter();
  const featured = projects.filter(project => project.featured);

  return (
    <section id='work' className='py-16 px-6 bg-white'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-black mb-4'>
            Real Apps We&apos;ve Built
          </h2>
          <p className='text-xl text-black max-w-3xl mx-auto leading-relaxed'>
            Not case studies of hypothetical businesses — working software,
            shipped.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
          {featured.map(project => {
            const Icon = project.icon;
            return (
              <OutlineCard key={project.slug} hover accentColor={project.color}>
                <OutlineCardContent className='p-6'>
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
          })}
        </div>

        <div className='text-center'>
          <OutlineButton
            variant='primary'
            size='lg'
            onClick={() => router.push('/work')}
          >
            See All Work
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}

import { Heart, Scissors, Zap } from 'lucide-react';
import { OutlineButton } from './ui/outline-button';

export function FeaturesGrid() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id='demos' className='py-140 px-6 bg-white'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-black mb-4'>
            See Our AI Apps in Action
          </h2>
          <p className='text-xl text-black max-w-3xl mx-auto leading-relaxed'>
            Explore real examples of custom AI applications we&apos;ve built.
            Each one is tailored to solve specific problems with intelligent
            automation.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Cut & Order Manager */}
          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-mint hover:shadow-xl transition-shadow'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 bg-mint rounded-lg flex items-center justify-center mr-4'>
                <Scissors className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-800'>
                Cut & Order Manager
              </h3>
            </div>
            <p className='text-gray-600 mb-4'>
              Streamline your cutting operations with AI-powered order
              management, inventory tracking, and production scheduling.
            </p>
            <OutlineButton
              variant='mint'
              onClick={() =>
                window.open(
                  'https://demo1.solvdaisolutions.com',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
              className='w-full'
            >
              View Demo
            </OutlineButton>
          </div>

          {/* Pet Bio Generator */}
          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-lavender hover:shadow-xl transition-shadow'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 bg-lavender rounded-lg flex items-center justify-center mr-4'>
                <Heart className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-800'>
                Pet Bio Generator
              </h3>
            </div>
            <p className='text-gray-600 mb-4'>
              Create engaging pet profiles with AI-generated bios, perfect for
              pet businesses and shelters.
            </p>
            <OutlineButton
              variant='lavender'
              onClick={() =>
                window.open(
                  'https://www.solvdaisolutions.com/demos/pet-bio-generator',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
              className='w-full'
            >
              View Demo
            </OutlineButton>
          </div>

          {/* Codex Automation */}
          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-lavender hover:shadow-xl transition-shadow'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 bg-lavender rounded-lg flex items-center justify-center mr-4'>
                <Zap className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-800'>
                Codex Automation
              </h3>
            </div>
            <p className='text-gray-600 mb-4'>
              AI-powered workflow automation that connects your tools and
              processes for seamless operations.
            </p>
            <OutlineButton
              variant='lavender'
              onClick={() => scrollToSection('codex-demo')}
              className='w-full'
            >
              Explore Codex
            </OutlineButton>
          </div>
        </div>
      </div>
    </section>
  );
}

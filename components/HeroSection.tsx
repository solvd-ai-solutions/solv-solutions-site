import { useRouter } from 'next/router';
import { OutlineButton } from './ui/outline-button';
import { scrollToSection } from './ui/utils';

export function HeroSection() {
  const router = useRouter();

  return (
    <section className='relative px-6 overflow-hidden pt-280 pb-140'>
      {/* Grid Pattern Background */}
      <div className='absolute inset-0 opacity-3'>
        <div
          className='h-full w-full'
          style={{
            backgroundImage: `
                 linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
               `,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div className='container mx-auto max-w-6xl text-center relative z-10'>
        {/* Main Headline - Much Bigger */}
        <div className='mb-4'>
          <h1
            className='font-bold text-black leading-tight max-w-5xl mx-auto'
            style={{ fontSize: 'clamp(32px, 8vw, 64px)', lineHeight: '1.1' }}
          >
            <span className='text-lavender'>AI-Powered Micro-Tools</span>
            <br />
            for your Small Business Needs
          </h1>
        </div>

        {/* Subtitle */}
        <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed'>
          Transform your business with AI-powered solutions and Codex automation
          workflows. From custom applications to intelligent process
          optimization, we build the future of work.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
          <OutlineButton
            variant='mint'
            onClick={() => scrollToSection('contact')}
            className='px-8 py-4 text-lg font-semibold'
          >
            Get Started
          </OutlineButton>
          <OutlineButton
            variant='lavender'
            onClick={() => router.push('/work')}
            className='px-8 py-4 text-lg font-semibold'
          >
            See Our Work
          </OutlineButton>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
          <div
            className='bg-white rounded-lg p-6 outline-primary'
            style={{
              outline: '2px solid var(--color-black)',
              outlineOffset: '0',
            }}
          >
            <div className='text-3xl font-bold text-black mb-2'>48hr</div>
            <div className='text-lg text-black font-medium'>
              Average Delivery
            </div>
          </div>

          <div
            className='bg-white rounded-lg p-6 outline-primary hover:outline-lavender transition-all'
            style={{
              outline: '2px solid var(--color-black)',
              outlineOffset: '0',
            }}
          >
            <div className='text-3xl font-bold text-black mb-2'>100%</div>
            <div className='text-lg text-black font-medium'>Custom Built</div>
          </div>

          <div
            className='bg-white rounded-lg p-6 outline-primary'
            style={{
              outline: '2px solid var(--color-black)',
              outlineOffset: '0',
            }}
          >
            <div className='text-3xl font-bold text-black mb-2'>∞</div>
            <div className='text-lg text-black font-medium'>Possibilities</div>
          </div>
        </div>
      </div>
    </section>
  );
}

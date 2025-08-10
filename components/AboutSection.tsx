import { OutlineCard, OutlineCardContent } from './ui/outline-card';

export function AboutSection() {
  return (
    <section id='about' className='py-16 px-6'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-black mb-4'>
            About Solvd: AI Solutions
          </h2>
          <p className='text-xl text-black max-w-3xl mx-auto leading-relaxed'>
            We&apos;re passionate about creating custom AI solutions that solve
            real problems. Every app we build is designed from scratch to fit
            your exact needs and workflow perfectly.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
          <OutlineCard hover accentColor='coral'>
            <OutlineCardContent className='text-center p-6'>
              <div
                className='bg-coral rounded-lg p-3 w-fit mx-auto mb-4 outline-coral'
                style={{
                  outline: '2px solid var(--color-coral)',
                  outlineOffset: '0',
                }}
              >
                <div className='w-12 h-12 text-white text-2xl flex items-center justify-center'>
                  👤
                </div>
              </div>
              <h3 className='font-semibold text-black mb-2 text-lg'>
                Solo Developer
              </h3>
              <p className='text-base text-black leading-relaxed'>
                Direct communication with the person building your app
              </p>
            </OutlineCardContent>
          </OutlineCard>

          <OutlineCard hover accentColor='lavender'>
            <OutlineCardContent className='text-center p-6'>
              <div
                className='bg-lavender rounded-lg p-3 w-fit mx-auto mb-4 outline-lavender'
                style={{
                  outline: '2px solid var(--color-lavender)',
                  outlineOffset: '0',
                }}
              >
                <div className='w-12 h-12 text-white text-2xl flex items-center justify-center'>
                  🏆
                </div>
              </div>
              <h3 className='font-semibold text-black mb-2 text-lg'>
                Quality Focus
              </h3>
              <p className='text-base text-black leading-relaxed'>
                Every line of code is crafted with attention to detail
              </p>
            </OutlineCardContent>
          </OutlineCard>

          <OutlineCard hover accentColor='mint'>
            <OutlineCardContent className='text-center p-6'>
              <div
                className='bg-mint rounded-lg p-3 w-fit mx-auto mb-4 outline-mint'
                style={{
                  outline: '2px solid var(--color-mint)',
                  outlineOffset: '0',
                }}
              >
                <div className='w-12 h-12 text-white text-2xl flex items-center justify-center'>
                  ⏰
                </div>
              </div>
              <h3 className='font-semibold text-black mb-2 text-lg'>
                Fast Delivery
              </h3>
              <p className='text-base text-black leading-relaxed'>
                Most projects completed within 48-72 hours
              </p>
            </OutlineCardContent>
          </OutlineCard>

          <OutlineCard hover accentColor='coral'>
            <OutlineCardContent className='text-center p-6'>
              <div
                className='bg-coral rounded-lg p-3 w-fit mx-auto mb-4 outline-coral'
                style={{
                  outline: '2px solid var(--color-coral)',
                  outlineOffset: '0',
                }}
              >
                <div className='w-12 h-12 text-white text-2xl flex items-center justify-center'>
                  ❤️
                </div>
              </div>
              <h3 className='font-semibold text-black mb-2 text-lg'>
                Personal Touch
              </h3>
              <p className='text-base text-black leading-relaxed'>
                Built with care for businesses we believe in
              </p>
            </OutlineCardContent>
          </OutlineCard>
        </div>

        {/* Why Choose Us Section */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-mint'>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              AI-Powered Solutions
            </h3>
            <p className='text-gray-600'>
              Cutting-edge artificial intelligence that transforms your business
              processes and decision-making.
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-lavender'>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              Codex Workflows
            </h3>
            <p className='text-gray-600'>
              Intelligent automation that connects your tools and creates
              seamless, efficient workflows.
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-coral'>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              Beautiful Builds
            </h3>
            <p className='text-gray-600'>
              Simple, easy-to-navigate, accessible designs that solve problems
              in style.
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-mint'>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              Codex Integration
            </h3>
            <p className='text-gray-600'>
              Seamlessly integrate AI automation into your existing systems and
              workflows.
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-lavender'>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              Smart Automation
            </h3>
            <p className='text-gray-600'>
              Let Codex handle repetitive tasks while you focus on what matters
              most.
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-coral'>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              Future-Ready
            </h3>
            <p className='text-gray-600'>
              Built with the latest technologies to ensure your business stays
              ahead of the curve.
            </p>
          </div>
        </div>

        <div className='max-w-4xl mx-auto'>
          <OutlineCard className='shadow-lg'>
            <OutlineCardContent className='p-8'>
              <div className='text-center'>
                <h3 className='text-2xl font-semibold text-black mb-4'>
                  Our Mission
                </h3>
                <p className='text-lg text-black leading-relaxed mb-6'>
                  We believe that every business, no matter how small or unique,
                  deserves access to powerful AI tools that actually fit their
                  workflow. Instead of forcing you to adapt to generic software,
                  we build applications that adapt to you.
                </p>
                <p className='text-lg text-black leading-relaxed'>
                  You know your business needs better than we do, and we love
                  tackling the specific challenges that make each business
                  special. Thank you for starting a business; you deserve
                  solutions for your unique challenges.
                </p>
              </div>
            </OutlineCardContent>
          </OutlineCard>
        </div>
      </div>
    </section>
  );
}

// src/pages/index.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { FeaturesGrid } from '../components/FeaturesGrid';
import { ContactSection } from '../components/ContactSection';
import { SectionDivider } from '../components/SectionDivider';

// Lazy load heavy components
const DemoSections = dynamic(
  () =>
    import('../components/DemoSections').then(mod => ({
      default: mod.DemoSections,
    })),
  {
    loading: () => (
      <div className='py-20 px-6 bg-gray-50'>
        <div className='container mx-auto max-w-7xl text-center'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4'></div>
            <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8'></div>
            <div className='grid lg:grid-cols-2 gap-8'>
              <div className='h-64 bg-gray-200 rounded'></div>
              <div className='h-64 bg-gray-200 rounded'></div>
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: true,
  }
);

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />

      {/* Geometric Divider */}
      <SectionDivider pattern='diagonal' color='mint' />

      <AboutSection />

      {/* Geometric Divider */}
      <SectionDivider pattern='triangles' color='coral' />

      <ServicesSection />

      {/* Geometric Divider */}
      <SectionDivider pattern='triangles' color='coral' />

      <FeaturesGrid />

      {/* Detailed Demos including Codex */}
      <Suspense
        fallback={
          <div className='py-20 px-6 bg-gray-50'>
            <div className='container mx-auto max-w-7xl text-center'>
              <div className='animate-pulse'>
                <div className='h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8'></div>
                <div className='grid lg:grid-cols-2 gap-8'>
                  <div className='h-64 bg-gray-200 rounded'></div>
                  <div className='h-64 bg-gray-200 rounded'></div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <DemoSections />
      </Suspense>

      {/* Geometric Divider */}
      <SectionDivider pattern='waves' color='lavender' />

      <ContactSection />
    </>
  );
}

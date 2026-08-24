// src/pages/index.tsx
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { PortfolioTeaser } from '../components/PortfolioTeaser';
import { ContactSection } from '../components/ContactSection';
import { SectionDivider } from '../components/SectionDivider';

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

      <PortfolioTeaser />

      {/* Geometric Divider */}
      <SectionDivider pattern='waves' color='lavender' />

      <ContactSection />
    </>
  );
}

// src/pages/index.tsx
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { FeaturesGrid } from '../components/FeaturesGrid';
import { ContactSection } from '../components/ContactSection';
import { SectionDivider } from '../components/SectionDivider';

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      
      {/* Geometric Divider */}
      <SectionDivider pattern="diagonal" color="mint" />
      
      <AboutSection />
      
      {/* Geometric Divider */}
      <SectionDivider pattern="triangles" color="coral" />
      
      <FeaturesGrid />
      
      {/* Geometric Divider */}
      <SectionDivider pattern="waves" color="lavender" />
      
      <ContactSection />
    </>
  );
}

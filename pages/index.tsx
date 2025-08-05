// src/pages/index.tsx
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { FeaturesGrid } from '../components/FeaturesGrid';
import { ServicesSection } from '../components/ServicesSection';
import { ContactSection } from '../components/ContactSection';

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FeaturesGrid />
      <ServicesSection />
      <ContactSection />
    </>
  );
}

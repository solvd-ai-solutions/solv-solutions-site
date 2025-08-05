// src/pages/index.tsx
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesGrid from '../components/FeaturesGrid';
import DemoSections from '../components/DemoSections';
import SectionDivider from '../components/SectionDivider';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FeaturesGrid />
      <DemoSections />
      <SectionDivider />
      <ContactSection />
    </>
  );
}

// src/pages/index.tsx
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { PortfolioTeaser } from '../components/PortfolioTeaser';
import { ContactSection } from '../components/ContactSection';
import { SectionDivider } from '../components/SectionDivider';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Solvd AI Solutions — Custom AI Apps & AI Adoption Consulting
        </title>
        <meta
          name='description'
          content='Custom AI applications and AI adoption consulting — workflow audits, training, governance, and the tools to make it stick. Built by Solvd AI Solutions.'
        />
      </Head>
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

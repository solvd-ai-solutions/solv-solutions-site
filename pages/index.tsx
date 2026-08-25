import Head from 'next/head';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { Hero } from '../components/home/Hero';
import { MarqueeBand } from '../components/home/MarqueeBand';
import { WorkGrid } from '../components/home/WorkGrid';
import { ContactBand } from '../components/home/ContactBand';

export default function Home() {
  return (
    <div className='ts-page'>
      <Head>
        <title>
          Solvd AI Solutions — Custom AI Apps & AI Adoption Consulting
        </title>
        <meta
          name='description'
          content='Custom AI applications and AI adoption consulting — workflow audits, training, governance, and the tools to make it stick. Built by Solvd AI Solutions.'
        />
      </Head>
      <SiteNav />
      <Hero />
      <MarqueeBand />
      <WorkGrid />
      <ContactBand />
      <SiteFooter />
    </div>
  );
}

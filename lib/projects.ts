export interface Project {
  slug: string;
  name: string;
  tagline: string;
  externalUrl?: string;
  caseHref: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'persono',
    name: 'Persono',
    tagline:
      'AI-powered journaling and self-development app that surfaces patterns in how you think and live — designed and built end to end, iOS and web.',
    caseHref: '/work/persono',
    featured: true,
  },
  {
    slug: 'runit',
    name: 'RunIt',
    tagline:
      'Turns a photographed run-of-show document into a live, AI-built event schedule for iPhone and Android — from idea to a shipped v1 in about four days.',
    caseHref: '/work/runit',
    featured: true,
  },
  {
    slug: 'cut-order-manager',
    name: 'Cut & Order Manager',
    tagline:
      'AI-powered order management, inventory tracking, and production scheduling built for cut-to-order and hardware shops.',
    externalUrl: 'https://demo1.solvdaisolutions.com',
    caseHref: '/work/cut-order-manager',
    featured: true,
  },
  {
    slug: 'pet-bio-generator',
    name: 'Pet Bio Generator',
    tagline:
      'Generates adoption-ready pet bios from a photo and a few notes, for shelters and rescues that need copy fast.',
    externalUrl: 'https://instant-pet-bio-generator.vercel.app',
    caseHref: '/work/pet-bio-generator',
    featured: false,
  },
  {
    slug: 'resume-writing-agent',
    name: 'AI Resume Writing Agent',
    tagline:
      'Matches a resume against open roles, surfaces the highest-fit jobs, and rewrites the resume around the keywords that get past the screen — built on Microsoft Copilot, in active use org-wide.',
    caseHref: '/work/resume-writing-agent',
    featured: false,
  },
  {
    slug: 'life-imitates-thought',
    name: 'Life Imitates Thought',
    tagline:
      "A city-wide QR code scavenger hunt for mindset shifts — scan a code on a bench or a wall, get a reframe, and track which ones you've found.",
    externalUrl: 'https://lifeimitatesthought.quest',
    caseHref: '/work/life-imitates-thought',
    featured: true,
  },
  {
    slug: 'solvd-ai-solutions-site',
    name: 'This Website',
    tagline:
      "The site you're looking at right now — built end to end with Claude Code, from the Services section down to this sentence.",
    caseHref: '/work/solvd-ai-solutions-site',
    featured: false,
  },
];

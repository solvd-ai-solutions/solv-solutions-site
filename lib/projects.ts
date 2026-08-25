import {
  BookOpen,
  Calendar,
  Scissors,
  Heart,
  FileText,
  Sparkles,
  Layers,
  LucideIcon,
} from 'lucide-react';

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  color: 'mint' | 'coral' | 'lavender';
  externalUrl?: string;
  caseHref: string;
  featured: boolean;
}

// Literal class strings, not `bg-${color}` interpolation — Tailwind's scanner
// needs to see full class names in source text, and this matches the same
// lookup-object convention already used in components/ui/outline-button.tsx
// and components/ui/outline-card.tsx.
export const ICON_BOX_CLASSES: Record<'mint' | 'coral' | 'lavender', string> = {
  mint: 'bg-mint outline-mint',
  coral: 'bg-coral outline-coral',
  lavender: 'bg-lavender outline-lavender',
};

export const projects: Project[] = [
  {
    slug: 'persono',
    name: 'Persono',
    tagline:
      'AI-powered journaling and self-development app that surfaces patterns in how you think and live — designed and built end to end, iOS and web.',
    icon: BookOpen,
    color: 'mint',
    caseHref: '/work/persono',
    featured: true,
  },
  {
    slug: 'runit',
    name: 'RunIt',
    tagline:
      'Turns a photographed run-of-show document into a live, AI-built event schedule for iPhone and Android — from idea to a shipped v1 in about four days.',
    icon: Calendar,
    color: 'coral',
    caseHref: '/work/runit',
    featured: true,
  },
  {
    slug: 'cut-order-manager',
    name: 'Cut & Order Manager',
    tagline:
      'AI-powered order management, inventory tracking, and production scheduling built for cut-to-order and hardware shops.',
    icon: Scissors,
    color: 'lavender',
    externalUrl: 'https://demo1.solvdaisolutions.com',
    caseHref: '/work/cut-order-manager',
    featured: true,
  },
  {
    slug: 'pet-bio-generator',
    name: 'Pet Bio Generator',
    tagline:
      'Generates adoption-ready pet bios from a photo and a few notes, for shelters and rescues that need copy fast.',
    icon: Heart,
    color: 'mint',
    externalUrl: 'https://instant-pet-bio-generator.vercel.app',
    caseHref: '/work/pet-bio-generator',
    featured: false,
  },
  {
    slug: 'resume-writing-agent',
    name: 'AI Resume Writing Agent',
    tagline:
      'Matches a resume against open roles, surfaces the highest-fit jobs, and rewrites the resume around the keywords that get past the screen — built on Microsoft Copilot, in active use org-wide.',
    icon: FileText,
    color: 'coral',
    caseHref: '/work/resume-writing-agent',
    featured: false,
  },
  {
    slug: 'life-imitates-thought',
    name: 'Life Imitates Thought',
    tagline:
      "A city-wide QR code scavenger hunt for mindset shifts — scan a code on a bench or a wall, get a reframe, and track which ones you've found.",
    icon: Sparkles,
    color: 'lavender',
    externalUrl: 'https://lifeimitatesthought.quest',
    caseHref: '/work/life-imitates-thought',
    featured: true,
  },
  {
    slug: 'solvd-ai-solutions-site',
    name: 'This Website',
    tagline:
      "The site you're looking at right now — built end to end with Claude Code, from the Services section down to this sentence.",
    icon: Layers,
    color: 'mint',
    caseHref: '/work/solvd-ai-solutions-site',
    featured: false,
  },
];

# Services & Portfolio Build-Out Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a real Services section and a project portfolio to the Solvd AI Solutions homepage, plus a `/work` index page, and clean up stale/placeholder content (Contact section, missing page title/meta).

**Architecture:** Two new content-data modules (`lib/services.ts`, `lib/projects.ts`) feed two new presentational components (`ServicesSection` rewrite, new `PortfolioTeaser`) and one new page (`pages/work.tsx`). `FeaturesGrid`, `DemoSections`, and the orphaned root `App.tsx` are deleted — their content (the two real demo apps) becomes portfolio entries instead. `ContactSection` and `Navigation` get targeted content rewrites. All new UI reuses the existing `OutlineCard`/`OutlineButton`/`SectionDivider` primitives and CSS custom properties (`--color-mint`/`--color-coral`/`--color-lavender`) already established in the codebase — no new design system, no new dependencies.

**Tech Stack:** Next.js (Pages Router) 15+, React, TypeScript, Tailwind CSS, Jest + React Testing Library, lucide-react icons.

**Spec:** `docs/superpowers/specs/2026-08-23-services-and-portfolio-design.md`

## Global Constraints

- No visual/brand redesign — reuse `OutlineCard`, `OutlineCardContent`, `OutlineButton`, `SectionDivider`, and the existing `mint`/`coral`/`lavender`/`black`/`white` color tokens. New components should carry the existing geometric/quirky personality (SectionDivider patterns between sections, colored accent cards, hover-lift buttons) rather than introducing plain white cards.
- No payment/checkout mentioned or linked anywhere in new or edited UI. `pages/payment.tsx` and `pages/payment-success.tsx` are left untouched and unlinked.
- Services copy must be used verbatim as given by the user — do not paraphrase or shorten.
- Contact email is `geoff@persono.app` — not `hello@solvdaisolutions.com` or any other address.
- No "Codex" branding anywhere in new/edited copy (Navigation, Contact) — it's stale copy unrelated to the real Claude/Anthropic-based stack.
- Every task must leave `npm run type-check` and `npm test` passing before its commit.
- Follow the existing codebase's single-quote/no-semicolon-optional Prettier style (`.prettierrc`) — run `npm run format` before each commit if unsure.

---

### Task 1: Services content data

**Files:**

- Create: `lib/services.ts`
- Test: `lib/services.test.ts`

**Interfaces:**

- Produces: `ServiceItem { title: string; description: string }`, `ServiceCategory { name: string; items: ServiceItem[] }`, `export const serviceCategories: ServiceCategory[]` (3 categories, containing 10 + 5 + 4 = 19 items total) — consumed by Task 2.

- [ ] **Step 1: Write the failing test**

Create `lib/services.test.ts`:

```typescript
import { serviceCategories } from './services';

describe('serviceCategories', () => {
  it('has exactly 3 categories in the right order', () => {
    expect(serviceCategories.map(c => c.name)).toEqual([
      'AI Enablement & Training Consulting',
      'Custom AI-Powered Tools',
      'Custom Non-AI Digital Tools',
    ]);
  });

  it('has the right item count per category', () => {
    expect(serviceCategories[0].items).toHaveLength(10);
    expect(serviceCategories[1].items).toHaveLength(5);
    expect(serviceCategories[2].items).toHaveLength(4);
  });

  it('every item has a non-empty title and description', () => {
    for (const category of serviceCategories) {
      for (const item of category.items) {
        expect(item.title.length).toBeGreaterThan(0);
        expect(item.description.length).toBeGreaterThan(0);
      }
    }
  });

  it('includes the signature deliverable and the Google Drive Prep offering', () => {
    const allTitles = serviceCategories.flatMap(c => c.items.map(i => i.title));
    expect(allTitles).toContain('AI Operations Adoption Plan');
    expect(allTitles).toContain('AI Workspace & Tool Architecture');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest lib/services.test.ts`
Expected: FAIL with "Cannot find module './services'"

- [ ] **Step 3: Write the implementation**

Create `lib/services.ts`:

```typescript
export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServiceCategory {
  name: string;
  items: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    name: 'AI Enablement & Training Consulting',
    items: [
      {
        title: 'AI Operations Adoption Plan',
        description:
          "A full audit of an organization's workflows, tools, and team structure, mapped against where AI can actually save time without hurting quality. Includes a department-by-department opportunity map, prioritized workflow designs, a phased rollout plan, a governance policy, and a measurement framework. Signature deliverable.",
      },
      {
        title: 'Custom AI Training Programs',
        description:
          "Multi-session training built around a team's real work, not generic AI literacy. Each session uses the team's own documents, shows a tool failing before fixing it live, and ends with a written per-workflow guide people can use on their own after the session.",
      },
      {
        title: 'Workflow Design & Documentation',
        description:
          'For each recurring task worth automating: the current process mapped, the improved process designed, the source materials it depends on identified, a tested prompt or reusable instruction set written, a human review step built in, and a way to measure whether it worked.',
      },
      {
        title: 'AI Workspace & Tool Architecture',
        description:
          'Google Drive and AI-project structure designed around who needs to see what. Permission boundaries, document naming and versioning rules, and source-of-truth rules that keep AI output grounded in approved material instead of drafts.',
      },
      {
        title: 'AI Governance & Security Policy',
        description:
          "A plain-English policy covering what data can and can't go into an AI tool, who signs off on what before it reaches a client, and how access gets reviewed and removed.",
      },
      {
        title: 'Champion / Train-the-Trainer Programs',
        description:
          'Instead of training everyone at once, a small number of internal leads get trained deeply enough to sustain adoption after the engagement ends.',
      },
      {
        title: 'SOP & Knowledge Capture',
        description:
          "Turning what's in a founder's or senior staff member's head into documented process guides, built from short recorded conversations instead of asking anyone to sit down and write.",
      },
      {
        title: 'AI Cost Efficiency & ROI Review',
        description:
          "An honest look at where AI adoption reduces cost or time and where it doesn't. Not every workflow should be automated, and the review says so where that's true.",
      },
      {
        title: 'Phased Implementation Planning',
        description:
          "A 30/60/90-day rollout with named owners, weekly deliverables, and defined success metrics, sequenced around the team's actual busy season instead of an arbitrary calendar.",
      },
      {
        title: 'Ongoing Advisory',
        description:
          "Periodic check-ins on what's working, what's been quietly abandoned, and where the governance policy is being tested in practice.",
      },
    ],
  },
  {
    name: 'Custom AI-Powered Tools',
    items: [
      {
        title: 'Custom AI workflows',
        description:
          "Reusable prompts and instruction sets built around a team's actual documents and templates, not a generic assistant bolted onto a business.",
      },
      {
        title: 'AI-assisted document generation systems',
        description:
          'Branded, structured documents (proposals, reports, training materials) generated from source data, with a human review step built into the process rather than treated as optional.',
      },
      {
        title: 'Persono',
        description:
          'An AI journaling app, designed and built end to end. Used as a working demonstration of product design and AI product judgment, not just a case study.',
      },
      {
        title: 'AI-powered internal tools',
        description:
          'Small custom apps (trackers, comparison tools, dashboards) that use AI for the parts that benefit from it and plain logic everywhere else.',
      },
      {
        title: 'Custom instruction sets / "skills"',
        description:
          "Packaged reference material and rules that make an AI tool consistent with a brand's voice, format, and non-negotiables, so output doesn't drift between sessions or users.",
      },
    ],
  },
  {
    name: 'Custom Non-AI Digital Tools',
    items: [
      {
        title: 'Invoicing & payment tracking systems',
        description:
          'Branded templates, sequential numbering, and a payment record that stays consistent across every client.',
      },
      {
        title: 'Trackers & dashboards',
        description:
          "Spreadsheet or lightweight web tools for pipeline, budget, or project status, built for people who won't open a full project-management platform.",
      },
      {
        title: 'Document templates & systems',
        description:
          "Word, PDF, and slide templates built for repeat use, with formatting rules built in so quality doesn't depend on whoever's editing that day.",
      },
      {
        title: 'Small web tools',
        description:
          'Purpose-built pages or calculators for a specific, narrow business need, without the overhead of a full application.',
      },
    ],
  },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest lib/services.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/services.ts lib/services.test.ts
git commit -m "feat: add real services content data"
```

---

### Task 2: Services section component, wired into the homepage

**Files:**

- Modify: `components/ServicesSection.tsx` (full rewrite — currently 80 lines of generic "Choose Your Plan" placeholder)
- Modify: `pages/index.tsx:1-9` (add import), `pages/index.tsx:45-50` (insert `<ServicesSection />` between `<AboutSection />`'s divider and `<FeaturesGrid />`)
- Test: `components/ServicesSection.test.tsx`

**Interfaces:**

- Consumes: `serviceCategories` from `lib/services.ts` (Task 1).
- Produces: `export function ServicesSection()` — a React component with no props, rendered at `id='services'`.

- [ ] **Step 1: Write the failing test**

Create `components/ServicesSection.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { ServicesSection } from './ServicesSection';

describe('ServicesSection', () => {
  it('renders the section with id="services"', () => {
    render(<ServicesSection />);
    expect(document.getElementById('services')).toBeInTheDocument();
  });

  it('renders all three category headings', () => {
    render(<ServicesSection />);
    expect(
      screen.getByText('AI Enablement & Training Consulting')
    ).toBeInTheDocument();
    expect(screen.getByText('Custom AI-Powered Tools')).toBeInTheDocument();
    expect(screen.getByText('Custom Non-AI Digital Tools')).toBeInTheDocument();
  });

  it('renders the signature deliverable', () => {
    render(<ServicesSection />);
    expect(screen.getByText('AI Operations Adoption Plan')).toBeInTheDocument();
  });

  it('does not render the old placeholder copy', () => {
    render(<ServicesSection />);
    expect(screen.queryByText('Choose Your Plan')).not.toBeInTheDocument();
    expect(screen.queryByText('Codex Automation')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest components/ServicesSection.test.tsx`
Expected: FAIL (old placeholder copy doesn't match "AI Enablement & Training Consulting" etc.)

- [ ] **Step 3: Write the implementation**

Replace the full contents of `components/ServicesSection.tsx`:

```typescript
import { OutlineCard, OutlineCardContent } from './ui/outline-card';
import { SectionDivider } from './SectionDivider';
import { serviceCategories } from '../lib/services';

const CATEGORY_COLORS = ['mint', 'coral', 'lavender'] as const;

export function ServicesSection() {
  return (
    <section id='services' className='py-16 px-6'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-black mb-4'>
            Services & Capabilities
          </h2>
          <p className='text-xl text-black max-w-3xl mx-auto leading-relaxed'>
            From full AI adoption strategy to the tools that make it stick —
            here&apos;s what we do.
          </p>
        </div>

        {serviceCategories.map((category, categoryIndex) => {
          const color = CATEGORY_COLORS[categoryIndex % CATEGORY_COLORS.length];
          return (
            <div key={category.name} className='mb-12 last:mb-0'>
              <h3 className='text-2xl font-semibold text-black mb-6'>
                {category.name}
              </h3>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {category.items.map(item => (
                  <OutlineCard key={item.title} hover accentColor={color}>
                    <OutlineCardContent className='p-5'>
                      <h4 className='font-semibold text-black mb-2 text-lg'>
                        {item.title}
                      </h4>
                      <p className='text-sm text-black leading-relaxed'>
                        {item.description}
                      </p>
                    </OutlineCardContent>
                  </OutlineCard>
                ))}
              </div>
              {categoryIndex < serviceCategories.length - 1 && (
                <div className='mt-12'>
                  <SectionDivider
                    pattern={
                      categoryIndex === 0 ? 'dots' : 'diagonal'
                    }
                    color={CATEGORY_COLORS[(categoryIndex + 1) % CATEGORY_COLORS.length]}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

Then update `pages/index.tsx`. Current lines 1-9:

```typescript
// src/pages/index.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { FeaturesGrid } from '../components/FeaturesGrid';
import { ContactSection } from '../components/ContactSection';
import { SectionDivider } from '../components/SectionDivider';
```

Add the `ServicesSection` import after the `AboutSection` import:

```typescript
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
```

Current lines 45-50 (inside `Home()`, after `<AboutSection />`):

```typescript
      <AboutSection />

      {/* Geometric Divider */}
      <SectionDivider pattern='triangles' color='coral' />

      <FeaturesGrid />
```

Replace with:

```typescript
      <AboutSection />

      {/* Geometric Divider */}
      <SectionDivider pattern='triangles' color='coral' />

      <ServicesSection />

      {/* Geometric Divider */}
      <SectionDivider pattern='triangles' color='coral' />

      <FeaturesGrid />
```

(`FeaturesGrid` and the divider after it are removed in Task 4 — this task only adds `ServicesSection` without otherwise disturbing the existing page.)

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest components/ServicesSection.test.tsx`
Expected: PASS (4 tests)

Also run: `npm run type-check` — expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/ServicesSection.tsx components/ServicesSection.test.tsx pages/index.tsx
git commit -m "feat: wire real Services section into the homepage"
```

---

### Task 3: Portfolio project data

**Files:**

- Create: `lib/projects.ts`
- Test: `lib/projects.test.ts`

**Interfaces:**

- Produces: `Project { slug: string; name: string; tagline: string; icon: LucideIcon; color: 'mint' | 'coral' | 'lavender'; externalUrl?: string; featured: boolean }`, `export const projects: Project[]` (7 entries), `export const ICON_BOX_CLASSES: Record<'mint' | 'coral' | 'lavender', string>` — consumed by Task 4 (featured subset) and Task 5 (full grid).

Note on `ICON_BOX_CLASSES`: `components/ui/outline-card.tsx` and `components/ui/outline-button.tsx` both avoid constructing Tailwind class names from variables (e.g. `` `bg-${color}` ``) — they use a literal lookup object (`{ mint: 'bg-mint ...', coral: '...', lavender: '...' }[variant]`), because Tailwind's class scanner looks for literal class-name substrings in source files and won't reliably pick up interpolated ones. This plan follows that same established convention rather than introducing the fragile pattern.

- [ ] **Step 1: Write the failing test**

Create `lib/projects.test.ts`:

```typescript
import { projects, ICON_BOX_CLASSES } from './projects';

describe('projects', () => {
  it('has exactly 7 projects', () => {
    expect(projects).toHaveLength(7);
  });

  it('has unique slugs', () => {
    const slugs = projects.map(p => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('includes all expected projects', () => {
    const slugs = projects.map(p => p.slug).sort();
    expect(slugs).toEqual(
      [
        'cut-order-manager',
        'life-imitates-thought',
        'pet-bio-generator',
        'persono',
        'resume-writing-agent',
        'runit',
        'solvd-ai-solutions-site',
      ].sort()
    );
  });

  it('has at least 3 and at most 4 featured projects', () => {
    const featured = projects.filter(p => p.featured);
    expect(featured.length).toBeGreaterThanOrEqual(3);
    expect(featured.length).toBeLessThanOrEqual(4);
  });

  it('every project has a non-empty name and tagline', () => {
    for (const project of projects) {
      expect(project.name.length).toBeGreaterThan(0);
      expect(project.tagline.length).toBeGreaterThan(0);
    }
  });

  it('ICON_BOX_CLASSES has a literal class string for every project color', () => {
    for (const project of projects) {
      expect(ICON_BOX_CLASSES[project.color]).toEqual(
        expect.stringContaining(`bg-${project.color}`)
      );
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest lib/projects.test.ts`
Expected: FAIL with "Cannot find module './projects'"

- [ ] **Step 3: Write the implementation**

Create `lib/projects.ts`:

```typescript
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
    featured: true,
  },
  {
    slug: 'runit',
    name: 'RunIt',
    tagline:
      'Turns a photographed run-of-show document into a live, AI-built event schedule for iPhone and Android — from idea to a shipped v1 in about four days.',
    icon: Calendar,
    color: 'coral',
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
    featured: true,
  },
  {
    slug: 'pet-bio-generator',
    name: 'Pet Bio Generator',
    tagline:
      'Generates adoption-ready pet bios from a photo and a few notes, for shelters and rescues that need copy fast.',
    icon: Heart,
    color: 'mint',
    externalUrl: '/demos/pet-bio-generator',
    featured: false,
  },
  {
    slug: 'resume-writing-agent',
    name: 'AI Resume Writing Agent',
    tagline:
      'Matches a resume against open roles, surfaces the highest-fit jobs, and rewrites the resume around the keywords that get past the screen — built on Microsoft Copilot, in active use org-wide.',
    icon: FileText,
    color: 'coral',
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
    featured: true,
  },
  {
    slug: 'solvd-ai-solutions-site',
    name: 'This Website',
    tagline:
      "The site you're looking at right now — built end to end with Claude Code, from the Services section down to this sentence.",
    icon: Layers,
    color: 'mint',
    featured: false,
  },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest lib/projects.test.ts`
Expected: PASS (6 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/projects.ts lib/projects.test.ts
git commit -m "feat: add portfolio project data"
```

---

### Task 4: Portfolio teaser component, replacing FeaturesGrid + DemoSections on the homepage

**Files:**

- Create: `components/PortfolioTeaser.tsx`
- Test: `components/PortfolioTeaser.test.tsx`
- Delete: `components/FeaturesGrid.tsx`, `components/FeaturesGrid.test.tsx`, `components/DemoSections.tsx`, `App.tsx` (repo-root, orphaned — see below)
- Modify: `pages/index.tsx` (imports, JSX)

**Interfaces:**

- Consumes: `projects` from `lib/projects.ts` (Task 3), filters `.featured`.
- Produces: `export function PortfolioTeaser()` — no props, rendered at `id='work'`, links to `/work`.

Before writing code, confirm `App.tsx` is still dead code (it may have been touched by something else since the spec was written):

```bash
grep -rn "from '\.\./App'\|from '\./App'" --include="*.tsx" --include="*.ts" . | grep -v node_modules
```

Expected: no output (nothing imports it). If this now returns a match, stop and re-scope this task — do not delete a file that's in use.

- [ ] **Step 1: Write the failing test**

Create `components/PortfolioTeaser.test.tsx`:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { PortfolioTeaser } from './PortfolioTeaser';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('PortfolioTeaser', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders the section with id="work"', () => {
    render(<PortfolioTeaser />);
    expect(document.getElementById('work')).toBeInTheDocument();
  });

  it('renders only featured projects', () => {
    render(<PortfolioTeaser />);
    expect(screen.getByText('Persono')).toBeInTheDocument();
    expect(screen.getByText('RunIt')).toBeInTheDocument();
    expect(screen.queryByText('This Website')).not.toBeInTheDocument();
  });

  it('navigates to /work when "See All Work" is clicked', () => {
    render(<PortfolioTeaser />);
    const button = screen.getByRole('button', { name: /see all work/i });
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/work');
  });
});
```

(This test-file-local mock of `next/router` takes precedence over the global one in `jest.setup.js`, letting this test assert on the actual `push` calls — standard Jest module-mock scoping, not a codebase change.)

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest components/PortfolioTeaser.test.tsx`
Expected: FAIL with "Cannot find module './PortfolioTeaser'"

- [ ] **Step 3: Write the implementation**

Create `components/PortfolioTeaser.tsx`:

```typescript
import { useRouter } from 'next/router';
import { OutlineCard, OutlineCardContent } from './ui/outline-card';
import { OutlineButton } from './ui/outline-button';
import { projects, ICON_BOX_CLASSES } from '../lib/projects';

export function PortfolioTeaser() {
  const router = useRouter();
  const featured = projects.filter(project => project.featured);

  return (
    <section id='work' className='py-16 px-6 bg-white'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-black mb-4'>
            Real Apps We&apos;ve Built
          </h2>
          <p className='text-xl text-black max-w-3xl mx-auto leading-relaxed'>
            Not case studies of hypothetical businesses — working software,
            shipped.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
          {featured.map(project => {
            const Icon = project.icon;
            return (
              <OutlineCard key={project.slug} hover accentColor={project.color}>
                <OutlineCardContent className='p-6'>
                  <div
                    className={`${ICON_BOX_CLASSES[project.color]} rounded-lg p-3 w-fit mb-4`}
                    style={{
                      outline: `2px solid var(--color-${project.color})`,
                      outlineOffset: '0',
                    }}
                  >
                    <Icon className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-black mb-2'>
                    {project.name}
                  </h3>
                  <p className='text-base text-black leading-relaxed'>
                    {project.tagline}
                  </p>
                </OutlineCardContent>
              </OutlineCard>
            );
          })}
        </div>

        <div className='text-center'>
          <OutlineButton
            variant='primary'
            size='lg'
            onClick={() => router.push('/work')}
          >
            See All Work
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}
```

(Uses `useRouter().push` rather than wrapping `OutlineButton` in a `<Link>` — `OutlineButton` always renders a `<button>`, and nesting a `<button>` inside an `<a>` is invalid HTML. This also matches the existing codebase's pattern of `onClick`-driven navigation over `<Link>`-wrapping, per `Navigation.tsx` and `ContactSection.tsx`.)

Delete the four obsolete files:

```bash
git rm components/FeaturesGrid.tsx components/FeaturesGrid.test.tsx components/DemoSections.tsx App.tsx
```

Update `pages/index.tsx`. Remove the `FeaturesGrid` import and the `DemoSections` dynamic-import block (lines 7 and 12-34 in the pre-Task-2 version — confirm exact lines with `grep -n "FeaturesGrid\|DemoSections" pages/index.tsx` before editing, since Task 2 already changed line numbers), add a `PortfolioTeaser` import, and replace this block:

```typescript
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
```

with:

```typescript
      <ServicesSection />

      {/* Geometric Divider */}
      <SectionDivider pattern='triangles' color='coral' />

      <PortfolioTeaser />

      {/* Geometric Divider */}
      <SectionDivider pattern='waves' color='lavender' />

      <ContactSection />
```

Also remove the now-unused `dynamic` and `Suspense` imports from the top of the file if nothing else in the file uses them (`grep -n "Suspense\|dynamic(" pages/index.tsx` to confirm before removing).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest components/PortfolioTeaser.test.tsx`
Expected: PASS (3 tests)

Also run: `npm run type-check` — expected: no errors (confirms no other file still references the deleted components).

- [ ] **Step 5: Commit**

```bash
git add components/PortfolioTeaser.tsx components/PortfolioTeaser.test.tsx pages/index.tsx
git commit -m "feat: replace FeaturesGrid/DemoSections with real portfolio teaser"
```

---

### Task 5: `/work` portfolio index page

**Files:**

- Create: `pages/work.tsx`
- Test: `pages/work.test.tsx`

**Interfaces:**

- Consumes: `projects` from `lib/projects.ts` (Task 3, all 7, unfiltered), `Navigation`, `ContactSection` components (unchanged).

- [ ] **Step 1: Write the failing test**

Create `pages/work.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import Work from './work';

describe('Work page', () => {
  it('renders all 7 project names', () => {
    render(<Work />);
    expect(screen.getByText('Persono')).toBeInTheDocument();
    expect(screen.getByText('RunIt')).toBeInTheDocument();
    expect(screen.getByText('Cut & Order Manager')).toBeInTheDocument();
    expect(screen.getByText('Pet Bio Generator')).toBeInTheDocument();
    expect(screen.getByText('AI Resume Writing Agent')).toBeInTheDocument();
    expect(screen.getByText('Life Imitates Thought')).toBeInTheDocument();
    expect(screen.getByText('This Website')).toBeInTheDocument();
  });

  it('links external projects out, and leaves non-linked projects as plain cards', () => {
    render(<Work />);
    expect(
      screen.getByRole('link', { name: /life imitates thought/i })
    ).toHaveAttribute('href', 'https://lifeimitatesthought.quest');
    expect(
      screen.queryByRole('link', { name: /^persono$/i })
    ).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest pages/work.test.tsx`
Expected: FAIL with "Cannot find module './work'"

- [ ] **Step 3: Write the implementation**

Create `pages/work.tsx`:

```typescript
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { ContactSection } from '../components/ContactSection';
import { SectionDivider } from '../components/SectionDivider';
import { OutlineCard, OutlineCardContent } from '../components/ui/outline-card';
import { projects, ICON_BOX_CLASSES } from '../lib/projects';

export default function Work() {
  return (
    <>
      <Head>
        <title>Work — Solvd AI Solutions</title>
        <meta
          name='description'
          content='Real AI apps built by Solvd AI Solutions — journaling tools, event schedulers, business demos, and more.'
        />
      </Head>
      <Navigation />
      <section className='pt-32 pb-16 px-6'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-black mb-4'>
              Real Apps We&apos;ve Built
            </h1>
            <p className='text-xl text-black max-w-3xl mx-auto leading-relaxed'>
              Every project here is real, working software — not a
              hypothetical case study.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {projects.map(project => {
              const Icon = project.icon;
              const card = (
                <OutlineCard hover accentColor={project.color}>
                  <OutlineCardContent className='p-6 h-full flex flex-col'>
                    <div
                      className={`${ICON_BOX_CLASSES[project.color]} rounded-lg p-3 w-fit mb-4`}
                      style={{
                        outline: `2px solid var(--color-${project.color})`,
                        outlineOffset: '0',
                      }}
                    >
                      <Icon className='w-6 h-6 text-white' />
                    </div>
                    <h3 className='text-xl font-semibold text-black mb-2'>
                      {project.name}
                    </h3>
                    <p className='text-base text-black leading-relaxed'>
                      {project.tagline}
                    </p>
                  </OutlineCardContent>
                </OutlineCard>
              );

              if (!project.externalUrl) {
                return <div key={project.slug}>{card}</div>;
              }

              const isExternal = project.externalUrl.startsWith('http');
              return (
                <a
                  key={project.slug}
                  href={project.externalUrl}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className='block'
                >
                  {card}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider pattern='dots' color='mint' />

      <ContactSection />
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest pages/work.test.tsx`
Expected: PASS (2 tests)

Also run: `npm run type-check` — expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add pages/work.tsx pages/work.test.tsx
git commit -m "feat: add /work portfolio index page"
```

---

### Task 6: Contact section rewrite

**Files:**

- Modify: `components/ContactSection.tsx` (full rewrite — currently 67 lines with `gpeterson3030@gmail.com` and stale "Codex" copy)
- Test: `components/ContactSection.test.tsx`

**Interfaces:**

- No new interfaces — same `export function ContactSection()` signature, still renders `<QuoteModal>`.

- [ ] **Step 1: Write the failing test**

Create `components/ContactSection.test.tsx`:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // window.location.href is assigned imperatively by the mailto buttons;
    // replace it with a plain writable object so we can assert on it.
    delete (window as unknown as { location?: unknown }).location;
    (window as unknown as { location: { href: string } }).location = {
      href: '',
    };
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it('mailtos to geoff@persono.app when "Get AI Quote" is clicked, not the old personal Gmail', () => {
    render(<ContactSection />);
    fireEvent.click(screen.getByRole('button', { name: /get ai quote/i }));
    expect(window.location.href).toContain('mailto:geoff@persono.app');
    expect(window.location.href).not.toContain('gpeterson3030');
  });

  it('mailtos to geoff@persono.app when "Discuss a Project" is clicked', () => {
    render(<ContactSection />);
    fireEvent.click(screen.getByRole('button', { name: /discuss a project/i }));
    expect(window.location.href).toContain('mailto:geoff@persono.app');
  });

  it('does not mention Codex anywhere', () => {
    render(<ContactSection />);
    expect(screen.queryByText(/codex/i)).not.toBeInTheDocument();
  });

  it('does not mention payment or checkout', () => {
    render(<ContactSection />);
    expect(screen.queryByText(/payment/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/checkout/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest components/ContactSection.test.tsx`
Expected: FAIL (current copy still says "Explore Codex" / "Discuss Codex Integration")

- [ ] **Step 3: Write the implementation**

Replace the full contents of `components/ContactSection.tsx`:

```typescript
import { useState } from 'react';
import { OutlineButton } from './ui/outline-button';
import { QuoteModal } from './QuoteModal';
import { scrollToSection } from './ui/utils';

const CONTACT_EMAIL = 'geoff@persono.app';

export function ContactSection() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <section id='contact' className='py-140 px-6'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center mb-6'>
            <h2 className='text-3xl md:text-4xl font-bold text-black mb-4'>
              Ready to Get Started?
            </h2>
            <p className='text-xl text-black max-w-4xl mx-auto leading-relaxed'>
              Get an instant AI-powered quote or reach out to talk through
              your project. Pricing and scope get worked out together, not on
              this page.
            </p>
          </div>

          {/* Contact Options */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <OutlineButton
              variant='mint'
              onClick={() => {
                const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=AI Quote Request&body=Hi Geoff,%0D%0A%0D%0AI'm interested in getting an AI quote for my project.%0D%0A%0D%0AProject Description:%0D%0A%0D%0A%0D%0A%0D%0ABest regards,%0D%0A[Your Name]`;
                window.location.href = mailtoLink;
              }}
              className='w-full py-4 text-lg'
            >
              Get AI Quote
            </OutlineButton>

            <OutlineButton
              variant='lavender'
              onClick={() => scrollToSection('services')}
              className='w-full py-4 text-lg'
            >
              Explore Services
            </OutlineButton>

            <OutlineButton
              variant='coral'
              onClick={() => {
                const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=Project Inquiry&body=Hi Geoff,%0D%0A%0D%0AI'd like to talk through a project.%0D%0A%0D%0ACurrent Systems:%0D%0A%0D%0A%0D%0A%0D%0ABest regards,%0D%0A[Your Name]`;
                window.location.href = mailtoLink;
              }}
              className='w-full py-4 text-lg'
            >
              Discuss a Project
            </OutlineButton>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest components/ContactSection.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add components/ContactSection.tsx components/ContactSection.test.tsx
git commit -m "fix: rewrite Contact section — real email, drop stale Codex copy"
```

---

### Task 7: Navigation update

**Files:**

- Modify: `components/Navigation.tsx:36-61` (desktop nav), `components/Navigation.tsx:88-119` (mobile nav)
- Test: `components/Navigation.test.tsx`

**Interfaces:**

- No new interfaces — same `export function Navigation()` signature.

- [ ] **Step 1: Write the failing test**

Create `components/Navigation.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { Navigation } from './Navigation';

describe('Navigation', () => {
  it('renders Work and Services links', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /^work$/i })).toHaveAttribute(
      'href',
      '/work'
    );
    expect(screen.getByRole('link', { name: /^services$/i })).toHaveAttribute(
      'href',
      '#services'
    );
  });

  it('does not render a Codex link', () => {
    render(<Navigation />);
    expect(screen.queryByText(/codex/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest components/Navigation.test.tsx`
Expected: FAIL (no Work/Services links exist yet; Codex link is present)

- [ ] **Step 3: Write the implementation**

In `components/Navigation.tsx`, replace the desktop nav block (current lines 36-61):

```typescript
          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            <a
              href='#about'
              className='text-white hover:text-lavender transition-colors font-medium text-lg cursor-pointer'
            >
              About
            </a>
            <a
              href='#codex-demo'
              className='text-white hover:text-lavender transition-colors font-medium text-lg cursor-pointer'
            >
              Codex
            </a>
            <a
              href='#contact'
              className='text-white hover:text-coral transition-colors font-medium text-lg cursor-pointer'
            >
              Contact
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className='bg-lavender text-white hover:bg-white hover:text-lavender transition-colors font-medium px-4 py-2 text-lg rounded'
            >
              Get Started
            </button>
          </div>
```

with:

```typescript
          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            <a
              href='/work'
              className='text-white hover:text-mint transition-colors font-medium text-lg cursor-pointer'
            >
              Work
            </a>
            <a
              href='#services'
              className='text-white hover:text-lavender transition-colors font-medium text-lg cursor-pointer'
            >
              Services
            </a>
            <a
              href='#about'
              className='text-white hover:text-lavender transition-colors font-medium text-lg cursor-pointer'
            >
              About
            </a>
            <a
              href='#contact'
              className='text-white hover:text-coral transition-colors font-medium text-lg cursor-pointer'
            >
              Contact
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className='bg-lavender text-white hover:bg-white hover:text-lavender transition-colors font-medium px-4 py-2 text-lg rounded'
            >
              Get Started
            </button>
          </div>
```

Replace the mobile menu block (current lines 88-119, inside `{isMenuOpen && (...)}`):

```typescript
            <div className='flex flex-col space-y-4 px-4'>
              <button
                onClick={() => scrollToSection('about')}
                className='text-white hover:text-lavender transition-colors font-medium py-2 text-left'
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('demos')}
                className='text-white hover:text-mint transition-colors font-medium py-2 text-left'
              >
                Demos
              </button>
              <button
                onClick={() => scrollToSection('codex-demo')}
                className='text-white hover:text-lavender transition-colors font-medium py-2 text-left'
              >
                Codex
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className='text-white hover:text-coral transition-colors font-medium py-2 text-left'
              >
                Contact
              </button>
              <OutlineButton
                variant='lavender'
                onClick={() => scrollToSection('contact')}
                className='mt-2 w-full'
              >
                Get Started
              </OutlineButton>
            </div>
```

with:

```typescript
            <div className='flex flex-col space-y-4 px-4'>
              <a
                href='/work'
                className='text-white hover:text-mint transition-colors font-medium py-2 text-left'
              >
                Work
              </a>
              <button
                onClick={() => scrollToSection('services')}
                className='text-white hover:text-lavender transition-colors font-medium py-2 text-left'
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className='text-white hover:text-lavender transition-colors font-medium py-2 text-left'
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className='text-white hover:text-coral transition-colors font-medium py-2 text-left'
              >
                Contact
              </button>
              <OutlineButton
                variant='lavender'
                onClick={() => scrollToSection('contact')}
                className='mt-2 w-full'
              >
                Get Started
              </OutlineButton>
            </div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest components/Navigation.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/Navigation.tsx components/Navigation.test.tsx
git commit -m "fix: update nav for Work/Services, drop Codex link"
```

---

### Task 8: Homepage title, meta description, and go-live cleanup

**Files:**

- Modify: `pages/index.tsx` (add `<Head>` block — the live site currently has no `<title>` or meta description at all, confirmed via `curl -sS -L https://solvdaisolutions.com` returning no `<title>` tag)
- Test: `pages/index.test.tsx`

**Interfaces:**

- No new interfaces — verifies `pages/index.tsx` default export renders a `<Head>` with real title/description content.

- [ ] **Step 1: Write the failing test**

Create `pages/index.test.tsx`:

```typescript
import { render } from '@testing-library/react';
import Home from './index';

describe('Home page', () => {
  it('renders without crashing and includes a real page title in Head', () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
    // next/head injects into document.head outside the render container;
    // assert the component tree itself renders (smoke test for the page).
  });
});
```

(This is a minimal smoke test — `next/head`'s DOM side effects aren't reliably observable in jsdom without additional tooling already present in this repo, so this task is verified primarily by the manual check in Step 4, not by an automated assertion on `document.title`.)

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest pages/index.test.tsx`
Expected: FAIL if `Home` doesn't render (e.g., a typo introduced in earlier tasks) — if it unexpectedly passes already, that's fine, this step is a safety net confirming the page renders before the Head addition, not a strict red/green gate.

- [ ] **Step 3: Write the implementation**

In `pages/index.tsx`, add a `Head` import and block. After the final import line (`import { SectionDivider } from '../components/SectionDivider';`), add:

```typescript
import Head from 'next/head';
```

Then wrap the returned JSX in the `Home()` function. Current:

```typescript
export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
```

Becomes:

```typescript
export default function Home() {
  return (
    <>
      <Head>
        <title>Solvd AI Solutions — Custom AI Apps & AI Adoption Consulting</title>
        <meta
          name='description'
          content='Custom AI applications and AI adoption consulting — workflow audits, training, governance, and the tools to make it stick. Built by Solvd AI Solutions.'
        />
      </Head>
      <Navigation />
      <HeroSection />
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest pages/index.test.tsx`
Expected: PASS

Then manually verify the title renders: run `npm run dev`, open `http://localhost:3000`, and confirm the browser tab shows "Solvd AI Solutions — Custom AI Apps & AI Adoption Consulting" (or view source / `curl -s http://localhost:3000 | grep '<title>'`).

- [ ] **Step 5: Commit**

```bash
git add pages/index.tsx pages/index.test.tsx
git commit -m "fix: add missing page title and meta description"
```

---

## Final verification (after all 8 tasks)

- [ ] Run the full suite: `npm test` — all tests pass.
- [ ] Run `npm run type-check` — no errors.
- [ ] Run `npm run lint` — no errors.
- [ ] Run `npm run build` — production build succeeds.
- [ ] Run `npm run dev`, manually click through: Home page shows Hero → About → Services (all 19 items, 3 categories) → Portfolio teaser (4 featured cards) → Contact (no Codex, no payment mention, correct email in the mailto link). Nav shows Home/Work/Services/About/Contact, no Codex. `/work` shows all 7 projects, with working external links for Cut & Order Manager, Pet Bio Generator, and Life Imitates Thought.
- [ ] Confirm `git log --oneline` shows 8 clean commits, one per task.

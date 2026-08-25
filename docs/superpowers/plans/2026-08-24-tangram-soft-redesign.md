# Tangram × Soft Redesign + Case Studies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage, /work index, and add seven /work/[slug] case-study pages in the user-approved "Tangram × Soft" design system, with the Persono reflection-field hero animation, marquee band wipe, and fluid full-bleed layout.

**Architecture:** The two approved mockups (`docs/superpowers/specs/mockups/homepage.mockup.html`, `docs/superpowers/specs/mockups/case-study.mockup.html`) are the pixel-level design source — components port their markup/inline styles 1:1 to JSX (attributes: `class`→`className`, `style="a: b"`→`style={{a: 'b'}}`, SVG attrs camelCased, HTML entities → JSX text). New shared chrome (`SiteNav`, `SiteFooter`), a reusable `ReflectionField` canvas component, homepage section components under `components/home/`, a typed `lib/caseStudies.ts` content module, and `pages/work/[slug].tsx` via static generation. Legacy pages (demos, contact, payment) remain untouched and keep the legacy utility CSS; redesigned pages set their own fonts/colors explicitly, so the two systems coexist.

**Tech Stack:** Next.js 15.5.23 (Pages Router), React 19, TypeScript, Jest + RTL, hand-authored CSS in `styles/globals.css` (no Tailwind generator — every class used must be explicitly defined; this repo has a history of silent missing-utility bugs).

**Spec:** `docs/superpowers/specs/2026-08-24-tangram-soft-redesign-design.md` (binding; carries tokens, rulings, and responsive baseline).

## Global Constraints

- Tokens verbatim from the spec: paper `#f7f2e8`, ink `#1c1915`, mint `#2aa08f`, coral `#ef6a4b`, lavender `#8d6fe0`, muted `#4a443b`/`#b3aa9c`/`#6e6558`. Fonts: Bricolage Grotesque (display), Outfit (body) via Google Fonts. 3px ink borders; radii 24/20/16; hard offset shadows; pill buttons.
- Contact email everywhere: `geoff@persono.app`. No "Codex" copy. No payment/checkout mention.
- Every task must leave `npm run type-check`, `npm test`, `npm run lint`, AND `npm run build` passing before its commit (build is a hard gate — this repo's Pages Router builds test files placed under `pages/` as routes; never put tests there, use `__tests__/` or `components/*.test.tsx`).
- Case-study copy in Task 5 is factual, gathered material — use it verbatim, do not invent or embellish.
- Section inline padding on redesigned pages: `max(64px, calc((100% - 1312px) / 2))` (24px floor <768px).
- `prefers-reduced-motion: reduce`: reflection field renders one static frame (no rAF loop); marquee band fully revealed without wipe; word-scroll animation disabled via CSS media rule.
- Mockups are desktop-only; apply the spec's responsive baseline (<1024 hero stacks, ≤768 grids collapse to 1 col + hamburger nav).
- Run `npm run format` before each commit (husky pre-commit runs format+lint+type-check and `git add .` — commit messages should describe everything staged).

---

### Task 1: Tokens, fonts, and Tangram layout classes

**Files:**

- Modify: `pages/_document.tsx` (add Google Fonts links in `<Head>`)
- Modify: `styles/globals.css` (append a clearly-delimited `/* === Tangram × Soft (2026 redesign) === */` section)
- Test: `__tests__/tangram-foundation.test.ts`

**Interfaces:**

- Produces: CSS custom properties `--t-paper`, `--t-ink`, `--t-mint`, `--t-coral`, `--t-lavender`; classes `.ts-page`, `.ts-section`, `.ts-display`, `.ts-hero-grid`, `.ts-grid-3`, `.ts-grid-2`, `.ts-arch-flow`, `.ts-hide-mobile`, `.ts-marquee-track`; keyframes `tangram-marquee`. Consumed by every later task.

- [ ] **Step 1: Write the failing test**

Create `__tests__/tangram-foundation.test.ts`:

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';

const css = readFileSync(join(process.cwd(), 'styles', 'globals.css'), 'utf8');
const doc = readFileSync(join(process.cwd(), 'pages', '_document.tsx'), 'utf8');

describe('Tangram × Soft foundation', () => {
  it('defines the five design tokens with exact values', () => {
    expect(css).toContain('--t-paper: #f7f2e8');
    expect(css).toContain('--t-ink: #1c1915');
    expect(css).toContain('--t-mint: #2aa08f');
    expect(css).toContain('--t-coral: #ef6a4b');
    expect(css).toContain('--t-lavender: #8d6fe0');
  });

  it('defines the layout classes and marquee keyframes', () => {
    for (const cls of [
      '.ts-page',
      '.ts-section',
      '.ts-display',
      '.ts-hero-grid',
      '.ts-grid-3',
      '.ts-grid-2',
      '.ts-arch-flow',
      '.ts-marquee-track',
    ]) {
      expect(css).toContain(cls);
    }
    expect(css).toContain('@keyframes tangram-marquee');
  });

  it('respects prefers-reduced-motion for the marquee', () => {
    expect(css).toMatch(
      /prefers-reduced-motion[\s\S]*ts-marquee-track[\s\S]*animation: none/
    );
  });

  it('loads Bricolage Grotesque and Outfit from Google Fonts in _document', () => {
    expect(doc).toContain('fonts.googleapis.com');
    expect(doc).toContain('Bricolage+Grotesque');
    expect(doc).toContain('Outfit');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest __tests__/tangram-foundation.test.ts`
Expected: FAIL (tokens/classes/fonts not present yet)

- [ ] **Step 3: Implement**

In `pages/_document.tsx`, inside `<Head>`:

```tsx
<link rel='preconnect' href='https://fonts.googleapis.com' />
<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
<link
  rel='stylesheet'
  href='https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Outfit:wght@400;500;600&display=swap'
/>
```

Append to `styles/globals.css` (exact block):

```css
/* === Tangram × Soft (2026 redesign) === */
:root {
  --t-paper: #f7f2e8;
  --t-ink: #1c1915;
  --t-mint: #2aa08f;
  --t-coral: #ef6a4b;
  --t-lavender: #8d6fe0;
}

.ts-page {
  background: var(--t-paper);
  color: var(--t-ink);
  font-family: 'Outfit', system-ui, sans-serif;
  overflow-x: hidden;
  min-height: 100vh;
}
.ts-page a {
  color: inherit;
  text-decoration: none;
}
.ts-page a:hover {
  color: var(--t-coral);
}

.ts-display {
  font-family: 'Bricolage Grotesque', 'Outfit', sans-serif;
}

.ts-section {
  padding-left: max(64px, calc((100% - 1312px) / 2));
  padding-right: max(64px, calc((100% - 1312px) / 2));
}

.ts-hero-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 40px;
  align-items: center;
}
.ts-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}
.ts-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}
.ts-arch-flow {
  display: flex;
  align-items: center;
}

.ts-marquee-track {
  display: flex;
  white-space: nowrap;
  width: max-content;
  animation: tangram-marquee 28s linear infinite;
}
@keyframes tangram-marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 1023px) {
  .ts-hero-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 768px) {
  .ts-section {
    padding-left: 24px;
    padding-right: 24px;
  }
  .ts-grid-3,
  .ts-grid-2 {
    grid-template-columns: minmax(0, 1fr);
  }
  .ts-arch-flow {
    flex-direction: column;
    align-items: stretch;
  }
  .ts-hide-mobile {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .ts-marquee-track {
    animation: none;
  }
}
```

- [ ] **Step 4: Verify** — `npx jest __tests__/tangram-foundation.test.ts` PASS; then `npm run type-check && npm test && npm run lint && npm run build` all clean.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: Tangram × Soft tokens, fonts, and layout classes"`

---

### Task 2: ReflectionField component

**Files:**

- Create: `components/ReflectionField.tsx`
- Test: `components/ReflectionField.test.tsx`

**Interfaces:**

- Produces: `export function ReflectionField({ height, fadeTargetId }: { height: number; fadeTargetId?: string })` — an absolutely-positioned canvas (top 0, left 0, width 100%, given height, pointer-events none) with the vertical mask `linear-gradient(to bottom, black 0%, black 52%, transparent 96%)` (both `maskImage` and `WebkitMaskImage`). Consumed by Task 4's Hero.

**Reference:** the complete, already-approved animation logic lives in the `<script data-dc-script>` block of `docs/superpowers/specs/mockups/homepage.mockup.html` — port it verbatim into a `useEffect`: constants (`FOV 460, FAR 680, NEAR 55, SPEED 165`), `TYPES` array with two `'check'` entries, `mkObj` (checks: near-upright angle ±0.35, slow spin ±0.18, accent probability 0.6, lw 0.9–1.8), colors (`lineRGB '28, 25, 21'`, `accentRGB '42, 160, 143'`, `particleRGB '203, 92, 64'`), camera `cx = W/2 + sin(t·0.38)·W·0.010`, `cy = 340 + sin(t·0.55)·5`, depth envelope, the five shape cases including the logo checkmark path (`(-0.333ss, 0.042ss) → (-0.083ss, 0.292ss) → (0.375ss, -0.292ss)`, round caps/joins, restored after), 68 objects, dt clamp 0.05, far-to-near sort, respawn at FAR.

Behavioral additions (also in the mockup script — port, don't reinvent):

- Scroll fade: when `fadeTargetId` given, on scroll compute `op = max(0, 1 - y / (h * 0.85))` from that element's `offsetHeight`; set canvas opacity; pause drawing (early-return in the rAF loop) while `op <= 0.01`, clearing once; resume when scrolled back. Passive listener; run once on mount; remove on unmount.
- **New for production:** `prefers-reduced-motion: reduce` (via `window.matchMedia`) → draw exactly ONE frame (call the draw body once with dt 0) and never start the rAF loop; no scroll listener needed.
- SSR-safety: everything inside `useEffect`; render just the `<canvas>`.

- [ ] **Step 1: Write the failing test**

Create `components/ReflectionField.test.tsx`:

```typescript
import { render } from '@testing-library/react';
import { ReflectionField } from './ReflectionField';

const setMotion = (reduce: boolean) => {
  (window.matchMedia as jest.Mock) = jest.fn().mockImplementation(q => ({
    matches: reduce && q.includes('prefers-reduced-motion'),
    media: q, onchange: null,
    addListener: jest.fn(), removeListener: jest.fn(),
    addEventListener: jest.fn(), removeEventListener: jest.fn(), dispatchEvent: jest.fn(),
  }));
};

describe('ReflectionField', () => {
  let rafSpy: jest.SpyInstance;
  beforeEach(() => {
    rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
      clearRect: jest.fn(), save: jest.fn(), restore: jest.fn(), translate: jest.fn(),
      rotate: jest.fn(), beginPath: jest.fn(), moveTo: jest.fn(), lineTo: jest.fn(),
      closePath: jest.fn(), stroke: jest.fn(), fill: jest.fn(), arc: jest.fn(),
    });
  });
  afterEach(() => rafSpy.mockRestore());

  it('renders a masked, pointer-transparent canvas at the given height', () => {
    setMotion(false);
    const { container } = render(<ReflectionField height={1150} />);
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    expect(canvas).toBeInTheDocument();
    expect(canvas.style.height).toBe('1150px');
    expect(canvas.style.pointerEvents).toBe('none');
    expect(canvas.style.maskImage || canvas.style.webkitMaskImage).toContain('linear-gradient');
  });

  it('starts the animation loop when motion is allowed', () => {
    setMotion(false);
    render(<ReflectionField height={1150} />);
    expect(rafSpy).toHaveBeenCalled();
  });

  it('does NOT start the loop under prefers-reduced-motion', () => {
    setMotion(true);
    render(<ReflectionField height={1150} />);
    expect(rafSpy).not.toHaveBeenCalled();
  });

  it('removes its listeners on unmount', () => {
    setMotion(false);
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<ReflectionField height={1150} fadeTargetId='hero-section' />);
    unmount();
    const removed = removeSpy.mock.calls.map(c => c[0]);
    expect(removed).toEqual(expect.arrayContaining(['resize', 'scroll']));
  });
});
```

- [ ] **Step 2: Run to verify it fails** — module not found.
- [ ] **Step 3: Implement** per the reference above (port the mockup script; wrap in `useEffect` with a cleanup that cancels rAF and removes both listeners; static single frame under reduced motion).
- [ ] **Step 4: Verify** — focused test PASS, then type-check/test/lint/build all clean.
- [ ] **Step 5: Commit** — `feat: ReflectionField canvas (Persono reflection loader port, reduced-motion safe)`

---

### Task 3: SiteNav + SiteFooter

**Files:**

- Create: `components/SiteNav.tsx`, `components/SiteFooter.tsx`
- Test: `components/SiteNav.test.tsx`

**Interfaces:**

- Produces: `export function SiteNav()`, `export function SiteFooter()` — no props. Consumed by Tasks 4 and 6.

**SiteNav** ports the mockup nav (static bar, NOT fixed): logo (Sol + inline-SVG mint check + d, Bricolage 800 28px) wrapped in `<Link href='/'>`; desktop links: `Work` → `<Link href='/work'>`, `Services` and `Contact` → route-aware (on `/` smooth-scroll to `#services`/`#contact` via a click handler that `preventDefault()`s only for plain left-clicks; elsewhere `<Link href='/#services'>` navigates naturally — reuse the exact pattern from the current `components/Navigation.tsx`, which already implements `handleSectionLinkClick` correctly and survived review); `Start a project` pill CTA (ink bg, paper text, `boxShadow: '5px 5px 0 #ef6a4b'`) → same route-aware `/#contact`. **No About link, no Codex** (spec ruling). Mobile ≤768px: hamburger toggling a stacked menu with the same four items (port the toggle pattern from current `Navigation.tsx`; desktop row hidden via `.ts-hide-mobile`, hamburger hidden ≥769px via an inline `<style>` or a `.ts-only-mobile` class you add to globals.css in this task — if you add a class, extend the Task 1 test list accordingly in the same commit).

**SiteFooter**: full-width ink bar, `.ts-section` padding, single row (wraps on mobile): `© 2026 Solvd AI Solutions` · `Custom AI apps & adoption consulting for small business` · `geoff@persono.app`, paper-muted `#b3aa9c` 13px, top border `1px solid #4a443b`.

- [ ] **Step 1: Failing test** — `components/SiteNav.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { SiteNav } from './SiteNav';
import { SiteFooter } from './SiteFooter';

const mockPush = jest.fn();
jest.mock('next/router', () => ({ useRouter: () => ({ pathname: '/', push: mockPush }) }));

describe('SiteNav', () => {
  it('links logo to /, Work to /work, Services and Contact to homepage anchors', () => {
    render(<SiteNav />);
    expect(screen.getByRole('link', { name: /work/i })).toHaveAttribute('href', '/work');
    expect(screen.getByRole('link', { name: /^services$/i })).toHaveAttribute('href', '/#services');
    expect(screen.getByRole('link', { name: /^contact$/i })).toHaveAttribute('href', '/#contact');
  });
  it('has no About link and no Codex text', () => {
    render(<SiteNav />);
    expect(screen.queryByText(/about/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/codex/i)).not.toBeInTheDocument();
  });
});

describe('SiteFooter', () => {
  it('shows the contact email', () => {
    render(<SiteFooter />);
    expect(screen.getByText('geoff@persono.app')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: verify fail** → **Step 3: implement** → **Step 4: full gates** → **Step 5: commit** `feat: Tangram SiteNav and SiteFooter`.

---

### Task 4: Homepage rebuild

**Files:**

- Create: `components/home/Hero.tsx`, `components/home/ServicesCards.tsx`, `components/home/MarqueeBand.tsx`, `components/home/WorkGrid.tsx`, `components/home/ContactBand.tsx`
- Modify: `pages/index.tsx` (full rewrite), `lib/projects.ts` (each project gains `caseHref: '/work/<slug>'`; `pet-bio-generator`'s `externalUrl` → `https://instant-pet-bio-generator.vercel.app`)
- Test: `__tests__/index.test.tsx` (rewrite), `components/home/MarqueeBand.test.tsx`
- Update: `lib/projects.test.ts` (assert `caseHref` present on all 7; keep existing assertions)

Port each section 1:1 from `homepage.mockup.html` (structure, copy, inline styles), using Task 1's classes for grids/section padding and Task 2's `ReflectionField`:

- **Hero.tsx**: outer `position: relative` wrapper containing `<ReflectionField height={1150} fadeTargetId='hero-section' />`, the left text veil overlay (700px tall linear-gradient), then `<div id='hero-section'>` with the `.ts-hero-grid .ts-section` content: badge pill, `AI that earns its keep.` (Bricolage 800, `fontSize: 'clamp(44px, 8vw, 88px)'`, line-height 0.98, letter-spacing -3px), sub-copy, two pill CTAs (`See the work` → `<Link href='/work'>` styled as the coral pill with `7px 7px 0 #1c1915` shadow; `Start a project` → `/#contact`), and the tangram cluster (`.ts-hide-mobile`, port the five shapes + two SVGs exactly). The `#services` section from ServicesCards must render INSIDE the same relative wrapper so the field's fade tail passes behind it (mirror the mockup's nesting: wrapper > canvas + veil + hero-section + services).
- **ServicesCards.tsx**: `id='services'`, `.ts-section`, heading `01 / What we do`, `.ts-grid-3` of the three cards (glyphs: mint circle, coral SVG triangle, lavender rounded square; copy verbatim from mockup).
- **MarqueeBand.tsx**: outer `div` 58px tall relative overflow-hidden; inner absolute `#marquee-reveal` (ink bg, flex, initial `clipPath: 'inset(0 100% 0 0)'` + `WebkitClipPath`); inside it a `.ts-marquee-track` with the two duplicated text runs (verbatim). A `useEffect` scroll listener (passive, run once on mount, removed on cleanup) computes `prog = clamp((vh - rect.top) / (vh * 0.45), 0, 1)` and sets `inset(0 ${(1-prog)*100}% 0 0)`; under `prefers-reduced-motion: reduce`, set the clip to fully revealed once and skip the listener.
- **WorkGrid.tsx**: heading `02 / Real apps, really shipped.` + `All 7 projects →` pill link → `/work`; `.ts-grid-2` of the four featured cards (Persono, RunIt, Life Imitates Thought, Cut & Order Manager) with their motif headers ported exactly; **each card wrapped in `<Link href={project.caseHref}>`** (cards are now real links — the mockup's non-clickable cards were flagged in Phase 1 review; spec's design intent is cards link to case studies).
- **ContactBand.tsx**: `id='contact'`, the rounded-40 ink card with decorative circle + triangle, `03 / Ready when you are.`, copy, `Get a quote` mint pill (mailto `geoff@persono.app` with the Phase-1 subject/body strings from `components/ContactSection.tsx` — copy them over) + visible email, bottom © row.
- **pages/index.tsx**: `<div className='ts-page'>` wrapping `<Head>` (keep the existing title/meta exactly), `SiteNav`, `Hero` (which includes ServicesCards), `MarqueeBand`, `WorkGrid`, `ContactBand`, `SiteFooter`.

- [ ] **Step 1: Failing tests** — rewrite `__tests__/index.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

jest.mock('next/router', () => ({ useRouter: () => ({ pathname: '/', push: jest.fn() }) }));

describe('Home (Tangram × Soft)', () => {
  beforeEach(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue(null);
  });
  it('renders hero, services, marquee, work grid, and contact', () => {
    render(<Home />);
    expect(screen.getByText('AI that earns its keep.')).toBeInTheDocument();
    expect(screen.getByText('AI Enablement & Training')).toBeInTheDocument();
    expect(screen.getByText('Custom AI-Powered Tools')).toBeInTheDocument();
    expect(screen.getByText('Custom Non-AI Digital Tools')).toBeInTheDocument();
    expect(screen.getAllByText(/ADOPTION PLANS/).length).toBeGreaterThan(0);
    expect(screen.getByText('Persono')).toBeInTheDocument();
    expect(screen.getByText('Ready when you are.')).toBeInTheDocument();
    expect(screen.getAllByText('geoff@persono.app').length).toBeGreaterThan(0);
  });
  it('links featured work cards to their case-study pages', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /persono/i })).toHaveAttribute('href', '/work/persono');
    expect(screen.getByRole('link', { name: /runit/i })).toHaveAttribute('href', '/work/runit');
  });
  it('contains no Codex or payment copy', () => {
    render(<Home />);
    expect(screen.queryByText(/codex/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/payment/i)).not.toBeInTheDocument();
  });
});
```

And `components/home/MarqueeBand.test.tsx`:

```typescript
import { render } from '@testing-library/react';
import { MarqueeBand } from './MarqueeBand';

describe('MarqueeBand', () => {
  it('starts fully clipped and reveals based on scroll position', () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }) as never;
    const { container } = render(<MarqueeBand />);
    const reveal = container.querySelector('#marquee-reveal') as HTMLElement;
    expect(reveal).toBeInTheDocument();
    // jsdom: rect.top = 0, innerHeight 768 → prog = min(1, 768/(768*0.45)) = 1 → fully revealed after mount effect
    expect(reveal.style.clipPath).toBe('inset(0 0% 0 0)');
  });
  it('reveals fully without a listener under reduced motion', () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() }) as never;
    const addSpy = jest.spyOn(window, 'addEventListener');
    const { container } = render(<MarqueeBand />);
    const reveal = container.querySelector('#marquee-reveal') as HTMLElement;
    expect(reveal.style.clipPath).toBe('inset(0 0% 0 0)');
    expect(addSpy.mock.calls.map(c => c[0])).not.toContain('scroll');
  });
});
```

- [ ] **Step 2: verify fail** → **Step 3: implement all six files + lib/projects.ts changes** → **Step 4: full gates + `npm run dev` visual check (hero animates, band wipes on scroll, no clip line, fluid width at 1900px, sane at 375px)** → **Step 5: commit** `feat: rebuild homepage in Tangram × Soft with reflection-field hero`.

---

### Task 5: Case-study content module

**Files:**

- Create: `lib/caseStudies.ts`
- Test: `lib/caseStudies.test.ts`
- Modify: `lib/projects.test.ts` only if Task 4 didn't already cover `caseHref`.

**Interfaces (consumed by Task 6):**

```typescript
export interface TimelineEntry {
  label: string;
  text: string;
  now?: boolean;
}
export interface ArchNode {
  title: string;
  sub: string;
  dark?: boolean;
}
export interface Screenshot {
  src: string;
  alt: string;
  dark?: boolean;
}
export interface CaseStudy {
  slug: string;
  name: string;
  oneLiner: string;
  meta: { label: string; value: string }[];
  liveUrl?: string;
  liveLabel?: string;
  screenshots: Screenshot[];
  problem: string;
  story: string;
  timeline: TimelineEntry[];
  architecture: ArchNode[];
  tools: string[];
  accent: 'mint' | 'coral' | 'lavender';
}
export const caseStudies: CaseStudy[]; // order = site order
export function getCaseStudy(slug: string): CaseStudy | undefined;
export function getNextCaseStudy(slug: string): CaseStudy; // wraps around
```

The seven entries, content VERBATIM (fields shown as label → value; write them into the module exactly):

**persono** (accent mint) — oneLiner: `An AI journaling and self-development platform that surfaces patterns in how you think and live — designed and built end to end, web and native iOS.` · meta: TIMELINE `Oct 2025 — now` / COMMITS `700+` / PLATFORMS `Web + iOS` / STATUS `Live beta` · liveUrl `https://www.persono.app`, liveLabel `persono.app` · screenshots: `/work/persono/landing.jpg` ("Persono web landing page"), `/work/persono/mobile-today.jpg` ("Persono iOS app home screen", dark) · problem: `Journaling apps capture what you write and do nothing with it. The patterns — what drains you, what repeats, what actually moved you forward — stay buried in your own archive.` · story: `Persono pairs a fast, private journal with an AI layer that reads across entries — spotting recurring themes, tracking habits and goals, and turning reflection into a daily practice. Built solo from first commit to live beta, then extended to a native iOS app with a home-screen widget.` · timeline: `OCT 2025` First commit. Core journal, dashboard, Supabase auth. / `OCT 21, 2025` Beta QA complete, staging deployed to Vercel. / `SPRING 2026` Security hardening, invite-gated beta, admin dashboard. / `JUL 2026` Native iOS app (Expo), production DB migrations. / `NOW` (now: true) Live beta at persono.app — 700+ commits. · architecture: React 18 SPA (`Vite · Tailwind · Zustand`) → Vercel serverless (`API routes · edge deploys`) → Supabase (`Postgres · Auth · RLS`) → n8n workflows (`AI orchestration`) → Claude API (`insights · patterns`, dark) · tools: REACT 18, VITE, TAILWIND, SUPABASE, VERCEL, N8N, CLAUDE API, EXPO / iOS

**runit** (accent coral) — oneLiner: `Turn any run-of-show document into a living schedule on your phone — photograph the doc, and every block, duty, and alert is built for you.` · meta: TIMELINE `Aug 2026` / V1 SHIPPED IN `4 days` / PLATFORMS `iPhone + Android` / STATUS `TestFlight pipeline` · screenshots: `/work/runit/onboarding.jpg` ("RunIt account creation screen") · problem: `Events run on crumpled run-of-show printouts. When the schedule slips — and it always slips — everyone's copy is instantly wrong, and nobody knows who owns what.` · story: `Photograph the document (or answer a guided survey) and Claude builds the schedule: timed blocks, duties attached to names, alerts before each block. Show mode puts the current block front and center with "running late?" buttons that push everything back and reschedule alerts. Say a change like you'd say it to your stage manager — "push everything after dinner back 15" — and the AI applies it in place. From first commit to release-ready v1 in four days, then grew accounts, crew chat, and guest lists in the week after.` · timeline: `AUG 19, 2026` Core app: AI document scan, guided survey, show mode, exports. / `AUG 19, 2026` RunIt Cloud backend, AI live edits, TestFlight pipeline + CI. / `AUG 20–21` Postgres on Vercel, crew invites, no-account web viewer. / `AUG 22` Security audit; owner-only writes, entitlements. / `AUG 23` (now: true) Accounts, check-in, DMs, guest lists, password reset. · architecture: React Native app (`Expo · TypeScript`) → RunIt Cloud (`Node · Express`) → Postgres (`Neon · versioned sync`) → Claude API (`Sonnet 5 gen · Haiku 4.5 edits`, dark) · tools: REACT NATIVE, EXPO, TYPESCRIPT, NODE, POSTGRES, CLAUDE API, ZOD, EAS / TESTFLIGHT

**cut-order-manager** (accent lavender) — oneLiner: `Order management, inventory tracking, and production scheduling built for cut-to-order and hardware shops — live as a working demo.` · meta: BUILT `Aug 2025` / TYPE `Working demo` / DATA `Sample data mode` / STATUS `Live` · liveUrl `https://demo1.solvdaisolutions.com`, liveLabel `demo1.solvdaisolutions.com` · screenshots: `/work/cut-order-manager/dashboard.jpg` ("Cut & Order Manager dashboard") · problem: `Cutting jobs at a hardware store run on napkin math: pricing guessed per job, tickets that go missing, and stock levels discovered the hard way.` · story: `A focused management system: create a cut job with pricing that accounts for labor and waste, track it through the shop, watch inventory as it depletes, and see the day's numbers at a glance. Deployed as a live sample-data demo anyone can click through.` · timeline: `AUG 2025` Built and deployed as a live demo. / `AUG 2025` Wired into solvdaisolutions.com as a featured demo. / `2026` (now: true) Folded into the Solvd portfolio as a case study. · architecture: React SPA (`demo mode · sample data`) → Vercel (`live at demo1`, dark) · tools: REACT, VERCEL, DEMO MODE

**pet-bio-generator** (accent mint) — oneLiner: `Generates adoption-ready pet bios from photos and a few details — for shelters that need heartwarming copy fast.` · meta: BUILT `Aug 2025` / TYPE `Working demo` / PANELS `5-step flow` / STATUS `Live` · liveUrl `https://instant-pet-bio-generator.vercel.app`, liveLabel `instant-pet-bio-generator.vercel.app` · screenshots: `/work/pet-bio-generator/form.jpg` ("Pet Bio Generator intake form") · problem: `Writing a heartwarming adoption bio is harder than it looks — and at a shelter, the pets whose bios don't get written are the ones that wait longest.` · story: `A five-panel flow: enter the pet's details, add photos, generate an adoption-focused bio, format it as a shareable card, export. The AI drafts; a human approves — the review step is part of the flow, not an afterthought.` · timeline: `AUG 2025` Built and deployed. / `2026` (now: true) Folded into the Solvd portfolio as a case study. · architecture: React app (`5-panel flow`) → AI bio drafting (`photo + details in`) → Vercel (`live demo`, dark) · tools: REACT, VERCEL, AI DRAFTING

**resume-writing-agent** (accent coral) — oneLiner: `A Microsoft 365 Copilot agent that matches a resume against open roles and rewrites it around the keywords that actually get past the screen.` · meta: BUILT `Apr 2026` / PLATFORM `Microsoft 365 Copilot` / REACH `In use org-wide` / TYPE `Custom agent` · screenshots: [] · problem: `Every job posting wants a differently-tuned resume, and keyword screens reject good candidates whose wording doesn't match. Tailoring by hand for every application doesn't scale.` · story: `The agent compares a resume against open postings, surfaces the top three roles the candidate is genuinely qualified for, and mines postings for the same title to find the keywords and phrases that recur. It asks follow-up questions to personalize toward the target role, then writes the resume into a set template. Built with Claude and Microsoft Copilot; shared with colleagues and leadership, now in active use across the organization.` · timeline: `APR 2026` Built as a custom M365 Copilot agent. / `APR 2026` Shared with colleagues and leadership. / `NOW` (now: true) In active use across the organization. · architecture: M365 Copilot agent (`custom instructions`) → Job-posting analysis (`top-3 fit · keyword mining`) → Templated resume output (`follow-up Q&A`, dark) · tools: M365 COPILOT, CUSTOM AGENT, CLAUDE, TEMPLATES

**life-imitates-thought** (accent lavender) — oneLiner: `A city-wide QR scavenger hunt for mindset shifts — scan a code on a bench or a wall, get a reframe, and track which ones you've found.` · meta: LAUNCHED `May 2026` / TYPE `Side quest` / MECHANIC `QR codes in the wild` / STATUS `Live` · liveUrl `https://lifeimitatesthought.quest`, liveLabel `lifeimitatesthought.quest` · screenshots: `/work/life-imitates-thought/home.jpg` ("Life Imitates Thought homepage", dark) · problem: `Paradigm-shifting ideas mostly reach people who already went looking for them. Everyone else walks right past.` · story: `QR codes posted around the city — benches, walls, street corners. Scanning one reveals a single idea: a mindset shift, a reframe, a piece of encouragement, a practical step. An account tracks which "nuggets" you've found, the community votes on submitted shifts, and a leaderboard keeps the side quest going. Life imitates thought: what we hold in our minds shapes what we build in the world.` · timeline: `MAY 2026` Domain registered, site launched. / `2026` Voting and leaderboard live. / `NOW` (now: true) Codes in the wild, quest ongoing. · architecture: QR codes in the wild (`benches · walls · corners`) → Next.js app (`accounts · tracking`) → Vote + leaderboard (`community`, dark) · tools: NEXT.JS, VERCEL, QR CODES

**solvd-ai-solutions-site** (accent mint) — oneLiner: `The site you're reading right now — consulting pitch and living portfolio, built end to end with Claude Code, animation and all.` · meta: FIRST DEPLOY `Aug 2025` / REBUILT `Aug 2026` / STACK `Next.js on Vercel` / STATUS `You're on it` · liveUrl `https://www.solvdaisolutions.com`, liveLabel `solvdaisolutions.com` · screenshots: [] · problem: `A consultancy's site has to be two things at once: a clear pitch for the services, and living proof the person behind it actually ships.` · story: `Version one shipped in Aug 2025. In Aug 2026 it was rebuilt end to end with Claude Code: real services content, this portfolio and its case-study system, a year-old deployment blocker diagnosed and fixed, a site-wide invisible-navigation bug found in the CSS and repaired, and finally this Tangram × Soft redesign — whose hero breathes with the actual processing animation from Persono, checkmarks and all.` · timeline: `AUG 2025` First production deploy. / `AUG 24, 2026` Services + portfolio shipped; deploys unblocked (Next 15.5.23). / `AUG 24, 2026` Site-wide nav CSS bug found and fixed. / `NOW` (now: true) Tangram × Soft redesign — the page you're on. · architecture: Next.js Pages Router (`React 19 · TS`) → Hand-tuned CSS (`no framework generator`) → Vercel (`solvdaisolutions.com`, dark) · tools: NEXT.JS 15, TYPESCRIPT, JEST / RTL, VERCEL, CLAUDE CODE

- [ ] **Step 1: Failing test** — `lib/caseStudies.test.ts`: 7 entries; slugs match `lib/projects.ts` slugs exactly; unique; every entry has non-empty oneLiner/problem/story, ≥2 timeline entries with exactly one `now: true`, ≥2 architecture nodes with exactly one `dark: true`, ≥3 tools; every screenshot `src` starts with `/work/` and the referenced file exists on disk (`fs.existsSync(join(process.cwd(), 'public', src))`); `getNextCaseStudy` wraps (last → first); `resume-writing-agent` and `solvd-ai-solutions-site` have empty screenshots and no `liveUrl` only where specified (resume agent: no liveUrl; site: has liveUrl).
- [ ] **Steps 2–5**: fail → implement → all gates → commit `feat: case-study content module (7 real projects)`.

---

### Task 6: /work/[slug] case-study pages + /work index redesign

**Files:**

- Create: `pages/work/[slug].tsx` (this REPLACES `pages/work.tsx` for the index too — see below), `pages/work/index.tsx`
- Delete: `pages/work.tsx` (its route moves to `pages/work/index.tsx`; `git mv` it and rewrite)
- Test: `__tests__/work-slug.test.tsx`; rewrite `__tests__/work.test.tsx` for the new index

**`pages/work/[slug].tsx`**: `getStaticPaths` from `caseStudies` (fallback false), `getStaticProps` passing the slug's study + next study. Render per `case-study.mockup.html`, structure and styles 1:1, with content bound from the study object:

- `<Head>`: title `` `${study.name} — Work — Solvd AI Solutions` ``, description = oneLiner.
- SiteNav (compact variant not needed — reuse standard), breadcrumb-ish `← ALL WORK` link → `/work` in a slim bar above the case hero (port the mockup's compact top row into the page, minus the duplicate logo since SiteNav already renders it).
- Case hero: WORK / NN kicker (NN = 1-based index, zero-padded), name (Bricolage 800, clamp(48px, 7vw, 84px)), oneLiner, meta card (rows from `study.meta`; when `liveUrl`, append a row LIVE → link with `liveLabel`).
- Screenshots: 2 shots → `2fr 1fr` grid, both frames `height: 528px`, `objectFit: cover`, `objectPosition: top`, second frame dark bg when `shot.dark`; 1 shot → single full-width frame, natural height, max-height 620px cover-top; 0 shots → a full-width motif block (accent bg, 3px ink border, radius 20, hard ink shadow, containing three drifting-shape SVGs echoing the field: a line, the logo check, a triangle — draw inline, paper-colored, static).
- Problem/story `.ts-grid-2`; Timeline: grid `repeat(N, minmax(0,1fr))` (N = entries; stacks via `.ts-grid-*`? No — give it `gridTemplateColumns: `repeat(${n}, minmax(0,1fr))``inline plus a`@media`fallback: add`.ts-timeline { }`collapse rule to globals.css in this task and extend the Task 1 foundation test's class list in the same commit);`now`cell = accent bg, paper text. Architecture`.ts-arch-flow`with coral`→`separators (rotate 90° on mobile via the flex-column collapse — the arrow glyph is fine either way); dark node = ink bg paper text. Tools chips row. Next-project band: ink,`NEXT PROJECT`kicker,`{next.name} →`→`<Link href={'/work/' + next.slug}>`, `Want one like this?`coral pill →`/#contact`, visible `geoff@persono.app`. SiteFooter.

**`pages/work/index.tsx`**: Tangram × Soft rework of the current index: `<Head>` (keep current title/desc), SiteNav, heading block (`Real apps, really shipped.` h1 + sub), `.ts-grid-2` of ALL 7 cards — reuse the same card markup as `components/home/WorkGrid.tsx` cards (extract a shared `components/ProjectCard.tsx` in this task, refactor WorkGrid to use it, so the motif-header card exists ONCE — the Phase-1 review's duplication finding, resolved now that a third consumer exists) — every card `<Link href={caseHref}>`; the three projects without motif headers in the mockup (pet-bio, resume-agent, site) get simple accent-color headers with their initial letter in Bricolage 800 at low opacity (consistent with the P motif). ContactBand is NOT repeated here; page ends with a slim CTA row (`Want one built for you?` + `Start a project` pill → `/#contact`) then SiteFooter.

- [ ] **Step 1: Failing tests** — `__tests__/work-slug.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import CaseStudyPage from '../pages/work/[slug]';
import { getCaseStudy, getNextCaseStudy } from '../lib/caseStudies';

jest.mock('next/router', () => ({ useRouter: () => ({ pathname: '/work/persono', push: jest.fn() }) }));

describe('Case study page', () => {
  it('renders Persono with timeline, architecture, tools, and next link', () => {
    const study = getCaseStudy('persono')!;
    render(<CaseStudyPage study={study} next={getNextCaseStudy('persono')} index={1} />);
    expect(screen.getByRole('heading', { name: 'Persono' })).toBeInTheDocument();
    expect(screen.getByText(/First commit\. Core journal/)).toBeInTheDocument();
    expect(screen.getByText('CLAUDE API')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /runit/i })).toHaveAttribute('href', '/work/runit');
    expect(screen.getAllByText('geoff@persono.app').length).toBeGreaterThan(0);
  });
  it('renders the no-screenshot motif for the resume agent', () => {
    const study = getCaseStudy('resume-writing-agent')!;
    const { container } = render(<CaseStudyPage study={study} next={getNextCaseStudy('resume-writing-agent')} index={5} />);
    expect(container.querySelectorAll('img').length).toBe(0);
    expect(screen.getByRole('heading', { name: 'AI Resume Writing Agent' })).toBeInTheDocument();
  });
});
```

Rewrite `__tests__/work.test.tsx`: all 7 names render; every card is a link whose href is `/work/<slug>`; no `target='_blank'` on any card (external liveUrls now live inside case pages).

- [ ] **Steps 2–5**: fail → implement → all gates (build now emits `/work` and 7 `/work/[slug]` static pages — verify in build output) → commit `feat: case-study pages and Tangram /work index`.

---

### Task 7: Legacy cleanup

**Files:**

- Delete (ONLY after grepping that nothing outside their own tests references them): `components/HeroSection.tsx`, `components/AboutSection.tsx`, `components/ServicesSection.tsx` + test, `components/PortfolioTeaser.tsx` + test, `components/Navigation.tsx` + test, `components/ContactSection.tsx` + test, `components/SectionDivider.tsx`, `components/QuoteModal.tsx` (grep first: `pages/contact.tsx` may import Navigation/ContactSection/QuoteModal — if so, port `pages/contact.tsx` to SiteNav/SiteFooter with its existing copy intact, or update its imports; do not delete anything still referenced)
- Modify: `pages/demos/pet-bio-generator.tsx` — redirect target and fallback link become `https://instant-pet-bio-generator.vercel.app` (title/meta unchanged)
- Keep: `lib/services.ts` + test (spec ruling), all `pages/api/*`, `pages/payment*` (untouched, unlinked), `pages/demos/cut-order-manager.tsx`

- [ ] **Step 1**: `grep -rn "HeroSection\|AboutSection\|ServicesSection\|PortfolioTeaser\|Navigation\|ContactSection\|SectionDivider\|QuoteModal" pages components --include='*.tsx' | grep -v test | grep -v Site` — resolve every hit (port or update imports) before deleting.
- [ ] **Step 2**: Delete the unreferenced files + their tests; update `pages/demos/pet-bio-generator.tsx`.
- [ ] **Step 3**: `grep -rin codex pages components lib` → zero hits.
- [ ] **Step 4**: All four gates pass; `npm run build` route list contains no removed pages and still contains `/contact`, `/demos/*`.
- [ ] **Step 5**: Commit `chore: remove legacy design components, fix pet-bio demo link`.

---

### Task 8: Final QA + metadata polish

**Files:**

- Modify: only what QA findings require (small fixes belong here; anything structural goes back to its task's owner via the controller)

- [ ] Full gates: `npm test` (all suites), `npm run type-check`, `npm run lint`, `npm run build`.
- [ ] `npm run dev` click-through at 1440px AND ~1900px AND 375px: hero animation runs and fades on scroll with no clip line; reduced-motion (emulate via devtools) shows a static frame; marquee words scroll and band wipes in; all 7 case pages render with correct screenshots/motifs; every nav/footer/card/next link resolves (no dead anchors — check `/#services` and `/#contact` from a case page); title tags correct on `/`, `/work`, and two case pages.
- [ ] Confirm `pages/contact.tsx` and `/demos/cut-order-manager` still render.
- [ ] Commit any fixes: `fix: QA polish for Tangram redesign`.

---

## Final verification (after all 8 tasks)

- [ ] `git log --oneline` shows one clean commit per task.
- [ ] Full suite green, build green, lint green, type-check green.
- [ ] The final whole-branch review (per SDD) runs before PR.

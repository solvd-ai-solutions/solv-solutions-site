# Solvd AI Solutions — "Tangram × Soft" full-site redesign + case-study pages (Phase 2)

**Date:** 2026-08-24
**Repo:** `solvd-ai-solutions/solv-solutions-site` (Next.js Pages Router, Next 15.5.23, deploys solvdaisolutions.com via Vercel)
**Design authority:** the user-approved design canvas (https://claude.ai/code/artifact/1d221bdf-f0b0-416f-b24b-238faf634a0f), whose two final artboards are checked into this repo verbatim as `docs/superpowers/specs/mockups/homepage.mockup.html` and `docs/superpowers/specs/mockups/case-study.mockup.html`. **Implementers port from these files — real source, not memory.** The mockups' inline styles carry the exact values (colors, radii, shadows, spacing, type sizes); copy them exactly, never rounding to a framework default.

## What this phase builds

1. **Full homepage rebuild** in the Tangram × Soft design system, per `homepage.mockup.html`, including three approved interactive behaviors:
   - Hero background = **Persono's reflection-field canvas animation** (ported from `~/Persono/persono-a5931031/src/components/insights/PersonoReflectionLoader.jsx` — the mockup's `<script data-dc-script>` block contains the already-adapted Solvd version with checkmark shapes; port THAT). Vertical mask fade (no clip line) with the canvas spanning hero + top of Services; scroll-linked opacity fade (gone ~85% through hero scroll) with rendering paused while invisible; drifting logo checkmarks biased to mint.
   - **Marquee band** below "What we do": words scroll continuously; the black band behind them wipes in left-to-right (clip-path inset) as the strip scrolls into view.
   - **Fluid full-bleed layout**: root is fluid width; every section uses `padding-inline: max(64px, calc((100% - 1312px) / 2))` so backgrounds span the viewport while content stays centered at a 1312px measure.
2. **Seven case-study pages** at `/work/[slug]`, per `case-study.mockup.html`: hero (name, one-liner, meta card), screenshots at matched heights, The problem / The story, Timeline strip, "How it's built" architecture flow + tool chips, next-project footer with contact email.
3. **/work index redesign** in the same system; every project card links to its `/work/[slug]` page.
4. **Site chrome**: new static (non-fixed) top nav + a shared footer, consistent across home, /work, and case pages. Old components with stale copy (AboutSection's/HeroSection's "Codex" text) are deleted with the redesign.

## Design tokens (verbatim)

| Token           | Value                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------- |
| paper (page bg) | `#f7f2e8`                                                                                       |
| ink             | `#1c1915`                                                                                       |
| mint            | `#2aa08f`                                                                                       |
| coral           | `#ef6a4b`                                                                                       |
| lavender        | `#8d6fe0`                                                                                       |
| body text muted | `#4a443b` (on paper), `#b3aa9c` (on ink)                                                        |
| label muted     | `#6e6558`                                                                                       |
| Display font    | `Bricolage Grotesque` (600/700/800), Google Fonts                                               |
| Body font       | `Outfit` (400/500/600), Google Fonts                                                            |
| Card border     | `3px solid #1c1915`, radius 24px (cards) / 20px (frames) / 16px (small boxes)                   |
| Hard shadow     | `10px 10px 0` accent or ink (cards), `7px 7px 0` (buttons), `5px 5px 0` / `4px 4px 0` (nav CTA) |
| Buttons         | pill (`border-radius: 999px`), 3px ink border                                                   |
| Chips           | pill, 2px ink border                                                                            |

Contact email everywhere: **`geoff@persono.app`**. No payment/checkout anywhere.

## The seven case studies (slug → content source)

| Slug                      | Name                    | Live link on page                            | Screenshots (already in `public/work/`)                                |
| ------------------------- | ----------------------- | -------------------------------------------- | ---------------------------------------------------------------------- |
| `persono`                 | Persono                 | persono.app                                  | `persono/landing.jpg`, `persono/mobile-today.jpg`                      |
| `runit`                   | RunIt                   | none public (TestFlight pipeline)            | `runit/onboarding.jpg`                                                 |
| `cut-order-manager`       | Cut & Order Manager     | https://demo1.solvdaisolutions.com           | `cut-order-manager/dashboard.jpg`                                      |
| `pet-bio-generator`       | Pet Bio Generator       | https://instant-pet-bio-generator.vercel.app | `pet-bio-generator/form.jpg`                                           |
| `resume-writing-agent`    | AI Resume Writing Agent | none (internal M365 Copilot agent)           | none — abstract geometric motif block instead                          |
| `life-imitates-thought`   | Life Imitates Thought   | https://lifeimitatesthought.quest            | `life-imitates-thought/home.jpg`                                       |
| `solvd-ai-solutions-site` | This Website            | solvdaisolutions.com                         | screenshot to be captured post-redesign (placeholder motif until then) |

Content (problem/story/timeline/architecture) comes from real material gathered and verified this project: Persono & RunIt from their git histories and READMEs, the demos from this repo's history, Resume Agent and LIT from the owner's descriptions, the site from its own history. The implementation plan carries the final copy verbatim — implementers must not invent or embellish facts.

## Rulings already made (do not re-litigate in implementation)

- **"About" nav link is dropped.** The approved mockup has an About link but no About section; shipping a dead anchor would repeat a Phase-1 review finding. Nav = logo(→/), Work, Services (→/#services, route-aware), Contact (→/#contact, route-aware), Start a project.
- **Homepage services = the mockup's 3 summary cards**, replacing Phase 1's 19-item grid. `lib/services.ts` is kept (unused) for a possible future /services page.
- **Old components deleted with the redesign**: `AboutSection`, old `HeroSection`, old `ServicesSection` rendering, `PortfolioTeaser`, `SectionDivider` usage on redesigned pages (delete files only once nothing references them). This also removes the last "Codex" copy on the site.
- **`pages/demos/pet-bio-generator.tsx`** currently redirects to the homepage ("no live URL yet") — repoint it to https://instant-pet-bio-generator.vercel.app.
- **Responsive baseline** (mockup is desktop-only; these adaptations are in-scope): <1024px the hero stacks (cluster below copy, scaled), services/work grids collapse to 1 column ≤768px, nav collapses to the existing hamburger pattern, hero headline uses `clamp(44px, 8vw, 88px)`, section inline padding floor drops to 24px on small screens. `prefers-reduced-motion: reduce` renders one static reflection-field frame (no rAF loop) and skips the marquee wipe animation (band fully visible).

## Out of scope

- The `pages/api/*` stale-email sweep, coverage threshold, and other parked Phase-1 follow-ups.
- A /services detail page (possible follow-up).
- Blog, CMS, analytics.

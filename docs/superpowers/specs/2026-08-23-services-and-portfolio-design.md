# Solvd AI Solutions website — Services & Portfolio build-out

**Date:** 2026-08-23
**Repo:** `solvd-ai-solutions/solv-solutions-site` (confirmed via matching Vercel build ID against the live `solvdaisolutions.com` deployment — this is the actual deploy source, not the App-Router prototype in `path/to/solvd-website-main/app-website`, which is a dead-end clone not connected to production.)

## Context

The site currently has no real Services section (the `ServicesSection` component exists but isn't imported anywhere — `pages/index.tsx` renders Hero → About → FeaturesGrid → DemoSections → Contact, with no Services in between), no personal project portfolio, no `<title>`/meta description at all, a Contact section that mailtos a personal Gmail with stale "Codex" branding left over from an earlier direction, and an unlinked Stripe/payment flow (`pages/payment.tsx`, `pages/payment-success.tsx`) that nothing currently routes to.

The two "demo" apps embedded on the home page today — Cut & Order Manager and Pet Bio Generator — are real, working software (671-line and 114-line interactive pages, backed by real GitHub repos in the `solvd-ai-solutions` org), not fictional filler, despite their illustrative business framing (a hardware store, an animal shelter).

## Goal

Turn the site into a dual-purpose page: a consulting pitch for Solvd AI Solutions' services, and a portfolio of real AI builds.

**Visual direction:** modern and memorable, not illustration-heavy (no mascot art, no stock-photo hero imagery) — but not plain either. Geometric shapes and patterns, optical-illusion-style visual tricks, smooth transitions, quirky/out-of-the-box touches, and colors that read as authentic rather than corporate-safe. This is consistent with what's already there (the `SectionDivider` component's diagonal/triangle/wave/diamond patterns, the mint/coral/lavender brand palette) — lean into that language rather than introducing a generic card-grid look. This is primarily a content and structure build-out, not a full visual redesign, but every new component built for it (Services cards, the Portfolio teaser, the `/work` grid) should carry this personality rather than defaulting to plain white cards. This direction carries into Phase 2's case-study page design as well.

## Scope decomposition

This is two sequential phases, not one:

- **Phase 1** (this spec, build now): Services section with real content, wired into the home page; a `/work` portfolio index with lightweight teaser cards for all 7 projects; a home-page portfolio teaser (3–4 featured cards linking to `/work`); go-live cleanup (title/meta, Contact rewrite, nav update).
- **Phase 2** (separate spec, after Phase 1 ships): Individual `/work/[slug]` case study pages per project, each with story, timeline, architecture, tools, and screenshots.

Phase 2 is intentionally deferred — 3 of 7 projects don't have screenshots yet (see Screenshots section below), and case-study copywriting for 7 projects is substantial content work independent of the site structure work in Phase 1.

## Site structure (Phase 1)

**Nav:** Home | Work | Services | About | Contact (currently only has About/Contact anchors)

**Home page** (`pages/index.tsx`), top to bottom:

1. Hero (unchanged)
2. About (unchanged — personality/values cards)
3. **Services** (new — wire up `ServicesSection.tsx` with real content, replacing the placeholder "Choose Your Plan" copy)
4. **Portfolio teaser** (new — replaces `FeaturesGrid` + `DemoSections`, which are dropped from the home page per decision below). 3–4 featured project cards (name, one-liner, thumbnail) linking to `/work`.
5. Contact (rewritten — see below)

**`/work` page** (new): full grid of all 7 project cards, each linking to `/work/[slug]` (Phase 2 will make those routes real; Phase 1 can either stub them or omit the link until Phase 2 ships — decide at implementation time based on whether shipping dead links is acceptable for a few days).

**Demo placement:** Cut & Order Manager and Pet Bio Generator move fully into the portfolio (as two of the 7 `/work` entries) and are dropped from the home page. `FeaturesGrid.tsx` and `DemoSections.tsx` become unused once this ships — remove them rather than leaving dead code.

## Services section content

Replace `ServicesSection.tsx` entirely with the three-category list the user provided verbatim (already client-ready copy, not to be paraphrased):

1. **AI Enablement & Training Consulting** — AI Operations Adoption Plan (signature deliverable), Custom AI Training Programs, Workflow Design & Documentation, AI Workspace & Tool Architecture (this is where **Google Drive Prep** lives — Google Drive/AI-project structure, permissions, naming/versioning, source-of-truth rules), AI Governance & Security Policy, Champion/Train-the-Trainer Programs, SOP & Knowledge Capture, AI Cost Efficiency & ROI Review, Phased Implementation Planning, Ongoing Advisory.
2. **Custom AI-Powered Tools** — Custom AI workflows, AI-assisted document generation systems, Persono (referenced here as a product-judgment proof point, in addition to its own full `/work` entry), AI-powered internal tools, Custom instruction sets/"skills."
3. **Custom Non-AI Digital Tools** — Invoicing & payment tracking systems, Trackers & dashboards, Document templates & systems, Small web tools.

Full copy is in the conversation transcript; use it verbatim when implementing — do not summarize or rewrite it.

## Portfolio: 7 projects

| Project                                | Status                            | Timeline source                                                                                                                      | Screenshot status                                                                                                                                                                                                                                                                    |
| -------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Persono                                | Live case study                   | git (`personoapp`, 697 commits, Oct 2025 – present)                                                                                  | ✅ 2 shots: web landing (`public/work/persono/landing.png`), native mobile home (`public/work/persono/mobile-today.png`) — captured this session from real running instances                                                                                                         |
| RunIt                                  | Live case study                   | git (`RunIt`, 45 commits, Aug 19–23 2026 sprint)                                                                                     | ⚠️ 1 shot: onboarding/sign-up screen only (`public/work/runit/onboarding.png`). Deeper screens need either a disposable test login or user-supplied screenshots — completing sign-up would write a real row to the production Postgres backend, which I stopped short of automating. |
| Cut & Order Manager                    | Real demo, folding into portfolio | git history in `solv-solutions-site` + the dedicated `cut-order-manager` org repo                                                    | ❌ Not yet captured — the app is live in this repo (`pages/demos/cut-order-manager.tsx`); straightforward to screenshot in Phase 2.                                                                                                                                                  |
| Pet Bio Generator                      | Real demo, folding into portfolio | same as above (`instant-pet-bio-generator` org repo)                                                                                 | ❌ Not yet captured — same as above, straightforward.                                                                                                                                                                                                                                |
| Copilot AI Resume Writing Agent        | Live case study                   | user-provided (built April 2026, M365 Custom Copilot Agent, in active use org-wide)                                                  | ❌ Cannot be automated — lives in the user's M365 tenant, no tool access. If the user supplies screenshots, they likely contain colleague names and real resume/job content and **must be redacted before use**.                                                                     |
| Life Imitates Thought                  | Live case study                   | domain registered 2026-05-27 (whois); Next.js on Vercel (confirmed via headers)                                                      | ❌ Not yet captured — site is live and publicly reachable, straightforward to screenshot in Phase 2.                                                                                                                                                                                 |
| Solvd AI Solutions website (this site) | Live case study, meta             | git (this repo, active since Aug 2025; the abandoned App-Router prototype is a separate, disconnected fork not part of this history) | ❌ Not yet captured — screenshot once Phase 1 ships so it reflects the actual current state, not the pre-rebuild version.                                                                                                                                                            |

Google Drive Prep is **not** a portfolio entry — it's a service (see AI Workspace & Tool Architecture above), since it's a client engagement offering, not a software build with an architecture/timeline of its own.

## Contact section rewrite

- Email: `geoff@persono.app` (user's explicit choice — not the `solvdaisolutions.com` address discussed earlier in the session).
- Remove "Explore Codex" / "Discuss Codex Integration" — stale branding unrelated to the actual Claude/Anthropic-based stack.
- No payment/checkout mentioned or linked anywhere on the site — client payment happens through direct discussion, not the website. `pages/payment.tsx` and `pages/payment-success.tsx` are already unlinked from every component; leave them as orphaned routes (or remove them) rather than surfacing them.
- Keep the "Get AI Quote" mailto pattern (matches the no-payment-on-site decision) but point it at the new email and drop Codex-specific subject/body copy.

## Go-live cleanup

- Add a real `<title>` and meta description (currently completely absent — confirmed via curling the live production HTML).
- No other placeholder-domain issues found in this repo (the `YOUR-DOMAIN.com` / `hello@your-domain.com` placeholders were specific to the disconnected App-Router prototype and don't apply here).

## Screenshots still needed before Phase 2 can start

Non-blocking for Phase 1 (which doesn't need per-project screenshots), but tracked here so Phase 2 doesn't start blind:

- RunIt: deeper authenticated screens (needs user input — test login or user-supplied)
- Cut & Order Manager, Pet Bio Generator, Life Imitates Thought, Solvd AI site itself: capturable directly, no blockers
- Copilot AI Resume Writing Agent: user-supplied only, redact before use

## Explicitly out of scope for Phase 1

- Visual/brand redesign (explicitly not requested — current aesthetic stays)
- Payment/checkout flow (explicitly excluded from the site)
- Individual `/work/[slug]` case study pages and their content (Phase 2)
- Fixing anything in the disconnected `path/to/solvd-website-main/app-website` prototype (dead end, not deployed anywhere)

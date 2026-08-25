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
      '.ts-timeline',
      '.ts-shot-grid',
      '.ts-marquee-track',
      '.ts-hide-mobile',
      '.ts-only-mobile',
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

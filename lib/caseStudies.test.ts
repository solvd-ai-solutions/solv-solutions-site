import fs from 'fs';
import { join } from 'path';
import { caseStudies, getCaseStudy, getNextCaseStudy } from './caseStudies';
import { projects } from './projects';

describe('caseStudies', () => {
  it('has exactly 7 entries', () => {
    expect(caseStudies).toHaveLength(7);
  });

  it('has slugs that match lib/projects.ts slugs exactly, in site order', () => {
    expect(caseStudies.map(c => c.slug)).toEqual(projects.map(p => p.slug));
  });

  it('has unique slugs', () => {
    const slugs = caseStudies.map(c => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every entry has a non-empty oneLiner, problem, and story', () => {
    for (const cs of caseStudies) {
      expect(cs.oneLiner.length).toBeGreaterThan(0);
      expect(cs.problem.length).toBeGreaterThan(0);
      expect(cs.story.length).toBeGreaterThan(0);
    }
  });

  it('every entry has at least 2 timeline entries with exactly one now:true', () => {
    for (const cs of caseStudies) {
      expect(cs.timeline.length).toBeGreaterThanOrEqual(2);
      const nowCount = cs.timeline.filter(t => t.now === true).length;
      expect(nowCount).toBe(1);
    }
  });

  it('every entry has at least 2 architecture nodes with exactly one dark:true', () => {
    for (const cs of caseStudies) {
      expect(cs.architecture.length).toBeGreaterThanOrEqual(2);
      const darkCount = cs.architecture.filter(a => a.dark === true).length;
      expect(darkCount).toBe(1);
    }
  });

  it('every entry has at least 3 tools', () => {
    for (const cs of caseStudies) {
      expect(cs.tools.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every screenshot src starts with /work/ and exists on disk', () => {
    for (const cs of caseStudies) {
      for (const shot of cs.screenshots) {
        expect(shot.src.startsWith('/work/')).toBe(true);
        const fullPath = join(process.cwd(), 'public', shot.src);
        expect(fs.existsSync(fullPath)).toBe(true);
      }
    }
  });

  it('getCaseStudy returns the matching entry by slug', () => {
    const result = getCaseStudy('persono');
    expect(result?.slug).toBe('persono');
  });

  it('getCaseStudy returns undefined for an unknown slug', () => {
    expect(getCaseStudy('not-a-real-slug')).toBeUndefined();
  });

  it('getNextCaseStudy wraps from the last entry to the first', () => {
    const last = caseStudies[caseStudies.length - 1];
    const next = getNextCaseStudy(last.slug);
    expect(next.slug).toBe(caseStudies[0].slug);
  });

  it('getNextCaseStudy returns the following entry for a non-last slug', () => {
    const first = caseStudies[0];
    const second = caseStudies[1];
    expect(getNextCaseStudy(first.slug).slug).toBe(second.slug);
  });

  it('resume-writing-agent has empty screenshots and no liveUrl', () => {
    const cs = getCaseStudy('resume-writing-agent');
    expect(cs?.screenshots).toEqual([]);
    expect(cs?.liveUrl).toBeUndefined();
  });

  it('solvd-ai-solutions-site has the post-redesign screenshot and a liveUrl', () => {
    const cs = getCaseStudy('solvd-ai-solutions-site');
    expect(cs?.screenshots).toHaveLength(1);
    expect(cs?.screenshots[0].src).toBe(
      '/work/solvd-ai-solutions-site/home.jpg'
    );
    expect(cs?.liveUrl).toBeDefined();
    expect(cs?.liveUrl?.length).toBeGreaterThan(0);
  });
});

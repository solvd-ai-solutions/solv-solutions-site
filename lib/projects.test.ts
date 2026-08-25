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

  it('every project has a caseHref pointing at its own case-study page', () => {
    expect(projects).toHaveLength(7);
    for (const project of projects) {
      expect(project.caseHref).toBe(`/work/${project.slug}`);
    }
  });
});

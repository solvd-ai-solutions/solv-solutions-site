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

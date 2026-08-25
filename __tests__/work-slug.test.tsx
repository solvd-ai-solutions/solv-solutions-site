import { render, screen } from '@testing-library/react';
import CaseStudyPage from '../pages/work/[slug]';
import { getCaseStudy, getNextCaseStudy } from '../lib/caseStudies';

jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/work/persono', push: jest.fn() }),
}));

describe('Case study page', () => {
  it('renders Persono with timeline, architecture, tools, and next link', () => {
    const study = getCaseStudy('persono')!;
    render(
      <CaseStudyPage
        study={study}
        next={getNextCaseStudy('persono')}
        index={1}
      />
    );
    expect(
      screen.getByRole('heading', { name: 'Persono' })
    ).toBeInTheDocument();
    expect(screen.getByText(/First commit\. Core journal/)).toBeInTheDocument();
    expect(screen.getByText('CLAUDE API')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /runit/i })).toHaveAttribute(
      'href',
      '/work/runit'
    );
    expect(screen.getAllByText('geoff@persono.app').length).toBeGreaterThan(0);
  });
  it('renders the no-screenshot motif for the resume agent', () => {
    const study = getCaseStudy('resume-writing-agent')!;
    const { container } = render(
      <CaseStudyPage
        study={study}
        next={getNextCaseStudy('resume-writing-agent')}
        index={5}
      />
    );
    expect(container.querySelectorAll('img').length).toBe(0);
    expect(
      screen.getByRole('heading', { name: 'AI Resume Writing Agent' })
    ).toBeInTheDocument();
  });
});

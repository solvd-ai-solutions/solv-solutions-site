import { render, screen } from '@testing-library/react';
import WorkIndex from '../pages/work/index';
import { projects } from '../lib/projects';

describe('Work index (Tangram × Soft)', () => {
  it('renders all 7 project names', () => {
    render(<WorkIndex />);
    expect(screen.getByText('Persono')).toBeInTheDocument();
    expect(screen.getByText('RunIt')).toBeInTheDocument();
    expect(screen.getByText('Cut & Order Manager')).toBeInTheDocument();
    expect(screen.getByText('Pet Bio Generator')).toBeInTheDocument();
    expect(screen.getByText('AI Resume Writing Agent')).toBeInTheDocument();
    expect(screen.getByText('Life Imitates Thought')).toBeInTheDocument();
    expect(screen.getByText('This Website')).toBeInTheDocument();
  });

  it('links every card to its own /work/<slug> case-study page, and never externally', () => {
    render(<WorkIndex />);
    for (const project of projects) {
      const link = screen.getByRole('link', {
        name: new RegExp(
          project.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'i'
        ),
      });
      expect(link).toHaveAttribute('href', `/work/${project.slug}`);
      expect(link).not.toHaveAttribute('target', '_blank');
    }
  });
});

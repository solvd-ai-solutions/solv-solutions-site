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

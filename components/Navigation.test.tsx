import { render, screen } from '@testing-library/react';
import { Navigation } from './Navigation';

describe('Navigation', () => {
  it('renders Work and Services links', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /^work$/i })).toHaveAttribute(
      'href',
      '/work'
    );
    expect(screen.getByRole('link', { name: /^services$/i })).toHaveAttribute(
      'href',
      '#services'
    );
  });

  it('does not render a Codex link', () => {
    render(<Navigation />);
    expect(screen.queryByText(/codex/i)).not.toBeInTheDocument();
  });
});

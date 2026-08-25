import { render, screen } from '@testing-library/react';
import { SiteNav } from './SiteNav';
import { SiteFooter } from './SiteFooter';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/', push: mockPush }),
}));

describe('SiteNav', () => {
  it('links logo to /, Work to /work, Services and Contact to homepage anchors', () => {
    render(<SiteNav />);
    expect(screen.getByRole('link', { name: /work/i })).toHaveAttribute(
      'href',
      '/work'
    );
    expect(screen.getByRole('link', { name: /^services$/i })).toHaveAttribute(
      'href',
      '/#services'
    );
    expect(screen.getByRole('link', { name: /^contact$/i })).toHaveAttribute(
      'href',
      '/#contact'
    );
  });
  it('has no About link and no Codex text', () => {
    render(<SiteNav />);
    expect(screen.queryByText(/about/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/codex/i)).not.toBeInTheDocument();
  });
});

describe('SiteFooter', () => {
  it('shows the contact email', () => {
    render(<SiteFooter />);
    expect(screen.getByText('geoff@persono.app')).toBeInTheDocument();
  });
});

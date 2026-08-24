import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from './Navigation';

let mockPathname = '/';
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: mockPathname, push: mockPush }),
}));

describe('Navigation', () => {
  beforeEach(() => {
    mockPathname = '/';
    mockPush.mockClear();
  });

  it('renders Work and Services links', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /^work$/i })).toHaveAttribute(
      'href',
      '/work'
    );
    expect(screen.getByRole('link', { name: /^services$/i })).toHaveAttribute(
      'href',
      '/#services'
    );
  });

  it('renders an About link pointing at /#about', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /^about$/i })).toHaveAttribute(
      'href',
      '/#about'
    );
  });

  it('does not render a Codex link', () => {
    render(<Navigation />);
    expect(screen.queryByText(/codex/i)).not.toBeInTheDocument();
  });

  it('links the logo back to the homepage', () => {
    render(<Navigation />);
    expect(
      screen.getByRole('link', { name: /solvd: ai solutions/i })
    ).toHaveAttribute('href', '/');
  });

  it('smooth-scrolls to #services when already on the homepage', () => {
    mockPathname = '/';
    document.body.innerHTML += '<div id="services"></div>';
    const scrollIntoViewMock = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    render(<Navigation />);
    fireEvent.click(screen.getByRole('link', { name: /^services$/i }));

    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  it('does not intercept the Services link when on another page (lets it navigate to /#services)', () => {
    mockPathname = '/work';
    const scrollIntoViewMock = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    render(<Navigation />);
    fireEvent.click(screen.getByRole('link', { name: /^services$/i }));

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { ContactSection } from './ContactSection';

let mockPathname = '/';
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: mockPathname, push: mockPush }),
}));

describe('ContactSection', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    mockPathname = '/';
    mockPush.mockClear();

    // window.location.href is assigned imperatively by the mailto buttons;
    // replace it with a plain writable object so we can assert on it.
    delete (window as unknown as { location?: unknown }).location;
    (window as unknown as { location: { href: string } }).location = {
      href: '',
    };
  });

  afterEach(() => {
    // TS's DOM lib synthesizes `Window.location`'s type as `string & Location`
    // (mismatched get/set types), so a plain `Location` value fails
    // `tsc --noEmit` even though it's fine at runtime. Same escape hatch as
    // the beforeEach cast above.
    (window as unknown as { location: Location }).location = originalLocation;
  });

  it('mailtos to geoff@persono.app when "Get AI Quote" is clicked, not the old personal Gmail', () => {
    render(<ContactSection />);
    fireEvent.click(screen.getByRole('button', { name: /get ai quote/i }));
    expect(window.location.href).toContain('mailto:geoff@persono.app');
    expect(window.location.href).not.toContain('gpeterson3030');
  });

  it('mailtos to geoff@persono.app when "Discuss a Project" is clicked', () => {
    render(<ContactSection />);
    fireEvent.click(screen.getByRole('button', { name: /discuss a project/i }));
    expect(window.location.href).toContain('mailto:geoff@persono.app');
  });

  it('does not mention Codex anywhere', () => {
    render(<ContactSection />);
    expect(screen.queryByText(/codex/i)).not.toBeInTheDocument();
  });

  it('does not mention payment or checkout', () => {
    render(<ContactSection />);
    expect(screen.queryByText(/payment/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/checkout/i)).not.toBeInTheDocument();
  });

  it('smooth-scrolls to #services when "Explore Services" is clicked on the homepage', () => {
    mockPathname = '/';
    document.body.innerHTML += '<div id="services"></div>';
    const scrollIntoViewMock = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    render(<ContactSection />);
    fireEvent.click(screen.getByRole('button', { name: /explore services/i }));

    expect(scrollIntoViewMock).toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('navigates to /#services when "Explore Services" is clicked off the homepage', () => {
    mockPathname = '/work';
    const scrollIntoViewMock = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    render(<ContactSection />);
    fireEvent.click(screen.getByRole('button', { name: /explore services/i }));

    expect(mockPush).toHaveBeenCalledWith('/#services');
    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
  const originalLocation = window.location;

  beforeEach(() => {
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
});

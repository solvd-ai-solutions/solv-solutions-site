import { render } from '@testing-library/react';
import { MarqueeBand } from './MarqueeBand';

describe('MarqueeBand', () => {
  it('starts fully clipped and reveals based on scroll position', () => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }) as never;
    const { container } = render(<MarqueeBand />);
    const reveal = container.querySelector('#marquee-reveal') as HTMLElement;
    expect(reveal).toBeInTheDocument();
    // jsdom: rect.top = 0, innerHeight 768 → prog = min(1, 768/(768*0.45)) = 1 → fully revealed after mount effect
    expect(reveal.style.clipPath).toBe('inset(0 0% 0 0)');
  });
  it('reveals fully without a listener under reduced motion', () => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }) as never;
    const addSpy = jest.spyOn(window, 'addEventListener');
    const { container } = render(<MarqueeBand />);
    const reveal = container.querySelector('#marquee-reveal') as HTMLElement;
    expect(reveal.style.clipPath).toBe('inset(0 0% 0 0)');
    expect(addSpy.mock.calls.map(c => c[0])).not.toContain('scroll');
  });
});

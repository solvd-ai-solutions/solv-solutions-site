import { render } from '@testing-library/react';
import { ReflectionField } from './ReflectionField';

const setMotion = (reduce: boolean) => {
  (window.matchMedia as jest.Mock) = jest.fn().mockImplementation(q => ({
    matches: reduce && q.includes('prefers-reduced-motion'),
    media: q,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
};

describe('ReflectionField', () => {
  let rafSpy: jest.SpyInstance;
  beforeEach(() => {
    rafSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(() => 1);
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
      clearRect: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      translate: jest.fn(),
      rotate: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
      arc: jest.fn(),
    });
  });
  afterEach(() => rafSpy.mockRestore());

  it('renders a masked, pointer-transparent canvas at the given height', () => {
    setMotion(false);
    const { container } = render(<ReflectionField height={1150} />);
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    expect(canvas).toBeInTheDocument();
    expect(canvas.style.height).toBe('1150px');
    expect(canvas.style.pointerEvents).toBe('none');
    expect(canvas.style.maskImage || canvas.style.webkitMaskImage).toContain(
      'linear-gradient'
    );
  });

  it('starts the animation loop when motion is allowed', () => {
    setMotion(false);
    render(<ReflectionField height={1150} />);
    expect(rafSpy).toHaveBeenCalled();
  });

  it('does NOT start the loop under prefers-reduced-motion', () => {
    setMotion(true);
    render(<ReflectionField height={1150} />);
    expect(rafSpy).not.toHaveBeenCalled();
  });

  it('removes its listeners on unmount', () => {
    setMotion(false);
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(
      <ReflectionField height={1150} fadeTargetId='hero-section' />
    );
    unmount();
    const removed = removeSpy.mock.calls.map(c => c[0]);
    expect(removed).toEqual(expect.arrayContaining(['resize', 'scroll']));
  });
});

import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/', push: jest.fn() }),
}));

describe('Home (Tangram × Soft)', () => {
  beforeEach(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue(null);
  });
  it('renders hero, services, marquee, work grid, and contact', () => {
    render(<Home />);
    expect(screen.getByText('AI that earns its keep.')).toBeInTheDocument();
    expect(screen.getByText('AI Enablement & Training')).toBeInTheDocument();
    expect(screen.getByText('Custom AI-Powered Tools')).toBeInTheDocument();
    expect(screen.getByText('Custom Non-AI Digital Tools')).toBeInTheDocument();
    expect(screen.getAllByText(/ADOPTION PLANS/).length).toBeGreaterThan(0);
    expect(screen.getByText('Persono')).toBeInTheDocument();
    expect(screen.getByText('Ready when you are.')).toBeInTheDocument();
    expect(screen.getAllByText('geoff@persono.app').length).toBeGreaterThan(0);
  });
  it('links featured work cards to their case-study pages', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /persono/i })).toHaveAttribute(
      'href',
      '/work/persono'
    );
    expect(screen.getByRole('link', { name: /runit/i })).toHaveAttribute(
      'href',
      '/work/runit'
    );
  });
  it('contains no Codex or payment copy', () => {
    render(<Home />);
    expect(screen.queryByText(/codex/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/payment/i)).not.toBeInTheDocument();
  });
});

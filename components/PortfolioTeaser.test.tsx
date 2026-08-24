import { render, screen, fireEvent } from '@testing-library/react';
import { PortfolioTeaser } from './PortfolioTeaser';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('PortfolioTeaser', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders the section with id="work"', () => {
    render(<PortfolioTeaser />);
    expect(document.getElementById('work')).toBeInTheDocument();
  });

  it('renders only featured projects', () => {
    render(<PortfolioTeaser />);
    expect(screen.getByText('Persono')).toBeInTheDocument();
    expect(screen.getByText('RunIt')).toBeInTheDocument();
    expect(screen.queryByText('This Website')).not.toBeInTheDocument();
  });

  it('navigates to /work when "See All Work" is clicked', () => {
    render(<PortfolioTeaser />);
    const button = screen.getByRole('button', { name: /see all work/i });
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/work');
  });
});

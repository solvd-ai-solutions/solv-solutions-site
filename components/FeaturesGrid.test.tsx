import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeaturesGrid } from './FeaturesGrid';

// Mock window.open
const mockOpen = jest.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockOpen,
});

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  writable: true,
  value: mockScrollIntoView,
});

describe('FeaturesGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all three feature cards', () => {
    render(<FeaturesGrid />);

    expect(screen.getByText('Cut & Order Manager')).toBeInTheDocument();
    expect(screen.getByText('Pet Bio Generator')).toBeInTheDocument();
    expect(screen.getByText('Codex Automation')).toBeInTheDocument();
  });

  it('displays the main heading and description', () => {
    render(<FeaturesGrid />);

    expect(screen.getByText('See Our AI Apps in Action')).toBeInTheDocument();
    expect(
      screen.getByText(/Explore real examples of custom AI applications/)
    ).toBeInTheDocument();
  });

  it('opens Cut & Order Manager demo in new tab', () => {
    render(<FeaturesGrid />);

    // Get the first View Demo button (Cut & Order Manager)
    const cutOrderButton = screen.getAllByText('View Demo')[0];
    fireEvent.click(cutOrderButton);

    expect(mockOpen).toHaveBeenCalledWith(
      'https://demo1.solvdaisolutions.com',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('opens Pet Bio Generator demo in new tab', () => {
    render(<FeaturesGrid />);

    // Get the second View Demo button (Pet Bio Generator)
    const petBioButton = screen.getAllByText('View Demo')[1];
    fireEvent.click(petBioButton);

    expect(mockOpen).toHaveBeenCalledWith(
      'https://www.solvdaisolutions.com/demos/pet-bio-generator',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('scrolls to codex demo section when Codex button is clicked', () => {
    // Mock getElementById
    const mockElement = document.createElement('div');
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    render(<FeaturesGrid />);

    const codexButton = screen.getByText('Explore Codex');
    fireEvent.click(codexButton);

    expect(document.getElementById).toHaveBeenCalledWith('codex-demo');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('applies correct styling classes', () => {
    render(<FeaturesGrid />);

    // Get the section by finding it in the rendered output
    const section = screen
      .getByText('See Our AI Apps in Action')
      .closest('section');
    expect(section).toBeInTheDocument();

    // Check for individual classes instead of combined string
    expect(section).toHaveClass('py-140');
    expect(section).toHaveClass('px-6');
    expect(section).toHaveClass('bg-white');

    const container = section?.querySelector('.container');
    expect(container).toHaveClass('mx-auto', 'max-w-6xl');
  });

  it('renders with correct icon colors', () => {
    render(<FeaturesGrid />);

    const cutOrderIcon = screen
      .getByText('Cut & Order Manager')
      .closest('div')
      ?.querySelector('.bg-mint');
    expect(cutOrderIcon).toBeInTheDocument();

    const petBioIcon = screen
      .getByText('Pet Bio Generator')
      .closest('div')
      ?.querySelector('.bg-lavender');
    expect(petBioIcon).toBeInTheDocument();

    const codexIcon = screen
      .getByText('Codex Automation')
      .closest('div')
      ?.querySelector('.bg-lavender');
    expect(codexIcon).toBeInTheDocument();
  });

  it('handles missing element gracefully when scrolling', () => {
    jest.spyOn(document, 'getElementById').mockReturnValue(null);

    render(<FeaturesGrid />);

    const codexButton = screen.getByText('Explore Codex');
    fireEvent.click(codexButton);

    expect(document.getElementById).toHaveBeenCalledWith('codex-demo');
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });
});

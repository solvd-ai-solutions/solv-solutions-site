import { render, screen } from '@testing-library/react';
import { ServicesSection } from './ServicesSection';

describe('ServicesSection', () => {
  it('renders the section with id="services"', () => {
    render(<ServicesSection />);
    expect(document.getElementById('services')).toBeInTheDocument();
  });

  it('renders all three category headings', () => {
    render(<ServicesSection />);
    expect(
      screen.getByText('AI Enablement & Training Consulting')
    ).toBeInTheDocument();
    expect(screen.getByText('Custom AI-Powered Tools')).toBeInTheDocument();
    expect(screen.getByText('Custom Non-AI Digital Tools')).toBeInTheDocument();
  });

  it('renders the signature deliverable', () => {
    render(<ServicesSection />);
    expect(screen.getByText('AI Operations Adoption Plan')).toBeInTheDocument();
  });

  it('does not render the old placeholder copy', () => {
    render(<ServicesSection />);
    expect(screen.queryByText('Choose Your Plan')).not.toBeInTheDocument();
    expect(screen.queryByText('Codex Automation')).not.toBeInTheDocument();
  });
});

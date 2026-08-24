import { render, screen } from '@testing-library/react';
import Work from './work';

describe('Work page', () => {
  it('renders all 7 project names', () => {
    render(<Work />);
    expect(screen.getByText('Persono')).toBeInTheDocument();
    expect(screen.getByText('RunIt')).toBeInTheDocument();
    expect(screen.getByText('Cut & Order Manager')).toBeInTheDocument();
    expect(screen.getByText('Pet Bio Generator')).toBeInTheDocument();
    expect(screen.getByText('AI Resume Writing Agent')).toBeInTheDocument();
    expect(screen.getByText('Life Imitates Thought')).toBeInTheDocument();
    expect(screen.getByText('This Website')).toBeInTheDocument();
  });

  it('gives external links target=_blank/rel=noopener, leaves the internal demo link plain, and leaves non-linked projects unwrapped', () => {
    render(<Work />);

    // Internal route: pet-bio-generator's externalUrl is a relative path, not really external
    const petBioLink = screen.getByRole('link', {
      name: /pet bio generator/i,
    });
    expect(petBioLink).toHaveAttribute('href', '/demos/pet-bio-generator');
    expect(petBioLink).not.toHaveAttribute('target');
    expect(petBioLink).not.toHaveAttribute('rel');

    // Genuinely external: should get target=_blank + rel=noopener noreferrer
    const lifeImitatesLink = screen.getByRole('link', {
      name: /life imitates thought/i,
    });
    expect(lifeImitatesLink).toHaveAttribute(
      'href',
      'https://lifeimitatesthought.quest'
    );
    expect(lifeImitatesLink).toHaveAttribute('target', '_blank');
    expect(lifeImitatesLink).toHaveAttribute('rel', 'noopener noreferrer');

    const cutOrderLink = screen.getByRole('link', {
      name: /cut & order manager/i,
    });
    expect(cutOrderLink).toHaveAttribute('target', '_blank');
    expect(cutOrderLink).toHaveAttribute('rel', 'noopener noreferrer');

    // No externalUrl at all: should render as a plain (non-clickable) card, not wrapped in <a>
    const personoHeading = screen.getByText('Persono');
    expect(personoHeading.closest('a')).toBeNull();
  });
});

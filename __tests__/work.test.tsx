import { render, screen } from '@testing-library/react';
import Work from '../pages/work';

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

  it('gives external links target=_blank/rel=noopener and leaves non-linked projects unwrapped', () => {
    render(<Work />);

    // pet-bio-generator's externalUrl now points at the standalone Vercel
    // demo (Task 4), so it's genuinely external like the others below.
    const petBioLink = screen.getByRole('link', {
      name: /pet bio generator/i,
    });
    expect(petBioLink).toHaveAttribute(
      'href',
      'https://instant-pet-bio-generator.vercel.app'
    );
    expect(petBioLink).toHaveAttribute('target', '_blank');
    expect(petBioLink).toHaveAttribute('rel', 'noopener noreferrer');

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

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import { useState, type MouseEvent } from 'react';

// Route-aware section links: on the homepage, intercept a plain left-click
// and smooth-scroll to the section instead of letting Link do a real (jump)
// navigation. Anywhere else, let the Link's real '/#<section>' href do its
// job — Next.js lands on the homepage and scrolls to the hash once mounted.
// Ported from components/Navigation.tsx's handleSectionLinkClick, which
// already survived review.
function useSectionLinkClick(closeMenu: () => void) {
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  const handleSectionLinkClick = (
    e: MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    const isPlainLeftClick =
      e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

    if (router.pathname === '/' && isPlainLeftClick) {
      e.preventDefault();
      scrollToSection(sectionId);
    } else {
      closeMenu();
    }
  };

  return handleSectionLinkClick;
}

function LogoMark() {
  return (
    <Link
      href='/'
      className='ts-display'
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 2,
        fontWeight: 800,
        fontSize: 28,
        letterSpacing: '-0.5px',
        color: '#1c1915',
        textDecoration: 'none',
      }}
    >
      <span>Sol</span>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        style={{ alignSelf: 'center' }}
      >
        <path
          d='M4 13 L10 19 L21 5'
          stroke='#2aa08f'
          strokeWidth={4.5}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <span>d</span>
    </Link>
  );
}

export function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const handleSectionLinkClick = useSectionLinkClick(closeMenu);

  // No inline `color` here: `.ts-page a { color: inherit }` already yields
  // ink, and the mockup's plain nav anchors carry no inline color either —
  // that's what lets `.ts-page a:hover { color: var(--t-coral) }` win. An
  // inline color would beat the class rule and permanently block the hover
  // state once this mounts inside `.ts-page` (Task 4). The CTA below is the
  // one link that legitimately needs an inline color (paper-on-ink).
  const linkStyle = {
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 15,
  };
  const ctaStyle = {
    ...linkStyle,
    color: '#f7f2e8',
    background: '#1c1915',
    padding: '13px 28px',
    borderRadius: 999,
    boxShadow: '5px 5px 0 #ef6a4b',
  };

  return (
    <nav
      className='ts-section'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 26,
        paddingBottom: 26,
        borderBottom: '3px solid #1c1915',
        position: 'relative',
      }}
    >
      <LogoMark />

      {/* Desktop links. The outer element carries `.ts-hide-mobile` with NO
          inline style, so the stylesheet's `display: none` (<=768px) can
          actually take effect — an inline `display` here would always win
          over the class and defeat the responsive hide. The flex row lives
          on an inner div instead. */}
      <div className='ts-hide-mobile'>
        <div style={{ display: 'flex', alignItems: 'center', gap: 38 }}>
          <Link href='/work' style={linkStyle}>
            Work
          </Link>
          <Link
            href='/#services'
            onClick={e => handleSectionLinkClick(e, 'services')}
            style={linkStyle}
          >
            Services
          </Link>
          <Link
            href='/#contact'
            onClick={e => handleSectionLinkClick(e, 'contact')}
            style={linkStyle}
          >
            Contact
          </Link>
          <Link
            href='/#contact'
            onClick={e => handleSectionLinkClick(e, 'contact')}
            style={ctaStyle}
          >
            Start a project
          </Link>
        </div>
      </div>

      {/* Mobile hamburger */}
      <button
        type='button'
        className='ts-only-mobile'
        onClick={() => setIsMenuOpen(open => !open)}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          color: '#1c1915',
        }}
      >
        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {isMenuOpen && (
        // `.ts-only-mobile` resolves to `display: inline-flex` at <=768px
        // (see globals.css); combined with `position: absolute` below, the
        // browser blockifies that to `flex`, which is what makes
        // `flexDirection: column` take effect here. Don't drop the
        // `position: absolute` in a later cleanup — it's load-bearing for
        // the flex layout, not just for taking the menu out of flow.
        <div
          className='ts-only-mobile'
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 50,
            flexDirection: 'column',
            gap: 20,
            padding: '24px',
            background: '#f7f2e8',
            borderBottom: '3px solid #1c1915',
          }}
        >
          <Link href='/work' onClick={closeMenu} style={linkStyle}>
            Work
          </Link>
          <Link
            href='/#services'
            onClick={e => handleSectionLinkClick(e, 'services')}
            style={linkStyle}
          >
            Services
          </Link>
          <Link
            href='/#contact'
            onClick={e => handleSectionLinkClick(e, 'contact')}
            style={linkStyle}
          >
            Contact
          </Link>
          <Link
            href='/#contact'
            onClick={e => handleSectionLinkClick(e, 'contact')}
            style={{ ...ctaStyle, textAlign: 'center' as const }}
          >
            Start a project
          </Link>
        </div>
      )}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer
      className='ts-section'
      style={{
        background: '#1c1915',
        borderTop: '1px solid #4a443b',
        paddingTop: 28,
        paddingBottom: 28,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 8,
          color: '#b3aa9c',
          fontSize: 13,
        }}
      >
        <span>© 2026 Solvd AI Solutions</span>
        <span aria-hidden='true'>·</span>
        <span>Custom AI apps &amp; adoption consulting for small business</span>
        <span aria-hidden='true'>·</span>
        <span>geoff@persono.app</span>
      </div>
    </footer>
  );
}

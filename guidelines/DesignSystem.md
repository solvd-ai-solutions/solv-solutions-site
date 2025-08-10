# Solvd AI Solutions Design System

## Brand Colors

Our color palette is designed to convey professionalism, innovation, and trust.

| Color Name | Hex Code  | Usage                                |
| ---------- | --------- | ------------------------------------ |
| Lavender   | `#E6E6FA` | Primary brand color, key actions     |
| Mint       | `#98FF98` | Success states, secondary accents    |
| Sage       | `#BCB88A` | Tertiary accents, subtle backgrounds |
| Black      | `#000000` | Primary text, borders                |
| White      | `#FFFFFF` | Backgrounds, text on dark            |

## Typography

We use Inter as our primary font family across all interfaces.

### Font Sizes

- XS: `12px` - Fine print, captions
- SM: `14px` - Secondary text, labels
- Base: `16px` - Body text
- LG: `18px` - Emphasized body text
- XL: `20px` - Subheadings
- 2XL: `24px` - Section headers
- 3XL: `32px` - Main headers

### Font Weights

- Regular: `400`
- Medium: `500`
- Semibold: `600`
- Bold: `700`

## Spacing System

Consistent spacing helps create visual harmony and improves readability.

| Size | Value  | Usage                           |
| ---- | ------ | ------------------------------- |
| 1    | `4px`  | Minimal spacing, icons          |
| 2    | `8px`  | Tight spacing, small components |
| 3    | `12px` | Default internal padding        |
| 4    | `16px` | Standard spacing                |
| 6    | `24px` | Section spacing                 |
| 8    | `32px` | Large component spacing         |
| 12   | `48px` | Section padding                 |

## Shadows

Elevation system to create depth and hierarchy.

```css
Shadow SM: 0 1px 2px rgba(0, 0, 0, 0.05)  /* Subtle elevation */
Shadow MD: 0 4px 6px rgba(0, 0, 0, 0.1)   /* Medium elevation */
Shadow LG: 0 10px 15px rgba(0, 0, 0, 0.1) /* High elevation */
```

## Transitions

Smooth animations for interactive elements.

```css
Base: all 0.2s ease                           /* Quick, simple transitions */
Smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) /* Complex animations */
```

## Z-Index Scale

Consistent layering system for overlapping elements.

| Layer   | Value | Usage               |
| ------- | ----- | ------------------- |
| Base    | 1     | Default elements    |
| Modal   | 50    | Modal dialogs       |
| Overlay | 100   | Overlays, backdrops |
| Tooltip | 200   | Tooltips, popovers  |

## Layout

### Container

- Max Width: `1200px`
- Padding: `0 24px`

### Breakpoints

- Mobile: `640px`
- Tablet: `768px`
- Desktop: `1024px`
- Large Desktop: `1280px`

## Component Styles

### Buttons

```css
{
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: var(--text-sm);
  transition: var(--transition-base);
}
```

### Cards

```css
{
  border-radius: 12px;
  border: 2px solid var(--color-black);
  background-color: var(--color-white);
  box-shadow: var(--shadow-md);
}
```

### Inputs

```css
{
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-black);
  font-size: var(--text-sm);
  width: 100%;
}
```

### Section Spacing

```css
{
  padding: var(--space-12) 0;
}
```

### Heading Hierarchy

```css
h1 {
  font-size: var(--text-3xl);
  font-weight: 700;
  margin-bottom: var(--space-6);
}

h2 {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-4);
}

h3 {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-3);
}
```

## Best Practices

1. **Consistency**
   - Use design tokens instead of hard-coded values
   - Maintain consistent spacing and typography
   - Follow component patterns

2. **Accessibility**
   - Maintain color contrast ratios (WCAG 2.1)
   - Use semantic HTML elements
   - Include hover and focus states

3. **Responsive Design**
   - Design mobile-first
   - Test across all breakpoints
   - Use fluid typography when appropriate

4. **Performance**
   - Optimize images and assets
   - Minimize CSS bundle size
   - Use system fonts when possible

## Implementation

1. Import design tokens from `globals.css`
2. Use component-specific styles from the UI library
3. Follow spacing and typography guidelines
4. Implement responsive designs using breakpoints
5. Test across different devices and screen sizes

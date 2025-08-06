# Solvd AI Solutions Design System

## Overview
This design system provides a comprehensive guide for creating consistent, accessible, and beautiful interfaces following the Solvd AI Solutions brand guidelines. Built on principles of simplicity, clarity, and professional aesthetics.

## Core Principles
- **High Contrast**: Pure black (#000000) and white (#FFFFFF) for maximum readability
- **Accessible**: 2px outlines and clear visual hierarchy
- **Consistent**: 8px grid system for all spacing and sizing
- **Professional**: Clean, minimal design with purposeful accents
- **Branded**: Distinctive pastel accent colors that reflect innovation

---

## Color Palette

### Primary Colors
```css
--color-black: #000000    /* Primary text, borders, outlines */
--color-white: #FFFFFF    /* Backgrounds, inverted text */
```

### Accent Colors (Pastels)
```css
--color-mint: #4FB3A6     /* Technology, growth, innovation */
--color-coral: #F29E8E    /* Energy, action, CTA buttons */
--color-lavender: #C5A3E0 /* Creativity, premium features */
```

### Usage Guidelines
- **Black**: Primary text, borders, outlines, icons
- **White**: Backgrounds, cards, inverted text on colored buttons
- **Mint**: Tech-focused features, success states, nature/growth themes
- **Coral**: Call-to-action buttons, urgent actions, energy/passion
- **Lavender**: Premium features, creativity tools, luxury touches

### Color Combinations
- **High Energy**: Coral backgrounds with white text
- **Tech Focus**: Mint backgrounds with white text
- **Premium**: Lavender backgrounds with white text
- **Clean**: White backgrounds with black text and colored accents

---

## Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Type Scale (14px base)
```css
--text-xs: 12px    /* Labels, captions */
--text-sm: 14px    /* Body text, descriptions */
--text-base: 16px  /* Default body text */
--text-lg: 18px    /* Emphasized text */
--text-xl: 20px    /* Subheadings */
--text-2xl: 24px   /* H3 headings */
--text-3xl: 28px   /* H2 headings */
--text-4xl: 32px   /* H1 headings */
```

### Font Weights
```css
--font-weight-normal: 400    /* Body text */
--font-weight-medium: 500    /* Emphasized text, labels */
--font-weight-semibold: 600  /* Subheadings, H2-H3 */
--font-weight-bold: 700      /* H1, important emphasis */
```

### Hierarchy Examples
```html
<h1>Main Page Title</h1>          <!-- 32px, bold -->
<h2>Section Heading</h2>          <!-- 28px, semibold -->
<h3>Subsection Title</h3>         <!-- 24px, semibold -->
<h4>Card Title</h4>               <!-- 20px, medium -->
<p>Body text content</p>          <!-- 16px, normal -->
<small>Supporting information</small> <!-- 14px, normal -->
```

---

## Spacing System

### 8px Grid
```css
--space-1: 8px     /* Tight spacing */
--space-2: 16px    /* Default spacing */
--space-3: 24px    /* Comfortable spacing */
--space-4: 32px    /* Section spacing */
--space-5: 40px    /* Large section spacing */
--space-6: 48px    /* Hero section spacing */
--space-8: 64px    /* Major section breaks */
--space-10: 80px   /* Large section breaks */
--space-12: 96px   /* Hero padding */
--space-16: 128px  /* Major layout spacing */
--space-20: 160px  /* Extra large spacing */
```

### Usage Guidelines
- **8px**: Icon gaps, tight element spacing
- **16px**: Default padding, button padding, form field spacing
- **24px**: Card padding, component spacing
- **32px**: Section spacing between components
- **48px+**: Major layout spacing, hero sections

---

## Border & Radius

### Border Radius
```css
--radius-sm: 4px    /* Small elements, badges */
--radius: 8px       /* Default buttons, inputs, cards */
--radius-lg: 12px   /* Large cards, modals */
--radius-xl: 16px   /* Hero sections, major containers */
--radius-full: 9999px /* Pills, circular buttons */
```

### Outlines (Signature Element)
```css
--outline-width: 2px /* Consistent 2px outline thickness */
```

All interactive elements use 2px outlines for accessibility and brand consistency:
- **Black outline**: Default state for buttons, cards, inputs
- **Colored outline**: Hover states (mint, coral, lavender)
- **No outline-offset**: Outlines sit directly on element edge

---

## Components

### Buttons

#### Outline Button (Primary Pattern)
```html
<!-- Primary Button -->
<button class="btn-base bg-white text-black outline-primary hover:outline-mint hover:bg-mint hover:text-white">
  Primary Action
</button>

<!-- Accent Buttons -->
<button class="btn-base bg-mint text-white outline-mint hover:outline-black hover:bg-white hover:text-black">
  Mint Button
</button>

<button class="btn-base bg-coral text-white outline-coral hover:outline-black hover:bg-white hover:text-black">
  Coral Button
</button>

<button class="btn-base bg-lavender text-white outline-lavender hover:outline-black hover:bg-white hover:text-black">
  Lavender Button
</button>
```

#### Button Base Styles
```css
.btn-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-family);
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: var(--outline-width) solid var(--color-black);
  outline-offset: 0;
  border: none;
  text-decoration: none;
}
```

#### Button Sizes
```css
/* Small */
.btn-sm { padding: var(--space-1) var(--space-2); font-size: var(--text-sm); }

/* Medium (Default) */
.btn-md { padding: var(--space-2) var(--space-3); font-size: var(--text-base); }

/* Large */
.btn-lg { padding: var(--space-3) var(--space-5); font-size: var(--text-lg); }
```

### Cards

#### Outline Card (Primary Pattern)
```html
<div class="card-base cursor-pointer hover:outline-mint">
  <div class="p-3">
    <h3 class="text-2xl font-semibold mb-4">Card Title</h3>
    <p class="text-base text-gray-600 mb-6">Card description content</p>
    <button class="btn-base bg-coral text-white">Action</button>
  </div>
</div>
```

#### Card Base Styles
```css
.card-base {
  background-color: var(--color-white);
  border-radius: var(--radius);
  outline: var(--outline-width) solid var(--color-black);
  outline-offset: 0;
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease-in-out;
}
```

### Form Elements

#### Input Fields
```html
<input class="input-base" type="text" placeholder="Enter text">
<textarea class="input-base" rows="4" placeholder="Enter message"></textarea>
<select class="input-base">
  <option>Select option</option>
</select>
```

#### Input Base Styles
```css
.input-base {
  display: block;
  width: 100%;
  border-radius: var(--radius);
  padding: var(--space-2);
  font-family: var(--font-family);
  font-size: var(--text-base);
  line-height: 1.4;
  background-color: var(--color-white);
  color: var(--color-black);
  outline: var(--outline-width) solid var(--color-black);
  outline-offset: 0;
  border: none;
  transition: outline-color 0.2s ease-in-out;
}

.input-base:focus {
  outline-color: var(--color-mint);
}
```

---

## Layout System

### Container
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-3);
}
```

### Grid System
```html
<!-- 2-column grid on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<!-- 3-column grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

### Flexbox Utilities
```html
<!-- Center content -->
<div class="flex items-center justify-center">Centered</div>

<!-- Space between -->
<div class="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Column layout -->
<div class="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## Page Patterns

### Hero Section
```html
<section class="py-20 bg-white">
  <div class="container">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl font-bold mb-6">Hero Title</h1>
      <p class="text-xl mb-8">Supporting description</p>
      <button class="btn-base bg-coral text-white outline-coral">
        Call to Action
      </button>
    </div>
  </div>
</section>
```

### Feature Grid
```html
<section class="py-16 bg-white">
  <div class="container">
    <h2 class="text-3xl font-semibold text-center mb-12">Features</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="card-base cursor-pointer hover:outline-mint">
        <div class="p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="bg-mint rounded-lg p-3 outline-mint">
              <!-- Icon -->
            </div>
            <h3 class="text-2xl font-semibold">Feature Title</h3>
          </div>
          <p class="text-lg mb-6">Feature description</p>
          <button class="btn-base bg-mint text-white">Learn More</button>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Section Divider
```html
<div class="py-8">
  <div class="container">
    <div class="h-px bg-black"></div>
  </div>
</div>
```

---

## Interactive States

### Hover Effects
```css
/* Slide right */
.hover\:translate-x-1:hover { transform: translateX(4px); }

/* Outline color change */
.hover\:outline-mint:hover { outline-color: var(--color-mint); }
```

### Transitions
```css
/* All properties */
.transition-all { transition: all 0.2s ease-in-out; }

/* Colors only */
.transition-colors { 
  transition: color 0.2s ease-in-out, 
              background-color 0.2s ease-in-out, 
              border-color 0.2s ease-in-out; 
}

/* Transform only */
.transition-transform { transition: transform 0.2s ease-in-out; }
```

---

## Accessibility Guidelines

### Outline Usage
- **Always use 2px outlines** on interactive elements
- **No outline-offset** for consistent edge alignment
- **Color-coded hover states** for clear interaction feedback
- **High contrast ratios** maintained across all color combinations

### Focus States
- All interactive elements have visible focus states
- Focus states use mint color for consistency
- Tab navigation is fully supported

### Color Contrast
- Black text on white backgrounds: AAA rating
- White text on accent colors: AA+ rating
- All accent colors tested for accessibility compliance

---

## Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
/* Default: Mobile (0px+) */

/* Tablet */
@media (min-width: 768px) { /* md: */ }

/* Desktop */
@media (min-width: 1024px) { /* lg: */ }
```

### Responsive Patterns
```html
<!-- Mobile stack, desktop row -->
<div class="flex flex-col md:flex-row gap-6">

<!-- 1 column mobile, 2 tablet, 3 desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Hide on mobile, show on desktop -->
<div class="hidden md:block">

<!-- Different text sizes -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">
```

---

## CSS Variable Usage

### Implementing in New Projects
```css
/* Copy all variables from :root */
:root {
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-mint: #4FB3A6;
  --color-coral: #F29E8E;
  --color-lavender: #C5A3E0;
  
  /* Typography */
  --text-base: 16px;
  --font-family: 'Inter', sans-serif;
  
  /* Spacing */
  --space-2: 16px;
  --space-3: 24px;
  
  /* Border */
  --radius: 8px;
  --outline-width: 2px;
}
```

### Using Variables
```css
/* In CSS */
.custom-button {
  background-color: var(--color-mint);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius);
  outline: var(--outline-width) solid var(--color-black);
}

/* In Tailwind config */
module.exports = {
  theme: {
    extend: {
      colors: {
        'mint': 'var(--color-mint)',
        'coral': 'var(--color-coral)',
        'lavender': 'var(--color-lavender)',
      }
    }
  }
}
```

---

## Usage Examples

### Modal/Dialog Pattern
```html
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="card-base max-w-md w-full mx-4">
    <div class="p-6">
      <h3 class="text-2xl font-semibold mb-4">Modal Title</h3>
      <p class="text-base mb-6">Modal content</p>
      <div class="flex gap-3 justify-end">
        <button class="btn-base bg-white text-black">Cancel</button>
        <button class="btn-base bg-coral text-white">Confirm</button>
      </div>
    </div>
  </div>
</div>
```

### Navigation Pattern
```html
<nav class="bg-white border-b-2 border-black sticky top-0 z-50">
  <div class="container">
    <div class="flex items-center justify-between py-4">
      <div class="text-xl font-bold">Logo</div>
      <div class="flex items-center gap-6">
        <a href="#" class="text-base hover:text-mint">About</a>
        <a href="#" class="text-base hover:text-mint">Services</a>
        <button class="btn-base bg-coral text-white">Contact</button>
      </div>
    </div>
  </div>
</nav>
```

### Form Pattern
```html
<form class="card-base max-w-md mx-auto">
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-6">Contact Form</h2>
    
    <div class="mb-4">
      <label class="block text-sm font-medium mb-2">Name</label>
      <input type="text" class="input-base" placeholder="Your name">
    </div>
    
    <div class="mb-4">
      <label class="block text-sm font-medium mb-2">Email</label>
      <input type="email" class="input-base" placeholder="your@email.com">
    </div>
    
    <div class="mb-6">
      <label class="block text-sm font-medium mb-2">Message</label>
      <textarea class="input-base" rows="4" placeholder="Your message"></textarea>
    </div>
    
    <button type="submit" class="btn-base bg-coral text-white w-full">
      Send Message
    </button>
  </div>
</form>
```

---

## Brand Voice in Design

### Visual Personality
- **Professional**: Clean lines, consistent spacing, purposeful design
- **Innovative**: Modern typography, subtle animations, fresh color palette
- **Accessible**: High contrast, clear hierarchy, inclusive design
- **Trustworthy**: Consistent patterns, reliable interactions, stable layout

### Do's and Don'ts

#### Do's ✅
- Use 2px outlines on all interactive elements
- Maintain 8px grid spacing throughout
- Use accent colors purposefully (not decoratively)
- Keep animations subtle and functional
- Ensure high contrast ratios
- Test all interactions and hover states

#### Don'ts ❌
- Don't use gradients or complex shadows
- Don't mix different outline widths
- Don't use accent colors for large background areas
- Don't create inaccessible color combinations
- Don't break the grid system for layout
- Don't use more than 3 accent colors in one design

---

This design system is a living document. Update it as the brand evolves while maintaining consistency and accessibility standards.
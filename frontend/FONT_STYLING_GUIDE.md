# Font Styling Guide - Delta Indonesia Landing Page

## Overview

This project uses a consistent font system across all components:
- **Titles & Headings**: `Inter` (default)
- **Subtitles & Body Text**: `Roboto` (optional, for emphasis)

## Font Configuration

### Fonts Imported

Both fonts are imported from Google Fonts in `layout.tsx`:

```tsx
import { Inter, Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
```

### CSS Variables

Roboto is available as a CSS variable in all components:

```css
:root {
  --font-roboto: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, sans-serif;
}
```

## Usage Guidelines

### 1. Default (Inter) - No Action Needed

All text uses Inter by default through the `body` className in `layout.tsx`.

```tsx
<h1>This uses Inter (default)</h1>
<p>This also uses Inter (default)</p>
```

### 2. Using Roboto for Subtitles

#### Method A: Inline CSS (Quick)

```tsx
<h2 style={{ fontFamily: 'var(--font-roboto)' }}>
  Subtitle using Roboto
</h2>
```

#### Method B: Tailwind Class (Recommended)

Use the `font-roboto` Tailwind class:

```tsx
<h2 className="font-roboto">
  Subtitle using Roboto
</h2>
```

#### Method C: Global CSS Class

Add the `.subtitle` class:

```tsx
<h2 className="subtitle">
  Subtitle using Roboto
</h2>
```

### 3. Component Examples

#### Example 1: Hero Section

```tsx
<h1 className="text-4xl font-bold">Main Title in Inter</h1>
<h2 className="font-roboto text-2xl">Subtitle in Roboto</h2>
<p>Body text in Inter (default)</p>
```

#### Example 2: About Section

```tsx
<h2 className="text-3xl md:text-4xl font-bold">Tentang Kami</h2>
<h3 className="font-roboto text-xl">Our Story</h3>
<p className="text-gray-700">Description in Inter...</p>
```

#### Example 3: Services Section

```tsx
<section>
  <h2 className="text-3xl font-bold">Services</h2>
  <div className="grid grid-cols-3 gap-6">
    {services.map((service) => (
      <div key={service.id}>
        <h3 className="font-roboto text-lg font-semibold">{service.title}</h3>
        <p>{service.description}</p>
      </div>
    ))}
  </div>
</section>
```

## Font Weight Options

### Inter
- Regular: 400
- Bold: 700
- Default for headings and body text

### Roboto
- Regular: 400
- Medium: 500
- Bold: 700
- Available for all weights

### Using Font Weights

```tsx
<!-- Inter (default) -->
<h1 className="font-bold">Bold Title (700)</h1>
<p className="font-normal">Regular text (400)</p>

<!-- Roboto -->
<h2 className="font-roboto font-semibold">Medium Subtitle (500)</h2>
<p className="font-roboto font-bold">Bold Roboto text (700)</p>
```

## Tailwind Utility Classes

New utility classes added to `tailwind.config.js`:

```tailwind
font-inter    /* Apply Inter font */
font-roboto   /* Apply Roboto font */
```

## Global Styles

### All Headings (h1-h6)

Automatically use **Inter** via `globals.css`:

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Helvetica Neue", sans-serif;
  font-weight: 700;
}
```

### Special Classes

```css
.subtitle         /* Roboto font family */
.subtitle-text   /* Roboto font family */
.sub-heading     /* Roboto font family */
```

## Best Practices

✅ **DO:**
- Use Inter for main headings (h1, h2, h3)
- Use Roboto for subheadings and secondary titles
- Keep font consistency within similar components
- Use Tailwind classes (`font-inter`, `font-roboto`) for maintainability

❌ **DON'T:**
- Mix multiple fonts in a single heading
- Use inline styles unless necessary
- Override the global font family for body text
- Use undeclared font families

## Testing Your Changes

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Check fonts are loading correctly in DevTools:
   - Open Chrome DevTools → Elements tab
   - Select text and check Computed Styles
   - Verify `font-family` shows "Inter" or "Roboto"

3. Test on different screen sizes to ensure fonts scale properly

## Troubleshooting

### Fonts not loading?

1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart dev server
3. Check that `layout.tsx` imports fonts correctly
4. Verify `globals.css` is imported in layout

### Font looks different on production?

1. Ensure both fonts are properly imported in `next/font/google`
2. Check that CSS variables are defined in `globals.css`
3. Verify Tailwind config includes font families

## References

- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Tailwind CSS Font Family](https://tailwindcss.com/docs/font-family)
- [Inter Font](https://rsms.me/inter/)
- [Roboto Font](https://fonts.google.com/specimen/Roboto)

## Questions?

For questions about font styling, refer to:
- `frontend/src/app/layout.tsx` - Font imports
- `frontend/src/app/globals.css` - Font definitions
- `frontend/tailwind.config.js` - Tailwind font configuration

# 🔍 Font System Verification Checklist

**Purpose**: Verify that ONLY Inter and Roboto fonts are being used across the entire application.

---

## Quick Verification Steps

### Step 1: Browser DevTools Check

```
1. Open the website in Chrome/Firefox
2. Press F12 to open DevTools
3. Go to "Network" tab
4. Filter by "font" or "woff"
5. Refresh the page
```

✅ **Expected**: Should see ONLY these files:
- `inter-*.woff2` (from Google Fonts)
- `roboto-*.woff2` (from Google Fonts)

❌ **Wrong**: If you see:
- Arial, Helvetica, Segoe UI, system fonts
- Other fonts (Poppins, Montserrat, etc.)

---

### Step 2: Element Font Inspection

```
1. Right-click any heading on the page
2. Select "Inspect" or "Inspect Element"
3. Look at the "Computed" tab (or "Styles" tab)
4. Find the "font-family" property
5. Check the value
```

✅ **Expected Headings**: 
```css
font-family: "Inter", sans-serif;
```

✅ **Expected Subtitles** (with `font-roboto` class):
```css
font-family: "Roboto", sans-serif;
```

❌ **Wrong**: If you see:
- System fonts (-apple-system, BlinkMacSystemFont, etc.)
- Other font names

---

### Step 3: Font Files Check

```
1. DevTools → Network tab
2. Filter by "woff"
3. Look at all font files loaded
```

✅ **Correct Count**:
- 1 Inter file (usually `inter-regular-*.woff2`)
- 1-2 Roboto files (regular and bold variants)
- **Total: 2-3 font files maximum**

❌ **Wrong**:
- More than 3 font files
- Files from multiple font services
- Missing fonts (fonts not loading at all)

---

## Detailed Component Checks

### Hero Section
```tsx
// Inspect <h1> and <h2> tags
Expected: font-family: "Inter"
```

### Navbar/Navigation
```tsx
// Inspect menu items and logo text
Expected: font-family: "Inter"
```

### Services Section
```tsx
// Check <h4> (service titles)
Expected: font-family: "Inter"
// Optional: <h3> (section title) can use Roboto
```

### Training Cards
```tsx
// Check card titles
Expected: font-family: "Inter"
```

### Testimonials
```tsx
// Check quote text and names
Expected: font-family: "Inter"
```

### Footer
```tsx
// Check all text elements
Expected: font-family: "Inter"
```

---

## CSS File Verification

### Check globals.css

```bash
# Look for system font fallbacks
grep -i "apple-system\|BlinkMacSystemFont\|Segoe UI" frontend/src/app/globals.css
```

✅ **Expected Output**: Nothing (no matches found)

❌ **Wrong Output**: Any matches indicate system font fallbacks still present

### Check for font-family overrides

```bash
# Search for any font-family declarations
grep -n "font-family" frontend/src/app/globals.css
```

✅ **Expected Output**:
```
Using var(--font-inter) or var(--font-roboto) ONLY
No other font names
```

---

## Common Issues & Fixes

### Issue: Different Fonts Still Showing

**Checklist**:
- [ ] Did you hard refresh (Ctrl+Shift+R)?
- [ ] Did you clear browser cache?
- [ ] Is globals.css properly imported in layout.tsx?
- [ ] Are CSS variables defined correctly?
- [ ] Check DevTools Network tab - are fonts loading?

**Fix**:
```bash
# Restart dev server
npm run dev

# Hard refresh in browser
Ctrl+Shift+R (or Cmd+Shift+R on Mac)
```

### Issue: Fonts Not Loading at All

**Checklist**:
- [ ] Check DevTools Network tab for 404 errors
- [ ] Is layout.tsx importing fonts correctly?
- [ ] Are Google Fonts accessible from your location?
- [ ] Check for Content Security Policy (CSP) issues

### Issue: Wrong Font on Specific Element

**Checklist**:
- [ ] Is element using `className="font-roboto"`?
- [ ] Check CSS specificity - is something overriding it?
- [ ] Look for inline styles that might override
- [ ] Check for !important flags

---

## Test Cases

### Test 1: Heading Font
```tsx
<h1>This should be Inter</h1>
Expected: Inter
How to verify: DevTools → Inspect → Computed → font-family
```

### Test 2: Roboto Subtitle
```tsx
<h2 className="font-roboto">This should be Roboto</h2>
Expected: Roboto
How to verify: DevTools → Inspect → Computed → font-family
```

### Test 3: Paragraph Text
```tsx
<p>Body text should be Inter</p>
Expected: Inter
How to verify: DevTools → Inspect → Computed → font-family
```

### Test 4: Form Elements
```tsx
<button>Buttons should be Inter</button>
<input placeholder="Inputs should be Inter" />
Expected: Inter for both
How to verify: DevTools → Inspect each element
```

### Test 5: Network Request
```
Open DevTools → Network tab
Filter: "woff" or "font"
Expected: Only inter-*.woff2 and roboto-*.woff2
Wrong: Any other fonts
```

---

## Automated Verification

### Check if fonts are loaded correctly

```javascript
// Run in browser console (F12 → Console tab)

const fonts = document.fonts;
console.log("Loaded fonts:");
fonts.forEach(font => {
  console.log(`${font.family}: ${font.style} ${font.weight}`);
});
```

✅ **Expected Output**:
```
Loaded fonts:
Inter: normal 400
Inter: normal 700
Roboto: normal 400
Roboto: normal 500
Roboto: normal 700
```

---

## Pre-Deployment Checklist

Before deploying to production:

- [ ] All heading fonts are Inter
- [ ] Body text is Inter
- [ ] Form elements use Inter
- [ ] No system font fallbacks in CSS
- [ ] Only 2-3 font files loaded from Google Fonts
- [ ] Network tab shows no font 404 errors
- [ ] Subtitles using Roboto are correctly styled
- [ ] Fonts render correctly on all pages
- [ ] Mobile fonts look correct
- [ ] No font-loading lag or FOUC (Flash of Unstyled Content)

---

## Troubleshooting Guide

### Q: Why do fonts look different on different pages?
**A**: Check if all pages import `globals.css` properly

### Q: Why is one element using a different font?
**A**: Check for inline styles or component-level CSS overrides

### Q: How do I verify fonts are actually loading from Google Fonts?
**A**: 
1. DevTools → Network tab
2. Filter by "font"
3. Should see requests to `fonts.gstatic.com`

### Q: Can I add more fonts?
**A**: Yes, but edit `layout.tsx` and `globals.css`. Update documentation.

### Q: Why is performance slow?
**A**: If too many font variants are loaded, reduce weights in `layout.tsx`

---

## Verification Results

Use this table to document your verification:

| Component | Expected Font | Verified | Date | Notes |
|-----------|---------------|----------|------|-------|
| Hero H1 | Inter | [ ] | | |
| Hero H2 | Inter | [ ] | | |
| Navbar | Inter | [ ] | | |
| Services | Inter | [ ] | | |
| Training | Inter | [ ] | | |
| Testimonials | Inter | [ ] | | |
| Footer | Inter | [ ] | | |
| Network (fonts count) | 2-3 files | [ ] | | |
| System fallbacks | None | [ ] | | |
| Mobile view | Inter + Roboto | [ ] | | |

---

## Sign-Off

**Verification Date**: _______________  
**Verified By**: _______________  
**Status**: ✅ PASS / ❌ FAIL

---

**Last Updated**: December 10, 2025  
**Font System Status**: INTER + ROBOTO ONLY (No System Fonts)

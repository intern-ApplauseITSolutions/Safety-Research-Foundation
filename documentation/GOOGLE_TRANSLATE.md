# Google Translate Integration

## Overview
Google Translate has been integrated into the Safety Research Foundation website to make content accessible in multiple Indian languages.

## Features

### Supported Languages
The translate widget supports the following languages:
- English (en) - Default
- Hindi (hi)
- Marathi (mr)
- Kannada (kn)
- Tamil (ta)
- Telugu (te)
- Gujarati (gu)
- Bengali (bn)
- Malayalam (ml)
- Punjabi (pa)
- Odia (or)
- Assamese (as)

### Implementation Locations

**Floating Button** - Bottom Right Corner
   - Fixed position floating button on all pages
   - Appears in the bottom right corner with a language icon
   - Shows "भाषा" (Language in Hindi) badge
   - Clicking opens a panel with language selection
   - Includes backdrop overlay for better UX
   - Smooth animations and transitions
   - Responsive design for mobile devices

## Component Details

### FloatingTranslate Component
**Location:** `src/components/common/FloatingTranslate.jsx`

**Features:**
- Floating button with language icon
- Expandable panel with language selection
- Backdrop overlay when open
- Smooth animations
- Auto-closes when clicking outside
- Shows supported languages info

**Usage:**
```jsx
import FloatingTranslate from './components/common/FloatingTranslate';

// Add to App.jsx or any layout component
<FloatingTranslate />
```

**Styling:**
- Primary color button with hover effects
- White panel with shadow
- Responsive design
- Z-index: 200 (appears above all content)

## Styling

Custom CSS has been added to `src/index.css` to:
- Hide the Google Translate banner
- Style the dropdown to match the website theme
- Make the widget responsive
- Remove Google branding elements
- Improve the overall user experience

## How It Works

1. The component loads the Google Translate script dynamically
2. It initializes with the specified language options
3. Users can select their preferred language from the dropdown
4. The entire page content is translated automatically
5. The translation persists across page navigation

## Notes

- Translation is done client-side by Google
- Some technical terms may not translate perfectly
- The original English content is always available by selecting "English" from the dropdown
- The widget is free to use and doesn't require an API key

## Future Enhancements

Potential improvements:
- Add more regional languages
- Remember user's language preference
- Add language-specific content variations
- Implement server-side translation for better SEO

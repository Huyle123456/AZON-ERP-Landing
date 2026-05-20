# AZON - Multi-Language Setup

This project uses `next-intl` for internationalization (i18n) support with Vietnamese (vi) and English (en).

## Setup Files

- **messages/vi.json** - Vietnamese translations
- **messages/en.json** - English translations
- **src/i18n/routing.ts** - Locale configuration
- **src/i18n/request.ts** - Message loading configuration
- **middleware.ts** - Locale detection and routing middleware
- **next.config.ts** - Next.js configuration with i18n plugin

## How to Add New Translations

### 1. Add keys to messages files

Edit `messages/vi.json` and `messages/en.json`:

```json
{
  "navSection": {
    "home": "Trang chủ",
    "about": "Về chúng tôi"
  }
}
```

### 2. Use translations in components

Ensure the component has `"use client"` at the top:

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("navSection");

  return <button>{t("home")}</button>;
}
```

### 3. Language Switching

The Header component includes a language switcher dropdown. Users can change language by clicking the locale button (VI/EN) in the top right.

## URL Structure

- Vietnamese: `/vi/...` (default)
- English: `/en/...`

Example:

- https://example.com/vi
- https://example.com/en

## Supported Languages

- **vi** - Tiếng Việt (Vietnamese)
- **en** - English

## Current Translated Components

- **Header** - Navigation with language switcher
- **Button** - Interactive button component

## Components with Hardcoded Content

These components currently use hardcoded Vietnamese content. To add i18n support, add translation keys to `messages/*.json` and replace hardcoded text with `t()` function calls:

- HeroSection
- Footer
- FeaturesGrid
- Differentiators
- SocialProof
- FeatureDeepDive
- CTASection
- ESSHighlight

## Development

Run dev server:

```bash
npm run dev
```

Visit:

- http://localhost:3000/vi (Vietnamese)
- http://localhost:3000/en (English)

## Building

```bash
npm run build
```

Note: If you encounter SSG-related build issues, components using `useTranslations()` should be marked with `"use client"` and pages using multiple translated components should have `export const dynamic = 'force-dynamic'`.

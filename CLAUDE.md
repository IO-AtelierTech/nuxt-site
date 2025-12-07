# Claude Code Guidelines

Project-specific guidelines for Claude Code when working on this Nuxt template.

## Architecture

```
app/
├── config/brand.ts      # Single source of truth for colors/fonts
├── types/brand.ts       # Brand type definitions with color theory docs
├── components/
│   ├── atoms/
│   │   ├── BaseButton.vue   # Brand-aware button variants
│   │   └── BaseMarkdown.vue # Brand-aware markdown renderer
│   ├── AppHeader.vue        # Header with theme toggle
│   ├── AppFooter.vue        # Footer with brand styling
│   └── FeatureCard.vue      # Card component with brand colors
├── composables/
│   ├── useBrand.ts      # Brand colors/fonts (theme-aware)
│   ├── useTheme.ts      # Light/dark theme management
│   ├── useMarkdown.ts   # Load markdown from files/URLs
│   └── useApi.ts        # API fetch helpers
├── layouts/default.vue  # Main layout with brand background
├── pages/               # File-based routing
├── assets/css/main.css  # Tailwind @theme + prose styles
└── error.vue            # 404/error page

server/
├── lib/                 # API handler library (MUST USE)
├── api/                 # API routes
└── database/            # Drizzle schema + connection
```

## Brand System (REQUIRED)

**All colors and fonts MUST come from `app/config/brand.ts`. No hardcoded values.**

### The 6-Color Semantic Palette

| Color        | Coverage | Role                              | Component Usage                           |
| ------------ | -------- | --------------------------------- | ----------------------------------------- |
| `background` | ~60%     | Page canvas                       | `bg-brand-background`                     |
| `neutral`    | ~20%     | Cards, elevated surfaces          | `bg-brand-neutral`                        |
| `base`       | ~15%     | Text, icons, borders              | `text-brand-base`, `border-brand-base/10` |
| `accent`     | ~3%      | Primary actions, links            | `bg-brand-accent`, `text-brand-accent`    |
| `secondary`  | ~1%      | Supporting actions, tags          | `bg-brand-secondary`                      |
| `contrast`   | ~1%      | High-impact CTAs (use sparingly!) | `bg-brand-contrast`                       |

### Using Brand Colors in Components

```vue
<!-- CORRECT - Use brand Tailwind classes -->
<template>
  <button class="bg-brand-accent text-brand-neutral">Click</button>
  <h1 class="font-headers text-brand-base">Title</h1>
  <div class="border-brand-secondary bg-brand-neutral">Card</div>
</template>

<!-- WRONG - Hardcoded colors -->
<template>
  <button class="bg-emerald-600 text-white">Click</button>  <!-- DON'T -->
  <h1 class="text-gray-900">Title</h1>                      <!-- DON'T -->
</template>
```

### Available Brand Classes

**Colors:**

- `bg-brand-{base|accent|contrast|secondary|neutral|background}`
- `text-brand-{base|accent|contrast|secondary|neutral}`
- `border-brand-{base|accent|contrast|secondary|neutral}`
- Opacity modifiers work: `bg-brand-accent/50`, `text-brand-base/80`

**Fonts:**

- `font-logo` - Display/logo font
- `font-headers` - Headings (h1, h2, h3)
- `font-primary` - Body text
- `font-secondary` - Code, captions

## Theme System

```vue
<script setup>
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">{{ isDark ? 'Light' : 'Dark' }} Mode</button>
</template>
```

### Light vs Dark Mode Inversion

```
Light Mode:                    Dark Mode:
┌─────────────────────┐        ┌─────────────────────┐
│ background: #ffffff │   ←→   │ background: #0f172a │  INVERTED
│ neutral:    #f8fafc │   ←→   │ neutral:    #1e293b │  INVERTED
│ base:       #0f172a │   ←→   │ base:       #f1f5f9 │  INVERTED
│ accent:     #059669 │   →    │ accent:     #34d399 │  Brightened
└─────────────────────┘        └─────────────────────┘
```

## Markdown Rendering

```vue
<script setup>
const { content, load } = useMarkdown()
load('/content/article.md')
</script>

<template>
  <BaseMarkdown :content="content" size="lg" />
</template>
```

### Prose Classes

| Class          | Description                        |
| -------------- | ---------------------------------- |
| `prose`        | Base prose styles with brand colors|
| `prose-sm`     | Smaller text                       |
| `prose-lg`     | Larger text                        |
| `prose-full`   | Remove max-width constraint        |

## API Handlers

**All API handlers MUST use the standardized response library from `server/lib/`.**

```ts
// CORRECT - Use Result pattern
import { defineResultHandler, Errors, Result } from '../lib'

export default defineResultHandler(async (event) => {
  const data = await fetchData()
  if (!data) return Result.err(Errors.notFound('Resource not found'))
  return Result.ok(data)
})
```

### Error Factory

```ts
Errors.badRequest('Invalid input')       // 400
Errors.unauthorized('Not authenticated') // 401
Errors.forbidden('Access denied')        // 403
Errors.notFound('User not found')        // 404
Errors.validation('Invalid email')       // 422
Errors.internal('Server error')          // 500
```

## Do NOT

- Hardcode colors: `bg-emerald-600`, `text-gray-900`, `#ff0000`
- Hardcode fonts: `font-sans`, `font-mono`
- Use Tailwind's default color palette for UI elements
- Use same hex value for `base` in both light and dark modes

## Do

- Use `bg-brand-*`, `text-brand-*`, `border-brand-*` classes
- Use `font-logo`, `font-headers`, `font-primary`, `font-secondary`
- Use opacity modifiers: `text-brand-base/70`, `bg-brand-accent/10`
- Invert `base`, `background`, `neutral` between light/dark modes

## Changing the Brand

To rebrand the entire app, edit **only** `app/config/brand.ts`:

```ts
export const brandConfig: BrandConfig = {
  name: 'New Brand',
  light: {
    accent: '#ff0000', // All buttons, links now red
  },
  typography: {
    logo: 'Orbitron', // All logos now Orbitron
  },
}
```

See `app/types/brand.ts` for detailed color theory documentation.

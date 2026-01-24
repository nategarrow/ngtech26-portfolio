# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a SvelteKit portfolio website using Svelte 5 with runes, Sanity CMS for content, and TailwindCSS v4 for styling.

## Commands

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm preview      # Preview production build

# Code quality
pnpm check        # TypeScript and svelte-check validation
pnpm lint         # Prettier + ESLint checks
pnpm format       # Auto-format code

# Testing
pnpm test         # Run all tests
pnpm test:unit    # Vitest unit tests only
pnpm test:integration  # Playwright E2E tests
```

## Architecture

### Routing & Data Flow
- Single-page site with hash-based navigation and scroll-triggered active section tracking via IntersectionObserver
- Server-side data loading in `+page.server.js` fetches all content from Sanity CMS
- GROQ queries defined in `$lib/sanity/queries.js`

### Component Structure
- Feature components in `$lib/components/` (AboutMe, Portfolio, Resume, Testimonials, Skills)
- Reusable primitives in `$lib/molecules/` (Badge, BrandToken)
- Page layout composes feature sections with `SectionHeading` components

### Sanity CMS Integration
- Dual client setup: public client (`$lib/sanity/client.js`) and authenticated server client (`$lib/server/sanity/client.js`)
- Visual editing mode support via `@sanity/svelte-loader` and stega encoding
- Server hooks in `hooks.server.ts` handle preview mode setup

### Styling
- TailwindCSS v4 with Vite plugin and custom theme in `$lib/styles/theme.css`
- OKLch color system with violet palette
- View-timeline CSS animations in `$lib/styles/animations.css`
- Motion One library for imperative animations

## Code Conventions

### Svelte 5 Runes
Use rune syntax throughout:
- `$props()` for component props
- `$state()` for reactive local state
- `$derived()` for computed values

### Commits
CommitLint enforces conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, etc.

### Formatting
- Tabs, single quotes, trailing commas
- Import sorting handled by Prettier plugin
- Tailwind class ordering enforced

### TypeScript
- Strict mode enabled
- Sanity schema types in `$lib/types/schema.d.ts`

## Environment Variables

Uses 1Password CLI for secrets. Required variables:
- `PUBLIC_SANITY_DATASET`, `PUBLIC_SANITY_PROJECT_ID` - Sanity project config
- `SANITY_API_READ_TOKEN`, `SANITY_VIEWER_TOKEN` - Server-side Sanity authentication

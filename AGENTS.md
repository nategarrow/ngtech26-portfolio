# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

This is a pnpm monorepo containing a SvelteKit portfolio website (apps/frontend) and Sanity CMS studio (apps/sanity). The frontend uses Svelte 5 with runes, Sanity CMS for content, and TailwindCSS v4 for styling.

## Commands

### Root Level
```bash
# Development - runs both apps in parallel
pnpm dev

# Development - single app
pnpm dev:frontend    # Frontend only
pnpm dev:sanity      # Sanity studio only

# Build
pnpm build           # Build all apps
pnpm build:frontend  # Frontend only
pnpm build:sanity    # Sanity studio only

# Code quality
pnpm lint            # Run linting across all apps
pnpm format          # Format code across all apps
pnpm clean           # Clean build artifacts and node_modules
```

### Frontend App (apps/frontend)
```bash
# Development
pnpm dev             # Start dev server
pnpm build           # Production build
pnpm preview         # Preview production build

# Code quality
pnpm check           # TypeScript and svelte-check validation
pnpm lint            # Prettier + ESLint checks
pnpm format          # Auto-format code

# Testing
pnpm test            # Run all tests
pnpm test:unit       # Vitest unit tests only
pnpm test:integration # Playwright E2E tests

# Environment setup
pnpm init-envs       # Initialize environment variables from 1Password
```

### Sanity App (apps/sanity)
```bash
pnpm dev             # Start Sanity studio dev server
pnpm build           # Build studio
pnpm deploy          # Deploy studio to Sanity
pnpm typegen         # Generate TypeScript types from schemas
```

## Architecture

### Monorepo Structure

This project uses pnpm workspaces:
- Root `package.json` contains workspace-level scripts that execute commands across both apps
- Workspaces are defined in `pnpm-workspace.yaml` as `apps/*`
- Use `pnpm --filter @ngtech26/frontend <command>` or `pnpm --filter @ngtech26/sanity <command>` to run commands in specific apps

### Frontend Architecture

#### Component Organization (Atomic Design)

The frontend follows atomic design principles with components organized in `src/atomic/`:
- **components/**: Feature-level components (AboutMe, Hero, ProjectSpotlight, Resume, SkillsList, Testimonials, Trustbar)
- **molecules/**: Reusable primitives (Badge, BrandToken)
- **layout/**: Layout components

Each component typically has its own query file (e.g., `Hero.query.ts`) that defines GROQ queries for fetching data from Sanity.

#### Path Aliases

The following path aliases are configured in `svelte.config.js`:
- `@atomic` → `src/atomic/`
- `@components` → `src/atomic/components/`
- `@molecules` → `src/atomic/molecules/`
- `@layout` → `src/atomic/layout/`
- `@lib` → `src/lib/`
- `@types` → `src/lib/types/`
- `@styles` → `src/styles/`

Use these aliases consistently when importing modules.

#### Routing & Data Flow

- Single-page site with hash-based navigation and scroll-triggered section tracking via IntersectionObserver
- Server-side data loading in `+page.server.js` fetches content from Sanity CMS using `getHomePageData()`
- GROQ queries are modular: component-level queries in component directories are composed into document-level queries in `src/lib/sanity/queries/documents/`
- Example: `homePage.queries.ts` composes `heroQuery`, `aboutMeQuery`, `resumeQuery`, and `testimonialsQuery`

#### Sanity CMS Integration

- **Public client**: `src/lib/sanity/client.js` - used for client-side data fetching (CDN enabled)
- **GROQ queries**: Organized in `src/lib/sanity/queries/` with:
  - `documents/`: Document-level queries (homePage, projects, job, testimonial)
  - `component.queries.ts`: Component-specific queries
  - `fragments.ts`: Reusable query fragments
- **Image handling**: Use `src/lib/sanity/image.js` for Sanity image URL building
- **Types**: Sanity schema types are defined in `src/lib/types/schema.d.ts`

#### Styling System

- **TailwindCSS v4**: Configured via Vite plugin (`@tailwindcss/vite`)
- **Custom theme**: `src/styles/theme.css` defines custom colors using OKLch color system with violet palette
- **Animations**: `src/styles/animations.css` contains view-timeline CSS animations
- **Motion library**: Motion One library is available for imperative animations

### Sanity CMS Architecture

- **Schemas**: Organized in `apps/sanity/schemas/` with:
  - `documents/`: Document types (homePage, project, job, testimonial)
  - `components/`: Component schemas
  - `fields/`: Reusable field definitions
- **Configuration**: `sanity.config.ts` and `sanity.cli.ts`
- **Type generation**: Run `pnpm typegen` to generate TypeScript types from schemas (outputs to `schema.json`)

## Code Conventions

### Svelte 5 Runes

Use rune syntax throughout:
- `$props()` for component props
- `$state()` for reactive local state
- `$derived()` for computed values

### TypeScript

- Strict mode enabled
- Use `.ts` extension for TypeScript files
- Sanity schema types in `src/lib/types/schema.d.ts`

### Commits

CommitLint enforces conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `chore:` for maintenance tasks
- `docs:` for documentation changes

### Formatting

- Tabs for indentation
- Single quotes
- Trailing commas
- Import sorting handled by Prettier plugin (`prettier-plugin-organize-imports`)
- Tailwind class ordering enforced by `prettier-plugin-tailwindcss`

## Environment Variables

Uses 1Password CLI for secrets management. Required variables (see `.env.tpl`):
- `PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `PUBLIC_SANITY_DATASET` - Sanity dataset name
- `SANITY_API_READ_TOKEN` - Server-side Sanity authentication token
- `PUBLIC_SANITY_API_VERSION` - Sanity API version
- `PUBLIC_SANITY_STUDIO_URL` - Sanity studio URL

Initialize environment variables with: `pnpm --filter @ngtech26/frontend init-envs`

## Important Notes

- Frontend is deployed to Vercel (using `@sveltejs/adapter-vercel`)
- Package manager is locked to `pnpm@10.28.1` (specified in root `package.json`)
- Testing uses Vitest for unit tests and Playwright for E2E tests
- Husky is configured for git hooks with commitlint

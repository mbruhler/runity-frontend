# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the production application with Turbopack  
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Architecture Overview

This is a Next.js 15 application using the App Router architecture with the following structure:

### Framework & Dependencies
- **Next.js 15** with App Router and React 19
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling with PostCSS integration
- **shadcn/ui** components (configured but not yet installed) using the New York style variant

### Key Dependencies
- `class-variance-authority` + `clsx` + `tailwind-merge` for component styling utilities
- `lucide-react` for icons
- Custom `cn()` utility function in `src/lib/utils.ts` for className merging

### Directory Structure
- `src/app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Homepage (currently default Next.js starter)
  - `components/` - Page-specific components (contains `HeroBackground.tsx`)
- `src/lib/` - Shared utilities and helper functions
- `public/` - Static assets (SVG icons)

### Configuration Files
- `components.json` - shadcn/ui configuration with path aliases
- `tsconfig.json` - TypeScript config with `@/*` path mapping to `src/*`
- `next.config.ts` - Next.js configuration (minimal/default)

### Path Aliases
The project uses TypeScript path mapping:
- `@/*` maps to `src/*`
- shadcn/ui aliases: `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`

### Styling Approach
- Tailwind CSS with CSS variables enabled
- Neutral base color scheme
- Custom `cn()` utility for conditional classes
- Component styling uses class-variance-authority pattern
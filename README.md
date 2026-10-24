# Antariksh Mundle — Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide React

## Commands

```bash
npm run dev     # development server at http://localhost:3000
npm run build   # production build (includes type checking)
npm run start   # serve the production build
npm run lint    # ESLint
```

## Structure

```
src/
  app/                  routes (App Router)
  components/layout/    structural primitives (Container)
  data/                 static site content and config
  lib/                  shared utilities (font loading)
  styles/globals.css    design tokens + global base styles
```

## Design tokens

All colors live as CSS variables in `src/styles/globals.css` (`:root`) and are
exposed to Tailwind as `background`, `foreground`, `muted-foreground`,
`border`, `accent`, `accent-foreground`, `surface` and `surface-raised`
(e.g. `bg-surface`, `text-accent`). The palette is charcoal, warm white and a
single electric-cyan accent; borders are always used at reduced opacity.

Typography utilities: `font-display` (Space Grotesk), `font-serif` (Instrument
Serif — any `<em>` inside a heading renders in it), `font-sans` (Inter,
default body), `font-mono` (JetBrains Mono). Fonts are loaded in
`src/lib/fonts.ts` via `next/font`. Live reference: `/design-system`.

## Content

Project content lives in `src/data/projects.ts`. Projects with `featured: true`
get the large case-study card. The case-study page renders only the chapters a
project documents, and `results` must come from the project's own repository
or documentation.

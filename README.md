# Mohamed Fathy Portfolio

A single-page portfolio application built to present personal branding, technical depth, and a flagship case study in a recruiter-friendly format. The site combines a lightweight React frontend with a structured content layer so profile data, skills, engineering decisions, and product screenshots can be updated without reshaping the UI.

From a technical perspective, the project is a clean Vite + React 19 codebase that favors section-based composition, reusable UI primitives, and data-driven rendering over hardcoded markup.

## Tech Stack

### Frontend

- React 19
- TypeScript 5
- Vite 6

### Styling and UI

- Tailwind CSS v4
- shadcn/ui conventions
- Radix UI primitives
- class-variance-authority
- clsx
- tailwind-merge
- tw-animate-css
- Lucide React
- Tabler Icons React
- Geist and Geist Mono variable fonts

### Tooling

- ESLint
- Prettier
- pnpm

## Project Structure

```text
src/
├─ App.tsx                    # Root composition, theme state, page assembly
├─ main.tsx                   # React entry point
├─ index.css                  # Tailwind imports, design tokens, theme variables
├─ components/
│  └─ ui/                     # Reusable UI primitives (Button, Badge, Tabs, Dialog)
├─ data/
│  └─ portfolio.ts            # Centralized content model for personal info and project data
├─ hooks/
│  ├─ useScrollSpy.ts         # Active section tracking for navigation
│  └─ useSectionReveal.ts     # IntersectionObserver-based reveal animation hook
├─ layouts/
│  ├─ Nav.tsx                 # Sticky navigation, theme toggle, responsive menu
│  └─ Footer.tsx              # Footer metadata and branding
├─ lib/
│  └─ utils.ts                # Shared class name utility (`cn`)
└─ sections/
   ├─ Hero.tsx                # Intro, CTA actions, quick stats
   ├─ Skills.tsx              # Skill categories and engineering philosophy
   ├─ Contact.tsx             # Contact surface and outbound links
   └─ Beggy/
      ├─ BeggySection.tsx     # Case-study section orchestrator
      ├─ BeggyHero.tsx        # Featured project summary and CTA links
      ├─ Highlights.tsx       # Project differentiators and testing summary
      ├─ Architecture.tsx     # Layered architecture and API endpoint showcase
      ├─ Challenges.tsx       # Expandable engineering decision narratives
      └─ Screenshots.tsx      # Screenshot/video gallery with light/dark variants
```

### Public assets

- `public/favicon.svg` stores the site icon.
- `public/screenshots/` contains image and video assets used by the Beggy showcase.
- `public/Mohamed_Fathy_CV.pdf` is expected for the downloadable resume link.

## Architecture Overview

The application is organized as a section-driven single-page experience. `App.tsx` acts as a thin composition root that owns only one cross-cutting concern: persisted theme state. Everything else is delegated into isolated layout and section components.

Content is intentionally centralized in `src/data/portfolio.ts`. That file behaves like a lightweight content repository for personal metadata, technology categories, and the full Beggy case-study payload. This keeps the presentation layer mostly declarative and makes the UI easy to extend without scattering literals across components.

The component model follows three clear layers:

- `layouts/` holds app shell concerns such as navigation and footer behavior.
- `sections/` renders page-level content blocks.
- `components/ui/` provides reusable primitives styled with Tailwind, CVA, and Radix patterns.

Data flow is simple and predictable:

1. Static content is imported from `src/data/portfolio.ts`.
2. Sections map over that structured content to render cards, badges, lists, and media.
3. Local UI state is used only where interaction is required, such as dark mode, mobile navigation, accordions, tabs, and media playback.

The project does not currently include:

- Client-side routing
- Remote API integrations
- Global state management libraries
- A dedicated services layer

That is a reasonable choice for the current scope because the app is content-centric and does not depend on asynchronous server state.

## Key Features

- Responsive one-page portfolio optimized around a recruiter-facing narrative
- Persistent light/dark theme toggle backed by `localStorage`
- Sticky navigation with active-section highlighting via `IntersectionObserver`
- Reusable UI primitives for buttons, badges, tabs, and dialogs
- Data-driven rendering of personal profile content and technical stack
- Featured project case study for Beggy with architecture, testing, API, and challenge breakdowns
- Screenshot gallery supporting both image and video content
- Light/dark screenshot switching inside the media gallery
- Progressive section reveal animations for a more polished reading flow

## Setup and Installation

### Prerequisites

- Node.js 20+ recommended
- pnpm 10+

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm run dev
```

### Create a production build

```bash
pnpm run build
```

### Preview the production build locally

```bash
pnpm run preview
```

### Lint and format

```bash
pnpm run lint
pnpm run format:check
```

## Environment Variables

No environment variables are required for the current implementation.

The only runtime content dependency is the presence of static assets referenced by the UI, especially:

- `public/Mohamed_Fathy_CV.pdf`
- files under `public/screenshots/`

## Development Notes

This codebase is strongest where it separates content from presentation. Centralizing the portfolio data in one module makes the UI highly maintainable, especially for a personal site where copy, links, and showcased project details evolve more often than structural components.

The use of small custom hooks is also well judged. `useScrollSpy` and `useSectionReveal` encapsulate browser-observer logic cleanly and keep section components focused on rendering. For a single-page site, this is a good example of keeping behavior local without overengineering a broader state layer.

The styling system is modern and scalable. Tailwind v4, CSS variables, and OKLCH tokens provide a strong foundation for theming, while `class-variance-authority` keeps the UI primitives consistent and extensible. The presence of `components.json` also shows the project is aligned with a maintainable shadcn-style workflow rather than ad hoc utility sprawl.

A few architectural realities are worth noting:

- The app is intentionally frontend-only; the showcased backend/API architecture belongs to the external Beggy project and is presented as portfolio content.
- `src/data/portfolio.ts` is effectively acting as a local CMS. As the site grows, that file could become large enough to justify splitting by domain.
- There is no automated test suite in this repository yet, which is acceptable for an early portfolio project but would be the next maintainability step if the site continues to evolve.

## Future Improvements

- Split `src/data/portfolio.ts` into smaller domain modules such as `personal`, `skills`, and `projects`
- Add route-level pages if the portfolio expands beyond a single landing experience
- Introduce content validation with Zod to protect static portfolio data from shape drift
- Add automated tests for interactive behavior such as theme persistence, navigation highlighting, and media controls
- Add metadata management, Open Graph tags, and sitemap support for stronger SEO and social sharing
- Consider a lightweight CMS or MDX pipeline if project write-ups become more numerous
- Add accessibility and performance audits to CI for ongoing quality control

## Build Status

The production build was verified successfully with:

```bash
pnpm run build
```

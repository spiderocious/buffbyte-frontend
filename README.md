# BuffByte

AI-powered content optimization for creators. Analyze posts, score scripts, and deliver with a built-in teleprompter — all in one place.

---

## What it does

BuffByte gives creators three interconnected tools:

- **Content Analysis** — Paste any post, caption, or article. Get scored across 14 AI dimensions: virality potential, sentiment, brand voice, readability, platform fit, and more.
- **Script Analysis** — Upload a video or podcast script. Get hook strength scoring, pacing analysis, retention prediction, and a one-click handoff to the teleprompter.
- **AI Teleprompter** — Variable-speed auto-scroll with real-time WPM control, optimized for on-camera delivery.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Routing | React Router v7 (lazy-loaded screens) |
| Data fetching | TanStack Query v5 |
| HTTP | Axios with auth/error interceptors |
| Animation | Framer Motion v12 + GSAP 3 |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Fonts | Inter via `@fontsource/inter` |
| Deployment | Netlify |

---

## Project structure

Follows [Feature-Sliced Design (FSD)](https://feature-sliced.design/). Each feature owns its screens, API hooks, providers, and helpers.

```
src/
├── app.routes.tsx          # Route definitions (lazy imports)
├── app.lazy.ts             # Dynamic imports for code splitting
├── index.css               # Design tokens + Tailwind base
│
├── shared/
│   ├── constants/          # routes.ts, endpoints.ts
│   ├── lib/                # api-client.ts, query-client.ts
│   ├── providers/          # AuthProvider, RootLayout, auth-context
│   ├── guards/             # AuthGuard, GuestGuard
│   ├── widgets/            # AppLayout (top-nav, bottom-nav, user-menu)
│   ├── types/              # Shared API types
│   └── ui/                 # Design system components
│
└── features/
    ├── entrypoint/         # Landing page (12 animated sections)
    ├── dashboard/          # Post-login home
    ├── content-analysis/   # Content scoring flow
    ├── script-analysis/    # Script scoring flow
    ├── teleprompter/       # Teleprompter screen
    └── ui-kit/             # Internal component playground
```

Each feature follows the same internal shape:

```
feature/
├── screen/
│   ├── feature-screen.tsx        # Composer — renders parts
│   └── parts/                    # One file per section/widget
├── api/                          # TanStack Query hooks
├── providers/                    # Context + provider
└── helpers/                      # Pure utility functions
```

---

## Path aliases

Configured in [vite.config.ts](vite.config.ts):

| Alias | Resolves to |
|---|---|
| `@app` | `src/` |
| `@features` | `src/features/` |
| `@shared` | `src/shared/` |
| `@ui` | `src/shared/ui/` |

---

## Design system

Tokens live in [src/index.css](src/index.css). Core palette:

```css
--paper:       #FAF7F2   /* warm cream — page background */
--sheet:       #FFFDF8   /* near-white — card surface */
--ink:         #1C1B19   /* warm near-black — primary text */
--ink-3:       #6B6862   /* muted text */
--hair:        #DDD7CB   /* borders */
--accent:      #533AFD   /* violet-blue — primary action */
--accent-tint: #EAE6FF   /* accent backgrounds */
--shade-pop:   0 8px 24px -8px rgba(28,27,25,0.12), 0 0 0 1px var(--hair)
```

Card pattern: `background: var(--sheet); border: 1px solid var(--hair); border-radius: var(--r-card); box-shadow: var(--shade-pop)`

---

## Auth

Token stored in `sessionStorage` as `bb_token`. The Axios client (`src/shared/lib/api-client.ts`) attaches it as `Authorization: Bearer <token>` on every request and handles:

- `401 / 403` — clears session, redirects to `/auth/login`
- `422` — passes through (caller handles field errors)
- `429` — toast with reset time if provided
- Network errors — "Check your connection" toast

Route protection:
- `AuthGuard` — redirects unauthenticated users to login
- `GuestGuard` — redirects authenticated users away from auth pages

---

## Getting started

```bash
# Install
npm install

# Set environment variables
cp .env.example .env
# VITE_API_BASE_URL=https://your-api-url

# Dev server
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```

---

## Routes

| Path | Screen | Guard |
|---|---|---|
| `/` | Landing page | — |
| `/auth/login` | Login | GuestGuard |
| `/auth/register` | Register | GuestGuard |
| `/app/dashboard` | Dashboard | AuthGuard |
| `/app/content-analysis` | Analysis list | AuthGuard |
| `/app/content-analysis/new` | New analysis | AuthGuard |
| `/app/content-analysis/result` | Result view | AuthGuard |
| `/app/script-analysis` | Script list | AuthGuard |
| `/app/script-analysis/new` | New script | AuthGuard |
| `/app/script-analysis/result` | Script result | AuthGuard |
| `/app/teleprompter` | Teleprompter | AuthGuard |

---

## Landing page images

Stored in `public/landing/`. All images are served as WebP (converted from original PNGs, ~98% smaller). The originals are kept alongside for `<picture>` fallback.

| File | Usage |
|---|---|
| `wavy.webp` | Hero section background wave |
| `hero-product-ui.webp` | Content analysis feature image |
| `script-analysis-card.webp` | Script analysis feature image |
| `teleprompter.webp` | Teleprompter feature image |
| `bg-texture.webp` | Subtle grid texture overlay |

`wavy.webp` and `hero-product-ui.webp` are preloaded via `<link rel="preload">` in `index.html` to eliminate hero LCP delay.

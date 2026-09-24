<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project skills

On-demand skills live in `.agents/skills/` (symlinked into `.claude/skills/`). Load one when its topic matches:

- **ciq-etl** — Centris/CIQ import into SQL Server (`src/lib/ciq/*`, `/api/tache-ciq`), encoding/bulk/Turbopack pitfalls.
- **image-optimization** — public image compression + naming (`pnpm images:home|sold[:apply]`, `pnpm images:check-names`).
- **next-dev-loop** — verify a change at runtime against a running `next dev` (Vercel official).

## Frontend / SEO conventions

Always-on rules for this codebase:

- **Images**: use `next/image`, never CSS background images for content. Set `preload` only on the single true LCP image per route (no `priority`, no competing eager images). Prefer local `public/` assets over remote sources for the homepage hero.
- **Analytics/consent**: inject at `src/app/layout.tsx`. Read browser state with `useSyncExternalStore`, not effect-driven localStorage hydration. Load consent-gated scripts with `next/script` `lazyOnload`.
- **React**: the `react-hooks/set-state-in-effect` rule is enforced — avoid synchronous `setState` in `useEffect` for hydration logic.
- **SEO/routing**: legacy redirects belong in `next.config.ts` (never redirect www ↔ non-www there — it loops; that lives at the host). Keep `robots.ts` and `sitemap.ts` in sync with public routes.
- **Secrets**: never commit credentials; use Vercel environment variables.

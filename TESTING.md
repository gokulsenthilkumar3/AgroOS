# Testing AgroOS

AgroOS uses Vitest with Testing Library for unit and component coverage, plus Playwright for authenticated browser journeys.

## Commands

- `pnpm test` runs unit and component tests.
- `pnpm test:e2e` runs desktop and mobile browser journeys against port 3000.
- `pnpm test:all` runs both layers.
- `pnpm lint` performs the TypeScript check.

Unit tests live beside source files as `*.test.ts` or `*.test.tsx`. Browser tests live in `e2e/`. New functions, branches, error handling, and bug fixes should receive corresponding behavioral tests.

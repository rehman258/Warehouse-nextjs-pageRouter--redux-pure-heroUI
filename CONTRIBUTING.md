# Contributing

Thanks for your interest in contributing! This document describes the workflow and conventions used in this project.

## Prerequisites

- Node.js `20` (an `.nvmrc` is provided — run `nvm use`)
- npm `10+`

## Getting started

```bash
npm install
npm run dev
```

## Project scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | Type-check with `tsc --noEmit` |
| `npm test` | Run the unit tests |
| `npm run format` | Format the codebase with Prettier |
| `npm run format:check` | Verify formatting |

## Before opening a pull request

Please make sure the full check suite passes locally:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

These exact checks run in CI (`.github/workflows/ci.yml`) on every push and pull request.

## Conventions

- **TypeScript strict mode** is enforced; avoid `any` and prefer precise types, discriminated unions and `as const`.
- **Commits** follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`).
- **Formatting** is owned by Prettier and **linting** by ESLint — let the tools decide style.
- Keep components small and focused; colocate state with the component that owns it and lift it only when shared.

## Branching

Create a feature branch off `main`, keep PRs focused, and ensure CI is green before requesting review.

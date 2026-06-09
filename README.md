# WareFlow Pro — Warehouse Management System

A modern warehouse management dashboard built with **Next.js 16 (App Router)**, **Redux Toolkit**, **HeroUI** and **ApexCharts**.

Seven complete, working pages — dashboard, inventory, orders, suppliers, categories, reports and settings — backed by a typed mock data layer and a Redux Toolkit store. Inventory CRUD, search, faceted filtering, pagination, charts and preferences all work and persist across reloads.

> **Zero setup, no backend.** `npm install && npm run dev` and everything is interactive — no database, no API keys, no separate server to start.

---

## ✨ Features

- **Working inventory management** — create, edit, view and delete items through HeroUI modals; stock status (In Stock / Low / Out) is derived automatically. Search, multi-category & multi-status filters, page sizing and pagination all compose.
- **Orders board** — searchable, filterable (status / priority), paginated table with type/status/priority chips, progress bars and delete.
- **Live dashboard** — six metric cards computed from the store, a monthly inbound/outbound bar chart, stock-by-category doughnut, recent activity feed and warehouse capacity bars.
- **Suppliers, categories & reports** — supplier directory with stats, per-category inventory analytics, and a tabbed reports page (overview / stock movement / categories) with multiple chart types.
- **Settings that persist** — preference switches (low-stock alerts, auto-reorder, compact tables, email digest…) wired to Redux Toolkit and saved to localStorage.
- **Redux Toolkit** — slices for `inventory`, `orders`, `reference` and `ui`; typed hooks; immutable reducers; per-client store with persistence and SSR-safe hydration. (Upgraded from the original hand-rolled `createStore`.)
- **Light / dark mode** — `next-themes` class strategy; HeroUI components and ApexCharts both adapt.
- **Responsive** — collapsible sidebar with a mobile drawer, responsive header (search, notifications, theme, account menu) and fluid grids.

## 🔐 Security note

The original repository committed a Firebase `serviceAccountKey.json`. It has been **removed** and the standalone backend deleted; credential filenames are now git-ignored. If that key was ever real, **rotate it** and scrub it from git history (`git filter-repo` / BFG), since it remains in past commits.

## 🛠 Tech Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| State | Redux Toolkit + react-redux (typed hooks, persistence) |
| UI | HeroUI, Tailwind CSS 4, `lucide-react` |
| Charts | ApexCharts + react-apexcharts |
| Theming | next-themes |
| Testing | Vitest + Testing Library + jsdom |
| Tooling | ESLint (flat config), GitHub Actions CI |

## 🚀 Getting Started

```bash
npm install
npm run dev
# open http://localhost:3000  (redirects to /dashboard)
```

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest suite |
| `npm run test:coverage` | Coverage report |

## 🏗 Architecture

```
src/
├─ app/
│  ├─ layout.tsx              # Root: fonts, providers
│  ├─ page.tsx                # Redirects to /dashboard
│  └─ (pages)/                # App shell (sidebar + header)
│     ├─ dashboard/ inventory/items/ orders/ suppliers/
│     ├─ categories/ reports/ settings/
├─ components/
│  ├─ layout/                 # Sidebar, Header, ThemeToggle
│  ├─ ui/                     # Panel, StatCard, DataTable, StatusChips, ConfirmDialog
│  ├─ charts/                 # Bar / Donut / Area (ApexCharts, theme-aware)
│  └─ inventory/              # InventoryView + Form / View modals
├─ store/                     # RTK store, slices, typed hooks, persistence
└─ lib/                       # types, seed data, queries, metrics, formatters, cn()
```

### Key design decisions

- **Mock data layer over Firebase.** The dead Firebase backend was replaced by a typed in-memory layer: the RTK store is seeded from `lib/seed.ts`, reads flow through pure `lib/queries.ts` functions, and dashboard figures come from `lib/metrics.ts`. Swapping in a real API would not touch the UI.
- **Redux Toolkit upgrade.** Plain `createStore` + the `connect` HOC were replaced with `configureStore`, slices and typed hooks. Inventory CRUD is modelled as immutable reducers, so the UI updates everywhere from one dispatch.
- **HeroUI, used correctly.** The original mis-used HeroUI's `Table` (mapping rows and casting to `any`); the new `DataTable` uses HeroUI's dynamic collection API with full typing.
- **Serialisable data & deterministic formatting** keep the store JSON-friendly and SSR/hydration consistent.

## 🧪 Testing

Vitest covers the business logic:

- `store/slices/inventorySlice.test.ts` — add / update / delete and derived stock status.
- `lib/queries.test.ts` — inventory & order search, faceted filters, pagination.
- `lib/metrics.test.ts` — dashboard aggregates.
- `lib/format.test.ts` — currency / number formatting and labels.

```bash
npm test
```

## 📦 Deployment

Deploys to Vercel with zero configuration. No environment variables required.

---

Built as a portfolio project to demonstrate Redux Toolkit architecture, component-library integration, data visualisation and production-grade Next.js patterns.

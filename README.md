# Hospital Management System (HMS) – UI/UX Flow (Backend Ready)

This project is a **frontend prototype of a Hospital Management System** built to demonstrate complete UI/UX flows across roles and modules (patients, tasks, prescriptions, appointments, staff, settings, etc.).

It is designed to be:
- **Hosted on GitHub**
- **Deployed on Vercel** for easy sharing
- **Run locally** with `npm run dev`

---

## Tech Stack

- **React 19 + TypeScript**
- **Vite 6**
- **Tailwind CSS**
- **shadcn/ui + Radix UI**
- **React Router DOM**
- **TanStack React Query**

---

## Project Purpose

- Showcase hospital workflows end-to-end
- Use realistic mock datasets while keeping architecture ready for backend/API integration
- Serve as a demo/reference UI for implementation teams

Current data is provided from mock files in:
- `src/lib/mock-data.ts`

---

## Main UI Routes

- `/` – Landing/entry page
- `/login` – Role login simulation
- `/dashboard`
- `/patients`
- `/patients/:id`
- `/patients/:id/history`
- `/tasks`
- `/prescriptions`
- `/appointments`
- `/staff`
- `/settings`

---

## Getting Started (Local)

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

Default Vite dev server port is configured as `8080` in `vite.config.ts`.

---

## Build & Preview

```bash
npm run build
npm run preview
```

---

## Vercel Deployment Notes

This is a Vite SPA and already includes rewrite support in `vercel.json` so direct route access works in production.

### Typical deployment flow
1. Push repository to GitHub
2. Import project in Vercel
3. Framework preset: **Vite** (auto-detected)
4. Build command: `npm run build`
5. Output directory: `dist`

---

## Dependency Issue You Encountered (`@vercel/analytics`)

You got an `ERESOLVE` conflict because:
- Project uses **React 19**
- `next-themes@0.3.0` expects peer React `^16.8 || ^17 || ^18`

### Recommended fix (clean)

Upgrade `next-themes` to a version compatible with React 19, then install analytics:

```bash
npm install next-themes@latest
npm install @vercel/analytics
```

If npm still caches old resolution, run:

```bash
npm install --legacy-peer-deps
```

> Avoid `--force` unless absolutely necessary.

---

## Directory Overview

```text
src/
  components/      # shared UI + layout
  hooks/           # reusable hooks
  lib/             # utils + mock datasets
  pages/           # route-level screens
  types/           # domain types
  utils/           # helper utilities
```

---

## Safe Cleanup Candidates (without affecting app behavior)

These can be removed safely **for current runtime behavior**:

1. `src/components/made-with-dyad.tsx`
   - Not imported anywhere in the app.

2. `src/App.css`
   - Not imported by `src/main.tsx` or `src/App.tsx`.

3. One lock file (keep only one package manager)
   - Keep **either** `package-lock.json` (**npm**) **or** `pnpm-lock.yaml` (**pnpm**), not both.
   - Since your run command is npm-based, you can keep `package-lock.json` and remove `pnpm-lock.yaml`.

### Keep these (important)
- `vercel.json` (SPA routing rewrite)
- `components.json` (shadcn/ui config; useful for future component generation)
- `public/favicon.ico` (browser tab icon)
- `public/robots.txt` (deployment hygiene)

---

## Backend Integration Readiness

To connect backend APIs later:
- Replace mock-data usages with API hooks/services
- Keep route and page structure unchanged
- Introduce auth token/session validation in `ProtectedRoute`
- Move role/user state from `localStorage` to backend-authenticated session

---

## License

Use as internal/demo project unless your team adds a formal license.

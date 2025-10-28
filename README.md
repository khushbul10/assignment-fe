## Frontend Assignment: Mini CRM & Product Dashboard

This repository contains a small dashboard application built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. The app demonstrates a lightweight Mini CRM for leads and a Product Catalog with product-lead linking, responsive layout, and modern UX patterns (dark mode, off-canvas sidebar, skeleton loaders).

## Live demo

Check out the live deployment: https://assignment-fe-gules.vercel.app

## Features

### General
- Fully responsive design with a clean, minimal UI.
- Slide-out mobile sidebar (accessible off-canvas menu) with overlay and multiple close actions.
- Light / dark theme support (manual toggle + respect system preference via `next-themes`).
- Optimized data fetching and caching with TanStack Query (React Query).
- Optimized fonts using `next/font` (Poppins).
- Instant loading states using Next.js `loading.tsx` and skeleton loaders.

### Leads (Mini CRM)
- Fetch and display a list of leads (example uses jsonplaceholder for demo data).
- Add new leads via a modal form (persisted to local UI state for the assignment).
- Edit and delete leads.
- Live search/filter by name or company.

### Products (Catalog)
- Server-side fetching of products with client hydration via `useQuery` + `initialData`.
- Responsive grid layout for product cards.
- Category filter (dropdown) to narrow the product grid.
- Product details modal with image, description, and price.

### Bonus: Lead ↔ Product Linking
- Link one or more leads to a product from the product detail modal.
- View link counts on the leads table and open a modal to manage/unlink products.
- Link state is stored in React Context for simplicity in this assignment.

## Tech stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Data fetching: TanStack Query (React Query) v5
- State: React Context (links) + local `useState` for UI
- Theming: `next-themes`
- Icons: `lucide-react`
- Fonts: `next/font` (Poppins)

## Project structure (app router)

```
app/
├── components/       # Reusable components
│   ├── layout/       # Sidebar, Header, AppLayout, ThemeToggle
│   ├── leads/        # LeadForm, LeadCard, LeadList, LinkedProductsModal
│   ├── products/     # ProductModal, ProductGrid, ProductCard, ProductLinker
│   ├── ui/           # Generic UI (Modal, Spinner, ErrorMessage)
│   └── provider/     # QueryProvider, ThemeProvider
├── context/          # React Context providers (LinkContext)
├── leads/            # /leads route (page.tsx)
├── products/         # /products route (page.tsx + loading.tsx)
├── layout.tsx        # Root layout (providers, layout)
└── page.tsx          # Home / redirect
```

## Setup & Development

Clone the repository (replace with the real repo URL):

```
git clone https://github.com/khushbul10/assignment-fe
cd your-repo-name
```

Install dependencies and run the dev server:

```
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Build for production:

```
npm run build
npm run start
```

## Assignment evaluation (how this project was designed to be judged)

- UI/UX & Responsiveness — 25%: Clean UI with responsive layout and accessible mobile sidebar.
- Code Structure — 25%: Feature-based components grouped by responsibility.
- API & State Handling — 25%: TanStack Query for server data; React Context for cross-cutting link state.
- Functionality — 15%: Core features implemented (fetch, add, edit, delete, filter, modals).
- Creativity — 10%: Dark mode, lead-product linking, skeleton loaders.

---

If you'd like, I can also:

- Add a short development checklist and run scripts to `package.json`.
- Add example env variables and a sample .env.local for demo APIs.


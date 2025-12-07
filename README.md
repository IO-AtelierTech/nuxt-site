# Nuxt Site Template

A production-ready Nuxt 4 template for internal projects.

## Features

- **Nuxt 4** with future compatibility mode
- **Tailwind CSS v4** with PostCSS integration
- **Drizzle ORM** for type-safe PostgreSQL database access
- **Zod** for runtime validation
- **ESLint** with import sorting and unused imports detection
- **Prettier** with Tailwind CSS plugin
- **unplugin-fonts** for Google Fonts
- **Code-based routing** via `app/router.options.ts`
- **GitHub Actions** for CI/CD

## Getting Started

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## Database Setup

1. Copy `.env.example` to `.env` and configure `DATABASE_URL`
2. Generate migrations: `yarn db:generate`
3. Apply migrations: `yarn db:migrate`
4. Open Drizzle Studio: `yarn db:studio`

## Project Structure

```
├── app/
│   ├── assets/css/      # Global styles
│   ├── components/      # Vue components (atoms, molecules, organisms)
│   ├── composables/     # Vue composables
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components (code-based routing)
│   ├── utils/           # Utility functions
│   ├── app.vue          # Root component
│   └── router.options.ts # Route definitions
├── server/
│   ├── api/             # API routes
│   ├── database/        # Drizzle schema and migrations
│   └── utils/           # Server utilities (validation)
├── public/              # Static assets
└── .github/workflows/   # CI/CD pipelines
```

## Code-Based Routing

Routes are defined in `app/router.options.ts`. File-based routing is disabled.

```ts
export default <RouterConfig>{
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/index.vue'),
    },
    // Add more routes here
  ],
}
```

## Scripts

| Command            | Description                  |
| ------------------ | ---------------------------- |
| `yarn dev`         | Start development server     |
| `yarn build`       | Build for production         |
| `yarn generate`    | Generate static site         |
| `yarn preview`     | Preview production build     |
| `yarn lint`        | Run ESLint                   |
| `yarn lint:fix`    | Fix ESLint issues            |
| `yarn format`      | Format code with Prettier    |
| `yarn type-check`  | Run TypeScript type checking |
| `yarn db:generate` | Generate Drizzle migrations  |
| `yarn db:migrate`  | Apply database migrations    |
| `yarn db:push`     | Push schema changes (dev)    |
| `yarn db:studio`   | Open Drizzle Studio          |

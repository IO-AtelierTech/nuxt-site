# Claude Code Guidelines

Project-specific guidelines for Claude Code when working on this Nuxt template.

## Routing

**This project uses Nuxt's default file-based routing.**

- Pages in `app/pages/` are auto-registered as routes
- File name = route path (`index.vue` → `/`, `about.vue` → `/about`)
- Dynamic routes use brackets: `[id].vue` → `/:id`

## API Handlers

**All API handlers MUST use the standardized response library from `server/lib/`.**

### Required Pattern

Use `defineResultHandler` or `defineApiHandler` instead of raw `defineEventHandler`:

```ts
// CORRECT - Use Result pattern (recommended)
import { defineResultHandler, Errors, Result } from '../lib'

export default defineResultHandler(async (event) => {
  const data = await fetchData()
  if (!data) return Result.err(Errors.notFound('Resource not found'))
  return Result.ok(data)
})

// CORRECT - Use simple API handler (throws errors)
import { defineApiHandler, Errors } from '../lib'

export default defineApiHandler(async (event) => {
  const data = await fetchData()
  if (!data) throw Errors.notFound('Resource not found')
  return data
})

// INCORRECT - Don't use raw defineEventHandler for API routes
export default defineEventHandler(async (event) => {
  return { data: 'something' } // Non-standard response format
})
```

### Available Handlers

| Handler                        | Use Case                                                  |
| ------------------------------ | --------------------------------------------------------- |
| `defineResultHandler`          | Returns `Result<T, AppError>` - recommended               |
| `definePaginatedResultHandler` | Returns paginated `Result<[T, PaginationInfo], AppError>` |
| `defineApiHandler`             | Throws errors, auto-wrapped in standard response          |
| `definePaginatedApiHandler`    | Throws errors, returns paginated data                     |

### Error Factory

Use `Errors` factory for consistent error codes:

```ts
import { Errors } from '../lib'

Errors.badRequest('Invalid input') // 400
Errors.unauthorized('Not authenticated') // 401
Errors.forbidden('Access denied') // 403
Errors.notFound('User not found') // 404
Errors.conflict('Already exists') // 409
Errors.validation('Invalid email') // 422
Errors.internal('Server error') // 500
Errors.serviceUnavailable('DB offline') // 503
```

### Response Format

All API responses follow this structure:

```ts
// Success
{ success: true, timestamp: string, data: T }

// Error
{ success: false, timestamp: string, error: { status, code, message } }

// Paginated Success
{ success: true, timestamp: string, data: T, pagination: PaginationInfo }
```

## Frontend API Consumption

Use the typed composables from `app/composables/useApi.ts`:

```ts
// Fetch single resource
const { data } = await useApi<User>('/api/users/1')
if (data.value?.success) {
  console.log(data.value.data)
}

// Fetch paginated list
const { data } = await usePaginatedApi<User[]>('/api/users')
if (data.value?.success) {
  console.log(data.value.data, data.value.pagination)
}
```

## Validation

Use Zod schemas derived from Drizzle via `drizzle-zod`:

```ts
// server/database/schema.ts - Single source of truth
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  name: z.string().min(2),
})

// In API handlers
const parsed = insertUserSchema.safeParse(body)
if (!parsed.success) {
  return Result.err(Errors.validation(parsed.error.issues[0]?.message ?? 'Validation failed'))
}
```

## File Structure

```
app/
├── pages/               # File-based routing (auto-registered)
├── components/          # Reusable components
├── composables/useApi.ts # API fetch helpers
└── types/api.ts         # Shared API response types

server/
├── lib/                 # Framework library (MUST USE)
│   ├── error.ts         # AppError + Errors factory
│   ├── result.ts        # Result<T,E> pattern
│   ├── response.ts      # Response types
│   ├── handler.ts       # Nitro handler wrappers
│   └── index.ts         # Single export point
├── api/                 # API routes (file-based)
├── database/            # Drizzle schema + connection
└── utils/               # Server utilities
```

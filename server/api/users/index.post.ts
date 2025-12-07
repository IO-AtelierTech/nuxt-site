import { db } from '../../database'
import { insertUserSchema, users } from '../../database/schema'
import { defineResultHandler, Errors, Result } from '../../lib'

export default defineResultHandler(async (event) => {
  if (!db) {
    return Result.err(Errors.serviceUnavailable('Database not available'))
  }

  const body = await readBody(event)
  const parsed = insertUserSchema.safeParse(body)

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Validation failed'
    return Result.err(Errors.validation(message))
  }

  const [newUser] = await db.insert(users).values(parsed.data).returning()

  return Result.ok(newUser)
})

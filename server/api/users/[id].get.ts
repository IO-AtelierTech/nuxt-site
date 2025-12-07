import { eq } from 'drizzle-orm'

import { db } from '../../database'
import { users } from '../../database/schema'
import { defineResultHandler, Errors, Result } from '../../lib'

export default defineResultHandler(async (event) => {
  if (!db) {
    return Result.err(Errors.serviceUnavailable('Database not available'))
  }

  const id = Number(getRouterParam(event, 'id'))

  if (isNaN(id) || id <= 0) {
    return Result.err(Errors.badRequest('Invalid user ID'))
  }

  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1)

  if (!user) {
    return Result.err(Errors.notFound('User not found'))
  }

  return Result.ok(user)
})

import { eq } from 'drizzle-orm'

import { db } from '../../database'
import { users } from '../../database/schema'

export default defineEventHandler(async (event) => {
  if (!db) {
    throw createError({
      statusCode: 503,
      message: 'Database not available',
    })
  }

  const id = Number(getRouterParam(event, 'id'))

  if (isNaN(id) || id <= 0) {
    throw createError({
      statusCode: 400,
      message: 'Invalid user ID',
    })
  }

  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1)

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  return { data: user }
})

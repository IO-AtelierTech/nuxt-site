import { db } from '../../database'
import { users } from '../../database/schema'
import { validateQuery, paginationSchema } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  if (!db) {
    throw createError({
      statusCode: 503,
      message: 'Database not available',
    })
  }

  const { page, limit } = validateQuery(event, paginationSchema)
  const offset = (page - 1) * limit

  const result = await db.select().from(users).limit(limit).offset(offset)

  return {
    data: result,
    pagination: {
      page,
      limit,
      total: result.length,
    },
  }
})

import { db } from '../../database'
import { users } from '../../database/schema'
import { createPaginationInfo, definePaginatedResultHandler, Errors, Result } from '../../lib'
import { paginationSchema } from '../../utils/validation'

export default definePaginatedResultHandler(async (event) => {
  if (!db) {
    return Result.err(Errors.serviceUnavailable('Database not available'))
  }

  const query = getQuery(event)
  const parsed = paginationSchema.safeParse(query)

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Validation failed'
    return Result.err(Errors.validation(message))
  }

  const { page, limit } = parsed.data
  const offset = (page - 1) * limit

  const result = await db.select().from(users).limit(limit).offset(offset)

  // In production, add a count query for accurate total
  const pagination = createPaginationInfo(result.length, page, limit)

  return Result.ok([result, pagination])
})

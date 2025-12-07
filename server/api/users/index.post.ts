import { db } from '../../database'
import { users } from '../../database/schema'
import { insertUserSchema } from '../../database/schema'
import { validateBody } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  if (!db) {
    throw createError({
      statusCode: 503,
      message: 'Database not available',
    })
  }

  const data = await validateBody(event, insertUserSchema)

  const [newUser] = await db.insert(users).values(data).returning()

  return {
    data: newUser,
    message: 'User created successfully',
  }
})

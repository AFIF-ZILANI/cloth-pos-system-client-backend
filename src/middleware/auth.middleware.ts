import { createMiddleware } from 'hono/factory'
import { verifyAccessToken } from '@/lib/token'
import { AppError } from '@/utils/AppError' // ✅ use your AppError for consistency

export const authMiddleware = createMiddleware(async (c, next) => {
    const authHeader = c.req.header('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
        // ✅ Use your AppError format instead of raw c.json()
        throw new AppError('Unauthorized', 'MISSING_TOKEN', 401)
    }

    try {
        const token = authHeader.split(' ')[1] ?? ""
        const payload = verifyAccessToken(token)
        c.set('user', payload)
        await next()
    } catch (err) {
        // ✅ Re-throw AppError as-is, wrap others
        if (err instanceof AppError) throw err
        throw new AppError('Invalid or expired token', 'INVALID_TOKEN', 401)
    }
})
import { Router } from 'express'
import { cache } from '../lib/cache'

const router = Router()

router.get('/cache', (_req, res) => {
  res.json({
    success: true,
    message: 'In-memory cache is active',
    stats: cache.getStats(),
    timestamp: new Date().toISOString(),
  })
})

export default router

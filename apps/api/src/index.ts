import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { clerkMiddleware, requireAuth } from '@clerk/express'
import { healthRouter } from './routes/health.route'
import { analyzeRouter } from './routes/analyze.route'
import { generateRouter } from './routes/generate.route'
import { generateWithGemini } from './services/gemini.service'

import timeout from 'express-timeout-handler'
import { logger } from './middleware/logger'
import cacheRoutes from './routes/cache.route'

const app = express()

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

app.use(express.json())

app.use(logger)

// Initialize Clerk middleware (must come before protected routes)
app.use(clerkMiddleware())

// Public routes
app.use('/health', healthRouter)

// Protected routes — require a valid Clerk JWT
app.use('/api/analyze', requireAuth(), analyzeRouter)
app.use('/api/generate', requireAuth(), generateRouter)

app.use(
  timeout.handler({
    timeout: 60000,
    onTimeout: (req, res) => {
      res.status(504).json({
        success: false,
        error: 'Request timed out while generating documentation',
      })
    },
  })
)

app.use('/api', cacheRoutes)

app.get('/test-gemini', async (_req, res) => {
  try {
    const generation = await generateWithGemini('Say hello from Gemini')
    res.json(generation)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Global Error Handler for Express (catches Clerk auth errors, timeouts, router exceptions)
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('API Server Error:', err)
  const statusCode = err.status || err.statusCode || (err.message?.includes('Unauthenticated') ? 401 : 500)
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({
    success: false,
    error: message,
  })
})

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => {
  console.log(`ReadmePilot API running on ${PORT}`)
})

// Increase server timeout to 10 minutes to accommodate long Ollama responses
server.setTimeout(10 * 60 * 1000)

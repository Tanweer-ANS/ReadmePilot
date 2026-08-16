import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

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

app.use('/health', healthRouter)
app.use('/api/analyze', analyzeRouter)
app.use('/api/generate', generateRouter)

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

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => {
  console.log(`ReadmePilot API running on ${PORT}`)
})

// Increase server timeout to 10 minutes to accommodate long Ollama responses
server.setTimeout(10 * 60 * 1000)

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { healthRouter } from './routes/health.route'
import { analyzeRouter } from './routes/analyze.route'
import { generateRouter } from './routes/generate.route'
import { generateWithGemini } from './services/gemini.service'



const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use(express.json())

app.use('/health', healthRouter)
app.use('/api/analyze', analyzeRouter)
app.use('/api/generate', generateRouter)

app.get('/test-gemini', async (_req, res) => {
  try {
    const text = await generateWithGemini('Say hello from Gemini')
    res.json({ text })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => {
  console.log(`🚀 ReadmePilot API running on http://localhost:${PORT}`)
})

// Increase server timeout to 10 minutes to accommodate long Ollama responses
server.setTimeout(10 * 60 * 1000)
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { healthRouter } from './routes/health.route'
import { analyzeRouter } from './routes/analyze.route'
import { generateRouter } from './routes/generate.route'

dotenv.config()

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

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`🚀 ReadmePilot API running on http://localhost:${PORT}`)
})
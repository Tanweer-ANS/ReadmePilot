import { createHash } from 'node:crypto'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { cache } from '../lib/cache'

const MODEL_NAME = 'gemini-3.5-flash-lite'
const GEMINI_CACHE_TTL_SECONDS = 3600

function getGeminiCacheKey(prompt: string) {
  const promptHash = createHash('sha256').update(prompt).digest('hex')
  return `gemini:${MODEL_NAME}:${promptHash}`
}

export async function generateWithGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in apps/api/.env')
  }

  const cacheKey = getGeminiCacheKey(prompt)
  const cached = cache.get<string>(cacheKey)

  if (cached !== null) {
    return cached
  }

  const genAI = new GoogleGenerativeAI(apiKey)

  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
  })

  const result = await model.generateContent(prompt)
  const responseText = result.response.text()

  cache.set(cacheKey, responseText, GEMINI_CACHE_TTL_SECONDS)

  return responseText
}

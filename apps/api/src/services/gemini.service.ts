import { GoogleGenerativeAI } from '@google/generative-ai'

export async function generateWithGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in apps/api/.env')
  }

  const genAI = new GoogleGenerativeAI(apiKey)

  const model = genAI.getGenerativeModel({
    model: 'gemini-3.5-flash',
  })

  const result = await model.generateContent(prompt)

  return result.response.text()
}
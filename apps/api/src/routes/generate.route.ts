import { Router } from 'express'
import { githubRepoSchema } from '../utils/github-url'
import { getRepositoryInfo } from '../services/github.service'
import { analyzeRepository } from '../services/repository-analyzer'
import { buildDocumentationPrompt } from '../services/prompt-builder'
import { generateWithGemini } from '../services/gemini.service'

export const generateRouter = Router()

generateRouter.post('/', async (req, res) => {
  try {
    const parsed = githubRepoSchema.parse(req.body)

    const repository = await getRepositoryInfo(parsed.repoUrl)
    const analysis = await analyzeRepository(parsed.repoUrl)

    const prompt = buildDocumentationPrompt({
      repository: {
        name: repository.name,
        description: repository.description,
        languages: repository.languages,
      },
      analysis,
    })

    const documentation = await generateWithGemini(prompt)

    const start = Date.now()
    console.log(`Documentation generated in ${Date.now() - start}ms`)

    res.json({
      success: true,
      repository,
      analysis,
      documentation,
    })
  } catch (error: any) {
    console.error('Generation error:', error)

    const message = error?.message || 'Unknown error'

    if (message.includes('rate limit')) {
      return res.status(429).json({
        success: false,
        error: 'GitHub API rate limit exceeded. Please try again later.',
      })
    }

    if (message.includes('503') || message.includes('high demand')) {
      return res.status(503).json({
        success: false,
        error: 'Gemini API is currently under heavy load. Please try again in a few seconds.',
      })
    }

    return res.status(500).json({
      success: false,
      error: message,
    })
  }
})
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

    res.json({
      success: true,
      repository,
      analysis,
      documentation,
    })
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Documentation generation failed',
        code: 'GENERATION_FAILED',
      },
    })
  }
})
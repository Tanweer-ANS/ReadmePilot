import { Router } from 'express'
import { githubRepoSchema } from '../utils/github-url'
import { getRepositoryInfo } from '../services/github.service'
import { analyzeRepository } from '../services/repository-analyzer'

export const analyzeRouter = Router()

analyzeRouter.post('/', async (req, res) => {
  try {
    const parsed = githubRepoSchema.parse(req.body)

    const repository = await getRepositoryInfo(parsed.repoUrl)
    const analysis = await analyzeRepository(parsed.repoUrl)

    res.json({
      success: true,
      repository,
      analysis,
    })
  } catch (error: any) {
    res.status(400).json({
      error: {
        message: error.message || 'Invalid request',
        code: 'ANALYZE_FAILED',
      },
    })
  }
})
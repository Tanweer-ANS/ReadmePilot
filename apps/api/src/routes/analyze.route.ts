import { Router } from 'express'
import { githubRepoSchema } from '../utils/github-url'

export const analyzeRouter = Router()

analyzeRouter.post('/', async (req, res) => {
  try {
    const parsed = githubRepoSchema.parse(req.body)

    const repoUrl = parsed.repoUrl

    res.json({
      success: true,
      repository: {
        url: repoUrl,
        name: 'example-repository',
      },
      analysis: {
        framework: 'Unknown',
        packageManager: 'Unknown',
        envVariables: [],
      },
    })
  } catch (error: any) {
    res.status(400).json({
      error: {
        message: error.errors?.[0]?.message || 'Invalid request',
        code: 'INVALID_REPO_URL',
      },
    })
  }
})
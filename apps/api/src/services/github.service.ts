import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || undefined,
})

export async function getRepositoryInfo(repoUrl: string) {
  const repoRegex = /github\.com\/([^/]+)\/([^/]+)/
  const match = repoRegex.exec(repoUrl)

  if (!match) {
    throw new Error('Invalid GitHub repository URL')
  }

  const owner = match[1]
  const repo = match[2].replace('.git', '')

  const { data: repository } = await octokit.repos.get({
    owner,
    repo,
  })

  const { data: languages } = await octokit.repos.listLanguages({
    owner,
    repo,
  })

  return {
    owner,
    repo,
    name: repository.name,
    description: repository.description || '',
    defaultBranch: repository.default_branch,
    stars: repository.stargazers_count,
    languages: Object.keys(languages),
  }
}
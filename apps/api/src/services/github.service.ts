import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || undefined,
})

function parseRepoUrl(repoUrl: string) {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/)

  if (!match) {
    throw new Error('Invalid GitHub repository URL')
  }

  return {
    owner: match[1],
    repo: match[2].replace('.git', ''),
  }
}

export async function getRepositoryInfo(repoUrl: string) {
  const { owner, repo } = parseRepoUrl(repoUrl)

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
    fullName: repository.full_name,
    description: repository.description || '',
    defaultBranch: repository.default_branch,
    stars: repository.stargazers_count,
    languages: Object.keys(languages),
  }
}

export async function getRepositoryTree(repoUrl: string) {
  const { owner, repo } = parseRepoUrl(repoUrl)

  const { data: repository } = await octokit.repos.get({ owner, repo })

  const { data: tree } = await octokit.git.getTree({
    owner,
    repo,
    tree_sha: repository.default_branch,
    recursive: '1',
  })

  return tree.tree.map((item) => item.path || '')
}

export async function getFileContent(repoUrl: string, path: string) {
  try {
    const { owner, repo } = parseRepoUrl(repoUrl)

    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    })

    if ('content' in data) {
      return Buffer.from(data.content, 'base64').toString('utf-8')
    }

    return null
  } catch {
    return null
  }
}

import { z } from 'zod'

export const githubRepoSchema = z.object({
  repoUrl: z
    .string()
    .url('Please enter a valid URL')
    .refine(
      (url) => url.startsWith('https://github.com/'),
      'URL must be a GitHub repository URL'
    ),
})

export type GithubRepoInput = z.infer<typeof githubRepoSchema>
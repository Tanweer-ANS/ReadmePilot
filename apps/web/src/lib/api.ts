import type { GeneratedResult } from '@/store/generation-store'

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export async function generateDocumentationApi(
  repoUrl: string
): Promise<GeneratedResult> {
  const response = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ repoUrl }),
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Generation failed')
  }

  return data
}

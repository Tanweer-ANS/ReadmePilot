import { useAuth } from '@clerk/nextjs'
import type { GeneratedResult } from '@/store/generation-store'

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

/**
 * Hook that returns a typed fetch wrapper pre-loaded with the Clerk Bearer token.
 * Use this inside React components / hooks.
 */
export function useAuthenticatedApi() {
  const { getToken } = useAuth()

  const generateDocumentation = async (
    repoUrl: string
  ): Promise<GeneratedResult> => {
    const token = await getToken()

    const response = await fetch(`${API_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ repoUrl }),
    })

    let data: any = {}
    try {
      data = await response.json()
    } catch {
      throw new Error(`Server error (${response.status})`)
    }

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Generation failed')
    }

    return data
  }

  return { generateDocumentation }
}

/**
 * Plain function version — requires an already-retrieved Clerk token.
 * Used by the zustand store which calls getToken() before dispatching.
 */
export async function generateDocumentationApi(
  repoUrl: string,
  token: string | null
): Promise<GeneratedResult> {
  const response = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ repoUrl }),
  })

  let data: any = {}
  try {
    data = await response.json()
  } catch {
    throw new Error(`Server error (${response.status})`)
  }

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Generation failed')
  }

  return data
}

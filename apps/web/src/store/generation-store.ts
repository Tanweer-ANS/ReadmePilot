
import { create } from 'zustand'
import { generateDocumentationApi } from '@/lib/api'

export type GeneratedResult = {
  documentation: string
  repository: {
    fullName: string
    name: string
    description: string
    stars: number
    defaultBranch: string
  }
  analysis: {
    frameworks: string[]
    packageManager: string
    envVariables: string[]
    deploymentTargets: string[]
  }
}

type GenerationState = {
  repoUrl: string
  loading: boolean
  loadingStep: number
  error: string | null
  result: GeneratedResult | null

  setRepoUrl: (url: string) => void
  setLoading: (loading: boolean) => void
  setLoadingStep: (step: number) => void
  setError: (error: string | null) => void
  setResult: (result: GeneratedResult | null) => void

  generateDocumentation: () => Promise<void>
}

export const useGenerationStore = create<GenerationState>((set, get) => ({
  repoUrl: '',
  loading: false,
  loadingStep: 0,
  error: null,
  result: null,

  setRepoUrl: (url) => set({ repoUrl: url }),

  setLoading: (loading) => set({ loading }),

  setLoadingStep: (step) => set({ loadingStep: step }),

  setError: (error) => set({ error }),

  setResult: (result) => set({ result }),

  generateDocumentation: async () => {
    const { repoUrl } = get()

    if (!repoUrl.trim()) {
      set({ error: 'Please enter a GitHub repository URL' })
      return
    }

    try {
      // Start loading
      set({
        loading: true,
        loadingStep: 0,
        error: null,
      })

      // Step 1: Validation
      set({ loadingStep: 1 })
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Step 2: Repository analysis
      set({ loadingStep: 2 })
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Step 3: Framework detection
      set({ loadingStep: 3 })

      // Actual API call
      const result = await generateDocumentationApi(repoUrl)

      // Step 4: Finalizing
      set({
        result,
        loading: false,
        loadingStep: 4,
      })
    } catch (error: any) {
      set({
        loading: false,
        loadingStep: 0,
        error:
          error?.message ||
          'Failed to generate documentation. Please try again.',
      })
    }
  },
}))


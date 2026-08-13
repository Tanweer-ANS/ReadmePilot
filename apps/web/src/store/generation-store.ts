import { create } from 'zustand'

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
  error: string | null
  result: GeneratedResult | null

  setRepoUrl: (url: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setResult: (result: GeneratedResult | null) => void
}

export const useGenerationStore = create<GenerationState>((set) => ({
  repoUrl: '',
  loading: false,
  error: null,
  result: null,

  setRepoUrl: (url) => set({ repoUrl: url }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setResult: (result) => set({ result }),
}))
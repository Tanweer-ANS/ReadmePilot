import { create } from 'zustand'

type GeneratedDocs = {
  readme: string
  installation: string
  environment: string
  deployment: string
  apiDocs: string
}

type GenerationState = {
  repoUrl: string
  loading: boolean
  docs: GeneratedDocs | null
  setRepoUrl: (url: string) => void
  setLoading: (loading: boolean) => void
  setDocs: (docs: GeneratedDocs | null) => void
}

export const useGenerationStore = create<GenerationState>((set) => ({
  repoUrl: '',
  loading: false,
  docs: null,

  setRepoUrl: (url) => set({ repoUrl: url }),
  setLoading: (loading) => set({ loading }),
  setDocs: (docs) => set({ docs }),
}))
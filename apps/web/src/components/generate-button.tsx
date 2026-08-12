'use client'

import { Loader2, Sparkles } from 'lucide-react'
import { useGenerationStore } from '@/store/generation-store'

export function GenerateButton() {
  const { repoUrl, loading, setLoading } = useGenerationStore()

  const handleGenerate = async () => {
    if (!repoUrl.trim()) return

    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoading(false)

    alert(`Repository queued for analysis:\\n${repoUrl}`)
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={loading || !repoUrl.trim()}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Generate Documentation
        </>
      )}
    </button>
  )
}
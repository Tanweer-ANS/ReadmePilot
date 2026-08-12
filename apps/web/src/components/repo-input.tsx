'use client'

import { GitBranch } from 'lucide-react'
import { useGenerationStore } from '@/store/generation-store'

export function RepoInput() {
  const { repoUrl, setRepoUrl } = useGenerationStore()

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <GitBranch className="h-5 w-5 text-gray-500" />

        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/vercel/next.js"
          className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400 dark:text-gray-100"
        />
      </div>

      <p className="text-sm text-gray-500 text-center">
        Paste any public GitHub repository URL
      </p>
    </div>
  )
}
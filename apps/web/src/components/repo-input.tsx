'use client'

import { useGenerationStore } from '@/store/generation-store'

export function RepoInput() {
  const { repoUrl, setRepoUrl } = useGenerationStore()

  return (
    <div className="w-full">
      <label
        htmlFor="repository-url"
        className="sr-only"
      >
        GitHub repository URL
      </label>

      <div className="flex min-h-[52px] items-center rounded-2xl border border-gray-800 bg-black px-4 transition-colors focus-within:border-cyan-500/60 focus-within:ring-2 focus-within:ring-cyan-500/10">
        <span
          className="mr-3 text-gray-600"
          aria-hidden="true"
        >
          ↗
        </span>

        <input
          id="repository-url"
          type="url"
          value={repoUrl}
          onChange={(event) => setRepoUrl(event.target.value)}
          placeholder="https://github.com/owner/repository"
          autoComplete="url"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
        />
      </div>
    </div>
  )
}
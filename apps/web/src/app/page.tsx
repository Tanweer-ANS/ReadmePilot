'use client'

import { GenerateButton } from '@/components/generate-button'
import { MarkdownPreview } from '@/components/markdown-preview'
import { RepoInput } from '@/components/repo-input'
import { useGenerationStore } from '@/store/generation-store'

export default function HomePage() {
  const { result, error } = useGenerationStore()

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 py-12 dark:from-black dark:to-gray-950">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
            🚀 AI-powered GitHub documentation generator
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            ReadmePilot
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Paste any public GitHub repository URL and automatically generate professional project documentation.
          </p>
        </div>

        <div className="space-y-6">
          <RepoInput />

          <div className="flex justify-center">
            <GenerateButton />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>
          )}
        </div>

        {result && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Generated Documentation
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Framework: {result.analysis.framework} · Package Manager: {result.analysis.packageManager}
                </p>
              </div>
            </div>

            <MarkdownPreview content={result.documentation} />
          </section>
        )}
      </div>
    </main>
  )
}
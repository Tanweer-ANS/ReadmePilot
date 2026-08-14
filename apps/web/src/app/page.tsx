'use client'

import { RepoInput } from '@/components/repo-input'
import { GenerateButton } from '@/components/generate-button'
import { ResultsTabs } from '@/components/results-tabs'
import { RepoSummary } from '@/components/repo-summary'
import { CopyButton } from '@/components/copy-button'
import { useGenerationStore } from '@/store/generation-store'
import { DownloadButton } from '@/components/download-button'
import { ExportZipButton } from '@/components/export-zip-button';
import { GenerationLoading } from '@/components/generation-loading'
import { ResultSkeleton } from '@/components/result-skeleton'

export default function HomePage() {
  const {
    repoUrl,
    setRepoUrl,
    generateDocumentation,
    loading,
    loadingStep,
    error,
    result,
  } = useGenerationStore()
  const repositoryName = result?.repository.fullName?.split('/').at(-1)
    || result?.repository.name
    || 'README'

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.15),transparent_40%)]" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">
            AI-Powered GitHub Documentation Generator
          </div>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Generate professional README files from any public GitHub repository
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Paste a GitHub repository URL and let ReadmePilot analyze the project, detect frameworks, extract scripts, and generate polished developer documentation in seconds.
          </p>

          <div className="mt-10 w-full max-w-3xl rounded-3xl border border-gray-800 bg-gray-950/80 p-5 shadow-2xl shadow-cyan-500/5 backdrop-blur">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <RepoInput />
              </div>

              <GenerateButton />
            </div>

            <p className="mt-3 text-left text-xs text-gray-500">
              Try: https://github.com/expressjs/express
            </p>
          </div>

          {error && (
            <div className="mt-6 w-full max-w-3xl rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-red-300">Generation failed</p>
                  <p className="mt-1 text-sm text-red-200">{error}</p>
                </div>

                <button
                  onClick={generateDocumentation}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-400"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {loading && (
        <section className="mx-auto max-w-6xl px-6 pb-12">
          <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <GenerationLoading step={loadingStep} />
            <ResultSkeleton />
          </div>
        </section>
      )}

      {!loading && !result && (
        <section className="mx-auto max-w-4xl px-6 pb-20">
          <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-950 p-12 text-center">
            <h3 className="text-xl font-semibold text-white">
              No documentation generated yet
            </h3>

            <p className="mt-3 text-gray-400">
              Paste a public GitHub repository URL above and click Generate Documentation to create a professional README, installation guide, deployment instructions, and API documentation.
            </p>
          </div>
        </section>
      )}

      {/* Result Section */}
      {result && (
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Generated Documentation
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                {result.repository.name}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <CopyButton text={result.documentation} />

              <DownloadButton
                filename={`${result.repository.fullName.split('/')[1] || 'README'}.md`}
                content={result.documentation}
              />

              <ExportZipButton
                repoName={result.repository.fullName.split('/')[1] || 'project'}
                documentation={result.documentation}
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <RepoSummary
              repository={result.repository}
              analysis={result.analysis}
            />

            <ResultsTabs documentation={result.documentation} />
          </div>
        </section>
      )}

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white">What ReadmePilot generates</h2>
          <p className="mt-3 text-gray-400">
            Everything needed for a portfolio-ready open-source project README.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard
            title="README.md"
            description="Project overview, features, tech stack, installation steps, and usage examples."
          />

          <FeatureCard
            title="Environment Docs"
            description="Detects environment variables from .env.example files and documents them automatically."
          />

          <FeatureCard
            title="Deployment Guide"
            description="Identifies Vercel, Docker, Railway, and Render deployment configurations from the repository."
          />

          <FeatureCard
            title="API & Scripts"
            description="Extracts package.json scripts and generates developer-friendly command references."
          />
        </div>
      </section>


    </main>
  )
}

interface FeatureCardProps {
  title: string
  description: string
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 transition hover:border-cyan-500/30 hover:bg-gray-900">
      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-gray-400">
        {description}
      </p>
    </div>
  )
}

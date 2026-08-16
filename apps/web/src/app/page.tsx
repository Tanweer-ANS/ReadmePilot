'use client'

import { Suspense, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { RepoInput } from '@/components/repo-input'
import { GenerateButton } from '@/components/generate-button'
import { ResultsTabs } from '@/components/results-tabs'
import { RepoSummary } from '@/components/repo-summary'
import { CopyButton } from '@/components/copy-button'
import { DownloadButton } from '@/components/download-button'
import { ExportZipButton } from '@/components/export-zip-button'
import { GenerationLoading } from '@/components/generation-loading'
import { ResultSkeleton } from '@/components/result-skeleton'
import { RecentGenerations } from '@/components/recent-generations'

import { useGenerationStore } from '@/store/generation-store'

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageFallback />}>
      <HomePageContent />
    </Suspense>
  )
}

function HomePageContent() {
  const searchParams = useSearchParams()

  const {
    setRepoUrl,
    generateDocumentation,
    loading,
    loadingStep,
    error,
    result,
  } = useGenerationStore()

  useEffect(() => {
    const repo = searchParams.get('repo')

    if (repo) {
      setRepoUrl(repo)
    }
  }, [searchParams, setRepoUrl])

  const handleGenerate = async () => {
    await generateDocumentation()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* =========================================================
          NAVIGATION
      ========================================================== */}
      <header className="absolute left-0 right-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="group flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-sm font-black text-black transition group-hover:scale-105">
              R
            </div>

            <span className="text-lg font-bold tracking-tight text-white">
              ReadmePilot
            </span>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              href="/history"
              className="rounded-xl border border-gray-800 bg-gray-950/70 px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur transition hover:border-gray-700 hover:bg-gray-900 hover:text-white"
            >
              History
            </Link>

            <a
              href="https://github.com/Tanweer-ANS"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-xl border border-gray-800 bg-gray-950/70 px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur transition hover:border-gray-700 hover:bg-gray-900 hover:text-white sm:block"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden border-b border-gray-900">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.16),transparent_38%)]" />

        <div className="absolute left-1/2 top-40 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-36 text-center sm:pb-28 sm:pt-40">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-300 sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            AI-Powered GitHub Documentation
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Turn any GitHub repository into{' '}
            <span className="text-cyan-400">
              great documentation.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
            ReadmePilot analyzes your repository, understands its structure,
            detects its technology stack, and generates professional developer
            documentation in seconds.
          </p>

          {/* Generator Card */}
          <div className="mt-10 w-full max-w-4xl">
            <div className="rounded-3xl border border-gray-800 bg-gray-950/90 p-3 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl sm:p-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="min-w-0 flex-1">
                  <RepoInput />
                </div>

                <GenerateButton />
              </div>

              <div className="flex flex-col gap-2 px-2 pt-3 text-left sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">
                  Works with public GitHub repositories.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setRepoUrl('https://github.com/expressjs/express')
                  }
                  className="w-fit text-xs text-gray-500 transition hover:text-cyan-400"
                >
                  Try an example →
                </button>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500 sm:text-sm">
            <span>✓ Repository analysis</span>
            <span>✓ AI-generated docs</span>
            <span>✓ Markdown export</span>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 w-full max-w-4xl rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-left">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-semibold text-red-300">
                    Generation failed
                  </p>

                  <p className="mt-1 text-sm leading-6 text-red-200/80">
                    {error}
                  </p>
                </div>

                <button
                  onClick={handleGenerate}
                  className="shrink-0 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400"
                >
                  Try again
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================== */}
      <section className="border-b border-gray-900 bg-gray-950/30">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Documentation, automated
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything your repository needs
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              From project overview to deployment instructions, ReadmePilot
              turns repository information into documentation developers can
              actually use.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              number="01"
              title="README.md"
              description="Project overview, features, technology stack, installation steps, and usage examples."
            />

            <FeatureCard
              number="02"
              title="Environment Docs"
              description="Detects environment variables from example files and documents what your project needs."
            />

            <FeatureCard
              number="03"
              title="Deployment Guide"
              description="Identifies deployment configurations such as Vercel, Docker, Railway, and Render."
            />

            <FeatureCard
              number="04"
              title="API & Scripts"
              description="Extracts package scripts and repository information into developer-friendly references."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}
      <section className="border-b border-gray-900">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Simple workflow
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From repository to README in three steps
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <StepCard
              number="1"
              title="Paste your repository"
              description="Provide the URL of any public GitHub repository you want to document."
            />

            <StepCard
              number="2"
              title="ReadmePilot analyzes it"
              description="The analyzer inspects repository metadata, files, frameworks, scripts, environments, and deployment configuration."
            />

            <StepCard
              number="3"
              title="Get your documentation"
              description="Gemini transforms the repository analysis into polished, developer-friendly documentation you can copy or download."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          RECENT HISTORY
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="hidden rounded-3xl border border-gray-900 bg-gray-950/40 lg:block">
            <div className="flex h-full min-h-[220px] items-center justify-center px-10 text-center">
              <div>
                <p className="text-sm font-medium text-gray-300">
                  Your documentation workspace
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Generated repositories are automatically saved to your
                  history so you can return to them later.
                </p>

                <Link
                  href="/history"
                  className="mt-5 inline-flex rounded-xl border border-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-cyan-500/40 hover:text-white"
                >
                  View full history →
                </Link>
              </div>
            </div>
          </div>

          <RecentGenerations />
        </div>
      </section>

      {/* =========================================================
          LOADING
      ========================================================== */}
      {loading && (
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <GenerationLoading step={loadingStep} />
            <ResultSkeleton />
          </div>
        </section>
      )}

      {/* =========================================================
          EMPTY STATE
      ========================================================== */}
      {!loading && !result && (
        <section className="mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-3xl border border-dashed border-gray-800 bg-gray-950/50 px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-800 bg-gray-900 text-cyan-400">
              ✦
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Ready to document your repository?
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Paste a public GitHub repository URL above and let ReadmePilot
              generate a complete documentation package.
            </p>
          </div>
        </section>
      )}

      {/* =========================================================
          RESULTS
      ========================================================== */}
      {result && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-6 rounded-2xl border border-gray-900 bg-gray-950/50 p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">
                    Generated Documentation
                  </h2>

                  {result.cached && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
                      ⚡ Served from cache
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {result.repository.fullName}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <CopyButton text={result.documentation} />

                <DownloadButton
                  filename={`${result.repository.fullName.split('/')[1] || 'README'}.md`}
                  content={result.documentation}
                />

                <ExportZipButton
                  repoName={
                    result.repository.fullName.split('/')[1] || 'project'
                  }
                  documentation={result.documentation}
                />
              </div>
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

      {/* =========================================================
          FOOTER
      ========================================================== */}
      <footer className="border-t border-gray-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-semibold text-gray-300">
              ReadmePilot
            </span>{' '}
            — AI-powered GitHub documentation.
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/history"
              className="transition hover:text-white"
            >
              History
            </Link>

            <a
              href="https://github.com/Tanweer-ANS"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

/* ===============================================================
   FALLBACK
=============================================================== */

function HomePageFallback() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-800 border-t-cyan-400" />
      </div>
    </main>
  )
}

/* ===============================================================
   FEATURE CARD
=============================================================== */

interface FeatureCardProps {
  number: string
  title: string
  description: string
}

function FeatureCard({
  number,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-800 bg-black p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-gray-950">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest text-gray-600">
          {number}
        </span>

        <span className="text-gray-700 transition group-hover:text-cyan-400">
          ↗
        </span>
      </div>

      <h3 className="mt-8 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  )
}

/* ===============================================================
   STEP CARD
=============================================================== */

interface StepCardProps {
  number: string
  title: string
  description: string
}

function StepCard({
  number,
  title,
  description,
}: StepCardProps) {
  return (
    <div className="relative rounded-2xl border border-gray-800 bg-gray-950/40 p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-sm font-bold text-cyan-400">
        {number}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  )
}
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs'

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/dashboard')
    }
  }, [isLoaded, isSignedIn, router])

  // Show loading spinner while checking auth or redirecting logged-in user
  if (!isLoaded || isSignedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-800 border-t-cyan-400" />
          <p className="text-xs text-gray-500 font-medium">Loading ReadmePilot...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* =========================================================
          NAVIGATION
      ========================================================== */}
      <header className="absolute left-0 right-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-sm font-black text-black transition group-hover:scale-105">
              R
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              ReadmePilot
            </span>
          </Link>

          {/* Nav buttons */}
          <nav className="flex items-center gap-3">
            <SignInButton mode="redirect">
              <button
                id="nav-signin-btn"
                className="rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur transition hover:border-gray-600 hover:bg-gray-800 hover:text-white"
              >
                Sign in
              </button>
            </SignInButton>

            <SignUpButton mode="redirect">
              <button
                id="nav-signup-btn"
                className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-black transition hover:bg-cyan-400 active:scale-95"
              >
                Get started free
              </button>
            </SignUpButton>
          </nav>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden border-b border-gray-900 px-6 text-center">

        {/* Background glow effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.18),transparent)]" />
          <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />
          <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-blue-600/5 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-300 shadow-lg shadow-cyan-500/5 sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Powered by Google Gemini AI
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Turn any repo into
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              great docs.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg sm:leading-9">
            ReadmePilot analyzes any public GitHub repository and generates
            professional README files, API docs, environment guides, and
            deployment instructions — in seconds.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <SignUpButton mode="redirect">
              <button
                id="hero-signup-btn"
                className="group relative inline-flex min-w-[200px] items-center justify-center gap-2 overflow-hidden rounded-2xl bg-cyan-500 px-8 py-4 text-base font-bold text-black shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:bg-cyan-400 hover:shadow-cyan-500/30 active:scale-95"
              >
                <span>Start for free</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </button>
            </SignUpButton>

            <SignInButton mode="redirect">
              <button
                id="hero-signin-btn"
                className="inline-flex min-w-[160px] items-center justify-center rounded-2xl border border-gray-700 bg-gray-900/50 px-8 py-4 text-base font-medium text-gray-300 backdrop-blur transition-all duration-200 hover:border-gray-600 hover:bg-gray-800 hover:text-white"
              >
                Sign in
              </button>
            </SignInButton>
          </div>

          <p className="mt-6 text-sm text-gray-600">
            No credit card required · Free to use · Works with public repos
          </p>
        </div>

        {/* Terminal Preview Mockup */}
        <div className="relative z-10 mx-auto mt-16 w-full max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900/80 px-5 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-gray-500 font-mono">
                ReadmePilot — AI Documentation Generator
              </span>
            </div>
            <div className="p-6 font-mono text-sm text-left">
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-cyan-400">$</span>
                <span className="text-gray-300">Analyzing</span>
                <span className="text-cyan-300">github.com/expressjs/express</span>
              </div>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-400">Repository metadata fetched</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-400">Framework detected: Express.js + Node.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-400">Environment variables documented</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 animate-pulse">⠿</span>
                  <span className="text-gray-400">Generating README with Gemini AI…</span>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3">
                <p className="text-xs text-cyan-300 font-semibold">
                  # Express.js — Fast, unopinionated, minimalist web framework for Node.js
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  ## Installation · ## Quick Start · ## API Reference · ## Deployment…
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================== */}
      <section className="border-b border-gray-900 bg-gray-950/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Documentation, automated
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything your repository needs
            </h2>
            <p className="mt-5 leading-7 text-gray-400">
              From project overview to deployment instructions, ReadmePilot
              turns raw repository data into polished documentation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.number}
                className="group rounded-2xl border border-gray-800 bg-black p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-gray-950"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-widest text-gray-600">
                    {f.number}
                  </span>
                  <span className="text-gray-700 transition group-hover:text-cyan-400">
                    ↗
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}
      <section className="border-b border-gray-900 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Simple workflow
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From repository to README in three steps
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.number}
                className="relative rounded-2xl border border-gray-800 bg-gray-950/40 p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-lg font-bold text-cyan-400 ring-1 ring-cyan-500/20">
                  {s.number}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA SECTION
      ========================================================== */}
      <section className="py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Ready to start?
          </p>

          <h2 className="relative mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Stop writing READMEs manually.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400">
            Sign up for free and generate professional documentation for your
            GitHub repositories in seconds.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <SignUpButton mode="redirect">
              <button
                id="cta-signup-btn"
                className="group inline-flex min-w-[220px] items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-8 py-4 text-base font-bold text-black shadow-xl shadow-cyan-500/20 transition hover:bg-cyan-400 active:scale-95"
              >
                Create free account
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================== */}
      <footer className="border-t border-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-xs font-black text-black">
                R
              </div>
              <span className="font-semibold text-white">ReadmePilot</span>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
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

          <div className="mt-8 border-t border-gray-900 pt-6 text-xs text-gray-600">
            Built for developers who would rather write code than README files.
          </div>
        </div>
      </footer>
    </main>
  )
}

const FEATURES = [
  {
    number: '01',
    title: 'README.md',
    description:
      'Project overview, features, technology stack, installation steps, and usage examples.',
  },
  {
    number: '02',
    title: 'Environment Docs',
    description:
      'Detects environment variables from example files and documents what your project needs.',
  },
  {
    number: '03',
    title: 'Deployment Guide',
    description:
      'Identifies deployment configurations such as Vercel, Docker, Railway, and Render.',
  },
  {
    number: '04',
    title: 'API & Scripts',
    description:
      'Extracts package scripts and repository information into developer-friendly references.',
  },
]

const STEPS = [
  {
    number: '1',
    title: 'Paste your repository',
    description:
      'Provide the URL of any public GitHub repository you want to document.',
  },
  {
    number: '2',
    title: 'ReadmePilot analyzes it',
    description:
      'The analyzer inspects repository metadata, files, frameworks, scripts, environments, and deployment configuration.',
  },
  {
    number: '3',
    title: 'Get your documentation',
    description:
      'Gemini transforms the repository analysis into polished, developer-friendly documentation you can copy or download.',
  },
]
import { GenerateButton } from '@/components/generate-button'
import { RepoInput } from '@/components/repo-input'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
            🚀 AI-powered GitHub documentation generator
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            ReadmePilot
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Paste any public GitHub repository URL and automatically generate a professional README, installation guide, environment variable documentation, API reference, and deployment instructions.
          </p>
        </div>

        <div className="mt-10 w-full space-y-6">
          <RepoInput />

          <div className="flex justify-center">
            <GenerateButton />
          </div>
        </div>

        <div className="mt-16 grid w-full max-w-3xl gap-4 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="font-semibold text-gray-900 dark:text-white">README Generation</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Generate clean, professional, GitHub-ready README files.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="font-semibold text-gray-900 dark:text-white">API Documentation</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Detect common backend frameworks and create endpoint documentation.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="font-semibold text-gray-900 dark:text-white">Deployment Guides</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Generate Vercel, Render, Railway, and Docker deployment instructions automatically.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
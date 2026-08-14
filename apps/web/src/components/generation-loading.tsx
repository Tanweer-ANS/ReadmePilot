'use client'

import { Loader2, CheckCircle2 } from 'lucide-react'

interface GenerationLoadingProps {
  step: number
}

const steps = [
  'Validating GitHub repository',
  'Analyzing repository structure',
  'Detecting frameworks and scripts',
  'Generating AI documentation',
  'Preparing markdown preview',
]

export function GenerationLoading({ step }: GenerationLoadingProps) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
      <div className="mb-4 flex items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">
          Generating documentation
        </h3>
      </div>

      <div className="space-y-3">
        {steps.map((label, index) => {
          const current = index === step
          const completed = index < step

          return (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900 px-4 py-3"
            >
              {completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              ) : current ? (
                <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
              ) : (
                <div className="h-5 w-5 rounded-full border border-gray-700" />
              )}

              <span
                className={current ? 'text-white' : 'text-gray-400'}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
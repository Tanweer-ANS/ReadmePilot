'use client'

import { useMemo, useState } from 'react'
import { MarkdownPreview } from './markdown-preview'

interface ResultsTabsProps {
  documentation: string
}

export function ResultsTabs({ documentation }: ResultsTabsProps) {
  const sections = useMemo(() => {
    const installationIndex = documentation.indexOf('## Installation')
    const envIndex = documentation.indexOf('## Environment')
    const deployIndex = documentation.indexOf('## Deployment')

    return {
      readme: documentation,
      installation: installationIndex !== -1
        ? documentation.slice(installationIndex, envIndex !== -1 ? envIndex : undefined)
        : 'No installation section found.',
      environment: envIndex !== -1
        ? documentation.slice(envIndex, deployIndex !== -1 ? deployIndex : undefined)
        : 'No environment section found.',
      deployment: deployIndex !== -1
        ? documentation.slice(deployIndex)
        : 'No deployment section found.',
    }
  }, [documentation])

  const [active, setActive] = useState<keyof typeof sections>('readme')

  const tabs = [
    ['readme', 'README'],
    ['installation', 'Installation'],
    ['environment', 'Environment'],
    ['deployment', 'Deployment'],
  ] as const

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950">
      <div className="flex flex-wrap gap-2 border-b border-gray-800 p-3">
        {tabs.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              active === key
                ? 'bg-cyan-500 text-black'
                : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="p-6">
        <MarkdownPreview content={sections[active]} />
      </div>
    </div>
  )
}
'use client'

import JSZip from 'jszip'
import { Download } from 'lucide-react'

interface ExportZipButtonProps {
  repoName: string
  documentation: string
}

function extractSection(doc: string, heading: string, nextHeadings: string[]) {
  const start = doc.indexOf(`## ${heading}`)

  if (start === -1) return `# ${heading}\n\nNo content available.`

  let end = doc.length

  for (const next of nextHeadings) {
    const index = doc.indexOf(`## ${next}`)

    if (index !== -1 && index > start) {
      end = Math.min(end, index)
    }
  }

  return doc.slice(start, end).trim()
}

export function ExportZipButton({
  repoName,
  documentation,
}: ExportZipButtonProps) {
  const handleExport = async () => {
    const zip = new JSZip()

    zip.file('README.md', documentation)

    zip.file(
      'INSTALLATION.md',
      extractSection(documentation, 'Installation', [
        'Environment Variables',
        'Deployment',
        'API',
      ])
    )

    zip.file(
      'ENVIRONMENT.md',
      extractSection(documentation, 'Environment Variables', [
        'Deployment',
        'API',
      ])
    )

    zip.file(
      'DEPLOYMENT.md',
      extractSection(documentation, 'Deployment', ['API'])
    )

    zip.file(
      'API.md',
      extractSection(documentation, 'API', [])
    )

    const blob = await zip.generateAsync({ type: 'blob' })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `${repoName}-docs.zip`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 transition hover:bg-gray-800"
    >
      <Download className="h-4 w-4" />
      Export ZIP
    </button>
  )
}
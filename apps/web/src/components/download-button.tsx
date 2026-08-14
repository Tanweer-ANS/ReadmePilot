'use client'

import { Download } from 'lucide-react'

interface DownloadButtonProps {
  filename?: string
  content: string
}

export function DownloadButton({
  filename = 'README.md',
  content,
}: DownloadButtonProps) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 transition hover:bg-gray-800"
    >
      <Download className="h-4 w-4" />
      Download README
    </button>
  )
}
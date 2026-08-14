'use client'

import { Trash2, ExternalLink } from 'lucide-react'

type HistoryCardProps = {
  item: {
    id: string
    repo_full_name: string
    repo_url: string
    description: string | null
    created_at: string
  }
  onDelete: (id: string) => void
}

export function HistoryCard({ item, onDelete }: HistoryCardProps) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5 transition hover:border-cyan-500/30">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">
            {item.repo_full_name}
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            {item.description || 'No description available'}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span>
              {new Date(item.created_at).toLocaleString()}
            </span>

            <a
              href={item.repo_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
            >
              <ExternalLink className="h-3 w-3" />
              Repository
            </a>
          </div>
        </div>

        <button
          onClick={() => onDelete(item.id)}
          className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-300 transition hover:bg-red-500/20"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
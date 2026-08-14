'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { getRecentGenerations } from '@/services/history.service'

type HistoryItem = {
  id: string
  repo_full_name: string
  description: string | null
  created_at: string
}

export function RecentGenerations() {
  const [items, setItems] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRecentGenerations(5)
      .then(setItems)
      .catch((error) => {
        console.error('Failed to load generation history:', error)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-cyan-400" />
        <h3 className="font-semibold text-white">Recent Generations</h3>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading history...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-400">No history yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-800 bg-gray-900 p-3"
            >
              <p className="font-medium text-white">
                {item.repo_full_name}
              </p>

              <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                {item.description || 'No description'}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

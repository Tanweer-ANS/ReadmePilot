'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { HistoryCard } from '@/components/history-card'
import {
  deleteGeneration,
  getRecentGenerations,
  searchGenerations,
} from '@/services/history.service'

type HistoryItem = {
  id: string
  repo_full_name: string
  repo_url: string
  description: string | null
  created_at: string
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    setLoading(true)

    try {
      const data = await getRecentGenerations(50)
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (value: string) => {
    setQuery(value)

    if (!value.trim()) {
      return loadHistory()
    }

    const results = await searchGenerations(value)
    setItems(results)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this generation?')) return

    await deleteGeneration(id)
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Generation History
            </h1>

            <p className="mt-2 text-gray-400">
              Browse and manage previously generated documentation.
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search repositories..."
              className="w-full rounded-xl border border-gray-800 bg-gray-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl bg-gray-900"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-950 p-12 text-center">
            <h3 className="text-xl font-semibold text-white">
              No generations found
            </h3>

            <p className="mt-2 text-gray-400">
              Generate documentation from the homepage to start building your history.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <HistoryCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
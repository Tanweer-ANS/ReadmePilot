type CacheEntry<T> = {
  value: T
  expiresAt: number
}

class MemoryCache {
  private store = new Map<string, CacheEntry<any>>()
  private hits = 0
  private misses = 0

  set<T>(key: string, value: T, ttlSeconds = 3600) {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    })

    console.log(`[cache] SET key=${key} ttl=${ttlSeconds}s`)
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key)

    if (!entry) {
      this.misses++
      console.log(`[cache] MISS key=${key}`)
      return null
    }

    if (Date.now() >= entry.expiresAt) {
      this.store.delete(key)
      this.misses++
      console.log(`[cache] EXPIRED key=${key}`)
      return null
    }

    this.hits++
    console.log(`[cache] HIT key=${key}`)
    return entry.value as T
  }

  has(key: string) {
    return this.get(key) !== null
  }

  delete(key: string) {
    this.store.delete(key)
  }

  clear() {
    this.store.clear()
    this.hits = 0
    this.misses = 0
    console.log('[cache] CLEAR')
  }

  getStats() {
    const now = Date.now()

    for (const [key, entry] of this.store) {
      if (now >= entry.expiresAt) {
        this.store.delete(key)
        console.log(`[cache] EXPIRED key=${key}`)
      }
    }

    const requests = this.hits + this.misses

    return {
      entries: this.store.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: requests === 0 ? 0 : Number((this.hits / requests).toFixed(3)),
    }
  }
}

export const cache = new MemoryCache()

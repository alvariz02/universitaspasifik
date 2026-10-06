// Short-lived browser cache with shared in-flight requests.
class Cache {
  private entries = new Map<string, { data: unknown; timestamp: number }>()
  private pending = new Map<string, Promise<unknown>>()
  private ttl = 30_000

  get<T>(key: string): T | null {
    const entry = this.entries.get(key)
    if (!entry) return null
    if (Date.now() - entry.timestamp >= this.ttl) {
      this.entries.delete(key)
      return null
    }
    return entry.data as T
  }

  set<T>(key: string, data: T) {
    this.entries.set(key, { data, timestamp: Date.now() })
  }

  async fetch<T>(key: string, fetcher: () => Promise<T>, force = false): Promise<T> {
    if (!force) {
      const cached = this.get<T>(key)
      if (cached !== null) return cached
      const pending = this.pending.get(key)
      if (pending) return pending as Promise<T>
    } else {
      this.entries.delete(key)
    }
    const request = Promise.resolve().then(fetcher)
    this.pending.set(key, request)
    try {
      const data = await request
      if (this.pending.get(key) === request) this.set(key, data)
      return data
    } finally {
      if (this.pending.get(key) === request) this.pending.delete(key)
    }
  }

  clear(key?: string) {
    if (key !== undefined) {
      this.entries.delete(key)
      this.pending.delete(key)
    } else {
      this.entries.clear()
      this.pending.clear()
    }
  }
}

export const cache = new Cache()

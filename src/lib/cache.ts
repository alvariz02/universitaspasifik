// Simple cache implementation
class Cache {
  private cache = new Map<string, { data: any; timestamp: number }>()
  private ttl = 5 * 60 * 1000 // 5 minutes

  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear() {
    this.cache.clear()
  }
}

export const cache = new Cache()

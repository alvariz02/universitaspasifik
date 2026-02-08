'use client'

import { useState, useEffect } from 'react'
import { cache } from '@/lib/cache'

export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Always fetch fresh data for now (disable cache temporarily)
        console.log(`🌐 Fetching fresh data for ${key} (cache disabled)`)
        const freshData = await fetcher()
        cache.set(key, freshData)
        setData(freshData)
      } catch (err) {
        console.error(`❌ Error loading ${key}:`, err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    // Only run client-side or when Prisma is available
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin')) {
      loadData()
    } else {
      // For server-side or admin pages, set loading to false
      setLoading(false)
      setError(null)
      setData(null)
    }
  }, dependencies)

  const refetch = () => {
    console.log(`🔄 Refetching ${key}`)
    cache.clear() // Clear ALL cache
    loadData()
  }

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log(`🌐 Fetching fresh data for ${key}`)
      const freshData = await fetcher()
      cache.set(key, freshData)
      setData(freshData)
    } catch (err) {
      console.error(`❌ Error loading ${key}:`, err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

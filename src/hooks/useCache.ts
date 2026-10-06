'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { cache } from '@/lib/cache'

export function useCache<T>(key: string, fetcher: () => Promise<T>, dependencies: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fetcherRef = useRef(fetcher)
  const mounted = useRef(false)
  const generation = useRef(0)
  fetcherRef.current = fetcher

  const loadData = useCallback(async (force = false) => {
    const requestGeneration = ++generation.current
    setLoading(true)
    setError(null)
    try {
      const freshData = await cache.fetch(key, () => fetcherRef.current(), force)
      if (mounted.current && generation.current === requestGeneration) setData(freshData)
    } catch (err) {
      if (mounted.current && generation.current === requestGeneration) {
        setError(err instanceof Error ? err.message : 'Gagal memuat data')
      }
    } finally {
      if (mounted.current && generation.current === requestGeneration) setLoading(false)
    }
  }, [key])

  useEffect(() => {
    mounted.current = true
    void loadData()
    return () => {
      mounted.current = false
      generation.current++
    }
  }, [loadData, ...dependencies])

  const refetch = useCallback(() => loadData(true), [loadData])
  return { data, loading, error, refetch }
}

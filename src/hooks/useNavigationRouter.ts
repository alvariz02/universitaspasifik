'use client'

import { useMemo } from 'react'
import { useRouter as useNextRouter } from 'next/navigation'
import { signalNavigation } from '@/components/NavigationProgress'

export function useRouter() {
  const router = useNextRouter()
  return useMemo(() => ({
    ...router,
    push: (...args: Parameters<typeof router.push>) => { signalNavigation(args[0]); router.push(...args) },
    replace: (...args: Parameters<typeof router.replace>) => { signalNavigation(args[0]); router.replace(...args) },
  }), [router])
}

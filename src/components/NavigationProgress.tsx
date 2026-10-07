'use client'

import { Suspense, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export function signalNavigation(href: string) {
  const target = new URL(href, window.location.href)
  if (target.origin === window.location.origin && target.pathname + target.search !== window.location.pathname + window.location.search) {
    window.dispatchEvent(new Event('navigation-start'))
  }
}

function Progress() {
  const pathname = usePathname()
  const params = useSearchParams()
  const [pending, setPending] = useState(false)
  useEffect(() => { setPending(false) }, [pathname, params])
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const start = () => {
      setPending(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setPending(false), 30000)
    }
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element).closest('a[href]') as HTMLAnchorElement | null
      if (!anchor || anchor.download || (anchor.target && anchor.target !== '_self') || anchor.pathname.startsWith('/api/')) return
      signalNavigation(anchor.href)
    }
    window.addEventListener('navigation-start', start)
    document.addEventListener('click', click, true)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('navigation-start', start)
      document.removeEventListener('click', click, true)
    }
  }, [])
  if (!pending) return null
  return <div role="status" aria-live="polite" data-navigation-progress className="pointer-events-none fixed inset-0 z-[100]">
    <div className="fixed inset-x-0 top-0 z-[100] h-1 bg-unipas-accent/20"><div className="h-full w-2/3 bg-unipas-accent animate-pulse motion-reduce:animate-none" /></div>
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 rounded-full border bg-white px-5 py-3 text-sm font-medium text-unipas-primary shadow-lg"><Loader2 aria-hidden="true" className="h-4 w-4 animate-spin motion-reduce:animate-none" />Memuat halaman...</div>
  </div>
}

export default function NavigationProgress() {
  return <Suspense fallback={null}><Progress /></Suspense>
}

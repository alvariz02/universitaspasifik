'use client'

import { signalNavigation } from '@/components/NavigationProgress'
import { useTransition } from 'react'
import { useRouter } from '@/hooks/useNavigationRouter'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function SearchForm({ query }: { query: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  return <form className="flex gap-2" onSubmit={event => {
    event.preventDefault()
    const q = String(new FormData(event.currentTarget).get('q') || '').trim()
    if (q.length < 2) return
    const href = `/cari?${new URLSearchParams({ q })}`
    signalNavigation(href)
    startTransition(() => router.push(href))
  }}>
    <Input key={query} name="q" aria-label="Kata kunci pencarian" placeholder="Cari berita, pengumuman, program studi..." defaultValue={query} minLength={2} maxLength={100} required />
    <Button type="submit" disabled={pending}>{pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Mencari...</> : 'Cari'}</Button>
  </form>
}

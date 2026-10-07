import PageHero from '@/components/layout/PageHero'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import SearchForm from '@/components/SearchForm'
import { Suspense } from 'react'
import PageLoading from '@/components/PageLoading'
import { Button } from '@/components/ui/button'
import { searchSite, searchTypes } from '@/lib/site-search'

export const dynamic = 'force-dynamic'
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; type?: string; page?: string }> }) {
  const params = await searchParams
  const q = (params.q || '').slice(0, 100)
  const type = params.type && params.type in searchTypes ? params.type : 'all'
  const page = Math.max(1, parseInt(params.page || '1') || 1)
  const href = (nextType: string, nextPage = 1) => `/cari?${new URLSearchParams({ q, type: nextType, page: String(nextPage) })}`
  return <div className="min-h-screen flex flex-col"><Header /><main className="public-page flex-1"><PageHero title="Cari di Website UNIPAS" description="Temukan berita, pengumuman, program studi, dan informasi kampus." /><div className="site-container py-12 max-w-5xl space-y-8">
    <SearchForm query={q} />
    <nav aria-label="Jenis hasil" className="flex gap-2 flex-wrap"><Link href={href('all')} className={`rounded-full px-4 py-2 border ${type === 'all' ? 'bg-unipas-primary text-white' : 'bg-white'}`}>Semua</Link>{Object.entries(searchTypes).map(([key, label]) => <Link key={key} href={href(key)} className={`rounded-full px-4 py-2 border ${type === key ? 'bg-unipas-primary text-white' : 'bg-white'}`}>{label}</Link>)}</nav>
    <Suspense key={`${q}:${type}:${page}`} fallback={<PageLoading label="Mencari konten..." />}><SearchResults q={q} type={type} page={page} /></Suspense>
  </div></main><Footer /></div>
}

async function SearchResults({ q, type, page }: { q: string; type: string; page: number }) {
  let result: Awaited<ReturnType<typeof searchSite>> = { groups: [], total: 0 }
  let error = false
  try { result = await searchSite(q, type, page) } catch { error = true }
  const href = (nextType: string, nextPage = 1) => `/cari?${new URLSearchParams({ q, type: nextType, page: String(nextPage) })}`
  return <>
    {q.trim().length < 2 ? <p className="text-muted-foreground">Masukkan minimal dua karakter untuk mencari.</p> : error ? <p role="alert">Pencarian belum tersedia. Silakan coba lagi.</p> : <><p className="text-muted-foreground">{result.total} hasil untuk “{q}”</p>{result.groups.filter(g => g.total > 0).map(group => <section key={group.type} className="space-y-3"><div className="flex justify-between gap-3"><h2 className="section-title text-xl font-semibold">{group.label} ({group.total})</h2>{type === 'all' && group.total > 5 && <Link href={href(group.type)} className="text-unipas-accent">Lihat semua</Link>}</div>{group.items.map((item: any) => <Link key={item.id} href={item.url} className="site-card block bg-white border p-5 hover:border-unipas-accent"><h3 className="font-semibold text-unipas-primary">{item.title}</h3><p className="text-muted-foreground text-sm mt-2">{item.excerpt}</p></Link>)}</section>)}{type !== 'all' && <div className="flex gap-3">{page > 1 && <Button asChild variant="outline"><Link href={href(type, page - 1)}>Sebelumnya</Link></Button>}{page * 20 < result.total && <Button asChild variant="outline"><Link href={href(type, page + 1)}>Berikutnya</Link></Button>}</div>}</>}
  </>
}

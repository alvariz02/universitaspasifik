'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

export default function MediaPicker({ onSelect, disabled }: { onSelect: (url: string) => void; disabled?: boolean }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (!open) return
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setLoading(true); setError('')
      try {
        const response = await fetch(`/api/admin/media?${new URLSearchParams({ q: search, page: String(page) })}`, { signal: controller.signal })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error)
        setItems(data.items); setTotal(data.total)
      } catch (error) { if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'Media gagal dimuat') }
      finally { if (!controller.signal.aborted) setLoading(false) }
    }, 250)
    return () => { clearTimeout(timer); controller.abort() }
  }, [open, search, page])
  return <><Button type="button" variant="outline" disabled={disabled} onClick={() => setOpen(true)}>Pilih dari Media</Button><Dialog open={open} onOpenChange={setOpen}><DialogContent className="sm:max-w-3xl max-h-[85dvh] overflow-y-auto"><DialogHeader><DialogTitle>Perpustakaan Media</DialogTitle><DialogDescription>Pilih gambar yang sudah pernah diunggah.</DialogDescription></DialogHeader><Input aria-label="Cari gambar" placeholder="Cari gambar..." value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />{error ? <p role="alert">{error}</p> : loading ? <p role="status">Memuat gambar...</p> : !items.length ? <p>Belum ada gambar yang cocok.</p> : <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{items.map(item => <button key={item.id} type="button" className="border rounded-lg overflow-hidden hover:border-unipas-accent focus-visible:ring-2 focus-visible:ring-unipas-accent text-left" onClick={() => { onSelect(item.url); setOpen(false) }}><img src={item.url} alt={item.altText || item.name} className="w-full h-32 object-cover" /><span className="block p-2 text-sm truncate">{item.name}</span></button>)}</div>}<div className="flex justify-between"><Button type="button" variant="outline" disabled={page === 1 || loading} onClick={() => setPage(page - 1)}>Sebelumnya</Button><Button type="button" variant="outline" disabled={page * 25 >= total || loading} onClick={() => setPage(page + 1)}>Berikutnya</Button></div></DialogContent></Dialog></>
}

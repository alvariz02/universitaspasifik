'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import AdminLayout from './AdminLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useAuth } from '@/contexts/AuthContext'
import { canManage } from '@/lib/permissions'
import { useToast } from '@/hooks/use-toast'
import FileUpload from './FileUpload'
import RichTextEditor from './RichTextEditor'

type Field = { key: string; label: string; type?: string; required?: boolean; options?: string[] }
const fields: Record<string, Field[]> = {
  news: [{ key: 'title', label: 'Judul', required: true }, { key: 'slug', label: 'Slug', required: true }, { key: 'excerpt', label: 'Ringkasan', type: 'textarea' }, { key: 'content', label: 'Isi berita', type: 'textarea', required: true }, { key: 'category', label: 'Kategori' }, { key: 'authorName', label: 'Penulis' }, { key: 'publishedDate', label: 'Tanggal tayang', type: 'date' }, { key: 'imageUrl', label: 'Gambar', type: 'image' }, { key: 'status', label: 'Status', options: ['draft', 'review', 'published'] }, { key: 'isFeatured', label: 'Berita unggulan', type: 'checkbox' }],
  research: [{ key: 'title', label: 'Judul', required: true }, { key: 'slug', label: 'Slug', required: true }, { key: 'abstract', label: 'Abstrak', type: 'textarea' }, { key: 'researchers', label: 'Peneliti (pisahkan dengan koma)' }, { key: 'category', label: 'Bidang penelitian' }, { key: 'keywords', label: 'Kata kunci' }, { key: 'publicationDate', label: 'Tanggal publikasi', type: 'date' }, { key: 'imageUrl', label: 'Gambar', type: 'image' }, { key: 'pdfUrl', label: 'URL publikasi/PDF', type: 'url' }],
  pages: [{ key: 'title', label: 'Judul', required: true }, { key: 'slug', label: 'Slug (profil, sejarah, visi-misi, atau nama halaman baru)', required: true }, { key: 'content', label: 'Isi halaman', type: 'textarea', required: true }, { key: 'metaDescription', label: 'Deskripsi untuk mesin pencari' }, { key: 'metaKeywords', label: 'Kata kunci' }, { key: 'isPublished', label: 'Tampilkan halaman', type: 'checkbox' }],
  applicants: [{ key: 'fullName', label: 'Nama lengkap', required: true }, { key: 'email', label: 'Email', type: 'email', required: true }, { key: 'phone', label: 'Telepon', required: true }, { key: 'admissionPath', label: 'Jalur', options: ['snbp', 'snbt', 'simak'] }, { key: 'highSchool', label: 'Asal sekolah', required: true }, { key: 'major', label: 'Program studi', required: true }, { key: 'gpa', label: 'Nilai rata-rata', type: 'number', required: true }, { key: 'address', label: 'Alamat', type: 'textarea', required: true }, { key: 'motivation', label: 'Motivasi', type: 'textarea', required: true }, { key: 'status', label: 'Status', options: ['new', 'contacted', 'verified', 'accepted', 'rejected'] }, { key: 'notes', label: 'Catatan internal', type: 'textarea' }],
  media: [{ key: 'name', label: 'Nama gambar', required: true }, { key: 'url', label: 'Gambar', type: 'image', required: true }, { key: 'altText', label: 'Deskripsi gambar (alt text)' }],
  users: [{ key: 'name', label: 'Nama staf', required: true }, { key: 'email', label: 'Email', type: 'email', required: true }, { key: 'password', label: 'Password (minimal 12 karakter; kosongkan saat edit untuk mempertahankan)', type: 'password' }, { key: 'role', label: 'Hak akses', options: ['editor', 'humas', 'admin'] }, { key: 'isActive', label: 'Akun aktif', type: 'checkbox' }],
}
const titles: Record<string, string> = { news: 'Berita', research: 'Penelitian', pages: 'Halaman Website', applicants: 'Calon Mahasiswa', media: 'Perpustakaan Media', users: 'Akun Staf', history: 'Riwayat Aktivitas' }
const labels: Record<string, string> = { draft: 'Draft', review: 'Menunggu tinjauan', published: 'Dipublikasikan', new: 'Baru', contacted: 'Sudah dihubungi', verified: 'Terverifikasi', accepted: 'Diterima', rejected: 'Ditolak', admin: 'Administrator', humas: 'Humas', editor: 'Editor' }

export default function ResourceManager({ resource }: { resource: string }) {
  const { user, isLoading: authLoading } = useAuth()
  const { toast } = useToast()
  const [items, setItems] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [trash, setTrash] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Record<string, any> | null>(null)
  const [archiveTarget, setArchiveTarget] = useState<any>(null)
  const [revisions, setRevisions] = useState<any[] | null>(null)
  const [revisionTarget, setRevisionTarget] = useState<any>(null)
  const allowed = !!user && canManage(user.role, resource)
  const query = new URLSearchParams({ page: String(page), q: search, trash: String(trash) })
  if (status !== 'all') query.set('status', status)
  const queryString = query.toString()
  const load = useCallback(async () => {
    if (!allowed) return
    setLoading(true); setError('')
    try {
      const response = await fetch(`/api/admin/${resource}?${queryString}`, { cache: 'no-store' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setItems(data.items); setTotal(data.total)
    } catch (error) { setError(error instanceof Error ? error.message : 'Data gagal dimuat') }
    finally { setLoading(false) }
  }, [resource, queryString, allowed])
  useEffect(() => { const timer = setTimeout(load, 250); return () => clearTimeout(timer) }, [load])
  const mutate = async (body: any, method = 'PATCH') => {
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/${resource}`, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      toast({ title: 'Perubahan disimpan' }); setEditing(null); setArchiveTarget(null); setRevisions(null)
      await load()
    } catch (error) { toast({ title: 'Gagal menyimpan', description: error instanceof Error ? error.message : 'Coba lagi', variant: 'destructive' }) }
    finally { setSaving(false) }
  }
  const showRevisions = async (item: any) => {
    try {
      const response = await fetch(`/api/admin/history?revisions=true&resource=${resource}&id=${item.id}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setRevisionTarget(item); setRevisions(data)
    } catch (error) { toast({ title: 'Riwayat gagal dimuat', description: String(error), variant: 'destructive' }) }
  }
  const newRecord = () => setEditing({ status: resource === 'news' ? 'draft' : 'new', role: 'editor', isActive: true, isPublished: true, admissionPath: 'simak', isFeatured: false })
  const nameOf = (item: any) => item.title || item.fullName || item.name || item.summary
  const availableFields = fields[resource] || []
  return <AdminLayout><div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
    <div className="admin-page-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div><h1 className="admin-title text-unipas-primary">{titles[resource] || 'Modul tidak ditemukan'}</h1><p className="text-muted-foreground mt-1">{resource === 'history' ? 'Catatan perubahan oleh staf website.' : 'Kelola data, tinjau perubahan, dan pulihkan arsip.'}</p></div>
      {allowed && resource !== 'history' && (resource === 'news' ? <Button asChild><Link href="/admin/news/create">Tambah Berita</Link></Button> : <Button onClick={newRecord}>Tambah {resource === 'users' ? 'Akun' : 'Data'}</Button>)}
    </div>
    {!authLoading && !allowed ? <p className="site-card bg-white border p-6">Anda tidak memiliki akses ke modul ini.</p> : allowed && <>
      <div className="site-card bg-white border p-4 flex flex-col sm:flex-row gap-3">
        <Input aria-label="Cari data" placeholder="Cari data..." value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        {['news', 'applicants'].includes(resource) && <Select value={status} onValueChange={v => { setStatus(v); setPage(1) }}><SelectTrigger className="sm:w-60" aria-label="Filter status"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Semua status</SelectItem>{availableFields.find(f => f.key === 'status')?.options?.map(v => <SelectItem key={v} value={v}>{labels[v] || v}</SelectItem>)}</SelectContent></Select>}
        {!['users', 'history'].includes(resource) && <Button variant={trash ? 'default' : 'outline'} onClick={() => { setTrash(!trash); setPage(1) }}>{trash ? 'Lihat data aktif' : 'Lihat arsip'}</Button>}
        {resource === 'applicants' && <Button variant="outline" asChild><a href={`/api/admin/applicants?${queryString}&export=csv`}>Ekspor CSV</a></Button>}
      </div>
      {error ? <div role="alert" className="p-5 rounded-xl bg-red-50 text-red-800 border border-red-200">{error}<Button variant="outline" className="ml-3" onClick={load}>Coba lagi</Button></div> : loading ? <p role="status">Memuat data...</p> : !items.length ? <div className="site-card bg-white border p-10 text-center text-muted-foreground">Belum ada data yang cocok.</div> : <div className={resource === 'media' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>{items.map(item => <article key={item.id} className="site-card bg-white border p-5 min-w-0">
        {resource === 'media' && <img src={item.url} alt={item.altText || item.name} className="w-full h-44 object-cover rounded-lg mb-3" />}
        <div className={resource === 'media' ? 'flex flex-col gap-4' : 'flex flex-col md:flex-row md:items-center justify-between gap-4'}><div className="min-w-0"><h2 className="font-semibold break-words">{nameOf(item)}</h2><p className="text-sm text-muted-foreground break-words">{resource === 'history' ? `${item.actorEmail} · ${item.resource} · ${item.action}` : item.email || item.slug || item.url || ''}</p><p className="text-sm mt-1">{labels[item.status || item.role] || (resource === 'users' ? '' : '')}{resource === 'users' && ` · ${item.isActive ? 'Aktif' : 'Nonaktif'}`}</p><time className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString('id-ID')}</time></div>
          {resource !== 'history' && <div className="flex flex-wrap gap-2 shrink-0">
            {trash ? <Button size="sm" disabled={saving} onClick={() => mutate({ id: item.id, action: 'restore' })}>Pulihkan</Button> : (resource === 'news' ? <Button size="sm" variant="outline" asChild><Link href={`/admin/news/create?id=${item.id}`}>Edit</Link></Button> : <Button size="sm" variant="outline" onClick={() => setEditing({ ...item, password: '' })}>Edit</Button>)}
            {!trash && resource === 'news' && <Button size="sm" variant="outline" asChild><Link href={`/admin/news/preview/${item.id}`}>Preview</Link></Button>}
            {!trash && resource === 'pages' && item.isPublished && <Button size="sm" variant="outline" asChild><Link href={['profil', 'sejarah', 'visi-misi'].includes(item.slug) ? `/tentang/${item.slug}` : `/halaman/${item.slug}`}>Lihat halaman</Link></Button>}
            {resource === 'media' && <Button size="sm" variant="outline" onClick={async () => { try { await navigator.clipboard.writeText(item.url); toast({ title: 'URL disalin' }) } catch { toast({ title: 'URL tidak dapat disalin', variant: 'destructive' }) } }}>Salin URL</Button>}
            {resource !== 'users' && <Button size="sm" variant="outline" onClick={() => showRevisions(item)}>Riwayat</Button>}
            {!trash && resource !== 'users' && <Button size="sm" variant="outline" className="text-red-700" onClick={() => setArchiveTarget(item)}>Arsipkan</Button>}
          </div>}
        </div>
      </article>)}</div>}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"><p className="text-sm text-muted-foreground">{total} data · Halaman {page} dari {Math.max(1, Math.ceil(total / 25))}</p><div className="flex gap-2"><Button variant="outline" disabled={page === 1 || loading} onClick={() => setPage(page - 1)}>Sebelumnya</Button><Button variant="outline" disabled={page * 25 >= total || loading} onClick={() => setPage(page + 1)}>Berikutnya</Button></div></div>
    </>}
    <Dialog open={!!editing} onOpenChange={open => { if (!open && !saving) setEditing(null) }}><DialogContent className="sm:max-w-3xl max-h-[90dvh] overflow-y-auto"><DialogHeader><DialogTitle>{editing?.id ? 'Edit' : 'Tambah'} {titles[resource]}</DialogTitle><DialogDescription>Isi data berikut lalu simpan perubahan.</DialogDescription></DialogHeader>
      {editing && <form className="space-y-4" onSubmit={e => { e.preventDefault(); mutate(editing, editing.id ? 'PATCH' : 'POST') }}>{availableFields.map(field => <div key={field.key} className="space-y-2"><Label htmlFor={`field-${field.key}`}>{field.label}</Label>
        {field.type === 'checkbox' ? <input id={`field-${field.key}`} type="checkbox" checked={!!editing[field.key]} onChange={e => setEditing({ ...editing, [field.key]: e.target.checked })} /> : field.options ? <Select value={editing[field.key] || field.options[0]} onValueChange={v => setEditing({ ...editing, [field.key]: v })}><SelectTrigger id={`field-${field.key}`}><SelectValue /></SelectTrigger><SelectContent>{field.options.filter(v => !(resource === 'news' && user?.role === 'editor' && v === 'published')).map(v => <SelectItem key={v} value={v}>{labels[v] || v}</SelectItem>)}</SelectContent></Select> : field.type === 'image' && resource === 'media' && editing.id ? <div className="space-y-2"><img src={editing[field.key]} alt={editing.altText || editing.name} className="w-full h-48 object-contain bg-gray-50 rounded-lg" /><Input id={`field-${field.key}`} value={editing[field.key]} readOnly /></div> : field.type === 'image' ? <FileUpload value={editing[field.key] || ''} onChange={v => setEditing({ ...editing, [field.key]: v })} /> : field.key === 'content' ? <RichTextEditor value={editing[field.key] || ''} onChange={v => setEditing({ ...editing, [field.key]: v })} /> : field.type === 'textarea' ? <Textarea id={`field-${field.key}`} required={field.required} rows={field.key === 'content' ? 12 : 4} value={editing[field.key] || ''} onChange={e => setEditing({ ...editing, [field.key]: e.target.value })} /> : <Input id={`field-${field.key}`} type={field.type || 'text'} required={field.required} min={field.key === 'gpa' ? 0 : undefined} max={field.key === 'gpa' ? 100 : undefined} step={field.key === 'gpa' ? '0.01' : undefined} autoComplete={field.type === 'password' ? 'new-password' : undefined} value={field.type === 'date' ? (editing[field.key] || '').slice(0, 10) : editing[field.key] ?? ''} onChange={e => setEditing({ ...editing, [field.key]: e.target.value })} />}
      </div>)}<Button type="submit" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button></form>}
    </DialogContent></Dialog>
    <Dialog open={!!archiveTarget} onOpenChange={open => { if (!open) setArchiveTarget(null) }}><DialogContent><DialogHeader><DialogTitle>Arsipkan data?</DialogTitle><DialogDescription>{archiveTarget && nameOf(archiveTarget)} akan disembunyikan. Data dapat dipulihkan dari arsip.</DialogDescription></DialogHeader><Button disabled={saving} variant="destructive" onClick={() => mutate({ id: archiveTarget.id }, 'DELETE')}>Arsipkan</Button></DialogContent></Dialog>
    <Dialog open={!!revisions} onOpenChange={open => { if (!open) setRevisions(null) }}><DialogContent className="sm:max-w-3xl max-h-[90dvh] overflow-y-auto"><DialogHeader><DialogTitle>Riwayat versi</DialogTitle><DialogDescription>Versi sebelumnya dari {revisionTarget && nameOf(revisionTarget)}. Pemulihan juga menyimpan versi saat ini.</DialogDescription></DialogHeader>{!revisions?.length ? <p>Belum ada versi sebelumnya.</p> : revisions.map(revision => <div key={revision.id} className="border rounded-lg p-4 space-y-3"><p>{revision.actorEmail} · {revision.action} · {new Date(revision.createdAt).toLocaleString('id-ID')}</p><details><summary className="cursor-pointer">Lihat versi</summary><pre className="whitespace-pre-wrap break-words text-xs mt-3">{JSON.stringify(revision.snapshot, null, 2)}</pre></details><Button disabled={saving} variant="outline" onClick={() => mutate({ id: revisionTarget.id, action: 'revert', revisionId: revision.id })}>Pulihkan versi ini</Button></div>)}</DialogContent></Dialog>
  </div></AdminLayout>
}

 'use client'

import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function AdminCreateNewsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [category, setCategory] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [publishedDate, setPublishedDate] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !slug || !content) {
      toast({
        title: "Validasi Gagal",
        description: "Judul, slug, dan konten wajib diisi",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          imageUrl,
          category,
          authorName,
          publishedDate: publishedDate || undefined,
          isFeatured,
        }),
      })

      if (res.ok) {
        toast({
          title: "Berita Ditambahkan",
          description: `"${title}" berhasil ditambahkan`,
          variant: "default",
        })
        router.push('/admin/news')
      } else {
        const err = await res.json()
        toast({
          title: "Gagal Membuat",
          description: err.error || 'Gagal membuat berita',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal membuat berita. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-unipas-muted py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-ui-navy mb-4">Buat Berita Baru</h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-6 border border-unipas-primary/20">
            <div>
              <Label className="text-unipas-primary">Judul *</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 border-unipas-primary/20" />
            </div>

            <div>
              <Label className="text-unipas-primary">Slug *</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-2 border-unipas-primary/20" />
            </div>

            <div>
              <Label className="text-unipas-primary">Ringkasan</Label>
              <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="mt-2 border-unipas-primary/20" />
            </div>

            <div>
              <Label className="text-unipas-primary">Konten *</Label>
              <div className="mt-2">
                <RichTextEditor value={content} onChange={setContent} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-unipas-primary">URL Gambar</Label>
                <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-2 border-unipas-primary/20" />
              </div>
              <div>
                <Label className="text-unipas-primary">Kategori</Label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 border-unipas-primary/20" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-unipas-primary">Penulis</Label>
                <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} className="mt-2 border-unipas-primary/20" />
              </div>
              <div>
                <Label className="text-unipas-primary">Tanggal Publikasi</Label>
                <Input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} className="mt-2 border-unipas-primary/20" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input id="featured" type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4" />
                <label htmlFor="featured" className="text-unipas-primary">Tampilkan sebagai berita unggulan</label>
              </div>

              <div>
                <Button type="submit" className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white" disabled={submitting}>
                  {submitting ? 'Menyimpan...' : 'Simpan Berita'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

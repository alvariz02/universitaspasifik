'use client'

import React, { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter, useParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function EditAnnouncementPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const announcementId = params.id as string

  useEffect(() => {
    fetchAnnouncement()
  }, [announcementId])

  const fetchAnnouncement = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/announcements?limit=100`)
      const data = await res.json()
      const announcement = data.find((a: any) => a.id === parseInt(announcementId))
      
      if (announcement) {
        setTitle(announcement.title || '')
        setContent(announcement.content || '')
        setCategory(announcement.category || '')
        setPriority(announcement.priority || '')
        setStartDate(announcement.startDate ? new Date(announcement.startDate).toISOString().split('T')[0] : '')
        setEndDate(announcement.endDate ? new Date(announcement.endDate).toISOString().split('T')[0] : '')
        setIsActive(announcement.isActive !== false)
      } else {
        toast({
          title: "Pengumuman Tidak Ditemukan",
          description: "Data pengumuman tidak ditemukan",
          variant: "destructive",
        })
        router.push('/admin/announcements')
      }
    } catch (error) {
      console.error('Error fetching announcement:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal memuat data pengumuman",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) {
      toast({
        title: "Validasi Gagal",
        description: "Judul dan konten wajib diisi",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/announcements/${announcementId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          category,
          priority,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          isActive,
        }),
      })

      if (res.ok) {
        toast({
          title: "Pengumuman Diperbarui",
          description: `"${title}" berhasil diperbarui`,
          variant: "default",
        })
        router.push('/admin/announcements')
      } else {
        const err = await res.json()
        toast({
          title: "Gagal Memperbarui",
          description: err.error || 'Gagal memperbarui pengumuman',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal memperbarui pengumuman. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-unipas-muted py-8 flex items-center justify-center">
          <div className="text-unipas-primary">Memuat data...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-unipas-muted py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-ui-navy mb-4">Edit Pengumuman</h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-6 border border-unipas-primary/20">
            <div>
              <Label className="text-unipas-primary">Judul Pengumuman *</Label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="mt-2 border-unipas-primary/20"
                placeholder="Masukkan judul pengumuman"
              />
            </div>

            <div>
              <Label className="text-unipas-primary">Konten *</Label>
              <div className="mt-2">
                <RichTextEditor 
                  value={content} 
                  onChange={setContent}
                  placeholder="Konten lengkap pengumuman - bisa tambahkan foto surat edaran di sini"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-unipas-primary">Kategori</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-2 w-full h-10 px-3 rounded-md border border-unipas-primary/20 bg-white"
                >
                  <option value="">Pilih kategori</option>
                  <option value="penerimaan">Penerimaan</option>
                  <option value="akademik">Akademik</option>
                  <option value="umum">Umum</option>
                </select>
              </div>
              <div>
                <Label className="text-unipas-primary">Prioritas</Label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mt-2 w-full h-10 px-3 rounded-md border border-unipas-primary/20 bg-white"
                >
                  <option value="">Pilih prioritas</option>
                  <option value="high">Tinggi</option>
                  <option value="medium">Sedang</option>
                  <option value="low">Rendah</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-unipas-primary">Tanggal Mulai</Label>
                <Input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                  className="mt-2 border-unipas-primary/20"
                />
              </div>
              <div>
                <Label className="text-unipas-primary">Tanggal Selesai</Label>
                <Input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                  className="mt-2 border-unipas-primary/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input 
                id="isActive" 
                type="checkbox" 
                checked={isActive} 
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="isActive" className="text-unipas-primary cursor-pointer">
                Pengumuman aktif
              </Label>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => router.push('/admin/announcements')}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-unipas-primary to-unipas-accent text-white"
                disabled={submitting}
              >
                {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import RichTextEditor from '@/components/admin/RichTextEditor'
import FileUpload from '@/components/admin/FileUpload'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter, useParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function EditAchievementPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [achieverName, setAchieverName] = useState('')
  const [achieverType, setAchieverType] = useState('')
  const [achievementDate, setAchievementDate] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const achievementId = params.id as string

  useEffect(() => {
    fetchAchievement()
  }, [achievementId])

  const fetchAchievement = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/achievements?limit=100`)
      const data = await res.json()
      const achievement = data.find((a: any) => a.id === parseInt(achievementId))
      
      if (achievement) {
        setTitle(achievement.title || '')
        setDescription(achievement.description || '')
        setAchieverName(achievement.achieverName || '')
        setAchieverType(achievement.achieverType || '')
        setAchievementDate(achievement.achievementDate ? new Date(achievement.achievementDate).toISOString().split('T')[0] : '')
        setCategory(achievement.category || '')
        setLevel(achievement.level || '')
        setImageUrl(achievement.imageUrl || '')
      } else {
        toast({
          title: "Prestasi Tidak Ditemukan",
          description: "Data prestasi tidak ditemukan",
          variant: "destructive",
        })
        router.push('/admin/achievements')
      }
    } catch (error) {
      console.error('Error fetching achievement:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal memuat data prestasi",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) {
      toast({
        title: "Validasi Gagal",
        description: "Judul prestasi wajib diisi",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/achievements/${achievementId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          achieverName,
          achieverType,
          achievementDate: achievementDate || undefined,
          category,
          level,
          imageUrl,
        }),
      })

      if (res.ok) {
        toast({
          title: "Prestasi Diperbarui",
          description: `"${title}" berhasil diperbarui`,
          variant: "default",
        })
        router.push('/admin/achievements')
      } else {
        const err = await res.json()
        toast({
          title: "Gagal Memperbarui",
          description: err.error || 'Gagal memperbarui prestasi',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal memperbarui prestasi. Silakan coba lagi.",
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
          <h1 className="text-2xl font-bold text-ui-navy mb-4">Edit Prestasi</h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-6 border border-unipas-primary/20">
            <div>
              <Label className="text-unipas-primary">Judul Prestasi *</Label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="mt-2 border-unipas-primary/20"
                placeholder="Masukkan judul prestasi"
              />
            </div>

            <div>
              <Label className="text-unipas-primary">Deskripsi</Label>
              <div className="mt-2">
                <RichTextEditor 
                  value={description} 
                  onChange={setDescription}
                  placeholder="Deskripsikan prestasi ini..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-unipas-primary">Nama Pencapaian</Label>
                <Input 
                  value={achieverName} 
                  onChange={(e) => setAchieverName(e.target.value)} 
                  className="mt-2 border-unipas-primary/20"
                  placeholder="Nama peraih prestasi"
                />
              </div>
              <div>
                <Label className="text-unipas-primary">Tipe Pencapaian</Label>
                <select
                  value={achieverType}
                  onChange={(e) => setAchieverType(e.target.value)}
                  className="mt-2 w-full h-10 px-3 rounded-md border border-unipas-primary/20 bg-white"
                >
                  <option value="">Pilih tipe</option>
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="dosen">Dosen</option>
                  <option value="alumni">Alumni</option>
                </select>
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
                  <option value="akademik">Akademik</option>
                  <option value="olahraga">Olahraga</option>
                  <option value="seni">Seni</option>
                  <option value="penelitian">Penelitian</option>
                </select>
              </div>
              <div>
                <Label className="text-unipas-primary">Level</Label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="mt-2 w-full h-10 px-3 rounded-md border border-unipas-primary/20 bg-white"
                >
                  <option value="">Pilih level</option>
                  <option value="internasional">Internasional</option>
                  <option value="nasional">Nasional</option>
                  <option value="regional">Regional</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-unipas-primary">Tanggal Prestasi</Label>
                <Input 
                  type="date" 
                  value={achievementDate} 
                  onChange={(e) => setAchievementDate(e.target.value)} 
                  className="mt-2 border-unipas-primary/20"
                />
              </div>
            </div>

            <div>
              <FileUpload
                value={imageUrl}
                onChange={setImageUrl}
                maxSize={5}
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => router.push('/admin/achievements')}
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

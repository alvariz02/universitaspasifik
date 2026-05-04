'use client'

import React, { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import FileUpload from '@/components/admin/FileUpload'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function NewAdmissionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [image1Url, setImage1Url] = useState('')
  const [image2Url, setImage2Url] = useState('')
  const [image3Url, setImage3Url] = useState('')
  const [displayStart, setDisplayStart] = useState('')
  const [displayEnd, setDisplayEnd] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    setSlug(generateSlug(value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !displayStart || !displayEnd) {
      toast({
        title: "Validasi Gagal",
        description: "Judul, waktu mulai, dan waktu selesai wajib diisi",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/admissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          image1Url,
          image2Url,
          image3Url,
          displayStart,
          displayEnd,
          isActive,
        }),
      })

      if (res.ok) {
        toast({
          title: "Jalur Penerimaan Ditambahkan",
          description: `"${title}" berhasil ditambahkan`,
          variant: "default",
        })
        router.push('/admin/admissions')
      } else {
        const err = await res.json()
        toast({
          title: "Gagal Membuat",
          description: err.error || 'Gagal menambahkan jalur penerimaan',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menambahkan jalur penerimaan. Silakan coba lagi.",
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
          <h1 className="text-2xl font-bold text-ui-navy mb-4">Tambah Jalur Penerimaan Baru</h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-6 border border-unipas-primary/20">
            <div>
              <Label className="text-unipas-primary">Judul Jalur Penerimaan *</Label>
              <Input 
                value={title} 
                onChange={(e) => handleTitleChange(e.target.value)} 
                className="mt-2 border-unipas-primary/20"
                placeholder="Contoh: Penerimaan Mahasiswa Baru 2026"
              />
            </div>

            <div>
              <Label className="text-unipas-primary">Slug (URL)</Label>
              <Input 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)} 
                className="mt-2 border-unipas-primary/20 bg-gray-50"
                placeholder="penerimaan-mahasiswa-baru-2026"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">Slug dibuat otomatis dari judul</p>
            </div>

            <div className="border-t border-unipas-primary/10 pt-6">
              <h3 className="text-lg font-semibold text-unipas-primary mb-4">Foto Brosur/Poster (1200x628)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-unipas-primary">Foto 1</Label>
                  <FileUpload 
                    value={image1Url}
                    onChange={setImage1Url}
                    maxSize={5}
                  />
                </div>
                <div>
                  <Label className="text-unipas-primary">Foto 2</Label>
                  <FileUpload 
                    value={image2Url}
                    onChange={setImage2Url}
                    maxSize={5}
                  />
                </div>
                <div>
                  <Label className="text-unipas-primary">Foto 3</Label>
                  <FileUpload 
                    value={image3Url}
                    onChange={setImage3Url}
                    maxSize={5}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Upload 2-3 foto brosur atau poster dengan ukuran 1200x628 pixel</p>
            </div>

            <div className="border-t border-unipas-primary/10 pt-6">
              <h3 className="text-lg font-semibold text-unipas-primary mb-4">Waktu Tayang di Homepage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-unipas-primary">Mulai Tayang *</Label>
                  <Input 
                    type="datetime-local"
                    value={displayStart} 
                    onChange={(e) => setDisplayStart(e.target.value)} 
                    className="mt-2 border-unipas-primary/20"
                  />
                </div>
                <div>
                  <Label className="text-unipas-primary">Selesai Tayang *</Label>
                  <Input 
                    type="datetime-local"
                    value={displayEnd} 
                    onChange={(e) => setDisplayEnd(e.target.value)} 
                    className="mt-2 border-unipas-primary/20"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Info pendaftaran akan muncul di homepage selama periode ini</p>
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
                Jalur penerimaan aktif
              </Label>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => router.push('/admin/admissions')}
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white" 
                disabled={submitting}
              >
                {submitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

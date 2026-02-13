'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import FileUpload from '@/components/admin/FileUpload'
import { ArrowLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface HeroSlider {
  id: number
  title: string
  subtitle?: string
  imageUrl: string
  linkUrl?: string
  linkText?: string
  orderPosition: number
  isActive: boolean
}

function HeroSliderForm() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [isLoading, setIsLoading] = useState(!!id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    orderPosition: 0,
    isActive: true,
  })

  useEffect(() => {
    if (id) {
      fetchSlider()
    } else {
      // Get max order for new slider
      fetchMaxOrder()
    }
  }, [id])

  const fetchSlider = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/hero-sliders/${id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          title: data.title || '',
          subtitle: data.subtitle || '',
          imageUrl: data.imageUrl || '',
          orderPosition: data.orderPosition || 0,
          isActive: data.isActive !== undefined ? data.isActive : true,
        })
      }
    } catch (error) {
      console.error('Error fetching slider:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMaxOrder = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/hero-sliders?limit=100`)
      if (res.ok) {
        const data = await res.json()
        const sliders = Array.isArray(data) ? data : data.sliders || []
        const maxOrder = sliders.length > 0 ? Math.max(...sliders.map((s: any) => s.orderPosition)) + 1 : 0
        setFormData((prev) => ({ ...prev, orderPosition: maxOrder }))
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.imageUrl) {
      toast({
        title: "Validasi Gagal",
        description: "Gambar wajib diupload",
        variant: "destructive",
      })
      return
    }

    if (!formData.title.trim()) {
      toast({
        title: "Validasi Gagal",
        description: "Judul wajib diisi",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const url = id ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/hero-sliders/${id}` : `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/hero-sliders`
      const method = id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        toast({
          title: id ? "Hero Slider Diperbarui" : "Hero Slider Ditambahkan",
          description: `"${formData.title}" berhasil ${id ? 'diperbarui' : 'ditambahkan'}`,
          variant: "default",
        })
        router.push('/admin/hero-sliders')
      } else {
        const error = await res.json()
        toast({
          title: "Gagal Menyimpan",
          description: error.error || 'Gagal menyimpan hero slider',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menyimpan hero slider. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 md:p-8">
          <p className="text-center text-unipas-text">Memuat data...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-unipas-text" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-unipas-primary">
              {id ? 'Edit Hero Slider' : 'Tambah Hero Slider Baru'}
            </h1>
            <p className="text-unipas-text mt-1">
              {id ? 'Perbarui informasi hero slider' : 'Buat hero slider baru untuk halaman utama'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 space-y-6">
          <div>
            <Label htmlFor="title" className="text-base font-semibold mb-2 block">
              Judul <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Masukkan judul slider"
              className="h-10"
              required
            />
          </div>

          <div>
            <Label htmlFor="subtitle" className="text-base font-semibold mb-2 block">
              Subtitle
            </Label>
            <Textarea
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="Masukkan subtitle slider"
              className="resize-none min-h-24"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="image" className="text-base font-semibold mb-2 block">
              Gambar <span className="text-red-500">*</span>
            </Label>
            <FileUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              accept="image/*"
              maxSize={5}
            />
          </div>

          <div>
            <Label htmlFor="orderPosition" className="text-base font-semibold mb-2 block">
              Urutan Tampil
            </Label>
            <Input
              id="orderPosition"
              type="number"
              value={formData.orderPosition}
              onChange={(e) => setFormData({ ...formData, orderPosition: parseInt(e.target.value) || 0 })}
              placeholder="0"
              min="0"
              className="h-10"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300"
            />
            <Label htmlFor="isActive" className="text-base font-semibold cursor-pointer">
              Aktifkan slider
            </Label>
          </div>

          <div className="flex gap-3 justify-end pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="min-w-24"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-unipas-primary hover:bg-unipas-accent text-white min-w-24"
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default function HeroSliderFormPage() {
  return (
    <Suspense fallback={
      <AdminLayout>
        <div className="p-6 md:p-8">
          <p className="text-center text-unipas-text">Memuat...</p>
        </div>
      </AdminLayout>
    }>
      <HeroSliderForm />
    </Suspense>
  )
}

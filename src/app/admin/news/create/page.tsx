'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import NewsFormPage from '@/components/admin/NewsFormPage'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function CreateNewsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const idParam = searchParams?.get('id')
  const [initialData, setInitialData] = useState<any>(null)

  useEffect(() => {
    const fetchInitial = async () => {
      if (!idParam) return
      try {
        const res = await fetch(`/api/news/${idParam}`)
        if (res.ok) {
          const data = await res.json()
          setInitialData(data)
        }
      } catch (e) {
        console.error('Failed to load news for editing', e)
      }
    }

    fetchInitial()
  }, [idParam])

  const handleSubmit = async (data: any) => {
    try {
      const url = idParam ? `/api/news/${idParam}` : '/api/news'
      const method = idParam ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        toast({
          title: idParam ? "Berita Diperbarui" : "Berita Ditambahkan",
          description: `"${data.title}" berhasil ${idParam ? 'diperbarui' : 'ditambahkan'}`,
          variant: "default",
        })
        router.push('/admin/news')
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menyimpan",
          description: errorData.error || 'Gagal menyimpan berita',
          variant: "destructive",
        })
        throw new Error('Failed to save news')
      }
    } catch (error) {
      console.error('Error saving news:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menyimpan berita. Silakan coba lagi.",
        variant: "destructive",
      })
      throw error
    }
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-unipas-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <NewsFormPage
            initialData={initialData}
            title={idParam ? 'Edit Berita' : 'Tambah Berita Baru'}
            subtitle={idParam ? 'Ubah berita' : 'Buat dan publikasikan berita baru untuk Universitas Pasifik Morotai'}
            submitButtonText={idParam ? 'Update Berita' : 'Simpan Berita'}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

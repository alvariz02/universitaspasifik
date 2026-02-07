'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import NewsFormPage from '@/components/admin/NewsFormPage'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function CreateNewsClient() {
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
      console.log('📝 Submitting news data:', data)
      
      const url = idParam ? `/api/news/${idParam}` : '/api/news'
      const method = idParam ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('📡 API response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.log('❌ API error:', errorData)
        throw new Error(errorData.error || 'Failed to save news')
      }

      const result = await response.json()
      console.log('✅ News saved:', result)

      toast({
        title: idParam ? "Berita Diperbarui" : "Berita Dibuat",
        description: idParam ? "Berita berhasil diperbarui" : "Berita baru berhasil dibuat",
        variant: "default",
      })

      router.push('/admin/news')
    } catch (error) {
      console.error('🚨 Submit error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menyimpan berita",
        variant: "destructive",
      })
      throw error // Re-throw to prevent form reset on error
    }
  }

  return (
    <AdminLayout>
      <NewsFormPage 
        initialData={initialData}
        onSubmit={handleSubmit}
        title={idParam ? "Edit Berita" : "Buat Berita Baru"}
        subtitle={idParam ? "Edit berita yang ada" : "Buat berita baru"}
        submitButtonText={idParam ? "Update" : "Buat"}
      />
    </AdminLayout>
  )
}

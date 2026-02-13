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

  console.log('🚀 Component mounted, idParam:', idParam)

  useEffect(() => {
    const fetchInitial = async () => {
      console.log('🔍 Edit mode detected, idParam:', idParam)
      if (!idParam) {
        console.log('❌ No ID parameter, creating new news')
        return
      }
      try {
        console.log('📡 Fetching news data for ID:', idParam)
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/news/${idParam}`)
        console.log('📡 API response status:', res.status)
        
        if (res.ok) {
          const data = await res.json()
          console.log('📊 Raw news data:', data)
          
          // Format date for input[type="date"]
          if (data.publishedDate) {
            const formattedDate = new Date(data.publishedDate).toISOString().split('T')[0]
            console.log('📅 Formatted date:', formattedDate)
            data.publishedDate = formattedDate
          }
          
          console.log('📊 Final initialData:', data)
          setInitialData(data)
        } else {
          console.log('❌ API error response:', await res.text())
        }
      } catch (e) {
        console.error('❌ Failed to load news for editing:', e)
      }
    }

    fetchInitial()
  }, [idParam])

  console.log('📊 Current initialData state:', initialData)

  const handleSubmit = async (data: any) => {
    try {
      console.log('📝 Submitting news data:', data)
      
      const url = idParam ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/news/${idParam}` : `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/news`
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

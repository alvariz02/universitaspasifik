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

  return (
    <AdminLayout>
      <NewsFormPage 
        initialData={initialData}
        onSubmit={async (data: any) => {}}
        title={idParam ? "Edit Berita" : "Buat Berita Baru"}
        subtitle={idParam ? "Edit berita yang ada" : "Buat berita baru"}
        submitButtonText={idParam ? "Update" : "Buat"}
      />
    </AdminLayout>
  )
}

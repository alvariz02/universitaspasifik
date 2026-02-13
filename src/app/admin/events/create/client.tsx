'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import EventFormPage from '@/components/admin/EventFormPage'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function CreateEventClient() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const idParam = searchParams?.get('id')
  const [initialData, setInitialData] = useState<any>(null)

  useEffect(() => {
    const fetchInitial = async () => {
      console.log('🔍 Edit mode detected, idParam:', idParam)
      if (!idParam) {
        console.log('❌ No ID parameter, creating new event')
        return
      }
      try {
        console.log('📡 Fetching event data for ID:', idParam)
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/events/${idParam}`)
        console.log('📡 API response status:', res.status)
        
        if (res.ok) {
          const data = await res.json()
          console.log('📊 Raw event data:', data)
          
          // Format dates for input[type="datetime-local"]
          if (data.eventDate) {
            data.eventDate = new Date(data.eventDate).toISOString().slice(0, 16)
          }
          if (data.endDate) {
            data.endDate = new Date(data.endDate).toISOString().slice(0, 16)
          }
          
          console.log('📊 Final initialData:', data)
          setInitialData(data)
        } else {
          console.log('❌ API error response:', await res.text())
        }
      } catch (e) {
        console.error('❌ Failed to load event for editing:', e)
      }
    }

    fetchInitial()
  }, [idParam])

  const handleSubmit = async (data: any) => {
    try {
      console.log('📝 Submitting event data:', data)
      
      const url = idParam ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/events/${idParam}` : `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/events`
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
        throw new Error(errorData.error || 'Failed to save event')
      }

      const result = await response.json()
      console.log('✅ Event saved:', result)

      toast({
        title: idParam ? "Event Diperbarui" : "Event Dibuat",
        description: idParam ? "Event berhasil diperbarui" : "Event baru berhasil dibuat",
        variant: "default",
      })

      router.push('/admin/events')
    } catch (error) {
      console.error('🚨 Submit error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menyimpan event",
        variant: "destructive",
      })
      throw error // Re-throw to prevent form reset on error
    }
  }

  return (
    <AdminLayout>
      <EventFormPage 
        initialData={initialData}
        onSubmit={handleSubmit}
        title={idParam ? "Edit Event" : "Buat Event Baru"}
        subtitle={idParam ? "Edit event yang ada" : "Buat event baru"}
        submitButtonText={idParam ? "Update" : "Buat"}
      />
    </AdminLayout>
  )
}

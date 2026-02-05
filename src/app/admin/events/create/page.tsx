'use client'

import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'

export default function CreateEventPage() {
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push('/admin/events')
      } else {
        throw new Error('Failed to create event')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      throw error
    }
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-unipas-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Header */}
          <div className="mb-6">
            <div className="bg-linear-to-r from-unipas-primary to-unipas-accent rounded-xl p-6 text-white shadow-lg">
              <h1 className="text-3xl font-bold mb-2">
                Tambah Event Baru
              </h1>
              <p className="text-white/90">
                Buat dan jadwalkan event baru untuk Universitas Pasifik Morotai
              </p>
            </div>
          </div>

          {/* Form akan ditambahkan di sini */}
          <div className="bg-white rounded-xl p-6 border border-unipas-primary/20 shadow-lg">
            <p className="text-unipas-primary">Form Event akan segera tersedia dengan rich text editor...</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

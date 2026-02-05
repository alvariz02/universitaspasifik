'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import EventForm from '@/components/admin/EventForm'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export default function AdminEventsPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingData, setEditingData] = useState<any>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/events?limit=100')
      const data = await res.json()
      setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingId(null)
    setEditingData(null)
    setFormOpen(true)
  }

  const handleEdit = (id: number, row: any) => {
    setEditingId(id)
    setEditingData(row)
    setFormOpen(true)
  }

  const handleDelete = async (id: number) => {
    const eventItem = events.find(item => item.id === id)
    
    const confirmed = await confirm({
      title: "Hapus Event",
      description: `Yakin ingin menghapus event "${eventItem?.title || 'ini'}"?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })
    
    if (!confirmed) return

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setEvents(events.filter((item) => item.id !== id))
        toast({
          title: "Event Dihapus",
          description: `"${eventItem?.title || 'Event'}" berhasil dihapus`,
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus event',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus event. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      const url = editingId ? `/api/events/${editingId}` : '/api/events'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        await fetchEvents()
        toast({
          title: editingId ? "Event Diperbarui" : "Event Ditambahkan",
          description: `"${data.title}" berhasil ${editingId ? 'diperbarui' : 'ditambahkan'}`,
          variant: "default",
        })
        setFormOpen(false)
        setEditingId(null)
        setEditingData(null)
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menyimpan",
          description: errorData.error || 'Gagal menyimpan event',
          variant: "destructive",
        })
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Error saving event:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menyimpan event. Silakan coba lagi.",
        variant: "destructive",
      })
      throw error
    }
  }

  const columns = [
    {
      key: 'id',
      title: 'ID',
      render: (value: any) => <span className="font-mono text-sm">#{value}</span>,
    },
    {
      key: 'title',
      title: 'Judul',
      render: (value: any, row: any) => (
        <div className="max-w-md">
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground truncate">{row.slug}</div>
        </div>
      ),
    },
    {
      key: 'eventDate',
      title: 'Tanggal Event',
      render: (value: any, row: any) => {
        const start = value ? format(new Date(value), 'dd MMM yyyy, HH:mm', { locale: localeId }) : '-'
        const end = row.endDate ? format(new Date(row.endDate), 'HH:mm') : ''
        return `${start}${end ? ` - ${end}` : ''}`
      },
    },
    {
      key: 'location',
      title: 'Lokasi',
    },
    {
      key: 'organizer',
      title: 'Penyelenggara',
    },
    {
      key: 'isFeatured',
      title: 'Featured',
      render: (value: any) =>
        value ? (
          <Badge className="bg-unipas-accent text-white">Ya</Badge>
        ) : (
          <Badge variant="outline" className="border-unipas-primary/30 text-unipas-text">Tidak</Badge>
        ),
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 bg-unipas-muted min-h-screen">
        <div className="mb-6">
          <div className="bg-linear-to-r from-unipas-primary to-unipas-accent rounded-xl p-6 text-white shadow-lg mb-4">
            <h1 className="text-3xl font-bold mb-2">
              Kelola Event
            </h1>
            <p className="text-white/90">
              Tambah, edit, atau hapus event Universitas Pasifik Morotai
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 bg-white rounded-xl shadow-lg">
            <div className="text-unipas-primary">Memuat data...</div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={events}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleCreate}
            searchable
            searchPlaceholder="Cari event..."
            addButtonText="Tambah Event"
          />
        )}

        <EventForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSubmit}
          initialData={editingData}
        />

        <ConfirmDialog
          open={isOpen}
          onOpenChange={setIsOpen}
          title={options.title}
          description={options.description}
          confirmText={options.confirmText}
          cancelText={options.cancelText}
          variant={options.variant}
          onConfirm={handleConfirm}
        />
      </div>
    </AdminLayout>
  )
}

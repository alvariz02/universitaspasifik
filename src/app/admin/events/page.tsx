'use client'

import { useState, useEffect } from 'react'
import { useRouter } from '@/hooks/useNavigationRouter'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export default function AdminEventsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const url = `/api/events`

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/events?limit=100`)
      const data = await res.json()
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    router.push('/admin/events/create')
  }

  const handleEdit = (id: number) => {
    router.push(`/admin/events/create?id=${id}`)
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
      <div className="p-4 sm:p-8 max-w-7xl mx-auto bg-unipas-muted">
        <div className="admin-page-header mb-6">
          <div className="space-y-2">
            <h1 className="admin-title mb-2">
              Kelola Event
            </h1>
            <p className="text-white/90">
              Tambah, edit, atau hapus event Universitas Pasifik Morotai
            </p>
          </div>
        </div>

        {loading ? (
          <div className="site-card text-center py-8 bg-white">
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

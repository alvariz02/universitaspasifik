'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useRouter } from '@/hooks/useNavigationRouter'

export default function AdminAnnouncementsPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const router = useRouter()
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/announcements?limit=100`)
      const data = await res.json()
      setAnnouncements(data)
    } catch (error) {
      console.error('Error fetching announcements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    router.push('/admin/announcements/new')
  }

  const handleEdit = (id: number, row: any) => {
    router.push(`/admin/announcements/${id}`)
  }

  const handleDelete = async (id: number) => {
    const announcementItem = announcements.find(item => item.id === id)
    
    const confirmed = await confirm({
      title: "Hapus Pengumuman",
      description: `Yakin ingin menghapus pengumuman "${announcementItem?.title || 'ini'}"?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })
    
    if (!confirmed) return
    
    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setAnnouncements(announcements.filter((item) => item.id !== id))
        toast({
          title: "Pengumuman Dihapus",
          description: `"${announcementItem?.title || 'Pengumuman'}" berhasil dihapus`,
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus pengumuman',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error deleting announcement:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus pengumuman. Silakan coba lagi.",
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
      render: (value: any) => (
        <div className="max-w-md">
          <div className="font-medium">{value}</div>
        </div>
      ),
    },
    {
      key: 'category',
      title: 'Kategori',
      render: (value: any) => value && <Badge>{value}</Badge>,
    },
    {
      key: 'priority',
      title: 'Prioritas',
      render: (value: any) => {
        const colors: any = {
          high: 'bg-red-500',
          medium: 'bg-unipas-accent',
          low: 'bg-green-500',
        }
        return (
          <Badge className={colors[value] || 'bg-gray-500'}>
            {value || '-'}
          </Badge>
        )
      },
    },
    {
      key: 'createdAt',
      title: 'Dibuat',
      render: (value: any) =>
        value ? format(new Date(value), 'dd MMM yyyy', { locale: id }) : '-',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-7xl mx-auto bg-unipas-muted">
        <div className="admin-page-header mb-6">
          <div className="space-y-2">
            <h1 className="admin-title mb-2">
              Kelola Pengumuman
            </h1>
            <p className="text-white/90">
              Tambah, edit, atau hapus pengumuman Universitas Pasifik Morotai
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
            data={announcements}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleCreate}
            searchable
            searchPlaceholder="Cari pengumuman..."
            addButtonText="Tambah Pengumuman"
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

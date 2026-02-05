'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import VideoForm from '@/components/admin/VideoForm'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Play, Eye } from 'lucide-react'

export default function AdminVideosPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingData, setEditingData] = useState<any>(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/videos?limit=100')
      const data = await res.json()
      setVideos(data)
    } catch (error) {
      console.error('Error fetching videos:', error)
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
    const videoItem = videos.find(item => item.id === id)
    
    const confirmed = await confirm({
      title: "Hapus Video",
      description: `Yakin ingin menghapus video "${videoItem?.title || 'ini'}"?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })
    
    if (!confirmed) return

    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setVideos(videos.filter((item) => item.id !== id))
        toast({
          title: "Video Dihapus",
          description: `"${videoItem?.title || 'Video'}" berhasil dihapus`,
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus video',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error deleting video:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus video. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      const url = editingId ? `/api/videos/${editingId}` : '/api/videos'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        await fetchVideos()
        toast({
          title: editingId ? "Video Diperbarui" : "Video Ditambahkan",
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
          description: errorData.error || 'Gagal menyimpan video',
          variant: "destructive",
        })
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Error saving video:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menyimpan video. Silakan coba lagi.",
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
      key: 'thumbnail',
      title: 'Thumbnail',
      render: (value: any, row: any) => (
        <div className="w-20 h-12 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
          {value ? (
            <img src={value} alt={row.title} className="w-full h-full object-cover" />
          ) : (
            <Play className="w-6 h-6 text-gray-400" />
          )}
        </div>
      ),
    },
    {
      key: 'title',
      title: 'Judul',
      render: (value: any, row: any) => (
        <div className="max-w-md">
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground truncate">{row.youtubeId}</div>
        </div>
      ),
    },
    {
      key: 'category',
      title: 'Kategori',
      render: (value: any) => value && <Badge variant="outline">{value}</Badge>,
    },
    {
      key: 'viewCount',
      title: 'Views',
      render: (value: any) => (
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4 text-gray-500" />
          <span>{value || 0}</span>
        </div>
      ),
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
    {
      key: 'isActive',
      title: 'Status',
      render: (value: any) =>
        value ? (
          <Badge className="bg-green-500">Aktif</Badge>
        ) : (
          <Badge variant="outline">Non-aktif</Badge>
        ),
    },
    {
      key: 'createdAt',
      title: 'Dibuat',
      render: (value: any) =>
        value ? format(new Date(value), 'dd MMM yyyy', { locale: localeId }) : '-',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 bg-unipas-muted min-h-screen">
        <div className="mb-6">
          <div className="bg-linear-to-r from-unipas-primary to-unipas-accent rounded-xl p-6 text-white shadow-lg mb-4">
            <h1 className="text-3xl font-bold mb-2">
              Kelola Video Kegiatan
            </h1>
            <p className="text-white/90">
              Tambah, edit, atau hapus video kegiatan kampus dari YouTube
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
            data={videos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleCreate}
            searchable
            searchPlaceholder="Cari video..."
            addButtonText="Tambah Video"
          />
        )}

        <VideoForm
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
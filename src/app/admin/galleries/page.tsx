'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export default function AdminGalleriesPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [galleries, setGalleries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGalleries()
  }, [])

  const fetchGalleries = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/galleries?limit=100')
      const data = await res.json()
      setGalleries(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Hapus Galeri",
      description: "Hapus galeri ini?",
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })
    
    if (!confirmed) return
    
    try {
      const res = await fetch(`/api/galleries/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setGalleries(galleries.filter((item) => item.id !== id))
        toast({
          title: "Galeri Dihapus",
          description: "Galeri berhasil dihapus",
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus galeri',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus galeri. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const columns = [
    { key: 'id', title: 'ID', render: (v) => <span className="font-mono text-sm">#{v}</span> },
    { key: 'title', title: 'Judul' },
    { key: 'category', title: 'Kategori', render: (v) => v && <Badge>{v}</Badge> },
    { 
      key: 'uploadDate', 
      title: 'Tanggal Upload',
      render: (v) => v ? format(new Date(v), 'dd MMM yyyy', { locale: localeId }) : '-',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-ui-navy mb-2">Kelola Galeri</h1>
        <p className="text-muted-foreground">Kelola galeri foto universitas</p>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Memuat...</div>
        ) : (
          <DataTable 
            columns={columns} 
            data={galleries} 
            onDelete={handleDelete}
            searchable 
            searchPlaceholder="Cari galeri..."
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

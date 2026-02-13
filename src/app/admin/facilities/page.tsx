'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export default function AdminFacilitiesPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [facilities, setFacilities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const url = `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/facilities`

  useEffect(() => {
    fetchFacilities()
  }, [])

  const fetchFacilities = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/facilities?limit=100`)
      const data = await res.json()
      setFacilities(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Hapus Fasilitas",
      description: "Hapus fasilitas ini?",
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })
    
    if (!confirmed) return
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/facilities/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setFacilities(facilities.filter((item) => item.id !== id))
        toast({
          title: "Fasilitas Dihapus",
          description: "Fasilitas berhasil dihapus",
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus fasilitas',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus fasilitas. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const columns = [
    { key: 'id', title: 'ID', render: (v) => <span className="font-mono text-sm">#{v}</span> },
    { key: 'name', title: 'Nama' },
    { key: 'category', title: 'Kategori', render: (v) => v && <Badge>{v}</Badge> },
    { key: 'location', title: 'Lokasi' },
    { key: 'operatingHours', title: 'Jam Operasi' },
  ]

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-ui-navy mb-2">Kelola Fasilitas</h1>
        <p className="text-muted-foreground mb-6">Kelola semua fasilitas universitas</p>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Memuat...</div>
        ) : (
          <DataTable columns={columns} data={facilities} onDelete={handleDelete} searchable searchPlaceholder="Cari fasilitas..." />
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

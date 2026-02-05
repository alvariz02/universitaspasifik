'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import AchievementForm from '@/components/admin/AchievementForm'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export default function AdminAchievementsPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingData, setEditingData] = useState<any>(null)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/achievements?limit=100')
      const data = await res.json()
      setAchievements(data)
    } catch (error) {
      console.error('Error fetching achievements:', error)
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
    const achievementItem = achievements.find(item => item.id === id)
    
    const confirmed = await confirm({
      title: "Hapus Prestasi",
      description: `Yakin ingin menghapus prestasi "${achievementItem?.title || 'ini'}"?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })
    
    if (!confirmed) return
    
    try {
      const res = await fetch(`/api/achievements/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setAchievements(achievements.filter((item) => item.id !== id))
        toast({
          title: "Prestasi Dihapus",
          description: `"${achievementItem?.title || 'Prestasi'}" berhasil dihapus`,
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus prestasi',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error deleting achievement:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus prestasi. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      const url = editingId ? `/api/achievements/${editingId}` : '/api/achievements'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        await fetchAchievements()
        toast({
          title: editingId ? "Prestasi Diperbarui" : "Prestasi Ditambahkan",
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
          description: errorData.error || 'Gagal menyimpan prestasi',
          variant: "destructive",
        })
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Error saving achievement:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menyimpan prestasi. Silakan coba lagi.",
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
      render: (value: any) => (
        <div className="max-w-md">
          <div className="font-medium">{value}</div>
        </div>
      ),
    },
    {
      key: 'achieverName',
      title: 'Pencapai',
      render: (value: any, row: any) => (
        <div>
          <div>{value || '-'}</div>
          <div className="text-sm text-muted-foreground">{row.achieverType || ''}</div>
        </div>
      ),
    },
    {
      key: 'category',
      title: 'Kategori',
      render: (value: any) => value && <Badge variant="outline">{value}</Badge>,
    },
    {
      key: 'level',
      title: 'Level',
      render: (value: any) => {
        const colors: any = {
          internasional: 'bg-yellow-500',
          nasional: 'bg-blue-500',
          regional: 'bg-green-500',
          lokal: 'bg-gray-500',
        }
        return value ? (
          <Badge className={colors[value] || 'bg-gray-500'}>
            {value}
          </Badge>
        ) : (
          <Badge variant="outline">-</Badge>
        )
      },
    },
    {
      key: 'achievementDate',
      title: 'Tanggal',
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
              Kelola Prestasi
            </h1>
            <p className="text-white/90">
              Tambah, edit, atau hapus prestasi Universitas Pasifik Morotai
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
            data={achievements}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleCreate}
            searchable
            searchPlaceholder="Cari prestasi..."
            addButtonText="Tambah Prestasi"
          />
        )}

        <AchievementForm
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

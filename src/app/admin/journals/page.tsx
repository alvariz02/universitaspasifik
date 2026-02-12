'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import JournalForm from '@/components/admin/JournalForm'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { FileText, Eye, Download, ExternalLink } from 'lucide-react'

export default function AdminJournalsPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [journals, setJournals] = useState<any[]>([])
  const [faculties, setFaculties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingData, setEditingData] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [journalsRes, facultiesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/journals?limit=100`),
        fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/faculties?limit=100`)
      ])
      
      const journalsData = await journalsRes.json()
      const facultiesData = await facultiesRes.json()
      
      setJournals(journalsData)
      setFaculties(facultiesData)
    } catch (error) {
      console.error('Error fetching data:', error)
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
    const journalItem = journals.find(item => item.id === id)
    
    const confirmed = await confirm({
      title: "Hapus Jurnal",
      description: `Yakin ingin menghapus jurnal "${journalItem?.title || 'ini'}"?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })
    
    if (!confirmed) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/journals/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setJournals(journals.filter((item) => item.id !== id))
        toast({
          title: "Jurnal Dihapus",
          description: `"${journalItem?.title || 'Jurnal'}" berhasil dihapus`,
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus jurnal',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error deleting journal:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus jurnal. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      // Convert "none" to null for facultyId
      const submitData = {
        ...data,
        facultyId: data.facultyId === 'none' ? null : data.facultyId
      }

      const url = editingId ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/journals/${editingId}` : `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/journals`
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (res.ok) {
        await fetchData()
        toast({
          title: editingId ? "Jurnal Diperbarui" : "Jurnal Ditambahkan",
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
          description: errorData.error || 'Gagal menyimpan jurnal',
          variant: "destructive",
        })
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Error saving journal:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menyimpan jurnal. Silakan coba lagi.",
        variant: "destructive",
      })
      throw error
    }
  }

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '-'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
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
          <div className="font-medium line-clamp-2">{value}</div>
          <div className="text-sm text-muted-foreground">{row.authors}</div>
        </div>
      ),
    },
    {
      key: 'category',
      title: 'Kategori',
      render: (value: any) => value && <Badge variant="outline">{value}</Badge>,
    },
    {
      key: 'faculty',
      title: 'Fakultas',
      render: (value: any) => value?.name || '-',
    },
    {
      key: 'year',
      title: 'Tahun',
      render: (value: any) => value || '-',
    },
    {
      key: 'pdfUrl',
      title: 'File PDF',
      render: (value: any, row: any) => (
        <div className="flex items-center gap-2">
          {value ? (
            <>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-unipas-primary hover:text-unipas-accent"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              {row.pdfSize && (
                <span className="text-xs text-gray-500">
                  {formatFileSize(row.pdfSize)}
                </span>
              )}
            </>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </div>
      ),
    },
    {
      key: 'downloadCount',
      title: 'Downloads',
      render: (value: any) => (
        <div className="flex items-center gap-1">
          <Download className="w-4 h-4 text-gray-500" />
          <span>{value || 0}</span>
        </div>
      ),
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
              Kelola Jurnal Penelitian
            </h1>
            <p className="text-white/90">
              Tambah, edit, atau hapus jurnal penelitian Universitas Pasifik Morotai
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
            data={journals}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleCreate}
            searchable
            searchPlaceholder="Cari jurnal..."
            addButtonText="Tambah Jurnal"
          />
        )}

        <JournalForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSubmit}
          initialData={editingData}
          faculties={faculties}
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
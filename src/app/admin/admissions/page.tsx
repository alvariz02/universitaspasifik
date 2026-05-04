'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useRouter } from 'next/navigation'

export default function AdminAdmissionsPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const router = useRouter()
  const [admissions, setAdmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdmissions()
  }, [])

  const fetchAdmissions = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/admissions?limit=100`)
      const data = await res.json()
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setAdmissions(data)
      } else {
        console.error('API returned non-array:', data)
        setAdmissions([])
      }
    } catch (error) {
      console.error('Error fetching admissions:', error)
      setAdmissions([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    router.push('/admin/admissions/new')
  }

  const handleEdit = (id: number, row: any) => {
    router.push(`/admin/admissions/${id}`)
  }

  const handleDelete = async (id: number, row: any) => {
    const confirmed = await confirm({
      title: "Hapus Jalur Penerimaan",
      description: `Yakin ingin menghapus ${row.name}?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })

    if (!confirmed) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/admissions/${row.slug}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setAdmissions(admissions.filter((item) => item.slug !== row.slug))
        toast({
          title: "Jalur Penerimaan Dihapus",
          description: `"${row.name}" berhasil dihapus`,
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus jalur penerimaan',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error deleting admission:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus jalur penerimaan. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const columns = [
    {
      key: 'id',
      title: 'ID',
      render: (value: any) => <span className="font-mono text-sm">#{value}</span>,
    },
    {
      key: 'title',
      title: 'Judul Jalur',
      render: (value: any, row: any) => (
        <div className="max-w-md">
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.slug}</div>
        </div>
      ),
    },
    {
      key: 'displayStart',
      title: 'Mulai Tayang',
      render: formatDate,
    },
    {
      key: 'displayEnd',
      title: 'Selesai Tayang',
      render: formatDate,
    },
    {
      key: 'image1Url',
      title: 'Foto',
      render: (value: any) => value ? <span className="text-green-600">✓ Ada</span> : <span className="text-gray-400">-</span>,
    },
    {
      key: 'isActive',
      title: 'Status',
      render: (value: any) => (
        <Badge className={value ? 'bg-green-500' : 'bg-gray-500'}>
          {value ? 'Aktif' : 'Nonaktif'}
        </Badge>
      ),
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-ui-navy mb-2">
            Kelola Penerimaan
          </h1>
          <p className="text-muted-foreground">
            Tambah, edit, atau hapus jalur penerimaan mahasiswa baru
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Memuat data...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={admissions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleCreate}
            searchable
            searchPlaceholder="Cari jalur penerimaan..."
            addButtonText="Tambah Jalur"
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

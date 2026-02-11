'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export default function AdminAdmissionsPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [admissions, setAdmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<any>(null)

  useEffect(() => {
    fetchAdmissions()
  }, [])

  const fetchAdmissions = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admissions?limit=100')
      const data = await res.json()
      setAdmissions(data)
    } catch (error) {
      console.error('Error fetching admissions:', error)
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
    setEditingId(id.toString())
    setEditingData(row)
    setFormOpen(true)
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
      const res = await fetch(`/api/admissions/${row.slug}`, {
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

  const handleSubmit = async (data: any) => {
    try {
      const url = editingId ? `/api/admissions/${editingId}` : '/api/admissions'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        await fetchAdmissions()
        toast({
          title: editingId ? "Jalur Penerimaan Diperbarui" : "Jalur Penerimaan Ditambahkan",
          description: `"${data.name}" berhasil ${editingId ? 'diperbarui' : 'ditambahkan'}`,
          variant: "default",
        })
        setFormOpen(false)
        setEditingId(null)
        setEditingData(null)
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menyimpan",
          description: errorData.error || 'Gagal menyimpan jalur penerimaan',
          variant: "destructive",
        })
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Error saving admission:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menyimpan jalur penerimaan. Silakan coba lagi.",
        variant: "destructive",
      })
      throw error
    }
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const columns = [
    {
      key: 'id',
      title: 'ID',
      render: (value: any) => <span className="font-mono text-sm">#{value}</span>,
    },
    {
      key: 'name',
      title: 'Nama Jalur',
      render: (value: any, row: any) => (
        <div className="max-w-md">
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.slug}</div>
        </div>
      ),
    },
    {
      key: 'registrationStart',
      title: 'Registrasi Mulai',
      render: formatDate,
    },
    {
      key: 'registrationEnd',
      title: 'Registrasi Selesai',
      render: formatDate,
    },
    {
      key: 'examDate',
      title: 'Ujian',
      render: formatDate,
    },
    {
      key: 'announcementDate',
      title: 'Pengumuman',
      render: formatDate,
    },
    {
      key: 'quota',
      title: 'Kuota',
      render: (value: any) => value ? `${value} kursi` : '-',
    },
    {
      key: 'fee',
      title: 'Biaya',
      render: (value: any) => value ? `Rp ${value.toLocaleString('id-ID')}` : 'Gratis',
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
  ]

  const SimpleForm = () => (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto">
      <h3 className="text-lg font-semibold">
        {editingData ? 'Edit Jalur Penerimaan' : 'Tambah Jalur Penerimaan Baru'}
      </h3>
      <div className="space-y-2">
        <label className="text-sm font-medium">Nama Jalur *</label>
        <input
          className="w-full px-3 py-2 border rounded-md"
          defaultValue={editingData?.name || ''}
          id="adm-name"
          placeholder="SIMAK UI"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Slug *</label>
        <input
          className="w-full px-3 py-2 border rounded-md"
          defaultValue={editingData?.slug || ''}
          id="adm-slug"
          placeholder="simak-ui"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Deskripsi</label>
        <textarea
          className="w-full px-3 py-2 border rounded-md"
          defaultValue={editingData?.description || ''}
          id="adm-description"
          rows={3}
          placeholder="Deskripsi jalur penerimaan"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Registrasi Mulai</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md"
            defaultValue={editingData?.registrationStart?.split('T')[0] || ''}
            id="adm-reg-start"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Registrasi Selesai</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md"
            defaultValue={editingData?.registrationEnd?.split('T')[0] || ''}
            id="adm-reg-end"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Tanggal Ujian</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md"
            defaultValue={editingData?.examDate?.split('T')[0] || ''}
            id="adm-exam"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Pengumuman</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md"
            defaultValue={editingData?.announcementDate?.split('T')[0] || ''}
            id="adm-announce"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Biaya</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            defaultValue={editingData?.fee || ''}
            id="adm-fee"
            placeholder="500000"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Kuota</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            defaultValue={editingData?.quota || ''}
            id="adm-quota"
            placeholder="1000"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">URL Info</label>
        <input
          className="w-full px-3 py-2 border rounded-md"
          defaultValue={editingData?.infoUrl || ''}
          id="adm-info"
          placeholder="https://simak.unipas.ac.id"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="w-4 h-4"
          defaultChecked={editingData?.isActive ?? true}
          id="adm-active"
        />
        <label htmlFor="adm-active" className="text-sm">Jalur Aktif</label>
      </div>
      <div className="flex gap-2 pt-4 border-t">
        <button
          type="button"
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
          onClick={() => setFormOpen(false)}
        >
          Batal
        </button>
        <button
          type="button"
          onClick={async () => {
            const data = {
              name: (document.getElementById('adm-name') as HTMLInputElement).value,
              slug: (document.getElementById('adm-slug') as HTMLInputElement).value,
              description: (document.getElementById('adm-description') as HTMLTextAreaElement).value,
              registrationStart: (document.getElementById('adm-reg-start') as HTMLInputElement).value,
              registrationEnd: (document.getElementById('adm-reg-end') as HTMLInputElement).value,
              examDate: (document.getElementById('adm-exam') as HTMLInputElement).value,
              announcementDate: (document.getElementById('adm-announce') as HTMLInputElement).value,
              fee: (document.getElementById('adm-fee') as HTMLInputElement).value,
              quota: (document.getElementById('adm-quota') as HTMLInputElement).value,
              infoUrl: (document.getElementById('adm-info') as HTMLInputElement).value,
              isActive: (document.getElementById('adm-active') as HTMLInputElement).checked,
            }
            await handleSubmit(data)
          }}
          className="px-4 py-2 bg-ui-navy text-white rounded-md hover:bg-ui-navy/80"
        >
          Simpan
        </button>
      </div>
    </div>
  )

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

        {formOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full">
              <div className="p-6">
                <SimpleForm />
              </div>
            </div>
          </div>
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

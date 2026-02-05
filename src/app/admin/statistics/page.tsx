'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export default function AdminStatisticsPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingData, setEditingData] = useState<any>(null)

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/statistics')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching statistics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (id: number, row: any) => {
    setEditingId(id)
    setEditingData(row)
    setFormOpen(true)
  }

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Hapus Statistik",
      description: "Yakin ingin menghapus statistik ini?",
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })
    
    if (!confirmed) return

    try {
      const res = await fetch(`/api/statistics/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setStats(stats.filter((item) => item.id !== id))
        toast({
          title: "Statistik Dihapus",
          description: "Statistik berhasil dihapus",
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus statistik',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error deleting statistic:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus statistik. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      const url = editingId ? `/api/statistics/${editingId}` : '/api/statistics'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        await fetchStatistics()
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Error saving statistic:', error)
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
      key: 'label',
      title: 'Label',
      render: (value: any) => (
        <div className="font-medium">{value}</div>
      ),
    },
    {
      key: 'value',
      title: 'Nilai',
      render: (value: any) => (
        <div className="text-2xl font-bold text-ui-navy">{value}</div>
      ),
    },
    {
      key: 'icon',
      title: 'Icon',
      render: (value: any) => value || <Badge variant="outline">-</Badge>,
    },
    {
      key: 'orderPosition',
      title: 'Urutan',
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {editingData ? 'Edit Statistik' : 'Tambah Statistik Baru'}
      </h3>
      <div className="space-y-2">
        <label className="text-sm font-medium">Label *</label>
        <input
          className="w-full px-3 py-2 border rounded-md"
          defaultValue={editingData?.label || ''}
          id="stat-label"
          placeholder="Jumlah Mahasiswa"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Nilai *</label>
        <input
          className="w-full px-3 py-2 border rounded-md"
          defaultValue={editingData?.value || ''}
          id="stat-value"
          placeholder="47,000+"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Icon</label>
        <select
          className="w-full px-3 py-2 border rounded-md"
          defaultValue={editingData?.icon || ''}
          id="stat-icon"
        >
          <option value="">Pilih Icon</option>
          <option value="Users">Users</option>
          <option value="Building2">Building</option>
          <option value="BookOpen">Book</option>
          <option value="GraduationCap">Graduation Cap</option>
          <option value="UserCheck">User Check</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Urutan</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            defaultValue={editingData?.orderPosition || 0}
            id="stat-order"
          />
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <input
            type="checkbox"
            className="w-4 h-4"
            defaultChecked={editingData?.isActive ?? true}
            id="stat-active"
          />
          <label htmlFor="stat-active" className="text-sm">Aktif</label>
        </div>
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
              label: (document.getElementById('stat-label') as HTMLInputElement).value,
              value: (document.getElementById('stat-value') as HTMLInputElement).value,
              icon: (document.getElementById('stat-icon') as HTMLSelectElement).value,
              orderPosition: parseInt((document.getElementById('stat-order') as HTMLInputElement).value),
              isActive: (document.getElementById('stat-active') as HTMLInputElement).checked,
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
            Kelola Statistik
          </h1>
          <p className="text-muted-foreground">
            Tambah, edit, atau hapus statistik universitas
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Memuat data...
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            <DataTable
              columns={columns}
              data={stats}
              onEdit={handleEdit}
              onDelete={handleDelete}
              addButtonText="Tambah Statistik"
              onAdd={() => {
                setEditingId(null)
                setEditingData(null)
                setFormOpen(true)
              }}
            />

            <Card className="h-fit">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Preview Icon
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {['Users', 'Building2', 'BookOpen', 'GraduationCap', 'UserCheck'].map((icon) => (
                    <div key={icon} className="text-center p-4 border rounded-lg hover:bg-gray-50">
                      <div className="text-4xl">📊</div>
                      <div className="text-xs text-muted-foreground mt-2">{icon}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {formOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <SimpleForm />
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

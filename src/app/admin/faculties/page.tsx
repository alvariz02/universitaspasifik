'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import FacultyForm from '@/components/admin/FacultyForm'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export default function AdminFacultiesPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [faculties, setFaculties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingData, setEditingData] = useState<any>(null)

  useEffect(() => {
    fetchFacultiesWithStaff()
  }, [])

  const fetchFaculties = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/faculties?limit=100`)
      const data = await res.json()
      setFaculties(data)
    } catch (error) {
      console.error('Error fetching faculties:', error)
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

  const handleDelete = async (id: number, row: any) => {
    const confirmed = await confirm({
      title: "Hapus Fakultas",
      description: `Yakin ingin menghapus ${row.name}?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })
    
    if (!confirmed) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/faculties/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setFaculties(faculties.filter((item) => item.id !== id))
        toast({
          title: "Fakultas Dihapus",
          description: `${row.name} berhasil dihapus`,
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus fakultas',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error deleting faculty:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus fakultas. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      const url = editingId ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/faculties/${editingId}` : `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/faculties`
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        await fetchFacultiesWithStaff()
        toast({
          title: editingId ? "Fakultas Diperbarui" : "Fakultas Ditambahkan",
          description: `${data.name} berhasil ${editingId ? 'diperbarui' : 'ditambahkan'}`,
          variant: "default",
        })
        setFormOpen(false)
        setEditingId(null)
        setEditingData(null)
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menyimpan",
          description: errorData.error || 'Gagal menyimpan fakultas',
          variant: "destructive",
        })
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Error saving faculty:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menyimpan fakultas. Silakan coba lagi.",
        variant: "destructive",
      })
      throw error
    }
  }

  const fetchFacultiesWithStaff = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/faculties?limit=100`)
      const facultiesData = await res.json()
      
      // Fetch staff untuk mendapatkan dekan
      const staffRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/staff?limit=100`)
      if (staffRes.ok) {
        const staffData = await staffRes.json()
        
        // Map dean ke faculties
        const facultiesWithDean = facultiesData.map((faculty: any) => ({
          ...faculty,
          dean: staffData.find((staff: any) => staff.position === 'Dekan' && staff.facultyId === faculty.id)
        }))
        
        setFaculties(facultiesWithDean)
      } else {
        setFaculties(facultiesData)
      }
    } catch (error) {
      console.error('Error fetching faculties:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      key: 'id',
      title: 'ID',
      render: (value: any) => <span className="font-mono text-sm">#{value}</span>,
    },
    {
      key: 'name',
      title: 'Nama Fakultas',
      render: (value: any, row: any) => (
        <div className="max-w-md">
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.slug}</div>
        </div>
      ),
    },
    {
      key: 'deanName',
      title: 'Dekan',
      render: (value: any, row: any) => (
        <div>
          {row.dean ? (
            <div>
              <div className="font-medium">{row.dean.name}</div>
              <div className="text-sm text-unipas-text">{row.dean.email}</div>
            </div>
          ) : (
            <span className="text-unipas-text">-</span>
          )}
        </div>
      ),
    },
    {
      key: 'location',
      title: 'Lokasi',
      render: (value: any) => value && <Badge variant="outline">{value}</Badge>,
    },
    {
      key: 'establishedYear',
      title: 'Tahun',
      render: (value: any) => value || '-',
    },
  ]

  return (
    <AdminLayout>
      <div className="min-h-screen bg-unipas-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="mb-6">
            <div className="bg-linear-to-r from-unipas-primary to-unipas-accent rounded-xl p-6 text-white shadow-lg mb-4">
              <h1 className="text-3xl font-bold mb-2">
                Kelola Fakultas
              </h1>
              <p className="text-white/90">
                Tambah, edit, atau hapus fakultas Universitas Pasifik Morotai
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
              data={faculties}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleCreate}
              searchable
              searchPlaceholder="Cari fakultas..."
              addButtonText="Tambah Fakultas"
            />
          )}

          <FacultyForm
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
      </div>
    </AdminLayout>
  )
}

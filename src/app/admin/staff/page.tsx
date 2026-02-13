'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import StaffForm from '@/components/admin/StaffForm'
import StaffDetails from '@/components/admin/StaffDetails'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export default function AdminStaffPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [staff, setStaff] = useState<any[]>([])
  const [faculties, setFaculties] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<any>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [viewStaff, setViewStaff] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [staffRes, facultiesRes, departmentsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/staff?limit=100`),
        fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/faculties?limit=100`),
        fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/departments?limit=100`),
      ])
      
      const staffData = await staffRes.json()
      const facultiesData = await facultiesRes.json()
      const departmentsData = await departmentsRes.json()
      
      setStaff(Array.isArray(staffData) ? staffData : staffData.staff || [])
      setFaculties(Array.isArray(facultiesData) ? facultiesData : facultiesData.faculties || [])
      setDepartments(Array.isArray(departmentsData) ? departmentsData : departmentsData.departments || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setSelectedStaff(null)
    setFormOpen(true)
  }

  const handleEdit = (id: number, item: any) => {
    setSelectedStaff(item)
    setFormOpen(true)
  }

  const handleView = (id: number, item: any) => {
    setViewStaff(item)
    setDetailsOpen(true)
  }

  const handleDelete = async (id: number) => {
    const staffItem = staff.find(item => item.id === id)
    
    const confirmed = await confirm({
      title: "Hapus Staff",
      description: `Hapus staff "${staffItem?.name || 'ini'}"?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })
    
    if (!confirmed) return
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/staff/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setStaff(staff.filter((item) => item.id !== id))
        toast({
          title: "Staff Dihapus",
          description: `"${staffItem?.name || 'Staff'}" berhasil dihapus`,
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus staff',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus staff. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/staff`
      let method = 'POST'

      if (selectedStaff) {
        url = `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/staff/${selectedStaff.id}`
        method = 'PUT'
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        const result = await res.json()

        // Update local state optimistically based on response
        if (method === 'POST') {
          // append created staff
          setStaff((prev) => [result, ...prev])
          toast({
            title: "Staff Ditambahkan",
            description: `"${result.name}" berhasil ditambahkan`,
            variant: "default",
          })
        } else {
          // replace updated staff in list
          setStaff((prev) => prev.map((s) => (s.id === result.id ? result : s)))
          toast({
            title: "Staff Diperbarui",
            description: `"${result.name}" berhasil diperbarui`,
            variant: "default",
          })
        }

        setFormOpen(false)
        setSelectedStaff(null)
      } else {
        const error = await res.json()
        toast({
          title: "Gagal Menyimpan",
          description: error.error || 'Gagal menyimpan data staff',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menyimpan data staff. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const columns = [
    { key: 'id', title: 'ID', render: (v) => <span className="font-mono text-sm">#{v}</span> },
    { key: 'name', title: 'Nama' },
    { key: 'position', title: 'Jabatan' },
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Telepon' },
    { 
      key: 'faculty', 
      title: 'Fakultas',
      render: (value: any) => value?.name || '-',
    },
    { 
      key: 'department', 
      title: 'Departemen',
      render: (value: any) => value?.name || '-',
    },
  ]

  return (
    <AdminLayout>
      <div className="min-h-screen bg-unipas-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-ui-navy mb-2">Kelola Staff</h1>
              <p className="text-muted-foreground">Daftar seluruh dosen dan karyawan</p>
            </div>
            <Button 
              onClick={handleAdd}
              className="bg-gradient-to-r from-unipas-primary to-unipas-accent text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Staff
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Memuat...</div>
          ) : (
            <DataTable 
              columns={columns} 
              data={staff} 
              onEdit={handleEdit}
              onView={handleView}
              onDelete={handleDelete}
              searchable 
              searchPlaceholder="Cari staff..."
            />
          )}

          <StaffForm
            open={formOpen}
            onClose={() => setFormOpen(false)}
            onSubmit={handleSubmit}
            initialData={selectedStaff}
            faculties={faculties}
            departments={departments}
          />

          <StaffDetails open={detailsOpen} onClose={() => setDetailsOpen(false)} staff={viewStaff} />

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

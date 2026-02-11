'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import DepartmentForm from '@/components/admin/DepartmentForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export default function AdminDepartmentsPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [departments, setDepartments] = useState<any[]>([])
  const [faculties, setFaculties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [departmentsRes, facultiesRes] = await Promise.all([
        fetch('/api/departments?limit=100'),
        fetch('/api/faculties?limit=100'),
      ])
      
      const departmentsData = await departmentsRes.json()
      const facultiesData = await facultiesRes.json()
      
      setDepartments(Array.isArray(departmentsData) ? departmentsData : departmentsData.departments || [])
      setFaculties(Array.isArray(facultiesData) ? facultiesData : facultiesData.faculties || [])
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Gagal memuat data departemen",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setSelectedDepartment(null)
    setFormOpen(true)
  }

  const handleEdit = (id: number, row: any) => {
    setSelectedDepartment(row)
    setFormOpen(true)
  }

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Hapus Departemen",
      description: "Apakah Anda yakin ingin menghapus departemen ini?",
      confirmText: "Hapus",
      cancelText: "Batal"
    })

    if (confirmed) {
      try {
        const response = await fetch(`/api/departments/${id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          toast({
            title: "Berhasil",
            description: "Departemen berhasil dihapus"
          })
          fetchData()
        } else {
          throw new Error('Gagal menghapus departemen')
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal menghapus departemen",
          variant: "destructive"
        })
      }
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      const url = selectedDepartment 
        ? `/api/departments/${selectedDepartment.id}`
        : '/api/departments'
      
      const method = selectedDepartment ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: selectedDepartment 
            ? "Departemen berhasil diperbarui" 
            : "Departemen berhasil ditambahkan"
        })
        setFormOpen(false)
        fetchData()
      } else {
        throw new Error(selectedDepartment 
          ? 'Gagal memperbarui departemen' 
          : 'Gagal menambah departemen')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: selectedDepartment 
          ? "Gagal memperbarui departemen" 
          : "Gagal menambah departemen",
        variant: "destructive"
      })
    }
  }

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Nama Departemen' },
    { 
      key: 'faculty', 
      title: 'Fakultas',
      render: (value: any, row: any) => row.faculty?.name || '-'
    },
    { key: 'degreeLevel', title: 'Jenjang' },
    { key: 'accreditation', title: 'Akreditasi' },
    { key: 'quota', title: 'Kuota' },
    {
      key: 'isActive',
      title: 'Status',
      render: (value: any, row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {row.isActive ? 'Aktif' : 'Tidak Aktif'}
        </span>
      )
    }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-unipas-primary">Departemen</h1>
            <p className="text-gray-600">Kelola departemen dan program studi</p>
          </div>
          <Button onClick={handleAdd} className="bg-unipas-primary hover:bg-unipas-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Departemen
          </Button>
        </div>

        <DataTable
          data={departments}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchable
        />

        <DepartmentForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedDepartment}
          faculties={faculties}
        />

        <ConfirmDialog
          open={isOpen}
          title={options.title}
          description={options.description}
          confirmText={options.confirmText}
          cancelText={options.cancelText}
          onConfirm={handleConfirm}
          onOpenChange={handleCancel}
        />
      </div>
    </AdminLayout>
  )
}

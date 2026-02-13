'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export default function AdminContactPage() {
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [submissions, setSubmissions] = useState<any[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [filter])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const url = filter === 'all' 
        ? '/api/contact?limit=100'
        : `/api/contact?limit=100&status=${filter}`
      const res = await fetch(url)
      const data = await res.json()
      setSubmissions(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setSubmissions(submissions.map(s => 
          s.id === id ? { ...s, status: newStatus } : s
        ))
        toast({
          title: "Status Diperbarui",
          description: `Status pesan berhasil diubah ke ${newStatus}`,
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Update Status",
          description: errorData.error || 'Gagal update status',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal update status. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Hapus Pesan",
      description: "Hapus pesan ini?",
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })
    
    if (!confirmed) return
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/contact/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setSubmissions(submissions.filter((item) => item.id !== id))
        toast({
          title: "Pesan Dihapus",
          description: "Pesan berhasil dihapus",
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus pesan',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus pesan. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const columns = [
    { key: 'id', title: 'ID', render: (v) => <span className="font-mono text-sm">#{v}</span> },
    { key: 'name', title: 'Nama' },
    { key: 'email', title: 'Email' },
    { key: 'subject', title: 'Subjek' },
    { 
      key: 'status', 
      title: 'Status',
      render: (v: any) => {
        const colors: any = {
          pending: 'bg-yellow-500',
          replied: 'bg-blue-500',
          closed: 'bg-green-500',
        }
        return <Badge className={colors[v] || 'bg-gray-500'}>{v}</Badge>
      },
    },
    { 
      key: 'createdAt', 
      title: 'Tanggal',
      render: (v) => v ? format(new Date(v), 'dd MMM yyyy, HH:mm', { locale: localeId }) : '-',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-ui-navy mb-2">Pesan Kontak</h1>
          <p className="text-muted-foreground">Kelola pesan dari formulir kontak</p>
          
          <div className="mt-4 flex gap-2 items-center">
            <label className="text-sm font-medium">Filter Status:</label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Semua" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="replied">Dijawab</SelectItem>
                <SelectItem value="closed">Ditutup</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Memuat...</div>
        ) : (
          <>
            <DataTable 
              columns={columns} 
              data={submissions}
              onDelete={handleDelete}
              searchable
              searchPlaceholder="Cari pesan..."
            />
            <div className="mt-6 bg-white rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">Statistik Kontak</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">
                    {submissions.filter(s => s.status === 'pending').length}
                  </div>
                  <div className="text-sm text-yellow-700">Pending</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {submissions.filter(s => s.status === 'replied').length}
                  </div>
                  <div className="text-sm text-blue-700">Dijawab</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {submissions.filter(s => s.status === 'closed').length}
                  </div>
                  <div className="text-sm text-green-700">Ditutup</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-600">
                    {submissions.length}
                  </div>
                  <div className="text-sm text-gray-700">Total Pesan</div>
                </div>
              </div>
            </div>
          </>
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

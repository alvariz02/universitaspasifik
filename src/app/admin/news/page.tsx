'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
// Modal form removed; use full-page create/edit flow
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export default function AdminNewsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/news?limit=100`)
      const data = await res.json()
      setNews(data.news || data)
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (id: number) => {
    router.push(`/admin/news/create?id=${id}`)
  }

  const handleDelete = async (id: number) => {
    const newsItem = news.find(item => item.id === id)
    
    const confirmed = await confirm({
      title: "Hapus Berita",
      description: `Yakin ingin menghapus berita "${newsItem?.title || 'ini'}"?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })
    
    if (!confirmed) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/news/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setNews(news.filter((item) => item.id !== id))
        toast({
          title: "Berita Dihapus",
          description: `"${newsItem?.title || 'Berita'}" berhasil dihapus`,
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus berita',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error deleting news:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus berita. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  // create/edit handled on separate page (`/admin/news/create`), so no inline submit here

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
        <div className="max-w-[300px]">
          <div className="font-medium truncate" title={value}>{value}</div>
          <div className="text-sm text-muted-foreground truncate" title={row.slug}>{row.slug}</div>
        </div>
      ),
    },
    {
      key: 'category',
      title: 'Kategori',
      render: (value: any) => value && <Badge>{value}</Badge>,
    },
    {
      key: 'authorName',
      title: 'Penulis',
    },
    {
      key: 'publishedDate',
      title: 'Tanggal Publikasi',
      render: (value: any) =>
        value ? format(new Date(value), 'dd MMM yyyy', { locale: localeId }) : '-',
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
  ]

  return (
    <AdminLayout>
      <div className="p-6 bg-unipas-muted min-h-screen">
        {/* Header Section */}
        <div className="mb-6 bg-white rounded-xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-unipas-primary mb-2">
                Kelola Berita
              </h1>
              <p className="text-unipas-text/70">
                Tambah, edit, atau hapus berita Universitas Pasifik Morotai
              </p>
            </div>
            <Button
              onClick={() => router.push('/admin/news/create')}
              className="bg-gradient-to-r from-unipas-primary to-unipas-accent text-white hover:from-unipas-accent hover:to-unipas-primary shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Berita
            </Button>
          </div>
        </div>

        {/* Data Table Section */}
        {loading ? (
          <div className="text-center py-8 bg-white rounded-xl shadow-lg">
            <div className="text-unipas-primary">Memuat data...</div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={news}
            onEdit={(id) => handleEdit(id)}
            onDelete={handleDelete}
            searchable
            searchPlaceholder="Cari berita..."
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

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable from '@/components/admin/DataTable'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

interface HeroSlider {
  id: number
  title: string
  subtitle?: string
  imageUrl: string
  linkUrl?: string
  linkText?: string
  orderPosition: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminHeroSlidersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { confirm, isOpen, options, handleConfirm, handleCancel, setIsOpen } = useConfirm()
  const [sliders, setSliders] = useState<HeroSlider[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/hero-sliders?limit=100')
      const data = await res.json()
      setSliders(Array.isArray(data) ? data : data.sliders || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    router.push('/admin/hero-sliders/form')
  }

  const handleEdit = (slider: HeroSlider) => {
    router.push(`/admin/hero-sliders/form?id=${slider.id}`)
  }

  const handleDelete = async (id: number) => {
    const sliderItem = sliders.find(item => item.id === id)
    
    const confirmed = await confirm({
      title: "Hapus Hero Slider",
      description: `Hapus hero slider "${sliderItem?.title || 'ini'}"?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive"
    })
    
    if (!confirmed) return
    
    try {
      const res = await fetch(`/api/hero-sliders/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setSliders(sliders.filter((item) => item.id !== id))
        toast({
          title: "Hero Slider Dihapus",
          description: `"${sliderItem?.title || 'Hero Slider'}" berhasil dihapus`,
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Gagal Menghapus",
          description: errorData.error || 'Gagal menghapus hero slider',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menghapus hero slider. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const columns = [
    {
      key: 'orderPosition',
      title: 'Order',
      render: (value: any) => <span className="font-semibold">{value}</span>,
    },
    {
      key: 'title',
      title: 'Judul',
      render: (value: any) => <span className="line-clamp-1">{value}</span>,
    },
    {
      key: 'subtitle',
      title: 'Subtitle',
      render: (value: any) => <span className="line-clamp-1 text-sm">{value || '-'}</span>,
    },
    {
      key: 'imageUrl',
      title: 'Gambar',
      render: (value: any) => (
        <div className="w-16 h-12 rounded overflow-hidden">
          {value && <img src={value} alt="slider" className="w-full h-full object-cover" />}
        </div>
      ),
    },
    {
      key: 'isActive',
      title: 'Status',
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {value ? 'Aktif' : 'Nonaktif'}
        </span>
      ),
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-unipas-primary">Hero Sliders</h1>
            <p className="text-unipas-text mt-2">Kelola banner dan slider halaman utama</p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-unipas-primary hover:bg-unipas-accent gap-2"
          >
            <Plus className="h-4 w-4" />
            Tambah Slider
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-unipas-text">Memuat data...</p>
          </div>
        ) : sliders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-unipas-primary/20">
            <p className="text-unipas-text mb-4">Belum ada hero slider</p>
            <Button
              onClick={handleAdd}
              variant="outline"
              className="border-unipas-primary text-unipas-primary hover:bg-unipas-primary/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Buat Slider Pertama
            </Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={sliders.map((slider) => ({
              ...slider,
              id: slider.id,
            }))}
            onEdit={(id, item) => handleEdit(item)}
            onDelete={(id) => handleDelete(id)}
            onView={() => {}} // Hero sliders tidak perlu detail view
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

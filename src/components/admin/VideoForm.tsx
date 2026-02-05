'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Play } from 'lucide-react'

interface VideoFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
  initialData?: any
}

export default function VideoForm({ open, onClose, onSubmit, initialData }: VideoFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    category: '',
    isFeatured: false,
    isActive: true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        youtubeUrl: initialData.youtubeUrl || '',
        category: initialData.category || '',
        isFeatured: initialData.isFeatured || false,
        isActive: initialData.isActive ?? true
      })
      setPreviewThumbnail(initialData.thumbnail || null)
    } else {
      setFormData({
        title: '',
        description: '',
        youtubeUrl: '',
        category: '',
        isFeatured: false,
        isActive: true
      })
      setPreviewThumbnail(null)
    }
  }, [initialData, open])

  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const handleYouTubeUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, youtubeUrl: url }))
    
    const youtubeId = extractYouTubeId(url)
    if (youtubeId) {
      const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
      setPreviewThumbnail(thumbnail)
    } else {
      setPreviewThumbnail(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.youtubeUrl.trim()) {
      return
    }

    const youtubeId = extractYouTubeId(formData.youtubeUrl)
    if (!youtubeId) {
      alert('URL YouTube tidak valid')
      return
    }

    try {
      setIsSubmitting(true)
      await onSubmit(formData)
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    { value: 'kegiatan', label: 'Kegiatan Umum' },
    { value: 'akademik', label: 'Akademik' },
    { value: 'wisuda', label: 'Wisuda' },
    { value: 'seminar', label: 'Seminar/Workshop' },
    { value: 'olahraga', label: 'Olahraga' },
    { value: 'seni', label: 'Seni & Budaya' },
    { value: 'penelitian', label: 'Penelitian' },
    { value: 'kemahasiswaan', label: 'Kemahasiswaan' },
    { value: 'lainnya', label: 'Lainnya' }
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Video' : 'Tambah Video Baru'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Video *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Masukkan judul video"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtubeUrl">URL YouTube *</Label>
            <Input
              id="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={(e) => handleYouTubeUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
            <p className="text-sm text-muted-foreground">
              Masukkan URL lengkap video YouTube
            </p>
          </div>

          {previewThumbnail && (
            <div className="space-y-2">
              <Label>Preview Thumbnail</Label>
              <div className="w-full max-w-md h-48 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <img 
                  src={previewThumbnail} 
                  alt="Video thumbnail" 
                  className="w-full h-full object-cover"
                  onError={() => setPreviewThumbnail(null)}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Deskripsi video (opsional)"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
              />
              <Label htmlFor="isFeatured">Video Unggulan</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="isActive">Aktif</Label>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.youtubeUrl.trim()}
              className="bg-unipas-primary hover:bg-unipas-accent"
            >
              {isSubmitting ? 'Menyimpan...' : (initialData ? 'Perbarui' : 'Simpan')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
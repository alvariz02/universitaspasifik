'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface JournalFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
  initialData?: any
  faculties: any[]
}

export default function JournalForm({ open, onClose, onSubmit, initialData, faculties }: JournalFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    authors: '',
    authorAffiliation: '',
    keywords: '',
    category: '',
    subject: '',
    language: 'id',
    pages: '',
    volume: '',
    issue: '',
    year: '',
    publishedDate: '',
    doi: '',
    issn: '',
    pdfUrl: '',
    pdfSize: '',
    isOpenAccess: true,
    isPeerReviewed: false,
    isFeatured: false,
    isActive: true,
    facultyId: 'none'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        abstract: initialData.abstract || '',
        authors: initialData.authors || '',
        authorAffiliation: initialData.authorAffiliation || '',
        keywords: initialData.keywords || '',
        category: initialData.category || '',
        subject: initialData.subject || '',
        language: initialData.language || 'id',
        pages: initialData.pages || '',
        volume: initialData.volume || '',
        issue: initialData.issue || '',
        year: initialData.year?.toString() || '',
        publishedDate: initialData.publishedDate ? initialData.publishedDate.split('T')[0] : '',
        doi: initialData.doi || '',
        issn: initialData.issn || '',
        pdfUrl: initialData.pdfUrl || '',
        pdfSize: initialData.pdfSize?.toString() || '',
        isOpenAccess: initialData.isOpenAccess ?? true,
        isPeerReviewed: initialData.isPeerReviewed ?? false,
        isFeatured: initialData.isFeatured ?? false,
        isActive: initialData.isActive ?? true,
        facultyId: initialData.facultyId?.toString() || 'none'
      })
    } else {
      setFormData({
        title: '',
        abstract: '',
        authors: '',
        authorAffiliation: '',
        keywords: '',
        category: '',
        subject: '',
        language: 'id',
        pages: '',
        volume: '',
        issue: '',
        year: '',
        publishedDate: '',
        doi: '',
        issn: '',
        pdfUrl: '',
        pdfSize: '',
        isOpenAccess: true,
        isPeerReviewed: false,
        isFeatured: false,
        isActive: true,
        facultyId: 'none'
      })
    }
  }, [initialData, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.authors.trim()) {
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
    { value: 'sains', label: 'Sains & Teknologi' },
    { value: 'sosial', label: 'Ilmu Sosial' },
    { value: 'ekonomi', label: 'Ekonomi & Bisnis' },
    { value: 'pendidikan', label: 'Pendidikan' },
    { value: 'kesehatan', label: 'Kesehatan' },
    { value: 'teknik', label: 'Teknik & Rekayasa' },
    { value: 'perikanan', label: 'Perikanan & Kelautan' },
    { value: 'pertanian', label: 'Pertanian' },
    { value: 'hukum', label: 'Hukum' },
    { value: 'lainnya', label: 'Lainnya' }
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Jurnal' : 'Tambah Jurnal Baru'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
              <TabsTrigger value="publication">Publikasi</TabsTrigger>
              <TabsTrigger value="settings">Pengaturan</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Jurnal *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Masukkan judul jurnal"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authors">Penulis *</Label>
                <Input
                  id="authors"
                  value={formData.authors}
                  onChange={(e) => setFormData(prev => ({ ...prev, authors: e.target.value }))}
                  placeholder="Nama penulis (pisahkan dengan koma)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorAffiliation">Afiliasi Penulis</Label>
                <Input
                  id="authorAffiliation"
                  value={formData.authorAffiliation}
                  onChange={(e) => setFormData(prev => ({ ...prev, authorAffiliation: e.target.value }))}
                  placeholder="Universitas Pasifik Morotai"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="abstract">Abstrak</Label>
                <Textarea
                  id="abstract"
                  value={formData.abstract}
                  onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
                  placeholder="Abstrak jurnal"
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Kata Kunci</Label>
                <Input
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                  placeholder="Kata kunci (pisahkan dengan koma)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

                <div className="space-y-2">
                  <Label htmlFor="subject">Bidang Studi</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Bidang studi spesifik"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="facultyId">Fakultas</Label>
                <Select
                  value={formData.facultyId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, facultyId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih fakultas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Tidak ada</SelectItem>
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id.toString()}>
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="publication" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="volume">Volume</Label>
                  <Input
                    id="volume"
                    value={formData.volume}
                    onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
                    placeholder="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issue">Issue/Nomor</Label>
                  <Input
                    id="issue"
                    value={formData.issue}
                    onChange={(e) => setFormData(prev => ({ ...prev, issue: e.target.value }))}
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Tahun</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                    placeholder="2024"
                    min="1900"
                    max="2100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pages">Halaman</Label>
                  <Input
                    id="pages"
                    value={formData.pages}
                    onChange={(e) => setFormData(prev => ({ ...prev, pages: e.target.value }))}
                    placeholder="1-15"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishedDate">Tanggal Publikasi</Label>
                <Input
                  id="publishedDate"
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, publishedDate: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doi">DOI</Label>
                  <Input
                    id="doi"
                    value={formData.doi}
                    onChange={(e) => setFormData(prev => ({ ...prev, doi: e.target.value }))}
                    placeholder="10.1000/xyz123"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issn">ISSN</Label>
                  <Input
                    id="issn"
                    value={formData.issn}
                    onChange={(e) => setFormData(prev => ({ ...prev, issn: e.target.value }))}
                    placeholder="1234-5678"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Bahasa</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>File PDF</Label>
                <div className="space-y-2">
                  <Input
                    type="url"
                    placeholder="URL file PDF"
                    value={formData.pdfUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, pdfUrl: e.target.value }))}
                  />
                  <p className="text-sm text-muted-foreground">
                    Masukkan URL file PDF yang sudah diupload
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="isOpenAccess">Open Access</Label>
                    <p className="text-sm text-muted-foreground">Jurnal dapat diakses secara gratis</p>
                  </div>
                  <Switch
                    id="isOpenAccess"
                    checked={formData.isOpenAccess}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isOpenAccess: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="isPeerReviewed">Peer Reviewed</Label>
                    <p className="text-sm text-muted-foreground">Jurnal telah melalui proses peer review</p>
                  </div>
                  <Switch
                    id="isPeerReviewed"
                    checked={formData.isPeerReviewed}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPeerReviewed: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="isFeatured">Jurnal Unggulan</Label>
                    <p className="text-sm text-muted-foreground">Tampilkan di halaman utama</p>
                  </div>
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="isActive">Status Aktif</Label>
                    <p className="text-sm text-muted-foreground">Jurnal dapat dilihat publik</p>
                  </div>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

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
              disabled={isSubmitting || !formData.title.trim() || !formData.authors.trim()}
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
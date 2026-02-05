'use client'

import { useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FileUpload from './FileUpload'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import RichTextEditor from './RichTextEditor'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const newsSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  slug: z.string().min(1, 'Slug wajib diisi'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Konten wajib diisi'),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
  authorName: z.string().optional(),
  publishedDate: z.string().optional(),
  isFeatured: z.boolean().default(false),
})

type NewsFormData = z.infer<typeof newsSchema>

interface NewsFormPageProps {
  initialData?: any
  onSubmit: (data: NewsFormData) => Promise<void>
  title: string
  subtitle: string
  submitButtonText: string
}

export default function NewsFormPage({ initialData, onSubmit, title, subtitle, submitButtonText }: NewsFormPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema) as Resolver<NewsFormData>,
    defaultValues: initialData || {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      category: '',
      authorName: '',
      publishedDate: '',
      isFeatured: false,
    },
  })

  const onFormSubmit = async (data: NewsFormData) => {
    try {
      setIsSubmitting(true)
      await onSubmit(data)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    if (!initialData) { // Only generate slug for new items
      const slug = generateSlug(title)
      setValue('slug', slug)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link href="/admin/news" className="inline-flex items-center gap-2 text-unipas-primary hover:text-unipas-accent mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Daftar Berita
        </Link>
        <div className="bg-linear-to-r from-unipas-primary to-unipas-accent rounded-xl p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-white/90">{subtitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl p-6 border border-unipas-primary/20 shadow-lg">
          <h3 className="text-lg font-semibold text-unipas-primary mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-unipas-accent rounded-full"></span>
            Informasi Dasar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-unipas-primary font-medium">Judul *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Masukkan judul berita"
                className="border-unipas-primary/20 focus:border-unipas-accent"
                onChange={handleTitleChange}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-unipas-primary font-medium">Slug *</Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="berita-slug"
                className="border-unipas-primary/20 focus:border-unipas-accent"
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <Label htmlFor="excerpt" className="text-unipas-primary font-medium">Ringkasan</Label>
            <textarea
              id="excerpt"
              {...register('excerpt')}
              placeholder="Ringkasan singkat berita"
              rows={3}
              className="w-full border border-unipas-primary/20 focus:border-unipas-accent rounded-lg p-3 resize-none"
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl p-6 border border-unipas-primary/20 shadow-lg">
          <h3 className="text-lg font-semibold text-unipas-primary mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-unipas-accent rounded-full"></span>
            Konten Berita
          </h3>
          <div className="space-y-2">
            <Label className="text-unipas-primary font-medium">Konten *</Label>
            <RichTextEditor
              value={watch('content') || ''}
              onChange={(value) => setValue('content', value)}
              placeholder="Tulis konten berita lengkap di sini..."
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-white rounded-xl p-6 border border-unipas-primary/20 shadow-lg">
          <h3 className="text-lg font-semibold text-unipas-primary mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-unipas-accent rounded-full"></span>
            Metadata
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-unipas-primary font-medium">Kategori</Label>
              <Select value={watch('category')} onValueChange={(value) => setValue('category', value)}>
                <SelectTrigger className="border-unipas-primary/20 focus:border-unipas-accent">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="akademik">Akademik</SelectItem>
                  <SelectItem value="penelitian">Penelitian</SelectItem>
                  <SelectItem value="pengabdian">Pengabdian</SelectItem>
                  <SelectItem value="kkn">KKN (Kuliah Kerja Nyata)</SelectItem>
                  <SelectItem value="umkm">UMKM (Pengembangan Usaha Kecil Menengah)</SelectItem>
                  <SelectItem value="kemahasiswaan">Kemahasiswaan</SelectItem>
                  <SelectItem value="prestasi">Prestasi</SelectItem>
                  <SelectItem value="umum">Umum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorName" className="text-unipas-primary font-medium">Penulis</Label>
              <Input
                id="authorName"
                {...register('authorName')}
                placeholder="Nama penulis"
                className="border-unipas-primary/20 focus:border-unipas-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publishedDate" className="text-unipas-primary font-medium">Tanggal Publikasi</Label>
              <Input
                id="publishedDate"
                type="date"
                {...register('publishedDate')}
                className="border-unipas-primary/20 focus:border-unipas-accent"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-unipas-primary font-medium">Gambar Utama</Label>
              <FileUpload
                value={watch('imageUrl') || ''}
                onChange={(url) => setValue('imageUrl', url)}
                accept="image/*"
                maxSize={5}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-6 p-4 bg-unipas-muted rounded-lg border border-unipas-primary/20">
            <Checkbox
              id="isFeatured"
              {...register('isFeatured')}
              className="border-unipas-primary/30 data-[state=checked]:bg-unipas-accent data-[state=checked]:border-unipas-accent"
            />
            <Label htmlFor="isFeatured" className="cursor-pointer text-unipas-primary font-medium">
              Tampilkan sebagai berita unggulan
            </Label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center p-6 bg-white rounded-xl border border-unipas-primary/20 shadow-lg">
          <Link href="/admin/news">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              className="border-unipas-primary/30 text-unipas-primary hover:bg-unipas-primary/10"
            >
              Batal
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white hover:from-unipas-accent hover:to-unipas-primary shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : submitButtonText}
          </Button>
        </div>
      </form>
    </div>
  )
}

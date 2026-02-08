'use client'

import { useState, useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FileUpload from './FileUpload'
import { Label } from '@/components/ui/label'
import RichTextEditor from './RichTextEditor'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const eventSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  slug: z.string().min(1, 'Slug wajib diisi'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  eventDate: z.string().min(1, 'Tanggal mulai wajib diisi'),
  endDate: z.string().optional(),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
})

type EventFormData = z.infer<typeof eventSchema>

interface EventFormPageProps {
  initialData?: any
  onSubmit: (data: EventFormData) => Promise<void>
  title: string
  subtitle: string
  submitButtonText: string
}

export default function EventFormPage({ initialData, onSubmit, title, subtitle, submitButtonText }: EventFormPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema) as Resolver<EventFormData>,
    defaultValues: initialData || {
      title: '',
      slug: '',
      description: '',
      eventDate: '',
      endDate: '',
      location: '',
      imageUrl: '',
    },
  })

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      console.log('🔄 Updating form with initialData:', initialData)
      reset(initialData)
    }
  }, [initialData, reset])

  const onFormSubmit = async (data: EventFormData) => {
    try {
      setIsSubmitting(true)
      await onSubmit(data)
      // Only reset form for new items, not for edits
      if (!initialData) {
        reset()
      }
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
        <Link href="/admin/events" className="inline-flex items-center gap-2 text-unipas-primary hover:text-unipas-accent mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Daftar Event
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
              <Label htmlFor="title" className="text-unipas-primary font-medium">Judul Event *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Masukkan judul event"
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
                placeholder="event-slug"
                className="border-unipas-primary/20 focus:border-unipas-accent"
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-unipas-primary font-medium">Lokasi</Label>
              <Input
                id="location"
                {...register('location')}
                placeholder="Lokasi event"
                className="border-unipas-primary/20 focus:border-unipas-accent"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDate" className="text-unipas-primary font-medium">Tanggal Mulai *</Label>
              <Input
                id="eventDate"
                type="datetime-local"
                {...register('eventDate')}
                className="border-unipas-primary/20 focus:border-unipas-accent"
              />
              {errors.eventDate && (
                <p className="text-red-500 text-sm mt-1">{errors.eventDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-unipas-primary font-medium">Tanggal Selesai</Label>
              <Input
                id="endDate"
                type="datetime-local"
                {...register('endDate')}
                className="border-unipas-primary/20 focus:border-unipas-accent"
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-unipas-primary font-medium">Gambar Event</Label>
              <FileUpload
                value={watch('imageUrl') || ''}
                onChange={(url) => setValue('imageUrl', url)}
                accept="image/*"
                maxSize={5}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-6 border border-unipas-primary/20 shadow-lg">
          <h3 className="text-lg font-semibold text-unipas-primary mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-unipas-accent rounded-full"></span>
            Deskripsi Event
          </h3>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-unipas-primary font-medium">Deskripsi *</Label>
            <RichTextEditor
              value={watch('description') || ''}
              onChange={(value) => setValue('description', value)}
              placeholder="Tulis deskripsi lengkap event..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/events">
            <Button 
              type="button" 
              variant="outline" 
              className="border-unipas-primary/20 text-unipas-primary hover:bg-unipas-primary/10"
            >
              Batal
            </Button>
          </Link>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-unipas-primary text-white hover:bg-unipas-accent min-w-32"
          >
            {isSubmitting ? 'Menyimpan...' : submitButtonText}
          </Button>
        </div>
      </form>
    </div>
  )
}

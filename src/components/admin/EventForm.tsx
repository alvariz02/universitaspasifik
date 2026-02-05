'use client'

import { useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import FileUpload from './FileUpload'

const eventSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  slug: z.string().min(1, 'Slug wajib diisi'),
  description: z.string().optional(),
  eventDate: z.string().min(1, 'Tanggal event wajib diisi'),
  endDate: z.string().optional(),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
  organizer: z.string().optional(),
  contactEmail: z.string().optional(),
  registrationUrl: z.string().optional(),
  isFeatured: z.boolean().default(false),
})

type EventFormData = z.infer<typeof eventSchema>

interface EventFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: EventFormData) => Promise<void>
  initialData?: any
}

export default function EventForm({ open, onClose, onSubmit, initialData }: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
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
      organizer: '',
      contactEmail: '',
      registrationUrl: '',
      isFeatured: false,
    },
  })

  const onFormSubmit = async (data: EventFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      reset()
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col bg-white border-unipas-primary/20">
        <DialogHeader className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white rounded-t-lg p-6">
          <DialogTitle className="text-xl font-bold">
            {initialData ? 'Edit Event' : 'Tambah Event Baru'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col flex-1">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Basic Information */}
            <div className="bg-unipas-muted rounded-xl p-6 border border-unipas-primary/20">
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
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="description" className="text-unipas-primary font-medium">Deskripsi</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Deskripsi lengkap event"
                  rows={4}
                  className="border-unipas-primary/20 focus:border-unipas-accent resize-none"
                />
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-unipas-muted rounded-xl p-6 border border-unipas-primary/20">
              <h3 className="text-lg font-semibold text-unipas-primary mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-unipas-accent rounded-full"></span>
                Detail Event
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-unipas-primary font-medium">Lokasi</Label>
                  <Input
                    id="location"
                    {...register('location')}
                    placeholder="Lokasi event"
                    className="border-unipas-primary/20 focus:border-unipas-accent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizer" className="text-unipas-primary font-medium">Penyelenggara</Label>
                  <Input
                    id="organizer"
                    {...register('organizer')}
                    placeholder="Nama penyelenggara"
                    className="border-unipas-primary/20 focus:border-unipas-accent"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-unipas-muted rounded-xl p-6 border border-unipas-primary/20">
              <h3 className="text-lg font-semibold text-unipas-primary mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-unipas-accent rounded-full"></span>
                Informasi Kontak
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-unipas-primary font-medium">Email Kontak</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    {...register('contactEmail')}
                    placeholder="email@example.com"
                    className="border-unipas-primary/20 focus:border-unipas-accent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationUrl" className="text-unipas-primary font-medium">URL Pendaftaran</Label>
                  <Input
                    id="registrationUrl"
                    {...register('registrationUrl')}
                    placeholder="https://example.com/register"
                    className="border-unipas-primary/20 focus:border-unipas-accent"
                  />
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

              <div className="flex items-center space-x-3 mt-6 p-4 bg-white rounded-lg border border-unipas-primary/20">
                <Checkbox
                  id="isFeatured"
                  {...register('isFeatured')}
                  className="border-unipas-primary/30 data-[state=checked]:bg-unipas-accent data-[state=checked]:border-unipas-accent"
                />
                <Label htmlFor="isFeatured" className="cursor-pointer text-unipas-primary font-medium">
                  Tampilkan sebagai event unggulan
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-between items-center p-6 bg-unipas-muted border-t border-unipas-primary/20 rounded-b-lg">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-unipas-primary/30 text-unipas-primary hover:bg-unipas-primary/10"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white hover:from-unipas-accent hover:to-unipas-primary shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

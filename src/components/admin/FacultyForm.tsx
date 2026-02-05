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
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import FileUpload from './FileUpload'

const facultySchema = z.object({
  name: z.string().min(1, 'Nama fakultas wajib diisi'),
  slug: z.string().min(1, 'Slug wajib diisi'),
  description: z.string().optional(),
  deanName: z.string().optional(),
  imageUrl: z.string().optional(),
  location: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional(),
  websiteUrl: z.string().optional(),
  establishedYear: z.coerce.number().optional(),
})

type FacultyFormData = z.infer<typeof facultySchema>

interface FacultyFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: FacultyFormData) => Promise<void>
  initialData?: any
}

export default function FacultyForm({ open, onClose, onSubmit, initialData }: FacultyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FacultyFormData>({
    resolver: zodResolver(facultySchema) as Resolver<FacultyFormData>,
    defaultValues: initialData || {
      name: '',
      slug: '',
      description: '',
      deanName: '',
      imageUrl: '',
      location: '',
      contactEmail: '',
      contactPhone: '',
      websiteUrl: '',
      establishedYear: undefined,
    },
  })

  const onFormSubmit = async (data: FacultyFormData) => {
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
            {initialData ? 'Edit Fakultas' : 'Tambah Fakultas Baru'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="bg-unipas-muted rounded-xl p-6 border border-unipas-primary/20">
              <h3 className="text-lg font-semibold text-unipas-primary mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-unipas-accent rounded-full"></span>
                Informasi Dasar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-unipas-primary font-medium">Nama Fakultas *</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Fakultas Ilmu Kelautan dan Perikanan"
                    className="border-unipas-primary/20 focus:border-unipas-accent"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-unipas-primary font-medium">Slug *</Label>
                  <Input
                    id="slug"
                    {...register('slug')}
                    placeholder="ilmu-kelautan-dan-perikanan"
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
                  placeholder="Deskripsi lengkap tentang fakultas"
                  rows={4}
                  className="border-unipas-primary/20 focus:border-unipas-accent resize-none"
                />
              </div>
            </div>

            {/* Leadership */}
            <div className="bg-unipas-muted rounded-xl p-6 border border-unipas-primary/20">
              <h3 className="text-lg font-semibold text-unipas-primary mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-unipas-accent rounded-full"></span>
                Kepemimpinan
              </h3>
              <div className="space-y-2">
                <Label htmlFor="deanName" className="text-unipas-primary font-medium">Nama Dekan</Label>
                <Input
                  id="deanName"
                  {...register('deanName')}
                  placeholder="Prof. Dr. Ir. Nama Dekan, M.T."
                  className="border-unipas-primary/20 focus:border-unipas-accent"
                />
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
                  <Label htmlFor="location" className="text-unipas-primary font-medium">Lokasi</Label>
                  <Input
                    id="location"
                    {...register('location')}
                    placeholder="Kampus Utama Unipas, Morotai"
                    className="border-unipas-primary/20 focus:border-unipas-accent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-unipas-primary font-medium">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    {...register('contactEmail')}
                    placeholder="fakultas@unipas.ac.id"
                    className="border-unipas-primary/20 focus:border-unipas-accent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-unipas-primary font-medium">Telepon</Label>
                  <Input
                    id="contactPhone"
                    {...register('contactPhone')}
                    placeholder="(0921) 123456"
                    className="border-unipas-primary/20 focus:border-unipas-accent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="websiteUrl" className="text-unipas-primary font-medium">Website</Label>
                  <Input
                    id="websiteUrl"
                    {...register('websiteUrl')}
                    placeholder="https://fakultas.unipas.ac.id"
                    className="border-unipas-primary/20 focus:border-unipas-accent"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-unipas-muted rounded-xl p-6 border border-unipas-primary/20">
              <h3 className="text-lg font-semibold text-unipas-primary mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-unipas-accent rounded-full"></span>
                Informasi Tambahan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="establishedYear" className="text-unipas-primary font-medium">Tahun Berdiri</Label>
                  <Input
                    id="establishedYear"
                    type="number"
                    {...register('establishedYear', { valueAsNumber: true })}
                    placeholder="2010"
                    className="border-unipas-primary/20 focus:border-unipas-accent"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-unipas-primary font-medium">Gambar Fakultas</Label>
                  <FileUpload
                    value={watch('imageUrl') || ''}
                    onChange={(url) => setValue('imageUrl', url)}
                    accept="image/*"
                    maxSize={5}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-6 bg-unipas-muted border-t border-unipas-primary/20 rounded-b-lg">
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
                {isSubmitting ? 'Menyimpan...' : 'Simpan Fakultas'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

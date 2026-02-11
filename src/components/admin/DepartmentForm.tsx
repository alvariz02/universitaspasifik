'use client'

import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import FileUpload from './FileUpload'

const departmentSchema = z.object({
  name: z.string().min(1, 'Nama departemen wajib diisi'),
  slug: z.string().min(1, 'Slug wajib diisi'),
  facultyId: z.number().min(1, 'Fakultas wajib dipilih'),
  degreeLevel: z.string().optional(),
  description: z.string().optional(),
  accreditation: z.string().optional(),
  quota: z.number().optional(),
  imageUrl: z.string().optional(),
})

type DepartmentFormData = z.infer<typeof departmentSchema>

interface DepartmentFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
  initialData?: any
  faculties?: any[]
}

export default function DepartmentForm({ 
  open, 
  onClose, 
  onSubmit, 
  initialData,
  faculties = [],
}: DepartmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: initialData || {
      name: '',
      slug: '',
      facultyId: undefined,
      degreeLevel: '',
      description: '',
      accreditation: '',
      quota: undefined,
      imageUrl: '',
    },
  })

  // When editing, reset form values to initialData so fields (including Selects) show current values
  useEffect(() => {
    if (initialData) {
      const values: any = {
        name: initialData.name ?? '',
        slug: initialData.slug ?? '',
        facultyId: initialData.facultyId ?? undefined,
        degreeLevel: initialData.degreeLevel ?? '',
        description: initialData.description ?? '',
        accreditation: initialData.accreditation ?? '',
        quota: initialData.quota ?? undefined,
        imageUrl: initialData.imageUrl ?? '',
      }

      reset(values)
    }
  }, [initialData, reset])

  const onFormSubmit: SubmitHandler<any> = async (data: any) => {
    setIsSubmitting(true)
    try {
      // normalize payload: convert facultyId to number
      const payload: any = { ...data }
      if (payload.facultyId) payload.facultyId = Number(payload.facultyId)
      if (payload.quota) payload.quota = Number(payload.quota)

      await onSubmit(payload)
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
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col bg-white border-unipas-primary/20">
        <DialogHeader className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white rounded-t-lg p-6">
          <DialogTitle className="text-xl font-bold">
            {initialData ? 'Edit Departemen' : 'Tambah Departemen Baru'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-unipas-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-unipas-accent rounded-full"></span>
                Informasi Dasar
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-unipas-primary font-medium">Nama Departemen *</Label>
                  <Input
                    id="name"
                    placeholder="Contoh: Teknik Informatika"
                    {...register('name')}
                    className="border-unipas-primary/30 focus:border-unipas-primary"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{typeof errors.name.message === 'string' ? errors.name.message : 'Terjadi kesalahan'}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-unipas-primary font-medium">Slug *</Label>
                  <Input
                    id="slug"
                    placeholder="teknik-informatika"
                    {...register('slug')}
                    className="border-unipas-primary/30 focus:border-unipas-primary"
                  />
                  {errors.slug && <p className="text-red-500 text-sm">{typeof errors.slug.message === 'string' ? errors.slug.message : 'Terjadi kesalahan'}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facultyId" className="text-unipas-primary font-medium">Fakultas *</Label>
                  <Select 
                    defaultValue={initialData?.facultyId?.toString() || undefined} 
                    onValueChange={(value) => setValue('facultyId', value ? Number(value) : undefined)}
                  >
                    <SelectTrigger className="border-unipas-primary/30 focus:border-unipas-primary">
                      <SelectValue placeholder="Pilih Fakultas" />
                    </SelectTrigger>
                    <SelectContent>
                      {faculties.map((faculty) => (
                        <SelectItem key={faculty.id} value={faculty.id.toString()}>
                          {faculty.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.facultyId && <p className="text-red-500 text-sm">{typeof errors.facultyId.message === 'string' ? errors.facultyId.message : 'Terjadi kesalahan'}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="degreeLevel" className="text-unipas-primary font-medium">Jenjang</Label>
                  <Select 
                    defaultValue={initialData?.degreeLevel || ''} 
                    onValueChange={(value) => setValue('degreeLevel', value)}
                  >
                    <SelectTrigger className="border-unipas-primary/30 focus:border-unipas-primary">
                      <SelectValue placeholder="Pilih Jenjang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="D3">D3</SelectItem>
                      <SelectItem value="D4">D4</SelectItem>
                      <SelectItem value="S1">S1</SelectItem>
                      <SelectItem value="S2">S2</SelectItem>
                      <SelectItem value="S3">S3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accreditation" className="text-unipas-primary font-medium">Akreditasi</Label>
                  <Select 
                    defaultValue={initialData?.accreditation || ''} 
                    onValueChange={(value) => setValue('accreditation', value)}
                  >
                    <SelectTrigger className="border-unipas-primary/30 focus:border-unipas-primary">
                      <SelectValue placeholder="Pilih Akreditasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="Unggul">Unggul</SelectItem>
                      <SelectItem value="Baik Sekali">Baik Sekali</SelectItem>
                      <SelectItem value="Baik">Baik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quota" className="text-unipas-primary font-medium">Kuota</Label>
                  <Input
                    id="quota"
                    type="number"
                    placeholder="Contoh: 60"
                    {...register('quota', { valueAsNumber: true })}
                    className="border-unipas-primary/30 focus:border-unipas-primary"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-unipas-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-unipas-accent rounded-full"></span>
                Informasi Tambahan
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-unipas-primary font-medium">Deskripsi</Label>
                  <Textarea
                    id="description"
                    placeholder="Deskripsi lengkap tentang departemen"
                    {...register('description')}
                    className="border-unipas-primary/30 focus:border-unipas-primary"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-unipas-primary font-medium">Gambar Departemen</Label>
                  <FileUpload
                    value={watch('imageUrl') || ''}
                    onChange={(url) => setValue('imageUrl', url)}
                    accept="image/*"
                    maxSize={5}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-6 border-t border-unipas-primary/20">
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
                disabled={isSubmitting}
                className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

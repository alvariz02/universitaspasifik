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

const staffSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  slug: z.string().min(1, 'Slug wajib diisi'),
  position: z.string().optional(),
  role: z.string().optional(),
  email: z.string().email('Format email tidak valid').optional().or(z.literal('')),
  phone: z.string().optional(),
  photoUrl: z.string().optional(),
  bio: z.string().optional(),
  researchInterest: z.string().optional(),
  googleScholarUrl: z.string().optional(),
  facultyId: z.union([z.coerce.number(), z.literal('')]).optional().catch(undefined),
  departmentId: z.union([z.coerce.number(), z.literal('')]).optional().catch(undefined),
  isActive: z.boolean(),
})

// Cross-field validation: enforce faculty/department when role requires it
const staffSchemaValidated = staffSchema.superRefine((data, ctx) => {
  const role = data.role
  const facultyId = data.facultyId
  const departmentId = data.departmentId

  if (role === 'dean') {
    if (facultyId === undefined || facultyId === '' || facultyId === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Dekan harus dipilihkan fakultas', path: ['facultyId'] })
    }
  }

  if (role === 'department_head') {
    if (departmentId === undefined || departmentId === '' || departmentId === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Kepala Departemen harus dipilihkan departemen', path: ['departmentId'] })
    }
  }

  if (role === 'kaprodi') {
    if (departmentId === undefined || departmentId === '' || departmentId === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Kaprodi harus dipilihkan departemen/jurusan', path: ['departmentId'] })
    }
  }
})

type StaffFormData = z.infer<typeof staffSchema>

interface StaffFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
  initialData?: any
  faculties?: any[]
  departments?: any[]
}

export default function StaffForm({ 
  open, 
  onClose, 
  onSubmit, 
  initialData,
  faculties = [],
  departments = [],
}: StaffFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFacultyId, setSelectedFacultyId] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(staffSchemaValidated),
    defaultValues: initialData || {
      name: '',
      slug: '',
      position: '',
      role: '',
      email: '',
      phone: '',
      photoUrl: '',
      bio: '',
      researchInterest: '',
      googleScholarUrl: '',
      facultyId: undefined,
      departmentId: undefined,
      isActive: true,
    },
  })

  // When editing, reset form values to initialData so fields (including Selects) show current values
  useEffect(() => {
    if (initialData) {
      const values: any = {
        name: initialData.name ?? '',
        slug: initialData.slug ?? '',
        position: initialData.position ?? '',
        role: initialData.role ?? '',
        email: initialData.email ?? '',
        phone: initialData.phone ?? '',
        photoUrl: initialData.photoUrl ?? '',
        bio: initialData.bio ?? '',
        researchInterest: initialData.researchInterest ?? '',
        googleScholarUrl: initialData.googleScholarUrl ?? '',
        facultyId: initialData.facultyId ?? undefined,
        departmentId: initialData.departmentId ?? undefined,
        isActive: initialData.isActive ?? true,
      }

      reset(values)
      setSelectedFacultyId(initialData.facultyId ?? null)
    }
  }, [initialData, reset])

  const facultyIdValue = watch('facultyId')

  useEffect(() => {
    if (facultyIdValue) {
      setSelectedFacultyId(Number(facultyIdValue))
    }
  }, [facultyIdValue])

  const filteredDepartments = selectedFacultyId 
    ? departments.filter(d => d.facultyId === selectedFacultyId)
    : []

  const onFormSubmit: SubmitHandler<any> = async (data: any) => {
    setIsSubmitting(true)
    try {
      // normalize payload: remove empty strings and ensure numeric ids
      const payload: any = { ...data }
      if (payload.facultyId === '' || payload.facultyId === undefined || payload.facultyId === null) delete payload.facultyId
      if (payload.departmentId === '' || payload.departmentId === undefined || payload.departmentId === null) delete payload.departmentId
      if (payload.facultyId) payload.facultyId = Number(payload.facultyId)
      if (payload.departmentId) payload.departmentId = Number(payload.departmentId)

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
            {initialData ? 'Edit Staff' : 'Tambah Staff Baru'}
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
                  <Label htmlFor="name" className="text-unipas-primary font-medium">Nama *</Label>
                  <Input
                    id="name"
                    placeholder="Nama lengkap"
                    {...register('name')}
                    className="border-unipas-primary/30 focus:border-unipas-primary"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{typeof errors.name.message === 'string' ? errors.name.message : 'Terjadi kesalahan'}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-unipas-primary font-medium">Slug *</Label>
                  <Input
                    id="slug"
                    placeholder="nama-slug"
                    {...register('slug')}
                    className="border-unipas-primary/30 focus:border-unipas-primary"
                  />
                  {errors.slug && <p className="text-red-500 text-sm">{typeof errors.slug.message === 'string' ? errors.slug.message : 'Terjadi kesalahan'}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="text-unipas-primary font-medium">Jabatan</Label>
                  <Input
                    id="position"
                    placeholder="Contoh: Dekan, Kaprodi, Dosen, Staf Administrasi"
                    {...register('position')}
                    className="border-unipas-primary/30 focus:border-unipas-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-unipas-primary font-medium">Role</Label>
                  <Select defaultValue={initialData?.role || ''} onValueChange={(value) => setValue('role', value)}>
                    <SelectTrigger className="border-unipas-primary/30 focus:border-unipas-primary">
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dean">Dekan</SelectItem>
                      <SelectItem value="department_head">Kepala Departemen</SelectItem>
                      <SelectItem value="kaprodi">Kaprodi (Ketua Program Studi)</SelectItem>
                      <SelectItem value="lecturer">Dosen</SelectItem>
                      <SelectItem value="staff">Staf</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-unipas-primary font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    {...register('email')}
                    className="border-unipas-primary/30 focus:border-unipas-primary"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{typeof errors.email.message === 'string' ? errors.email.message : 'Terjadi kesalahan'}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-unipas-primary font-medium">Telepon</Label>
                  <Input
                    id="phone"
                    placeholder="08123456789"
                    {...register('phone')}
                    className="border-unipas-primary/30 focus:border-unipas-primary"
                  />
                </div>
              </div>
            </div>

            {/* Organization */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-unipas-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-unipas-accent rounded-full"></span>
                Organisasi
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facultyId" className="text-unipas-primary font-medium">Fakultas</Label>
                  <Select 
                    defaultValue={initialData?.facultyId?.toString() || undefined} 
                    onValueChange={(value) => {
                      setValue('facultyId', value ? Number(value) : undefined)
                      setValue('departmentId', undefined)
                    }}
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="departmentId" className="text-unipas-primary font-medium">Departemen/Program Studi</Label>
                  <Select 
                    defaultValue={initialData?.departmentId?.toString() || undefined} 
                    onValueChange={(value) => setValue('departmentId', value ? Number(value) : undefined)}
                  >
                    <SelectTrigger 
                      className="border-unipas-primary/30 focus:border-unipas-primary"
                      disabled={!selectedFacultyId}
                    >
                      <SelectValue placeholder={selectedFacultyId ? "Pilih Departemen/Program Studi" : "Pilih Fakultas terlebih dahulu"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredDepartments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Label className="text-unipas-primary font-medium">Foto Profil</Label>
                  <FileUpload
                    value={watch('photoUrl') || ''}
                    onChange={(url) => setValue('photoUrl', url)}
                    accept="image/*"
                    maxSize={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-unipas-primary font-medium">Biografi</Label>
                  <Textarea
                    id="bio"
                    placeholder="Ringkasan biografi"
                    {...register('bio')}
                    className="border-unipas-primary/30 focus:border-unipas-primary"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="researchInterest" className="text-unipas-primary font-medium">Bidang Penelitian</Label>
                  <Textarea
                    id="researchInterest"
                    placeholder="Bidang penelitian yang diminati"
                    {...register('researchInterest')}
                    className="border-unipas-primary/30 focus:border-unipas-primary"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="googleScholarUrl" className="text-unipas-primary font-medium">Google Scholar URL</Label>
                  <Input
                    id="googleScholarUrl"
                    placeholder="https://scholar.google.com/..."
                    {...register('googleScholarUrl')}
                    className="border-unipas-primary/30 focus:border-unipas-primary"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                defaultChecked={initialData?.isActive !== false}
                onCheckedChange={(checked) => setValue('isActive', checked as boolean)}
              />
              <Label htmlFor="isActive" className="text-unipas-primary font-medium cursor-pointer">
                Aktif
              </Label>
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

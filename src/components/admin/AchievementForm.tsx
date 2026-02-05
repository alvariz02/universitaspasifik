'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import FileUpload from './FileUpload'

const achievementSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  description: z.string().optional(),
  achieverName: z.string().optional(),
  achieverType: z.string().optional(),
  achievementDate: z.string().optional(),
  category: z.string().optional(),
  level: z.string().optional(),
  imageUrl: z.string().optional(),
})

type AchievementFormData = z.infer<typeof achievementSchema>

interface AchievementFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: AchievementFormData) => Promise<void>
  initialData?: any
}

export default function AchievementForm({ open, onClose, onSubmit, initialData }: AchievementFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AchievementFormData>({
    resolver: zodResolver(achievementSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      achieverName: '',
      achieverType: '',
      achievementDate: '',
      category: '',
      level: '',
      imageUrl: '',
    },
  })

  const onFormSubmit = async (data: AchievementFormData) => {
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
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Judul Prestasi *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Masukkan judul prestasi"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Deskripsi prestasi"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="achieverName">Nama Pencapai</Label>
              <Input
                id="achieverName"
                {...register('achieverName')}
                placeholder="Nama mahasiswa/dosen/alumni"
              />
            </div>

            <div>
              <Label htmlFor="achieverType">Tipe Pencapai</Label>
              <Select onValueChange={(value) => register('achieverType').onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                  <SelectItem value="dosen">Dosen</SelectItem>
                  <SelectItem value="alumni">Alumni</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="achievementDate">Tanggal Pencapaian</Label>
              <Input
                id="achievementDate"
                type="date"
                {...register('achievementDate')}
              />
            </div>

            <div>
              <FileUpload
                value={watch('imageUrl') || ''}
                onChange={(url) => setValue('imageUrl', url)}
                accept="image/*"
                maxSize={5}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Kategori</Label>
              <Select 
                value={watch('category') || ''} 
                onValueChange={(value) => setValue('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="akademik">Akademik</SelectItem>
                  <SelectItem value="olahraga">Olahraga</SelectItem>
                  <SelectItem value="seni">Seni</SelectItem>
                  <SelectItem value="penelitian">Penelitian</SelectItem>
                  <SelectItem value="umum">Umum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="level">Level</Label>
              <Select 
                value={watch('level') || ''} 
                onValueChange={(value) => setValue('level', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internasional">Internasional</SelectItem>
                  <SelectItem value="nasional">Nasional</SelectItem>
                  <SelectItem value="regional">Regional</SelectItem>
                  <SelectItem value="lokal">Lokal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
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
              className="bg-ui-navy text-white hover:bg-ui-navy/80"
              disabled={isSubmitting}
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

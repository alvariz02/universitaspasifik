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
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import FileUpload from './FileUpload'

const heroSliderSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  imageUrl: z.string().min(1, 'URL gambar wajib diisi'),
  linkUrl: z.string().optional(),
  linkText: z.string().optional(),
  orderPosition: z.number(),
  isActive: z.boolean(),
})

type HeroSliderFormData = z.infer<typeof heroSliderSchema>

interface HeroSliderFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: HeroSliderFormData) => Promise<void>
  initialData?: any
}

export default function HeroSliderForm({ open, onClose, onSubmit, initialData }: HeroSliderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HeroSliderFormData>({
    resolver: zodResolver(heroSliderSchema),
    defaultValues: initialData || {
      title: '',
      subtitle: '',
      imageUrl: '',
      linkUrl: '',
      linkText: '',
      orderPosition: 0,
      isActive: true,
    },
  })

  const onFormSubmit = async (data: HeroSliderFormData) => {
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
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col gap-0 p-0">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle>
            {initialData ? 'Edit Hero Slider' : 'Tambah Hero Slider Baru'}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 overflow-hidden">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Judul utama"
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Sub Judul</Label>
                <Input
                  id="subtitle"
                  {...register('subtitle')}
                  placeholder="Sub judul atau deskripsi singkat"
                />
              </div>
            </div>

            <div>
              <FileUpload
                value={watch('imageUrl') || ''}
                onChange={(url) => setValue('imageUrl', url)}
                accept="image/*"
                maxSize={5}
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkUrl">URL Link</Label>
                <Input
                  id="linkUrl"
                  {...register('linkUrl')}
                  placeholder="/page-path"
                />
              </div>

              <div>
                <Label htmlFor="linkText">Teks Tombol</Label>
                <Input
                  id="linkText"
                  {...register('linkText')}
                  placeholder="Selengkapnya"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="orderPosition">Urutan</Label>
              <Input
                id="orderPosition"
                type="number"
                {...register('orderPosition')}
                placeholder="0"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                {...register('isActive')}
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Slider aktif
              </Label>
            </div>
            
            <div className="h-4"></div>
          </form>
        </ScrollArea>

        <div className="flex justify-end gap-2 px-6 py-4 border-t shrink-0">
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
            onClick={handleSubmit(onFormSubmit)}
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

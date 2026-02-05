'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { User, Mail, Phone, GraduationCap, Send, Loader2 } from 'lucide-react'

interface AdmissionFormData {
  fullName: string
  email: string
  phone: string
  admissionPath: string
  highSchool: string
  major: string
  gpa: string
  address: string
  motivation: string
}

export default function AdmissionForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<AdmissionFormData>({
    fullName: '',
    email: '',
    phone: '',
    admissionPath: '',
    highSchool: '',
    major: '',
    gpa: '',
    address: '',
    motivation: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Pendaftaran Berhasil",
        description: "Terima kasih! Formulir pendaftaran Anda telah kami terima. Kami akan menghubungi Anda segera.",
        variant: "default",
      })

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        admissionPath: '',
        highSchool: '',
        major: '',
        gpa: '',
        address: '',
        motivation: ''
      })
    } catch (error) {
      toast({
        title: "Pendaftaran Gagal",
        description: "Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-unipas-primary" />
          Formulir Pendaftaran
        </CardTitle>
        <CardDescription>
          Isi formulir berikut untuk mendaftar sebagai mahasiswa baru Universitas Pasifik
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-unipas-primary">Informasi Pribadi</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@contoh.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0812-3456-7890"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admissionPath">Jalur Pendaftaran</Label>
                <Select value={formData.admissionPath} onValueChange={(value) => handleSelectChange('admissionPath', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jalur pendaftaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="snbp">SNBP</SelectItem>
                    <SelectItem value="snbt">SNBT</SelectItem>
                    <SelectItem value="simak">SIMAK UP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-unipas-primary">Informasi Akademik</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="highSchool">Asal Sekolah</Label>
                <Input
                  id="highSchool"
                  name="highSchool"
                  value={formData.highSchool}
                  onChange={handleInputChange}
                  placeholder="Nama SMA/SMK/MA"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="major">Jurusan yang Dipilih</Label>
                <Input
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  placeholder="Contoh: Teknik Informatika"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpa">Nilai Rata-rata</Label>
              <Input
                id="gpa"
                name="gpa"
                value={formData.gpa}
                onChange={handleInputChange}
                placeholder="Contoh: 85.5"
                required
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-unipas-primary">Informasi Tambahan</h3>
            
            <div className="space-y-2">
              <Label htmlFor="address">Alamat Lengkap</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Masukkan alamat lengkap"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Alasan Memilih Universitas Pasifik</Label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                placeholder="Jelaskan mengapa Anda ingin bergabung dengan Universitas Pasifik..."
                rows={4}
                className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-unipas-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-unipas-primary text-white hover:bg-unipas-primary/90 font-semibold gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Mengirim Formulir...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Kirim Pendaftaran
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

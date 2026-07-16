'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function KontakPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Gagal mengirim pesan')
      }

      toast({
        title: "Pesan Terkirim",
        description: "Terima kasih! Pesan Anda telah kami terima dan akan segera kami proses.",
        variant: "default",
      })

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Contact form error:', error)
      toast({
        title: "Gagal Mengirim",
        description: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-ui-navy py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-ui-yellow/10 rounded-lg w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Mail className="h-10 w-10 text-ui-yellow" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Hubungi Kami
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ada pertanyaan? Jangan ragu untuk menghubungi kami. Kami siap membantu Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                  <h2 className="text-2xl font-bold text-ui-navy mb-6">
                    Kirim Pesan
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-ui-navy mb-2">
                          Nama Lengkap
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama lengkap"
                          className="h-12"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ui-navy mb-2">
                          Email
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="email@contoh.com"
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ui-navy mb-2">
                        Subjek
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Subjek pesan Anda"
                        className="h-12"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ui-navy mb-2">
                        Pesan
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tulis pesan Anda di sini..."
                        rows={6}
                        className="resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-ui-yellow text-ui-navy hover:bg-yellow-400 font-semibold gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-ui-navy border-t-transparent" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Kirim Pesan
                        </>
                      )}
                    </Button>
                  </form>
                </div>

                {/* Contact Info */}
                <div>
                  <h2 className="text-2xl font-bold text-ui-navy mb-6">
                    Informasi Kontak
                  </h2>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-ui-yellow/10 rounded-lg p-3 shrink-0">
                        <Mail className="h-6 w-6 text-ui-yellow" />
                      </div>
                      <div>
                        <h3 className="font-bold text-ui-navy mb-1">Email</h3>
                        <a href="mailto:humas@unipas.ac.id" className="text-muted-foreground hover:text-ui-navy">
                          unipasmorotai@univpasifik.ac.id
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-ui-yellow/10 rounded-lg p-3 shrink-0">
                        <Phone className="h-6 w-6 text-ui-yellow" />
                      </div>
                      <div>
                        <h3 className="font-bold text-ui-navy mb-1">Telepon</h3>
                        <a href="tel:+62217863423" className="text-muted-foreground hover:text-ui-navy">
                          (021) 7863423
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-ui-yellow/10 rounded-lg p-3 shrink-0">
                        <MapPin className="h-6 w-6 text-ui-yellow" />
                      </div>
                      <div>
                        <h3 className="font-bold text-ui-navy mb-1">Kampus Depok</h3>
                        <p className="text-muted-foreground">
                         Kampus Morotai

Jln. A. Sudirman, Lemonade, Daruba, Morotai Selatan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-ui-navy mb-6 text-center">
                Lokasi Kampus
              </h2>
              <div className="bg-white rounded-lg shadow-lg border-2 h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Sedang dalam pengembangan. Peta lokasi kampus akan segera tersedia di sini.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Kampus Morotai

Jln. A. Sudirman, Lemonade, Daruba, Morotai Selatan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ChevronLeft, ChevronRight, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface Admission {
  id: number
  title: string
  slug: string
  image1Url: string | null
  image2Url: string | null
  image3Url: string | null
  displayStart: string
  displayEnd: string
  isActive: boolean
}

interface AdmissionDetailClientProps {
  admission: Admission
}

export default function AdmissionDetailClient({ admission }: AdmissionDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    admission.image1Url,
    admission.image2Url,
    admission.image3Url,
  ].filter(Boolean) as string[]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <main className="flex-1">
      {/* Back Button */}
      <div className="bg-unipas-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/penerimaan"
            className="inline-flex items-center gap-2 text-unipas-primary hover:text-unipas-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Penerimaan
          </Link>
        </div>
      </div>

      {/* Hero Section with Image Slider */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Image Gallery with Slider */}
          {images.length > 0 ? (
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${admission.title} - ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Status Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Dibuka
                </span>
              </div>

              {/* Image Navigation (if multiple images) */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-unipas-primary p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-unipas-primary p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  {/* Image Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Gradient Overlay at Bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          ) : (
            <div className="aspect-[21/9] rounded-3xl bg-unipas-muted flex items-center justify-center mb-8">
              <span className="text-unipas-primary/50 text-xl">Tidak ada gambar</span>
            </div>
          )}

          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-unipas-primary mb-4">
              {admission.title}
            </h1>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-unipas-muted rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-unipas-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-unipas-primary" />
              </div>
              <div>
                <p className="text-sm text-unipas-text">Mulai Tayang</p>
                <p className="text-lg font-semibold text-unipas-primary">
                  {formatDate(admission.displayStart)}
                </p>
              </div>
            </div>

            <div className="bg-unipas-muted rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-unipas-accent/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-unipas-accent" />
              </div>
              <div>
                <p className="text-sm text-unipas-text">Selesai Tayang</p>
                <p className="text-lg font-semibold text-unipas-primary">
                  {formatDate(admission.displayEnd)}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white px-8 py-6 rounded-full text-lg font-semibold hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Daftar Sekarang
            </Button>
            <Link href="/penerimaan">
              <Button 
                variant="outline"
                className="px-8 py-6 rounded-full text-lg font-semibold border-unipas-primary text-unipas-primary hover:bg-unipas-primary hover:text-white"
              >
                Lihat Jalur Lainnya
              </Button>
            </Link>
          </div>

          {/* Share Buttons */}
          <div className="text-center pt-8 border-t">
            <p className="text-sm text-unipas-text mb-3 flex items-center justify-center gap-2">
              <Share2 className="h-4 w-4" />
              Bagikan penerimaan ini:
            </p>
            <div className="flex justify-center gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.univpasifik.ac.id/penerimaan/${admission.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(admission.title)}&url=${encodeURIComponent(`https://www.univpasifik.ac.id/penerimaan/${admission.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                title="Share on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${admission.title} https://www.univpasifik.ac.id/penerimaan/${admission.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                title="Share on WhatsApp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                </svg>
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://www.univpasifik.ac.id/penerimaan/${admission.slug}`)
                  alert('Link berhasil disalin!')
                }}
                className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                title="Copy Link"
              >
                <LinkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Images Gallery */}
      {images.length > 1 && (
        <section className="bg-unipas-muted py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-unipas-primary mb-6 text-center">
              Dokumentasi Penerimaan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative aspect-video rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all hover:scale-105 ${
                    idx === currentImageIndex ? 'ring-4 ring-unipas-primary' : ''
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${admission.title} - ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-unipas-primary mb-4">
            Informasi Penerimaan
          </h2>
          <p className="text-unipas-text leading-relaxed">
            Untuk informasi lebih lanjut mengenai penerimaan mahasiswa baru, 
            silakan menghubungi bagian penerimaan mahasiswa baru Universitas Pasifik 
            atau kunjungi kampus kami langsung.
          </p>
          
          <div className="mt-8 p-6 bg-unipas-muted rounded-2xl">
            <p className="text-sm text-unipas-text mb-2">Status Pendaftaran</p>
            <div className="flex items-center justify-center gap-2">
              <span className={`w-3 h-3 rounded-full ${admission.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-semibold text-unipas-primary">
                {admission.isActive ? 'Pendaftaran Dibuka' : 'Pendaftaran Ditutup'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

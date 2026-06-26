'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ChevronLeft, Calendar, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react'

interface Admission {
  id: number
  title: string
  slug: string
  image1Url?: string
  image2Url?: string
  image3Url?: string
  displayStart: string
  displayEnd: string
  isActive: boolean
}

interface AdmissionsSectionProps {
  admissions: Admission[]
}

export default function AdmissionsSection({ admissions }: AdmissionsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!admissions || admissions.length === 0) {
    return null
  }

  const currentAdmission = admissions[currentIndex]

  const images = [
    currentAdmission.image1Url,
    currentAdmission.image2Url,
    currentAdmission.image3Url,
  ].filter(Boolean) as string[]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % admissions.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + admissions.length) % admissions.length)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <section className="py-20 bg-unipas-muted relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-unipas-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-unipas-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-unipas-primary mb-4">
            Penerimaan Mahasiswa Baru
          </h2>
          <p className="text-lg text-unipas-text max-w-2xl mx-auto">
            Daftar sekarang dan jadi bagian dari keluarga besar Universitas Pasifik
          </p>
          <div className="mt-4 w-24 h-1 bg-linear-to-r from-unipas-primary to-unipas-accent mx-auto rounded-full" />
        </motion.div>

        {/* Hero Slider Style */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAdmission.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-unipas-primary/10"
            >
              {/* Large Image - Hero Style */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] bg-unipas-muted overflow-hidden">
                {images.length > 0 ? (
                  <Image
                    src={images[0]}
                    alt={currentAdmission.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-unipas-primary/10">
                    <span className="text-unipas-primary/50 text-xl">No Image</span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-6 left-6">
<span className="bg-green-800 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Dibuka
                  </span>
                </div>

                {/* Image Navigation Dots */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Slide ${idx + 1}`}
                        className={`w-3 h-3 rounded-full transition-all ${
                          idx === 0 ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Title Below Image */}
              <div className="p-8 md:p-12 text-center">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-4xl font-bold text-unipas-primary mb-4"
                >
                  {currentAdmission.title}
                </motion.h3>

                {/* Display Period */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-2 text-unipas-text mb-8"
                >
                  <Calendar className="h-5 w-5" />
                  <span className="text-lg">
                    {formatDate(currentAdmission.displayStart)} - {formatDate(currentAdmission.displayEnd)}
                  </span>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href={`/penerimaan/${currentAdmission.slug}`}
                    className="inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-unipas-primary to-unipas-accent text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    Lihat Detail
                    <ChevronRight className="h-6 w-6" />
                  </Link>
                </motion.div>

                {/* Share Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <p className="text-sm text-unipas-text mb-3 flex items-center justify-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Bagikan:
                  </p>
                  <div className="flex justify-center gap-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.univpasifik.ac.id/penerimaan/${currentAdmission.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                      title="Share on Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentAdmission.title)}&url=${encodeURIComponent(`https://www.univpasifik.ac.id/penerimaan/${currentAdmission.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                      title="Share on Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${currentAdmission.title} https://www.univpasifik.ac.id/penerimaan/${currentAdmission.slug}`)}`}
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
                        navigator.clipboard.writeText(`https://www.univpasifik.ac.id/penerimaan/${currentAdmission.slug}`)
                        alert('Link berhasil disalin!')
                      }}
                      className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                      title="Copy Link"
                    >
                      <LinkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {admissions.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/3 -translate-y-1/2 bg-white/90 hover:bg-white text-unipas-primary p-4 rounded-full shadow-lg transition-all hover:scale-110 z-10"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/3 -translate-y-1/2 bg-white/90 hover:bg-white text-unipas-primary p-4 rounded-full shadow-lg transition-all hover:scale-110 z-10"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}
        </div>

        {/* Admission Thumbnails */}
        {admissions.length > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            {admissions.map((admission, index) => (
              <button
                key={admission.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all ${
                  index === currentIndex
                    ? 'ring-4 ring-unipas-primary scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {admission.image1Url ? (
                  <Image
                    src={admission.image1Url}
                    alt={admission.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-unipas-primary/20 flex items-center justify-center text-xs text-unipas-primary">
                    {index + 1}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/penerimaan"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-unipas-primary rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-unipas-primary/20"
          >
            Lihat Semua Jalur Penerimaan
            <ChevronRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

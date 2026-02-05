'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface HeroSlide {
  id: number
  title?: string
  subtitle?: string
  imageUrl: string
  linkUrl?: string
  linkText?: string
}

interface HeroSliderProps {
  slides: HeroSlide[]
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, slides.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[300px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Tidak ada slide tersedia</p>
      </div>
    )
  }

  const currentSlide = slides[currentIndex]

  return (
      <div
        className="relative w-full h-[300px] md:h-[400px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <div className="relative w-full h-full">
          <img
            src={currentSlide.imageUrl}
            alt={currentSlide.title || 'Hero Slide'}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay untuk membuat text lebih jelas */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
        </div>
      </motion.div>

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-2xl"
          >
            {currentSlide.title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                {currentSlide.title}
              </h1>
            )}
            {currentSlide.subtitle && (
              <p className="text-lg md:text-xl mb-8 text-white/90 drop-shadow-md">
                {currentSlide.subtitle}
              </p>
            )}
            {currentSlide.linkUrl && currentSlide.linkText && (
              <Link href={currentSlide.linkUrl}>
                <Button
                  size="lg"
                  className="bg-unipas-accent text-white hover:bg-unipas-primary font-bold px-8 py-6 text-lg shadow-lg"
                >
                  {currentSlide.linkText}
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white h-12 w-12 rounded-full"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white h-12 w-12 rounded-full"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-white'
                : 'w-3 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

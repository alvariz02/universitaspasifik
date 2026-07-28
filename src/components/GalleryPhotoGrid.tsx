'use client'

import { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Image as ImageIcon } from 'lucide-react'

interface GalleryPhotoItem {
  id: string
  title: string
  imageUrl: string
  source: string
  href: string
}

interface GalleryPhotoGridProps {
  items: GalleryPhotoItem[]
}

export default function GalleryPhotoGrid({ items }: GalleryPhotoGridProps) {
  const { scrollY } = useScroll()
  const yLarge = useTransform(scrollY, [0, 700], [0, -120])
  const ySmall = useTransform(scrollY, [0, 700], [0, -80])

  const galleryItems = useMemo(
    () => items.filter((item) => item.imageUrl),
    [items]
  )

  return (
    <section className="relative overflow-hidden py-16">
      <motion.div
        style={{ y: yLarge }}
        className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-unipas-primary/20 blur-3xl"
      />
      <motion.div
        style={{ y: ySmall }}
        className="pointer-events-none absolute -left-24 top-24 h-60 w-60 rounded-full bg-unipas-accent/20 blur-3xl"
      />
      <div className="relative container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {galleryItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              whileHover={{ y: -10 }}
              className="group relative block overflow-hidden rounded-4xl border border-slate-200 bg-slate-100 shadow-lg shadow-slate-200/70 transition-transform duration-300"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/90 to-transparent px-4 py-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/90 backdrop-blur-sm">
                    <ImageIcon className="h-3.5 w-3.5" />
                    <span>{item.source}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

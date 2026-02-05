'use client'

import { Building2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import FacultyCard from '@/components/cards/FacultyCard'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface Faculty {
  id: number
  name: string
  slug: string
  description?: string
  deanName?: string
  location?: string
  establishedYear?: number
  imageUrl?: string
}

interface FacultiesGridProps {
  faculties: Faculty[]
}

export default function FacultiesGrid({ faculties }: FacultiesGridProps) {
  const featuredFaculties = faculties.slice(0, 6)

  return (
    <section className="py-16 bg-unipas-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-unipas-primary mb-2">
              Fakultas Unipas
            </h2>
            <p className="text-muted-foreground">
              14 fakultas dengan program studi berkualitas
            </p>
          </div>
          <Link href="/fakultas" className="hidden md:flex items-center gap-2 text-unipas-accent hover:text-unipas-primary font-medium">
            Lihat Semua Fakultas
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredFaculties.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-linear-to-br from-white via-unipas-secondary/50 to-unipas-muted rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-unipas-accent/20"
            >
              <FacultyCard
                {...faculty}
              />
            </motion.div>
          ))}
        </div>

        {featuredFaculties.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Belum ada fakultas yang ditampilkan</p>
          </div>
        )}

        <div className="text-center mt-8 md:hidden">
          <Link href="/fakultas">
            <Button className="bg-ui-navy text-white hover:bg-ui-navy/80">
              Lihat Semua Fakultas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  FileText,
  Eye,
  Download,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  User,
  Building
} from 'lucide-react'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'

/* =======================
   TYPES
======================= */

interface Journal {
  id: number
  title: string
  slug: string
  abstract?: string
  authors: string
  authorAffiliation?: string
  keywords?: string
  category?: string
  subject?: string
  language: string
  pages?: string
  volume?: string
  issue?: string
  year?: number
  publishedDate?: string
  doi?: string
  issn?: string
  pdfUrl?: string
  pdfSize?: number
  downloadCount: number
  viewCount: number
  isOpenAccess: boolean
  isPeerReviewed: boolean
  isFeatured: boolean
  faculty?: {
    id: number
    name: string
    slug: string
  }
  createdAt: string
}

interface Faculty {
  id: number
  name: string
  slug: string
}

interface JournalGalleryProps {
  journals: Journal[]
  faculties: Faculty[]
}

/* =======================
   MAIN COMPONENT
======================= */

export default function JournalGallery({
  journals: initialJournals,
  faculties
}: JournalGalleryProps) {
  const [journals, setJournals] = useState<Journal[]>(initialJournals)
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFaculty, setSelectedFaculty] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  /* =======================
     FILTER OPTIONS
  ======================= */

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'sains', label: 'Sains & Teknologi' },
    { value: 'sosial', label: 'Ilmu Sosial' },
    { value: 'ekonomi', label: 'Ekonomi & Bisnis' },
    { value: 'pendidikan', label: 'Pendidikan' },
    { value: 'kesehatan', label: 'Kesehatan' },
    { value: 'teknik', label: 'Teknik & Rekayasa' },
    { value: 'perikanan', label: 'Perikanan & Kelautan' },
    { value: 'pertanian', label: 'Pertanian' },
    { value: 'hukum', label: 'Hukum' },
    { value: 'lainnya', label: 'Lainnya' }
  ]

  const years = Array.from(
    new Set(
      journals
        .map(j => j.year)
        .filter((y): y is number => y !== null && y !== undefined)
    )
  ).sort((a, b) => b - a)

  /* =======================
     MEMOIZED FILTER
     (FIX TURBOPACK)
  ======================= */

  const __UNIQUE_JOURNALS_FILTERED__ = useMemo(() => {
    let filtered = journals

    if (searchTerm) {
      filtered = filtered.filter(journal =>
        journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.abstract?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.authors.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedFaculty !== 'all') {
      filtered = filtered.filter(journal =>
        journal.faculty?.id.toString() === selectedFaculty
      )
    }

    if (selectedYear !== 'all') {
      filtered = filtered.filter(journal =>
        journal.year?.toString() === selectedYear
      )
    }

    if (showFeaturedOnly) {
      filtered = filtered.filter(journal => journal.isFeatured)
      filtered = filtered.filter(j => j.isFeatured)
    }

    return filtered
  }, [
    journals,
    searchTerm,
    selectedCategory,
    selectedFaculty,
    selectedYear,
    showFeaturedOnly
  ])

  const featuredJournals = useMemo(
    () => __UNIQUE_JOURNALS_FILTERED__.filter(j => j.isFeatured),
    [__UNIQUE_JOURNALS_FILTERED__]
  )

  const regularJournals = useMemo(
    () => __UNIQUE_JOURNALS_FILTERED__.filter(j => !j.isFeatured),
    [__UNIQUE_JOURNALS_FILTERED__]
  )

  /* =======================
     HANDLERS
  ======================= */

  const handleJournalClick = (journal: Journal) => {
    setSelectedJournal(journal)

    fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/journals/${journal.id}`)
      .then(res => {
        if (res.ok) {
          setJournals(prev =>
            prev.map(j =>
              j.id === journal.id
                ? { ...j, viewCount: j.viewCount + 1 }
                : j
            )
          )
        }
      })
      .catch(() => {})
  }

  const handleDownload = (journal: Journal) => {
    if (!journal.pdfUrl) return

    setJournals(prev =>
      prev.map(j =>
        j.id === journal.id
          ? { ...j, downloadCount: j.downloadCount + 1 }
          : j
      )
    )

    window.open(journal.pdfUrl, '_blank')
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ''
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`
  }

  /* =======================
     RENDER
  ======================= */

  return (
    <div className="space-y-8">
      {/* FILTER */}
      <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari jurnal, penulis, atau kata kunci..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(c => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
            <SelectTrigger>
              <SelectValue placeholder="Fakultas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Fakultas</SelectItem>
              {faculties.map(f => (
                <SelectItem key={f.id} value={f.id.toString()}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tahun</SelectItem>
              {years.map(y => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant={showFeaturedOnly ? 'default' : 'outline'}
            onClick={() => setShowFeaturedOnly(v => !v)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Unggulan
          </Button>
        </div>
      </div>

      {/* FEATURED */}
      {featuredJournals.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Jurnal Unggulan</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredJournals.map(j => (
              <JournalCard
                key={j.id}
                journal={j}
                featured
                onClick={() => handleJournalClick(j)}
                onDownload={() => handleDownload(j)}
              />
            ))}
          </div>
        </section>
      )}

      {/* REGULAR */}
      {regularJournals.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {featuredJournals.length ? 'Jurnal Lainnya' : 'Semua Jurnal'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularJournals.map(j => (
              <JournalCard
                key={j.id}
                journal={j}
                onClick={() => handleJournalClick(j)}
                onDownload={() => handleDownload(j)}
              />
            ))}
          </div>
        </section>
      )}

      {/* EMPTY */}
      {__UNIQUE_JOURNALS_FILTERED__.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4" />
          Tidak ada jurnal ditemukan
        </div>
      )}

      {/* MODAL */}
      <Dialog open={!!selectedJournal} onOpenChange={() => setSelectedJournal(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedJournal && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedJournal.title}</DialogTitle>
              </DialogHeader>

              {selectedJournal.abstract && (
                <p className="text-gray-700">{selectedJournal.abstract}</p>
              )}

              {selectedJournal.pdfUrl && (
                <Button
                  onClick={() => handleDownload(selectedJournal)}
                  className="mt-4"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF {formatFileSize(selectedJournal.pdfSize)}
                </Button>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* =======================
   CARD COMPONENT
======================= */

interface JournalCardProps {
  journal: Journal
  onClick: () => void
  onDownload: () => void
  featured?: boolean
}

function JournalCard({
  journal,
  onClick,
  onDownload,
  featured = false
}: JournalCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:scale-105 transition ${
        featured ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <h3 className="font-bold mb-2 line-clamp-2">{journal.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{journal.authors}</p>

      <div className="flex justify-between text-sm text-gray-500">
        <span>{journal.year}</span>
        <Button
          size="sm"
          variant="outline"
          onClick={e => {
            e.stopPropagation()
            onDownload()
          }}
        >
          <Download className="w-3 h-3 mr-1" /> PDF
        </Button>
      </div>
    </div>
  )
}

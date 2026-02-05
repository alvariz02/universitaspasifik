'use client'

import { useState, useEffect, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FileText, Eye, Download, Search, Filter, ExternalLink, Calendar, User, Building } from 'lucide-react'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'

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

export default function JournalGallery({ journals: initialJournals, faculties }: JournalGalleryProps) {
  const [journals, setJournals] = useState<Journal[]>(initialJournals)
  const [filteredJournals, setFilteredJournals] = useState<Journal[]>(initialJournals)
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFaculty, setSelectedFaculty] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  // Get unique years from journals
  const years = Array.from(new Set(journals.map(j => j.year).filter((year): year is number => year !== null && year !== undefined)))
    .sort((a, b) => b - a)

  const filteredJournals = useMemo(() => {
    let filtered = journals

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(journal =>
        journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.keywords?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.abstract?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(journal => journal.category === selectedCategory)
    }

    // Filter by faculty
    if (selectedFaculty !== 'all') {
      filtered = filtered.filter(journal => journal.faculty?.id.toString() === selectedFaculty)
    }

    // Filter by year
    if (selectedYear !== 'all') {
      filtered = filtered.filter(journal => journal.year?.toString() === selectedYear)
    }

    // Filter by featured
    if (showFeaturedOnly) {
      filtered = filtered.filter(journal => journal.isFeatured)
    }

    return filtered
  }, [journals, searchTerm, selectedCategory, selectedFaculty, selectedYear, showFeaturedOnly])

  const handleJournalClick = (journal: Journal) => {
    setSelectedJournal(journal)
    
    // Increment view count in background
    fetch(`/api/journals/${journal.id}`, {
      method: 'GET'
    }).then(response => {
      if (response.ok) {
        // Update local state
        setJournals(prev => prev.map(j => 
          j.id === journal.id ? { ...j, viewCount: j.viewCount + 1 } : j
        ))
      }
    }).catch(error => {
      console.error('Error updating view count:', error)
      // Continue anyway, don't block the modal from opening
    })
  }

  const handleDownload = async (journal: Journal) => {
    if (!journal.pdfUrl) return
    
    try {
      // Update local state
      setJournals(prev => prev.map(j => 
        j.id === journal.id ? { ...j, downloadCount: j.downloadCount + 1 } : j
      ))
      
      // Open PDF in new tab
      window.open(journal.pdfUrl, '_blank')
    } catch (error) {
      console.error('Error updating download count:', error)
      // Continue with download anyway
      if (journal.pdfUrl) {
        window.open(journal.pdfUrl, '_blank')
      }
    }
  }

  const formatFileSize = (bytes: number) => {
    if (!bytes) return ''
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const featuredJournals = filteredJournals.filter(journal => journal.isFeatured)
  const regularJournals = filteredJournals.filter(journal => !journal.isFeatured)

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari jurnal, penulis, atau kata kunci..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
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
                {faculties.map((faculty) => (
                  <SelectItem key={faculty.id} value={faculty.id.toString()}>
                    {faculty.name}
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
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant={showFeaturedOnly ? "default" : "outline"}
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className="whitespace-nowrap"
            >
              <Filter className="w-4 h-4 mr-2" />
              Unggulan
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Journals */}
      {featuredJournals.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-unipas-primary mb-6">Jurnal Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredJournals.map((journal) => (
              <JournalCard
                key={journal.id}
                journal={journal}
                onClick={() => handleJournalClick(journal)}
                onDownload={() => handleDownload(journal)}
                featured
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Journals */}
      {regularJournals.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-unipas-primary mb-6">
            {featuredJournals.length > 0 ? 'Jurnal Lainnya' : 'Semua Jurnal'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularJournals.map((journal) => (
              <JournalCard
                key={journal.id}
                journal={journal}
                onClick={() => handleJournalClick(journal)}
                onDownload={() => handleDownload(journal)}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredJournals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FileText className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada jurnal ditemukan</h3>
          <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      )}

      {/* Journal Detail Modal */}
      <Dialog open={!!selectedJournal} onOpenChange={() => setSelectedJournal(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedJournal && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold pr-8">
                  {selectedJournal.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Journal Info */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {selectedJournal.category && (
                      <Badge variant="outline">{selectedJournal.category}</Badge>
                    )}
                    {selectedJournal.isFeatured && (
                      <Badge className="bg-unipas-accent text-white">Unggulan</Badge>
                    )}
                    {selectedJournal.isOpenAccess && (
                      <Badge className="bg-green-500 text-white">Open Access</Badge>
                    )}
                    {selectedJournal.isPeerReviewed && (
                      <Badge className="bg-blue-500 text-white">Peer Reviewed</Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Penulis:</span>
                      <span>{selectedJournal.authors}</span>
                    </div>
                    
                    {selectedJournal.faculty && (
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">Fakultas:</span>
                        <span>{selectedJournal.faculty.name}</span>
                      </div>
                    )}
                    
                    {selectedJournal.publishedDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">Publikasi:</span>
                        <span>{format(new Date(selectedJournal.publishedDate), 'dd MMMM yyyy', { locale: localeId })}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-gray-500" />
                        <span>{selectedJournal.viewCount} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4 text-gray-500" />
                        <span>{selectedJournal.downloadCount} downloads</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedJournal.abstract && (
                    <div>
                      <h3 className="font-semibold mb-2">Abstrak</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedJournal.abstract}
                      </p>
                    </div>
                  )}
                  
                  {selectedJournal.keywords && (
                    <div>
                      <h3 className="font-semibold mb-2">Kata Kunci</h3>
                      <p className="text-gray-600">{selectedJournal.keywords}</p>
                    </div>
                  )}
                  
                  {/* Publication Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                    {selectedJournal.volume && (
                      <div>
                        <span className="font-medium">Volume:</span>
                        <div>{selectedJournal.volume}</div>
                      </div>
                    )}
                    {selectedJournal.issue && (
                      <div>
                        <span className="font-medium">Issue:</span>
                        <div>{selectedJournal.issue}</div>
                      </div>
                    )}
                    {selectedJournal.pages && (
                      <div>
                        <span className="font-medium">Halaman:</span>
                        <div>{selectedJournal.pages}</div>
                      </div>
                    )}
                    {selectedJournal.year && (
                      <div>
                        <span className="font-medium">Tahun:</span>
                        <div>{selectedJournal.year}</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Download Button */}
                  {selectedJournal.pdfUrl && (
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleDownload(selectedJournal)}
                        className="bg-unipas-primary hover:bg-unipas-accent"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                        {selectedJournal.pdfSize && (
                          <span className="ml-2 text-xs opacity-75">
                            ({formatFileSize(selectedJournal.pdfSize)})
                          </span>
                        )}
                      </Button>
                      
                      {selectedJournal.doi && (
                        <Button
                          variant="outline"
                          onClick={() => window.open(`https://doi.org/${selectedJournal.doi}`, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          DOI
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface JournalCardProps {
  journal: Journal
  onClick: () => void
  onDownload: () => void
  featured?: boolean
}

function JournalCard({ journal, onClick, onDownload, featured = false }: JournalCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        featured ? 'ring-2 ring-unipas-accent' : ''
      }`}
      onClick={onClick}
    >
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-unipas-primary mb-2 line-clamp-2">
              {journal.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{journal.authors}</p>
          </div>
          
          {featured && (
            <Badge className="bg-unipas-accent text-white ml-2">Unggulan</Badge>
          )}
        </div>
        
        {journal.abstract && (
          <p className="text-sm text-gray-700 mb-4 line-clamp-3">
            {journal.abstract}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-3">
            {journal.category && (
              <Badge variant="outline" className="text-xs">
                {journal.category}
              </Badge>
            )}
            {journal.year && (
              <span>{journal.year}</span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {journal.viewCount}
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {journal.downloadCount}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {journal.isOpenAccess && (
              <Badge className="bg-green-500 text-white text-xs">Open Access</Badge>
            )}
            {journal.isPeerReviewed && (
              <Badge className="bg-blue-500 text-white text-xs">Peer Reviewed</Badge>
            )}
          </div>
          
          {journal.pdfUrl && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation()
                onDownload()
              }}
              className="text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              PDF
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
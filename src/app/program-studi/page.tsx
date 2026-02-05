'use client'

import { useState, useMemo, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { BookOpen, Search, Filter, GraduationCap, Award, Users, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Department {
  id: number
  name: string
  slug: string
  degreeLevel?: string
  description?: string
  accreditation?: string
  quota?: number
  imageUrl?: string
  facultyId: number
  faculty: {
    name: string
    slug: string
  }
}

interface Faculty {
  id: number
  name: string
}

export default function ProgramStudiPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all')
  const [selectedDegreeLevel, setSelectedDegreeLevel] = useState<string>('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [deptsRes, facsRes] = await Promise.all([
          fetch('/api/departments'),
          fetch('/api/faculties')
        ])

        if (deptsRes.ok) {
          const depts = await deptsRes.json()
          setDepartments(depts)
        }

        if (facsRes.ok) {
          const facs = await facsRes.json()
          setFaculties(facs)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredDepartments = useMemo(() => {
    return departments.filter(dept => {
      const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           dept.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFaculty = selectedFaculty === 'all' || dept.facultyId === parseInt(selectedFaculty)
      const matchesDegreeLevel = selectedDegreeLevel === 'all' || dept.degreeLevel === selectedDegreeLevel

      return matchesSearch && matchesFaculty && matchesDegreeLevel
    })
  }, [departments, searchQuery, selectedFaculty, selectedDegreeLevel])

  const uniqueDegreeLevels = Array.from(new Set(departments.map(d => d.degreeLevel).filter(Boolean))) as string[]
  const accreditationStats = {
    A: departments.filter(d => d.accreditation === 'A').length,
    B: departments.filter(d => d.accreditation === 'B').length,
    C: departments.filter(d => d.accreditation === 'C').length
  }

  const getDegreeLabel = (level?: string) => {
    const labels: { [key: string]: string } = {
      'S1': 'Strata 1',
      'S2': 'Strata 2',
      'S3': 'Strata 3',
      'D3': 'Diploma 3',
      'D4': 'Diploma 4'
    }
    return labels[level || ''] || level || 'Tingkat Lanjut'
  }

  const getAccreditationColor = (accreditation?: string) => {
    switch (accreditation) {
      case 'A': return 'bg-green-100 text-green-800'
      case 'B': return 'bg-blue-100 text-blue-800'
      case 'C': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-linear-to-br from-unipas-primary via-unipas-accent to-unipas-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white/20 rounded-lg w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Program Studi UNIPAS Morotai
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Jelajahi berbagai program studi unggulan berbasis potensi lokal di kawasan Pasifik
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-8 bg-unipas-muted border-b border-unipas-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-unipas-primary/50" />
                  <Input
                    placeholder="Cari program studi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 border-unipas-primary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Faculty Filter */}
                <div>
                  <label className="block text-sm font-medium text-unipas-primary mb-2">
                    Fakultas
                  </label>
                  <select
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                    className="w-full px-3 py-2 border border-unipas-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unipas-primary"
                  >
                    <option value="all">Semua Fakultas ({faculties.length})</option>
                    {faculties.map(fac => (
                      <option key={fac.id} value={fac.id}>
                        {fac.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Degree Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-unipas-primary mb-2">
                    Tingkat Pendidikan
                  </label>
                  <select
                    value={selectedDegreeLevel}
                    onChange={(e) => setSelectedDegreeLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-unipas-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unipas-primary"
                  >
                    <option value="all">Semua Tingkat</option>
                    {uniqueDegreeLevels.map(level => (
                      <option key={level} value={level}>
                        {getDegreeLabel(level)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Result Count */}
                <div className="flex items-end">
                  <div className="w-full px-3 py-2 bg-unipas-primary/10 rounded-lg text-sm font-medium text-unipas-primary">
                    Menampilkan {filteredDepartments.length} dari {departments.length} program
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-16 max-w-2xl mx-auto">
                <Loader2 className="h-16 w-16 text-unipas-primary/30 mx-auto mb-4 animate-spin" />
                <p className="text-lg text-unipas-text">Memuat program studi...</p>
              </div>
            ) : filteredDepartments.length === 0 ? (
              <div className="text-center py-16 max-w-2xl mx-auto">
                <BookOpen className="h-16 w-16 text-unipas-primary/30 mx-auto mb-4" />
                <p className="text-lg text-unipas-text mb-2">Tidak ada program studi yang ditemukan</p>
                <p className="text-sm text-unipas-text/60">Coba ubah filter pencarian Anda</p>
              </div>
            ) : (
              <div className="max-w-5xl mx-auto">
                <div className="grid gap-6">
                  {filteredDepartments.map((dept) => (
                    <div
                      key={dept.id}
                      className="bg-white rounded-xl shadow-sm border border-unipas-primary/10 hover:shadow-md hover:border-unipas-primary/30 transition-all p-6 group"
                    >
                      <div className="flex items-start gap-6">
                        {/* Icon */}
                          <div className="bg-linear-to-br from-unipas-primary to-unipas-accent rounded-lg p-4 shrink-0 group-hover:shadow-lg transition-shadow">
                          <GraduationCap className="h-6 w-6 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge variant="secondary" className="bg-unipas-primary/10 text-unipas-primary border-unipas-primary/20">
                              {dept.faculty.name}
                            </Badge>
                            <Badge className={`${getAccreditationColor(dept.accreditation)} border-0`}>
                              Akreditasi {dept.accreditation || '-'}
                            </Badge>
                            {dept.degreeLevel && (
                              <Badge variant="outline" className="border-unipas-primary/20">
                                {getDegreeLabel(dept.degreeLevel)}
                              </Badge>
                            )}
                          </div>

                          <h3 className="text-xl font-bold text-unipas-primary mb-2 group-hover:text-unipas-accent transition-colors">
                            {dept.name}
                          </h3>

                          {dept.description && (
                            <p className="text-unipas-text line-clamp-2 mb-4">
                              {dept.description}
                            </p>
                          )}

                          {/* Stats */}
                          <div className="flex flex-wrap gap-6 pt-4 border-t border-unipas-primary/10">
                            {dept.quota && (
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-unipas-accent" />
                                <span className="text-unipas-text">
                                  Kuota: <strong>{dept.quota}</strong> mahasiswa
                                </span>
                              </div>
                            )}
                            {dept.accreditation && (
                              <div className="flex items-center gap-2 text-sm">
                                <Award className="h-4 w-4 text-unipas-accent" />
                                <span className="text-unipas-text">
                                  Status: <strong>Akreditasi {dept.accreditation}</strong>
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Statistics */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-8 bg-linear-to-br from-unipas-primary/10 to-unipas-accent/10 rounded-xl border border-unipas-primary/20 hover:shadow-lg transition-shadow">
                    <div className="text-4xl font-bold text-unipas-primary mb-2">
                      {filteredDepartments.length}
                    </div>
                    <div className="text-unipas-text text-sm">
                      Program Studi
                    </div>
                  </div>
                  <div className="text-center p-8 bg-linear-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
                    <div className="text-4xl font-bold text-green-700 mb-2">
                      {accreditationStats.A}
                    </div>
                    <div className="text-green-600 text-sm font-medium">
                      Akreditasi A
                    </div>
                  </div>
                  <div className="text-center p-8 bg-linear-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                    <div className="text-4xl font-bold text-blue-700 mb-2">
                      {accreditationStats.B}
                    </div>
                    <div className="text-blue-600 text-sm font-medium">
                      Akreditasi B
                    </div>
                  </div>
                  <div className="text-center p-8 bg-linear-to-br from-yellow-50 to-yellow-100/50 rounded-xl border border-yellow-200 hover:shadow-lg transition-shadow">
                    <div className="text-4xl font-bold text-yellow-700 mb-2">
                      {accreditationStats.C}
                    </div>
                    <div className="text-yellow-600 text-sm font-medium">
                      Akreditasi C
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

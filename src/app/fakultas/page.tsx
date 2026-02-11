'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Input } from '@/components/ui/input'
import { 
  Building2, 
  Search, 
  BookOpen, 
  GraduationCap,
  Fish,
  Calculator,
  Cpu,
  TreePine,
  Building,
  Users,
  Globe,
  Award,
  ChevronRight,
  Filter,
  User,
  Mail,
  Phone
} from 'lucide-react'

interface Faculty {
  id: number
  name: string
  slug: string
  description?: string
  deanName?: string
  imageUrl?: string
  location?: string
  contactEmail?: string
  contactPhone?: string
  websiteUrl?: string
  establishedYear?: number
  createdAt: string
  updatedAt: string
  departments: Department[]
  dean?: Staff
}

interface Department {
  id: number
  facultyId: number
  name: string
  slug: string
  degreeLevel?: string
  description?: string
  accreditation?: string
  quota?: number
  imageUrl?: string
  createdAt: string
  updatedAt: string
  head?: Staff
}

interface Staff {
  id: number
  name: string
  slug: string
  position?: string
  facultyId?: number
  departmentId?: number
  email?: string
  phone?: string
  photoUrl?: string
  bio?: string
  researchInterest?: string
  googleScholarUrl?: string
  isActive?: boolean
  createdAt: string
  updatedAt: string
}

const facultyIcons = {
  'Perikanan': Fish,
  'Matematika': Calculator,
  'Teknik': Cpu,
  'Ekonomi': Building,
  'Sosial': Users,
  'Keguruan': GraduationCap,
  'Ilmu Sosial': Users,
  'Keguruan dan Ilmu Pendidikan': GraduationCap,
  'Fakultas Perikanan dan Kelautan': Fish,
  'Fakultas Matematika dan Ilmu Pengetahuan Alam': Calculator,
  'Fakultas Teknik': Cpu,
  'Fakultas Ekonomi': Building,
  'Fakultas Ilmu Sosial dan Ilmu Politik': Users,
  'Fakultas Keguruan dan Ilmu Pendidikan': GraduationCap,
}

const facultyColors = {
  'Perikanan': 'from-blue-600 to-blue-800',
  'Matematika': 'from-purple-600 to-purple-800',
  'Teknik': 'from-green-600 to-green-800',
  'Ekonomi': 'from-yellow-600 to-yellow-800',
  'Sosial': 'from-red-600 to-red-800',
  'Keguruan': 'from-indigo-600 to-indigo-800',
  'Ilmu Sosial': 'from-red-600 to-red-800',
  'Keguruan dan Ilmu Pendidikan': 'from-indigo-600 to-indigo-800',
  'Fakultas Perikanan dan Kelautan': 'from-blue-600 to-blue-800',
  'Fakultas Matematika dan Ilmu Pengetahuan Alam': 'from-purple-600 to-purple-800',
  'Fakultas Teknik': 'from-green-600 to-green-800',
  'Fakultas Ekonomi': 'from-yellow-600 to-yellow-800',
  'Fakultas Ilmu Sosial dan Ilmu Politik': 'from-red-600 to-red-800',
  'Fakultas Keguruan dan Ilmu Pendidikan': 'from-indigo-600 to-indigo-800',
}

export default function FacultiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null)
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFaculties()
  }, [])

  const fetchFaculties = async () => {
    try {
      const res = await fetch('/api/faculties?limit=50')
      if (!res.ok) throw new Error('Failed to fetch faculties')
      const data = await res.json()
      
      // Data sudah include departments dengan head dari API
      setFaculties(data)
    } catch (error) {
      console.error('Error fetching faculties:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFacultyIcon = (facultyName: string) => {
    for (const [key, icon] of Object.entries(facultyIcons)) {
      if (facultyName.includes(key)) return icon
    }
    return Building2
  }

  const getFacultyColor = (facultyName: string) => {
    for (const [key, color] of Object.entries(facultyColors)) {
      if (facultyName.includes(key)) return color
    }
    return 'from-unipas-primary to-unipas-accent'
  }

  const filteredFaculties = faculties.filter(faculty => 
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.departments.some(department => 
      department.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const allPrograms = faculties.flatMap(faculty => 
    faculty.departments.map(department => ({
      ...department,
      faculty: faculty.name,
      facultyColor: getFacultyColor(faculty.name),
      facultyIcon: getFacultyIcon(faculty.name)
    }))
  )

  const filteredPrograms = selectedFaculty 
    ? allPrograms.filter(program => program.faculty === selectedFaculty)
    : allPrograms.filter(program => 
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.faculty.toLowerCase().includes(searchTerm.toLowerCase())
      )

  if (loading) {
    return (
      <div className="min-h-screen bg-unipas-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-linear-to-r from-unipas-primary to-unipas-accent rounded-full flex items-center justify-center text-white mx-auto mb-4 animate-spin">
            <Building2 className="h-8 w-8" />
          </div>
          <p className="text-unipas-primary">Memuat data fakultas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-unipas-muted">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-unipas-primary via-unipas-accent to-unipas-primary text-white">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Building2 className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fakultas dan Program Studi
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Temukan berbagai pilihan fakultas dan program studi yang sesuai dengan minat dan bakat Anda di Universitas Pasifik Morotai
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unipas-text h-4 w-4" />
                  <Input
                    placeholder="Cari fakultas atau program studi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-unipas-primary/20 focus:border-unipas-accent"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedFaculty(null)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedFaculty === null
                      ? 'bg-linear-to-r from-unipas-primary to-unipas-accent text-white'
                      : 'bg-unipas-muted text-unipas-primary hover:bg-unipas-primary/10'
                  }`}
                >
                  Semua
                </button>
                {faculties.map((faculty) => (
                  <button
                    key={faculty.id}
                    onClick={() => setSelectedFaculty(faculty.name)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedFaculty === faculty.name
                        ? 'bg-linear-to-r from-unipas-primary to-unipas-accent text-white'
                        : 'bg-unipas-muted text-unipas-primary hover:bg-unipas-primary/10'
                    }`}
                  >
                    {faculty.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {/* Faculty Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredFaculties.map((faculty, index) => {
            const Icon = getFacultyIcon(faculty.name)
            const color = getFacultyColor(faculty.name)
            return (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`bg-linear-to-r ${color} p-6 text-white`}>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{faculty.name}</h3>
                  <p className="text-white/90 text-sm">{faculty.description || 'Mengembangkan pendidikan berkualitas di bidang ini'}</p>
                </div>
                <div className="p-6">
                  {/* Dean Information */}
                  {faculty.dean && (
                    <div className="mb-6 p-4 bg-unipas-muted rounded-lg border-l-4 border-unipas-accent">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-unipas-primary rounded-full flex items-center justify-center text-white">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-unipas-primary">Dekan</h5>
                          <p className="text-sm font-medium text-unipas-text">{faculty.dean.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-unipas-text">
                        {faculty.dean.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{faculty.dean.email}</span>
                          </div>
                        )}
                        {faculty.dean.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>{faculty.dean.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-unipas-primary">Program Studi</h4>
                    <span className="bg-unipas-accent/10 text-unipas-accent px-2 py-1 rounded-full text-sm font-medium">
                      {faculty.departments.length} Program
                    </span>
                  </div>
                  <div className="space-y-3">
                    {faculty.departments.map((department) => (
                      <div key={department.id} className="flex items-center justify-between p-3 bg-unipas-muted rounded-lg hover:bg-unipas-primary/5 transition-colors">
                        <div className="flex-1">
                          <div className="font-medium text-unipas-primary">{department.name}</div>
                          <div className="text-sm text-unipas-text">{department.degreeLevel || 'S1'}</div>
                          {department.head && (
                            <div className="text-xs text-unipas-text mt-1">
                              Kaprodi: {department.head.name}
                            </div>
                          )}
                        </div>
                        <ChevronRight className="h-4 w-4 text-unipas-accent shrink-0" />
                      </div>
                    ))}
                    {faculty.departments.length === 0 && (
                      <div className="text-center py-4 text-unipas-text">
                        Belum ada program studi
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Detailed Programs List */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden">
            <div className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <BookOpen className="h-6 w-6" />
                Daftar Lengkap Program Studi
              </h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-unipas-primary/20">
                      <th className="text-left py-3 px-4 font-semibold text-unipas-primary">Program Studi</th>
                      <th className="text-left py-3 px-4 font-semibold text-unipas-primary">Fakultas</th>
                      <th className="text-left py-3 px-4 font-semibold text-unipas-primary">Jenjang</th>
                      <th className="text-left py-3 px-4 font-semibold text-unipas-primary">Akreditasi</th>
                      <th className="text-left py-3 px-4 font-semibold text-unipas-primary">Kaprodi</th>
                      <th className="text-left py-3 px-4 font-semibold text-unipas-primary">Deskripsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrograms.map((program, index) => {
                      const Icon = program.facultyIcon
                      return (
                        <motion.tr
                          key={program.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-unipas-primary/10 hover:bg-unipas-muted/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 bg-linear-to-r ${program.facultyColor} rounded-lg flex items-center justify-center text-white`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <span className="font-medium text-unipas-primary">{program.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-unipas-text">{program.faculty}</td>
                          <td className="py-4 px-4">
                            <span className="bg-unipas-accent/10 text-unipas-accent px-2 py-1 rounded-full text-sm font-medium">
                              {program.degreeLevel || 'S1'}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {program.accreditation && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                                {program.accreditation}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-sm text-unipas-text">
                            {program.head?.name || '-'}
                          </td>
                          <td className="py-4 px-4 text-unipas-text text-sm">{program.description || '-'}</td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              
              {filteredPrograms.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-unipas-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-unipas-text" />
                  </div>
                  <p className="text-unipas-text">Tidak ada program studi yang ditemukan</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 p-6 text-center"
          >
            <div className="w-12 h-12 bg-linear-to-r from-unipas-primary to-unipas-accent rounded-full flex items-center justify-center text-white mx-auto mb-3">
              <Building2 className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-unipas-primary">{faculties.length}</div>
            <div className="text-sm text-unipas-text">Fakultas</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 p-6 text-center"
          >
            <div className="w-12 h-12 bg-linear-to-r from-unipas-primary to-unipas-accent rounded-full flex items-center justify-center text-white mx-auto mb-3">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-unipas-primary">{allPrograms.length}</div>
            <div className="text-sm text-unipas-text">Program Studi</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 p-6 text-center"
          >
            <div className="w-12 h-12 bg-linear-to-r from-unipas-primary to-unipas-accent rounded-full flex items-center justify-center text-white mx-auto mb-3">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-unipas-primary">S1</div>
            <div className="text-sm text-unipas-text">Jenjang</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 p-6 text-center"
          >
            <div className="w-12 h-12 bg-linear-to-r from-unipas-primary to-unipas-accent rounded-full flex items-center justify-center text-white mx-auto mb-3">
              <Award className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-unipas-primary">Terakreditasi</div>
            <div className="text-sm text-unipas-text">Kualitas</div>
          </motion.div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  )
}

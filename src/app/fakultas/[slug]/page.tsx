import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, MapPin, Mail, Phone, ExternalLink, Users, ArrowLeft, 
  Calendar, BookOpen, GraduationCap, Award, Target, Eye, Heart,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'

// Fungsi untuk mendapatkan warna berdasarkan nama fakultas
const getFacultyColor = (facultyName: string): string => {
  const name = facultyName.toLowerCase()
  
  if (name.includes('teknik')) {
    return 'from-cyan-500 to-cyan-700'
  } else if (name.includes('perikanan') || name.includes('kelautan')) {
    return 'from-blue-700 to-blue-900'
  } else if (name.includes('keguruan') || name.includes('fkip') || name.includes('pendidikan')) {
    return 'from-green-500 to-green-700'
  } else if (name.includes('ekonomi')) {
    return 'from-orange-500 to-orange-700'
  } else if (name.includes('pisif') || name.includes('politik') || name.includes('sosial')) {
    return 'from-yellow-500 to-yellow-700'
  } else if (name.includes('mipa') || name.includes('matematika') || name.includes('pengetahuan alam')) {
    return 'from-red-500 to-red-700'
  }
  
  return 'from-unipas-primary to-unipas-accent'
}

async function getFacultyBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/faculties`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch faculty')
    }

    const faculties = await res.json()
    return faculties.find((f: any) => f.slug === slug)
  } catch (error) {
    console.error('Error fetching faculty:', error)
    return null
  }
}

async function getDepartmentsByFaculty(facultyId: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/departments?facultyId=${facultyId}`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch departments')
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching departments:', error)
    return []
  }
}

export default async function FacultyDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const faculty = await getFacultyBySlug(slug)

  if (!faculty) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-unipas-muted">
          <div className="text-center p-8">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-unipas-primary mb-4">Fakultas tidak ditemukan</h1>
            <Link href="/fakultas">
              <Button className="bg-gradient-to-r from-unipas-primary to-unipas-accent text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Daftar Fakultas
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const departments = await getDepartmentsByFaculty(faculty.id)
  const facultyColor = getFacultyColor(faculty.name)

  return (
    <div className="min-h-screen flex flex-col bg-unipas-muted">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Faculty Color */}
        <div className={`relative bg-gradient-to-br ${facultyColor} text-white overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>

          <div className="container mx-auto px-4 py-16 relative z-10">
            {/* Back Button */}
            <Link href="/fakultas" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Daftar Fakultas</span>
            </Link>

            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <Building2 className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black mb-2">
                    {faculty.name}
                  </h1>
                  {faculty.establishedYear && (
                    <p className="text-white/90 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Didirikan tahun {faculty.establishedYear}
                    </p>
                  )}
                </div>
              </div>

              {faculty.description && (
                <p className="text-xl text-white/90 leading-relaxed">
                  {faculty.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Program Studi Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${facultyColor} rounded-xl flex items-center justify-center`}>
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-unipas-primary">Program Studi</h2>
                      <p className="text-sm text-gray-600">{departments.length} program studi tersedia</p>
                    </div>
                  </div>

                  {departments.length > 0 ? (
                    <div className="space-y-4">
                      {departments.map((dept: any) => (
                        <details 
                          key={dept.id} 
                          className="group bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-unipas-accent transition-all overflow-hidden"
                        >
                          <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold text-unipas-primary">{dept.name}</h3>
                                {dept.accreditation && (
                                  <Badge className="bg-green-100 text-green-800 border-green-200">
                                    Akreditasi {dept.accreditation}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                {dept.degreeLevel && (
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="h-4 w-4" />
                                    {dept.degreeLevel}
                                  </span>
                                )}
                                {dept.quota && (
                                  <span className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    Kuota: {dept.quota}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ChevronDown className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180" />
                          </summary>
                          
                          <div className="px-5 pb-5 pt-2 border-t border-gray-200 bg-white">
                            {dept.description && (
                              <p className="text-gray-700 mb-4">{dept.description}</p>
                            )}
                            
                            {dept.head && (
                              <div className={`bg-gradient-to-r ${facultyColor} bg-opacity-10 rounded-lg p-4 border-l-4`} style={{ borderColor: 'currentColor' }}>
                                <div className="flex items-start gap-3">
                                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
                                    <Users className="h-6 w-6 text-unipas-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm text-gray-600 mb-1">Ketua Program Studi</div>
                                    <div className="font-bold text-unipas-primary text-lg mb-2">{dept.head.name}</div>
                                    <div className="space-y-1">
                                      {dept.head.email && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                          <Mail className="h-4 w-4" />
                                          <a href={`mailto:${dept.head.email}`} className="hover:text-unipas-accent">
                                            {dept.head.email}
                                          </a>
                                        </div>
                                      )}
                                      {dept.head.phone && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                          <Phone className="h-4 w-4" />
                                          <a href={`tel:${dept.head.phone}`} className="hover:text-unipas-accent">
                                            {dept.head.phone}
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </details>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <GraduationCap className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p>Belum ada program studi yang tersedia</p>
                    </div>
                  )}
                </div>

                {/* Visi Misi Section */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Eye className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-unipas-primary">Visi</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Menjadi fakultas unggul yang menghasilkan lulusan berkualitas dan berdaya saing global dengan berbasis pada potensi lokal kawasan Pasifik.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Target className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-unipas-primary">Misi</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-unipas-accent mt-1">•</span>
                        <span>Menyelenggarakan pendidikan berkualitas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-unipas-accent mt-1">•</span>
                        <span>Mengembangkan penelitian dan pengabdian</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-unipas-accent mt-1">•</span>
                        <span>Membangun kerjasama strategis</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Contact Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-unipas-primary mb-6">Informasi Kontak</h3>
                  
                  <div className="space-y-4">
                    {faculty.deanName && (
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Dekan</div>
                        <div className="font-semibold text-unipas-primary">{faculty.deanName}</div>
                      </div>
                    )}

                    {faculty.location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-unipas-accent shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Lokasi</div>
                          <div className="text-gray-800">{faculty.location}</div>
                        </div>
                      </div>
                    )}

                    {faculty.contactEmail && (
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-unipas-accent shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Email</div>
                          <a href={`mailto:${faculty.contactEmail}`} className="text-unipas-primary hover:text-unipas-accent break-all">
                            {faculty.contactEmail}
                          </a>
                        </div>
                      </div>
                    )}

                    {faculty.contactPhone && (
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-unipas-accent shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Telepon</div>
                          <a href={`tel:${faculty.contactPhone}`} className="text-unipas-primary hover:text-unipas-accent">
                            {faculty.contactPhone}
                          </a>
                        </div>
                      </div>
                    )}

                    {faculty.websiteUrl && (
                      <div className="flex items-start gap-3">
                        <ExternalLink className="h-5 w-5 text-unipas-accent shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Website</div>
                          <a 
                            href={faculty.websiteUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-unipas-primary hover:text-unipas-accent break-all"
                          >
                            Kunjungi Website
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                    <Link href="/penerimaan">
                      <Button className={`w-full bg-gradient-to-r ${facultyColor} text-white hover:opacity-90`}>
                        <Users className="h-4 w-4 mr-2" />
                        Informasi Penerimaan
                      </Button>
                    </Link>
                    <Link href="/kontak">
                      <Button variant="outline" className="w-full border-unipas-primary text-unipas-primary hover:bg-unipas-primary/10">
                        <Mail className="h-4 w-4 mr-2" />
                        Hubungi Kami
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-gradient-to-br from-unipas-primary to-unipas-accent rounded-2xl shadow-lg p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">Statistik</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-black">{departments.length}</div>
                      <div className="text-white/80 text-sm">Program Studi</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black">
                        {departments.filter((d: any) => d.accreditation === 'A').length}
                      </div>
                      <div className="text-white/80 text-sm">Akreditasi A</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black">
                        {departments.filter((d: any) => d.head).length}
                      </div>
                      <div className="text-white/80 text-sm">Ketua Prodi Aktif</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

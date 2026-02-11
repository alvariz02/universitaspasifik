import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, MapPin, Mail, Phone, ExternalLink, Users, ArrowLeft, Calendar, BookOpen } from 'lucide-react'
import Link from 'next/link'

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
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Fakultas tidak ditemukan</h1>
            <Link href="/fakultas">
              <Button className="bg-ui-yellow text-ui-navy hover:bg-yellow-400">
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
  
  console.log(`📊 Faculty ${faculty.name} departments:`, departments.length)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Back Button */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/fakultas">
              <Button variant="ghost" className="gap-2 text-ui-navy hover:text-ui-navy/80">
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Daftar Fakultas
              </Button>
            </Link>
          </div>
        </div>

        {/* Header with Image */}
        {faculty.imageUrl && (
          <div className="relative h-100">
            <img
              src={faculty.imageUrl}
              alt={faculty.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ui-navy/90 to-ui-navy/50" />
            <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {faculty.name}
              </h1>
              {faculty.location && (
                <p className="text-lg text-gray-300 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {faculty.location}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-ui-navy mb-4 flex items-center gap-2">
                      <BookOpen className="h-6 w-6 text-ui-yellow" />
                      Tentang Fakultas
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {faculty.description}
                      </p>
                    </div>
                  </div>

                  {/* Departments */}
                  {departments.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-ui-navy mb-4 flex items-center gap-2">
                        <Building2 className="h-6 w-6 text-ui-yellow" />
                        Program Studi
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {departments.map((dept: any) => {
                          const kaprodi = dept.head // Get head from included data
                          
                          return (
                            <div
                              key={dept.id}
                              className="bg-gray-50 rounded-lg p-4 border-2 hover:border-ui-yellow transition-colors"
                            >
                              <h3 className="font-bold text-ui-navy mb-2">
                                {dept.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                {dept.description || ''}
                              </p>
                              
                              {/* Ketua Prodi Section */}
                              {kaprodi ? (
                                <div className="bg-ui-yellow/10 rounded-lg p-3 border border-ui-yellow/30">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Users className="h-4 w-4 text-ui-yellow" />
                                    <h4 className="font-semibold text-ui-navy text-sm">Ketua Program Studi</h4>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="font-medium text-ui-navy">{kaprodi.name}</p>
                                    {kaprodi.email && (
                                      <p className="text-xs text-muted-foreground">
                                        📧 {kaprodi.email}
                                      </p>
                                    )}
                                    {kaprodi.phone && (
                                      <p className="text-xs text-muted-foreground">
                                        📱 {kaprodi.phone}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-gray-100 rounded-lg p-3 border border-gray-200">
                                  <p className="text-sm text-gray-500 text-center">Belum ada Ketua Prodi</p>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Programs Info */}
                  <div className="bg-ui-navy/5 rounded-lg p-6 border-2 border-ui-navy/10">
                    <h3 className="font-bold text-ui-navy mb-4 text-xl">
                      Program Pendidikan
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-ui-yellow/20 rounded p-2">
                          <Calendar className="h-5 w-5 text-ui-yellow" />
                        </div>
                        <div>
                          <div className="font-medium text-ui-navy">Sarjana (S1)</div>
                          <p className="text-sm text-muted-foreground">
                            Program sarjana berkualitas dengan kurikulum modern
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-ui-yellow/20 rounded p-2">
                          <Calendar className="h-5 w-5 text-ui-yellow" />
                        </div>
                        <div>
                          <div className="font-medium text-ui-navy">Magister (S2)</div>
                          <p className="text-sm text-muted-foreground">
                            Program pascasarjana untuk pengembangan keilmuan
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-ui-yellow/20 rounded p-2">
                          <Calendar className="h-5 w-5 text-ui-yellow" />
                        </div>
                        <div>
                          <div className="font-medium text-ui-navy">Doktor (S3)</div>
                          <p className="text-sm text-muted-foreground">
                            Program doktoral untuk riset inovatif
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-ui-yellow/20 rounded p-2">
                          <Calendar className="h-5 w-5 text-ui-yellow" />
                        </div>
                        <div>
                          <div className="font-medium text-ui-navy">Profesi</div>
                          <p className="text-sm text-muted-foreground">
                            Program profesi untuk kesiapan kerja
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Info */}
                  <div className="bg-gray-50 rounded-lg p-6 border-2">
                    <h3 className="font-bold text-ui-navy mb-4 text-lg">
                      Informasi Cepat
                    </h3>

                    <div className="space-y-4">
                      {faculty.establishedYear && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Tahun Berdiri
                          </div>
                          <div className="font-medium text-ui-navy">
                            {faculty.establishedYear}
                          </div>
                        </div>
                      )}

                      {faculty.deanName && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Dekan
                          </div>
                          <div className="font-medium text-ui-navy">
                            {faculty.deanName}
                          </div>
                        </div>
                      )}

                      {faculty.location && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Lokasi
                          </div>
                          <div className="font-medium text-ui-navy">
                            {faculty.location}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="bg-gray-50 rounded-lg p-6 border-2">
                    <h3 className="font-bold text-ui-navy mb-4 text-lg">
                      Kontak
                    </h3>

                    <div className="space-y-3">
                      {faculty.contactEmail && (
                        <a
                          href={`mailto:${faculty.contactEmail}`}
                          className="flex items-center gap-2 text-muted-foreground hover:text-ui-navy transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="text-sm break-all">
                            {faculty.contactEmail}
                          </span>
                        </a>
                      )}

                      {faculty.contactPhone && (
                        <a
                          href={`tel:${faculty.contactPhone}`}
                          className="flex items-center gap-2 text-muted-foreground hover:text-ui-navy transition-colors"
                        >
                          <Phone className="h-4 w-4" />
                          <span>{faculty.contactPhone}</span>
                        </a>
                      )}

                      {faculty.websiteUrl && (
                        <a
                          href={faculty.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-ui-navy hover:text-ui-navy/80 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="text-sm">Website Resmi</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button className="w-full bg-ui-yellow text-ui-navy hover:bg-yellow-400">
                      Daftar Sekarang
                    </Button>

                    <Link href="/penerimaan">
                      <Button variant="outline" className="w-full border-ui-navy text-ui-navy">
                        <Users className="h-4 w-4 mr-2" />
                        Informasi Penerimaan
                      </Button>
                    </Link>

                    <Link href="/kontak">
                      <Button variant="outline" className="w-full border-ui-navy text-ui-navy">
                        Hubungi Kami
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

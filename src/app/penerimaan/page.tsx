import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { GraduationCap, Calendar, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AdmissionForm from '@/components/AdmissionForm'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function getAdmissions() {
  try {
    const admissions = await db.admission.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })

    return admissions
  } catch (error) {
    console.error('Error fetching admissions:', error)
    return []
  }
}

export default async function PenerimaanPage() {
  const admissions = await getAdmissions()

  const admissionPaths = [
    {
      name: 'SNBP',
      title: 'Seleksi Nasional Berbasis Prestasi',
      description: 'Jalur seleksi tanpa tes berdasarkan nilai rapor dan prestasi akademik',
      icon: <GraduationCap className="h-8 w-8" />,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'SNBT',
      title: 'Seleksi Nasional Berbasis Tes',
      description: 'Jalur seleksi berbasis tes UTBK untuk masuk ke berbagai PTN',
      icon: <Calendar className="h-8 w-8" />,
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'SIMAK UP',
      title: 'Seleksi Mandiri Universitas Pasifik',
      description: 'Jalur seleksi mandiri yang diselenggarakan oleh Universitas Pasifik',
      icon: <Users className="h-8 w-8" />,
      color: 'bg-yellow-100 text-yellow-800'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-ui-navy py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-ui-yellow/10 rounded-lg w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-10 w-10 text-ui-yellow" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Penerimaan Mahasiswa Baru
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Bergabunglah bersama ribuan mahasiswa berprestasi dan jadilah bagian dari keluarga besar Universitas Pasifik
              </p>
            </div>
          </div>
        </section>

        {/* Admission Paths */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-ui-navy text-center mb-12">
                Jalur Penerimaan
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {admissionPaths.map((path) => (
                  <div
                    key={path.name}
                    className="bg-white rounded-lg shadow-lg border-2 hover:border-ui-yellow transition-all overflow-hidden"
                  >
                    <div className={`${path.color} p-6`}>
                      <div className="flex items-center justify-center mb-2">
                        {path.icon}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-ui-navy mb-2">
                        {path.name}
                      </h3>
                      <h4 className="text-lg font-medium text-ui-navy mb-4">
                        {path.title}
                      </h4>
                      <p className="text-muted-foreground mb-6">
                        {path.description}
                      </p>
                      <Link href="/penerimaan">
                        <Button className="w-full bg-ui-navy text-white hover:bg-ui-navy/80">
                          Pelajari Lebih Lanjut
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-ui-navy text-center mb-12">
                Persyaratan Umum
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Lulusan SMA/SMK/MA sederajat',
                  'Memiliki nilai rapor yang baik',
                  'Sehat jasmani dan rohani',
                  'Berkelakuan baik',
                  'Tidak bertato/bertindik',
                  'Bebas narkoba'
                ].map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white rounded-lg p-4 border-2"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-ui-navy text-center mb-12">
                Jadwal Penerimaan
              </h2>
              <div className="space-y-6">
                {admissions.length > 0 ? (
                  admissions.map((admission: any) => (
                    <div
                      key={admission.id}
                      className="bg-white rounded-lg shadow-sm border-2 p-6 hover:border-ui-yellow transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-ui-yellow/10 rounded-lg p-3 shrink-0">
                          <Calendar className="h-6 w-6 text-ui-yellow" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-ui-navy mb-2">
                            {admission.programName}
                          </h3>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            {admission.openingDate && (
                              <div>
                                <span className="font-medium">Pendaftaran:</span>{' '}
                                {new Date(admission.openingDate).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </div>
                            )}
                            {admission.closingDate && (
                              <div>
                                <span className="font-medium">Penutupan:</span>{' '}
                                {new Date(admission.closingDate).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Jadwal penerimaan akan segera diumumkan</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Admission Form */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-ui-navy mb-4">
                  Formulir Pendaftaran Online
                </h2>
                <p className="text-lg text-muted-foreground">
                  Isi formulir berikut untuk memulai perjalanan akademik Anda di Universitas Pasifik
                </p>
              </div>
              
              <AdmissionForm />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-ui-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Siap Menjadi Mahasiswa UP?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Bergabunglah dengan ribuan mahasiswa berprestasi dan jadilah bagian dari Universitas Pasifik
              </p>
              <Link href="/kontak">
                <Button
                  size="lg"
                  className="bg-ui-yellow text-ui-navy hover:bg-yellow-400 px-8 py-6 text-lg font-bold"
                >
                  Hubungi Kami untuk Informasi
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Users, Building2, Briefcase, Shield } from 'lucide-react'

export default function StrukturPage() {
  const organizationalUnits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Rektor',
      description: 'Pemimpin tertinggi universitas yang bertanggung jawab atas seluruh aktivitas UI',
      person: 'Prof. Dr. Ari Kuncoro, S.E., M.A.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Dewan Profesor',
      description: 'Badan kolegial yang memberikan saran kepada rektor dalam bidang akademik',
      person: 'Profesor UI'
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'Dekan Fakultas',
      description: 'Memimpin dan mengelola setiap fakultas sesuai bidang keahlian',
      person: '14 Dekan Fakultas'
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'Direktur Satuan Kerja',
      description: 'Mengelola unit kerja pendukung akademik dan non-akademik',
      person: 'Direktur Unit Kerja'
    }
  ]

  const faculties = [
    'Fakultas Kedokteran',
    'Fakultas Kedokteran Gigi',
    'Fakultas Kesehatan Masyarakat',
    'Fakultas Ilmu Keperawatan',
    'Fakultas Farmasi',
    'Fakultas Matematika dan Ilmu Pengetahuan Alam',
    'Fakultas Teknik',
    'Fakultas Ilmu Komputer',
    'Fakultas Hukum',
    'Fakultas Ekonomi dan Bisnis',
    'Fakultas Ilmu Administrasi',
    'Fakultas Ilmu Sosial dan Ilmu Politik',
    'Fakultas Psikologi',
    'Fakultas Humaniora'
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
                <Building2 className="h-10 w-10 text-ui-yellow" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Struktur Organisasi
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Struktur organisasi Universitas Pasifik yang transparan dan akuntabel
              </p>
            </div>
          </div>
        </section>

        {/* Organizational Units */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-ui-navy text-center mb-12">
                Satuan Organisasi
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {organizationalUnits.map((unit, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow-lg border-2 p-6 hover:border-ui-yellow transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-ui-yellow/10 rounded-lg p-3 shrink-0">
                        <div className="text-ui-yellow">
                          {unit.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-ui-navy mb-2">
                          {unit.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {unit.description}
                        </p>
                        <p className="text-sm font-medium text-ui-navy">
                          {unit.person}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Faculties */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-ui-navy text-center mb-12">
                14 Fakultas UI
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {faculties.map((faculty, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 border-2 hover:border-ui-yellow transition-colors text-center"
                  >
                    <p className="font-medium text-ui-navy">
                      {faculty}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Info Box */}
        <section className="py-16 bg-ui-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Akuntabilitas & Transparansi
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Struktur organisasi UI dirancang untuk memastikan akuntabilitas dan 
                transparansi dalam setiap tingkat manajemen universitas
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-ui-yellow/20 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-ui-yellow" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Good Governance
                  </h3>
                  <p className="text-sm text-gray-300">
                    Penerapan tata kelola yang baik
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-ui-yellow/20 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-ui-yellow" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Profesional
                  </h3>
                  <p className="text-sm text-gray-300">
                    Profesionalisme dalam setiap aktivitas
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-ui-yellow/20 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-ui-yellow" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Kolaboratif
                  </h3>
                  <p className="text-sm text-gray-300">
                    Kerjasama yang erat antar unit kerja
                  </p>
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

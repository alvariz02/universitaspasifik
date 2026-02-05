import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Building2, Users, BookOpen, Cpu, Dumbbell, Utensils } from 'lucide-react'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function getFacilities() {
  try {
    const facilities = await db.facility.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return facilities
  } catch (error) {
    console.error('Error fetching facilities:', error)
    return []
  }
}

export default async function FasilitasPage() {
  const facilities = await getFacilities()

  const facilityTypes = [
    {
      icon: <Building2 className="h-8 w-8" />,
      name: 'Gedung & Ruang Kelas',
      description: 'Gedung modern dengan ruang kelas nyaman dan dilengkapi AC',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      name: 'Perpustakaan',
      description: 'Koleksi buku lengkap dan area baca yang nyaman',
      color: 'bg-green-100 text-green-800'
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      name: 'Laboratorium',
      description: 'Lab modern dengan peralatan terkini untuk praktikum',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      icon: <Dumbbell className="h-8 w-8" />,
      name: 'Olahraga',
      description: 'Gedung olahraga dan fasilitas kebugaran',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      name: 'Kantin & Restoran',
      description: 'Berbagai pilihan makanan halal dan terjangkau',
      color: 'bg-red-100 text-red-800'
    },
    {
      icon: <Users className="h-8 w-8" />,
      name: 'Asrama',
      description: 'Tempat tinggal nyaman bagi mahasiswa',
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
                <Building2 className="h-10 w-10 text-ui-yellow" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Fasilitas Kampus UP
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Fasilitas lengkap dan modern untuk mendukung kegiatan akademik dan non-akademik
              </p>
            </div>
          </div>
        </section>

        {/* Facility Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-ui-navy text-center mb-12">
                Jenis Fasilitas
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilityTypes.map((type, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow-lg border-2 hover:border-ui-yellow transition-all p-6"
                  >
                    <div className={`${type.color} rounded-lg w-16 h-16 flex items-center justify-center mb-4`}>
                      <div className="text-current">
                        {type.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-ui-navy mb-2">
                      {type.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Facilities List */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-ui-navy text-center mb-12">
                Daftar Fasilitas
              </h2>
              {facilities.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg">
                  <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">Belum ada fasilitas tersedia</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {facilities.map((facility: any) => (
                    <div
                      key={facility.id}
                      className="bg-white rounded-lg shadow-sm border-2 hover:border-ui-yellow transition-all overflow-hidden"
                    >
                      {facility.imageUrl && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={facility.imageUrl}
                            alt={facility.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-ui-navy mb-2">
                          {facility.name}
                        </h3>
                        {facility.description && (
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {facility.description}
                          </p>
                        )}
                        {facility.location && (
                          <p className="text-xs text-muted-foreground">
                            📍 {facility.location}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="py-16 bg-ui-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Akses & Penggunaan
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-ui-yellow/20 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-ui-yellow" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Akses Terbuka
                  </h3>
                  <p className="text-sm text-gray-300">
                    Fasilitas utama dapat diakses oleh seluruh civitas akademika
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-ui-yellow/20 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Cpu className="h-8 w-8 text-ui-yellow" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Reservasi Online
                  </h3>
                  <p className="text-sm text-gray-300">
                    Beberapa fasilitas dapat dipesan melalui sistem online
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-ui-yellow/20 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-ui-yellow" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Bantuan Pengguna
                  </h3>
                  <p className="text-sm text-gray-300">
                    Petugas tersedia untuk membantu penggunaan fasilitas
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

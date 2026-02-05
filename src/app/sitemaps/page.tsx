import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FileText, Home, Building2, BookOpen, Calendar, Bell, Trophy, Info, Phone, User } from 'lucide-react'
import Link from 'next/link'

const sitemap = {
  'Halaman Utama': [
    { name: 'Beranda', href: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Kontak', href: '/kontak', icon: <Phone className="h-4 w-4" /> }
  ],
  'Tentang UI': [
    { name: 'Sejarah', href: '/tentang/sejarah', icon: <BookOpen className="h-4 w-4" /> },
    { name: 'Visi & Misi', href: '/tentang/visi-misi', icon: <Info className="h-4 w-4" /> },
    { name: 'Struktur Organisasi', href: '/tentang/struktur', icon: <User className="h-4 w-4" /> }
  ],
  'Akademik': [
    { name: 'Fakultas', href: '/fakultas', icon: <Building2 className="h-4 w-4" /> },
    { name: 'Program Studi', href: '/program-studi', icon: <BookOpen className="h-4 w-4" /> },
    { name: 'Penerimaan', href: '/penerimaan', icon: <User className="h-4 w-4" /> }
  ],
  'Informasi': [
    { name: 'Berita', href: '/berita', icon: <FileText className="h-4 w-4" /> },
    { name: 'Event & Kegiatan', href: '/event', icon: <Calendar className="h-4 w-4" /> },
    { name: 'Pengumuman', href: '/pengumuman', icon: <Bell className="h-4 w-4" /> },
    { name: 'Prestasi', href: '/prestasi', icon: <Trophy className="h-4 w-4" /> },
    { name: 'Penelitian', href: '/penelitian', icon: <BookOpen className="h-4 w-4" /> },
    { name: 'Fasilitas', href: '/fasilitas', icon: <Building2 className="h-4 w-4" /> }
  ],
  'Legal': [
    { name: 'Kebijakan Privasi', href: '/privasi', icon: <FileText className="h-4 w-4" /> },
    { name: 'Syarat & Ketentuan', href: '/syarat', icon: <FileText className="h-4 w-4" /> }
  ]
}

export default function SitemapsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-ui-navy py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-ui-yellow/10 rounded-lg w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-10 w-10 text-ui-yellow" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Peta Situs
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Navigasi lengkap untuk semua halaman website Universitas Pasifik
              </p>
            </div>
          </div>
        </section>

        {/* Sitemap */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(sitemap).map(([category, pages]) => (
                  <div
                    key={category}
                    className="bg-white rounded-lg shadow-lg border-2 overflow-hidden"
                  >
                    <div className="bg-ui-navy text-white px-6 py-4">
                      <h2 className="text-lg font-bold">
                        {category}
                      </h2>
                    </div>
                    <ul className="divide-y">
                      {pages.map((page, idx) => (
                        <li key={idx}>
                          <Link
                            href={page.href}
                            className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors text-gray-700 hover:text-ui-navy"
                          >
                            <div className="bg-ui-yellow/10 rounded p-2">
                              <div className="text-ui-yellow text-sm">
                                {page.icon}
                              </div>
                            </div>
                            <span className="font-medium">
                              {page.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Admin Link */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-ui-navy mb-6">
                Halaman Administrasi
              </h2>
              <Link href="/admin">
                <div className="inline-flex items-center gap-3 bg-ui-navy text-white px-8 py-4 rounded-lg hover:bg-ui-navy/80 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="font-bold">Dashboard Admin</span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                Hanya untuk personel UI yang terdaftar
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

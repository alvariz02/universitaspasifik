import PageHero from '@/components/layout/PageHero'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Shield, Lock, Eye } from 'lucide-react'

export default function PrivasiPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="public-page flex-1">
        {/* Page Header */}
        <PageHero title={<>Kebijakan Privasi</>} description={<>Perlindungan data dan privasi pengunjung website Universitas Pasifik</>} />

        {/* Content */}
        <section className="site-section">
          <div className="site-container">
            <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <h2 className="section-title font-bold text-unipas-primary mb-4">
                  Pernyataan Privasi
                </h2>
                <p className="text-gray-700">
                  Universitas Pasifik berkomitmen untuk melindungi privasi dan keamanan data pribadi 
                  pengunjung website kami. Dokumen ini menjelaskan bagaimana kami mengumpulkan, 
                  menggunakan, dan melindungi informasi Anda.
                </p>
              </div>

              <h3 className="text-xl font-bold text-unipas-primary mb-4 flex items-center gap-2">
                <Eye className="h-6 w-6 text-ui-yellow" />
                Informasi yang Dikumpulkan
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
                <li>Informasi yang Anda berikan secara sukarela (nama, email, nomor telepon)</li>
                <li>Informasi teknis (alamat IP, jenis browser, sistem operasi)</li>
                <li>Informasi penggunaan (halaman yang dikunjungi, waktu kunjungan)</li>
                <li>Cookie dan teknologi pelacakan lainnya</li>
              </ul>

              <h3 className="text-xl font-bold text-unipas-primary mb-4 flex items-center gap-2">
                <Lock className="h-6 w-6 text-ui-yellow" />
                Penggunaan Informasi
              </h3>
              <div className="space-y-4 text-gray-700 mb-8">
                <p>
                  <strong>Untuk tujuan akademik:</strong> Memproses pendaftaran mahasiswa baru, 
                  menyediakan informasi program studi, dan mengelola portal akademik.
                </p>
                <p>
                  <strong>Untuk komunikasi:</strong> Mengirim informasi penting, pengumuman, dan 
                  respons terhadap pertanyaan Anda.
                </p>
                <p>
                  <strong>Untuk perbaikan layanan:</strong> Menganalisis penggunaan website untuk 
                  meningkatkan pengalaman pengguna.
                </p>
              </div>

              <h3 className="text-xl font-bold text-unipas-primary mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-ui-yellow" />
                Perlindungan Data
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
                <li>Data disimpan dengan enkripsi dan keamanan standar industri</li>
                <li>Akses terbatas untuk personel yang membutuhkannya</li>
                <li>Pencadangan rutin untuk mencegah kehilangan data</li>
                <li>Peninjauan berkala terhadap kebijakan keamanan</li>
              </ul>

              <h3 className="text-xl font-bold text-unipas-primary mb-4">
                Hak Anda
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
                <li>Mengakses dan mengoreksi data pribadi Anda</li>
                <li>Meminta penghapusan data yang tidak diperlukan</li>
                <li>Memilih untuk tidak menerima komunikasi pemasaran</li>
                <li>Menarik persetujuan untuk pengumpulan data</li>
              </ul>

              <div className="bg-unipas-primary/5 rounded-lg p-6 border-2 border-ui-navy/10">
                <h3 className="text-lg font-bold text-unipas-primary mb-2">
                  Hubungi Kami
                </h3>
                <p className="text-gray-700">
                  Untuk pertanyaan atau permintaan terkait privasi, silakan hubungi kami melalui 
                  email: <strong>humas@unipas.ac.id</strong>
                </p>
              </div>

              <p className="text-sm text-muted-foreground mt-8">
                Kebijakan privasi ini terakhir diperbarui pada {new Date().toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

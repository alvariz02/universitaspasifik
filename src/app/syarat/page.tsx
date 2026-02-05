import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FileText, CheckCircle, XCircle } from 'lucide-react'

export default function SyaratPage() {
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
                Syarat & Ketentuan
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Aturan penggunaan website dan layanan Universitas Pasifik
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-ui-navy mb-4">
                  Penerimaan Syarat
                </h2>
                <p className="text-gray-700">
                  Dengan mengakses dan menggunakan website Universitas Pasifik, Anda setuju untuk 
                  mematuhi syarat dan ketentuan berikut:
                </p>
              </div>

              <h3 className="text-xl font-bold text-ui-navy mb-4 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Hak dan Kewajiban Pengguna
              </h3>
              <div className="space-y-4 text-gray-700 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                  <div>
                    <strong>Menggunakan website untuk tujuan yang sah:</strong> Hanya untuk 
                    keperluan akademik, administrasi, atau informasi.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                  <div>
                    <strong>Menjaga kerahasiaan akun:</strong> Tidak membagikan informasi 
                    login kepada pihak lain.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                  <div>
                    <strong>Menghormati hak cipta:</strong> Tidak menyalin atau menggunakan 
                    konten tanpa izin.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                  <div>
                    <strong>Memberikan informasi akurat:</strong> Data yang diberikan harus benar 
                    dan dapat dipertanggung jawabkan.
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-ui-navy mb-4 flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-500" />
                Larangan Penggunaan
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
                <li>Menggunakan website untuk kegiatan ilegal atau melawan hukum</li>
                <li>Menyebarluaskan virus, malware, atau program berbahaya lainnya</li>
                <li>Melakukan hacking, cracking, atau serangan keamanan lainnya</li>
                <li>Mengganggu atau merusak operasi website dan layanan</li>
                <li>Memalsukan identitas atau menyamar sebagai pihak lain</li>
                <li>Mengumpulkan data pribadi pengguna tanpa izin</li>
                <li>Melakukan spam atau pengiriman pesan massal</li>
                <li>Melanggar hak cipta atau kekayaan intelektual</li>
              </ul>

              <h3 className="text-xl font-bold text-ui-navy mb-4">
                Pembatasan Tanggung Jawab
              </h3>
              <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200 mb-8">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>UI tidak bertanggung jawab atas kerugian akibat penggunaan website</li>
                  <li>Konten yang diunggah pengguna adalah tanggung jawab pengguna</li>
                  <li>UI dapat mengubah syarat dan ketentuan tanpa pemberitahuan sebelumnya</li>
                  <li>Pelanggaran dapat mengakibatkan penangguhan atau penghentian akses</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-ui-navy mb-4">
                Hak UI
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
                <li>Mengubah, menangguhkan, atau menghentikan layanan tanpa pemberitahuan</li>
                <li>Memodifikasi konten tanpa persetujuan pengguna</li>
                <li>Membatasi akses jika terjadi pelanggaran syarat dan ketentuan</li>
                <li>Menghapus konten yang melanggar aturan tanpa pemberitahuan</li>
              </ul>

              <h3 className="text-xl font-bold text-ui-navy mb-4">
                Penyelesaian Sengketa
              </h3>
              <div className="bg-ui-navy/5 rounded-lg p-6 border-2 border-ui-navy/10 mb-8">
                <p className="text-gray-700 mb-4">
                  Sengketa terkait penggunaan website akan diselesaikan melalui:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Negosiasi antara pihak yang berseberang</li>
                  <li>Mediasi oleh pihak ketiga yang netral</li>
                  <li>Penyelesaian melalui proses hukum yang berlaku</li>
                </ol>
              </div>

              <div className="bg-ui-yellow/10 rounded-lg p-6 border-2 border-ui-yellow/20">
                <h3 className="text-lg font-bold text-ui-navy mb-2">
                  Pertanyaan?
                </h3>
                <p className="text-gray-700">
                  Untuk pertanyaan atau klarifikasi terkait syarat dan ketentuan, 
                  silakan hubungi: <strong>humas@unipas.ac.id</strong>
                </p>
              </div>

              <p className="text-sm text-muted-foreground mt-8">
                Syarat dan ketentuan ini terakhir diperbarui pada {new Date().toLocaleDateString('id-ID', {
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

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Calendar } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-unipas-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About Unipas */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo-unipas.jpeg" 
                alt="Universitas Pasifik Morotai" 
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-bold">Universitas Pasifik Morotai</h3>
                <p className="text-xs text-gray-300">Kampus Maritim, Kampus Unggul</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Universitas Pasifik Morotai adalah universitas modern yang berdedikasi untuk 
              mencerdaskan kehidupan bangsa dengan fokus pada maritim dan teknologi.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-unipas-accent">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/fakultas" className="text-gray-300 hover:text-unipas-accent transition-colors">
                  Fakultas
                </Link>
              </li>
              <li>
                <Link href="/program-studi" className="text-gray-300 hover:text-unipas-accent transition-colors">
                  Program Studi
                </Link>
              </li>
              <li>
                <Link href="/penerimaan" className="text-gray-300 hover:text-unipas-accent transition-colors">
                  Penerimaan Mahasiswa Baru
                </Link>
              </li>
              <li>
                <Link href="/berita" className="text-gray-300 hover:text-unipas-accent transition-colors">
                  Berita & Informasi
                </Link>
              </li>
              <li>
                <Link href="/penelitian" className="text-gray-300 hover:text-unipas-accent transition-colors">
                  Penelitian
                </Link>
              </li>
              <li>
                <Link href="/fasilitas" className="text-gray-300 hover:text-unipas-accent transition-colors">
                  Fasilitas
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-unipas-accent">Kontak Kami</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-unipas-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Kampus Morotai</p>
                  <p className="text-gray-400">Jln. A. Sudirman, Lemonade, Daruba, Morotai Selatan.</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-unipas-accent shrink-0" />
                <span>(0921) 123456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-unipas-accent shrink-0" />
                <span>info@unipas.ac.id</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-unipas-accent">Ikuti Kami</h3>
            <div className="flex gap-3 mb-6">
              <a
                href="https://facebook.com/unipas"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-unipas-accent hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/unipas"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-unipas-accent hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/unipas"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-unipas-accent hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/school/unipas"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-unipas-accent hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/unipas"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-unipas-accent hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            {/* <div className="space-y-3">
              <h4 className="font-medium text-sm">Berlangganan Newsletter</h4>
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-3 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-unipas-accent min-w-0"
                />
                <button className="px-4 py-2 bg-unipas-accent text-white font-medium rounded-md hover:bg-unipas-primary transition-colors whitespace-nowrap">
                  Berlangganan
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Universitas Pasifik Morotai. Hak Cipta Dilindungi.</p>
            <div className="flex gap-6 flex-wrap">
              <Link href="/login" className="hover:text-white transition-colors">
                Login Admin
              </Link>
              <Link href="/privasi" className="hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/syarat" className="hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link href="/sitemaps" className="hover:text-white transition-colors">
                Peta Situs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

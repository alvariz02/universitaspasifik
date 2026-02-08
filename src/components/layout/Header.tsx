'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User, ChevronDown, MapPin, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top Bar - Improved Mobile */}
        <div className="bg-gradient-to-r from-unipas-primary to-unipas-accent text-white">
          <div className="container mx-auto px-4">
            {/* Desktop Top Bar */}
            <div className="hidden md:flex justify-between items-center py-2 text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>Morotai, Maluku Utara</span>
                </div>
                <span className="text-white/70">•</span>
                <span>Universitas Pasifik</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="tel:+628123456789" className="hover:text-unipas-accent transition-colors flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span className="hidden lg:inline">+62 812-3456-789</span>
                </Link>
                <span className="text-white/70">•</span>
                <Link href="/login" className="hover:text-unipas-accent transition-colors flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Login Admin
                </Link>
              </div>
            </div>

            {/* Mobile Top Bar - Compact */}
            <div className="md:hidden flex justify-between items-center py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-unipas-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Universitas Pasifik</span>
              </div>
              <Link href="/login" className="hover:text-unipas-accent transition-colors p-2 rounded-lg hover:bg-white/10">
                <User className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className=" rounded-lg ">
              <img 
                src="/logo-unipas02.png" 
                alt="Unipas Logo" 
                className="h-15 w-15 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Universitas Pasifik Morotai</h1>
              <p className="text-sm text-muted-foreground">Unipas</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className="font-medium hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent px-4 py-2 rounded-md transition-colors">
                    Beranda
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-unipas-primary hover:text-unipas-accent hover:bg-unipas-accent/20 transition-colors">Tentang Unipas</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] lg:w-[500px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link href="/tentang" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-unipas-accent/10 to-unipas-accent/5 p-6 no-underline outline-none focus:shadow-md hover:from-unipas-accent/20 hover:to-unipas-accent/10 transition-colors">
                          <div className="mb-2 mt-4 text-lg font-medium text-unipas-primary">
                            Tentang Unipas
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Profil lengkap Universitas Pasifik Morotai
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/tentang/sejarah" className="block select-none space-y-1 rounded-md p-3 hover:bg-unipas-accent/20 transition-colors">
                          <div className="text-sm font-medium leading-none">Sejarah</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Perjalanan panjang Unipas
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/tentang/visi-misi" className="block select-none space-y-1 rounded-md p-3 hover:bg-unipas-accent/20 transition-colors">
                          <div className="text-sm font-medium leading-none">Visi & Misi</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Tujuan dan arah pengembangan
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/tentang/struktur" className="block select-none space-y-1 rounded-md p-3 hover:bg-unipas-accent/20 transition-colors">
                          <div className="text-sm font-medium leading-none">Struktur Organisasi</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Struktur kepemimpinan Unipas
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/tentang/rektorat" className="block select-none space-y-1 rounded-md p-3 hover:bg-unipas-accent/20 transition-colors">
                          <div className="text-sm font-medium leading-none">Pimpinan Unipas</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Rektorat dan dekanat
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-unipas-primary hover:text-unipas-accent hover:bg-unipas-accent/20 transition-colors">Akademik</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] lg:w-[500px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link href="/fakultas" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-unipas-accent/10 to-unipas-accent/5 p-6 no-underline outline-none focus:shadow-md hover:from-unipas-accent/20 hover:to-unipas-accent/10 transition-colors">
                          <div className="mb-2 mt-4 text-lg font-medium text-unipas-primary">
                            Fakultas & Program Studi
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Jelajahi 14 fakultas dan ratusan program studi Unipas
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/fakultas" className="block select-none space-y-1 rounded-md p-3 hover:bg-unipas-accent/20 transition-colors">
                          <div className="text-sm font-medium leading-none">Fakultas</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Daftar lengkap fakultas di Unipas
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/program-studi" className="block select-none space-y-1 rounded-md p-3 hover:bg-unipas-accent/20 transition-colors">
                          <div className="text-sm font-medium leading-none">Program Studi</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Program sarjana, magister, dan doktoral
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/penerimaan" className="block select-none space-y-1 rounded-md p-3 hover:bg-unipas-accent/20 transition-colors">
                          <div className="text-sm font-medium leading-none">Penerimaan</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Informasi penerimaan mahasiswa baru
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/penerimaan" className="font-medium hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent px-4 py-2 rounded-md transition-colors">
                    Penerimaan
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-unipas-primary hover:text-unipas-accent hover:bg-unipas-accent/20 transition-colors">Penelitian & Prestasi</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] lg:w-[500px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link href="/penelitian" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-unipas-accent/10 to-unipas-accent/5 p-6 no-underline outline-none focus:shadow-md hover:from-unipas-accent/20 hover:to-unipas-accent/10 transition-colors">
                          <div className="mb-2 mt-4 text-lg font-medium text-unipas-primary">
                            Penelitian & Inovasi
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Temuan penelitian dan inovasi dari Unipas
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/penelitian" className="block select-none space-y-1 rounded-md p-3 hover:bg-unipas-accent/20 transition-colors">
                          <div className="text-sm font-medium leading-none">Penelitian</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Kegiatan penelitian dan publikasi
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/prestasi" className="block select-none space-y-1 rounded-md p-3 hover:bg-unipas-accent/20 transition-colors">
                          <div className="text-sm font-medium leading-none">Prestasi</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Prestasi mahasiswa dan dosen
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/video-kegiatan" className="block select-none space-y-1 rounded-md p-3 hover:bg-unipas-accent/20 transition-colors">
                          <div className="text-sm font-medium leading-none">Video Kegiatan</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Video dokumentasi kegiatan kampus
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/jurnal" className="block select-none space-y-1 rounded-md p-3 hover:bg-unipas-accent/20 transition-colors">
                          <div className="text-sm font-medium leading-none">Jurnal Penelitian</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Publikasi ilmiah dan jurnal penelitian
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-unipas-primary hover:text-unipas-accent hover:bg-unipas-accent/20 transition-colors">Pengabdian</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] lg:w-[500px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link href="/pengabdian" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-unipas-accent/10 to-unipas-accent/5 p-6 no-underline outline-none focus:shadow-md hover:from-unipas-accent/20 hover:to-unipas-accent/10 transition-colors">
                          <div className="mb-2 mt-4 text-lg font-medium text-unipas-primary">
                            Pengabdian Masyarakat
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Program pengabdian dan tanggung jawab sosial Unipas
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/pengabdian" className="block select-none space-y-1 rounded-md p-3 hover:bg-unipas-accent/20 transition-colors">
                          <div className="text-sm font-medium leading-none">Program Pengabdian</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Kegiatan pengabdian kepada masyarakat
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/pengabdian#kemitraan" className="block select-none space-y-1 rounded-md p-3 hover:bg-unipas-accent/20 transition-colors">
                          <div className="text-sm font-medium leading-none">Kemitraan</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Jaringan kemitraan strategis
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:flex items-center gap-2 bg-unipas-primary text-white px-4 py-2 rounded-md hover:bg-unipas-accent transition-colors">
              <User className="h-4 w-4" />
              Login
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced Design */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background shadow-lg">
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-unipas-primary to-unipas-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">UP</span>
                  </div>
                  <div>
                    <div className="font-semibold text-unipas-primary">Universitas Pasifik</div>
                    <div className="text-xs text-muted-foreground">Menu Navigasi</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:bg-unipas-accent/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Main Navigation Items */}
              <div className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-unipas-accent/10 text-unipas-primary hover:text-unipas-accent rounded-lg font-medium transition-all group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-unipas-primary/10 rounded-lg flex items-center justify-center group-hover:bg-unipas-accent/20">
                    <span className="text-unipas-primary text-sm">🏠</span>
                  </div>
                  <div>
                    <div className="font-medium">Beranda</div>
                    <div className="text-xs text-muted-foreground">Halaman utama</div>
                  </div>
                </Link>
              </div>
              
              {/* Tentang Unipas Section */}
              <div className="pt-4">
                <div className="flex items-center gap-2 px-4 py-2">
                  <ChevronDown className="h-4 w-4 text-unipas-accent" />
                  <div className="font-semibold text-sm text-unipas-primary uppercase tracking-wider">Tentang Unipas</div>
                </div>
                <div className="space-y-1 pl-8">
                  {[
                    { href: "/tentang/sejarah", label: "Sejarah", desc: "Perjalanan Unipas" },
                    { href: "/tentang/visi-misi", label: "Visi & Misi", desc: "Tujuan pengembangan" },
                    { href: "/tentang/struktur", label: "Struktur Organisasi", desc: "Kepemimpinan Unipas" },
                    { href: "/tentang/rektorat", label: "Pimpinan Unipas", desc: "Rektorat dan dekanat" }
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-unipas-accent/10 text-unipas-primary hover:text-unipas-accent rounded-md transition-all group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Akademik Section */}
              <div className="pt-4">
                <div className="flex items-center gap-2 px-4 py-2">
                  <ChevronDown className="h-4 w-4 text-unipas-accent" />
                  <div className="font-semibold text-sm text-unipas-primary uppercase tracking-wider">Akademik</div>
                </div>
                <div className="space-y-1 pl-8">
                  {[
                    { href: "/fakultas", label: "Fakultas", desc: "Daftar fakultas" },
                    { href: "/program-studi", label: "Program Studi", desc: "Jenjang pendidikan" },
                    { href: "/penerimaan", label: "Penerimaan", desc: "Info pendaftaran" }
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-unipas-accent/10 text-unipas-primary hover:text-unipas-accent rounded-md transition-all group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Penelitian & Prestasi Section */}
              <div className="pt-4">
                <div className="flex items-center gap-2 px-4 py-2">
                  <ChevronDown className="h-4 w-4 text-unipas-accent" />
                  <div className="font-semibold text-sm text-unipas-primary uppercase tracking-wider">Penelitian & Prestasi</div>
                </div>
                <div className="space-y-1 pl-8">
                  {[
                    { href: "/penelitian", label: "Penelitian", desc: "Kegiatan riset" },
                    { href: "/prestasi", label: "Prestasi", desc: "Pencapaian" },
                    { href: "/video-kegiatan", label: "Video Kegiatan", desc: "Dokumentasi" },
                    { href: "/jurnal", label: "Jurnal Penelitian", desc: "Publikasi ilmiah" }
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-unipas-accent/10 text-unipas-primary hover:text-unipas-accent rounded-md transition-all group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pengabdian Section */}
              <div className="pt-4">
                <div className="flex items-center gap-2 px-4 py-2">
                  <ChevronDown className="h-4 w-4 text-unipas-accent" />
                  <div className="font-semibold text-sm text-unipas-primary uppercase tracking-wider">Pengabdian</div>
                </div>
                <div className="space-y-1 pl-8">
                  {[
                    { href: "/pengabdian", label: "Program Pengabdian", desc: "Kegiatan masyarakat" },
                    { href: "/pengabdian#kemitraan", label: "Kemitraan", desc: "Jaringan strategis" }
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-unipas-accent/10 text-unipas-primary hover:text-unipas-accent rounded-md transition-all group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Login Button - Mobile */}
              <div className="pt-4 mt-4 border-t">
                <Link
                  href="/login"
                  className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-unipas-primary to-unipas-accent text-white rounded-lg font-medium transition-all hover:shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Login Admin</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

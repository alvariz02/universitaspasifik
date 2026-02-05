'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User } from 'lucide-react'
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
        {/* Top Bar */}
        <div className="border-b bg-unipas-primary text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <span>Universitas Pasifik Morotai</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">Morotai, Maluku Utara</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="hover:text-unipas-accent transition-colors">
                Login Admin
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <div className="space-y-1">
                <Link
                  href="/"
                  className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Beranda
                </Link>
              </div>
              
              <div className="border-t pt-2">
                <div className="px-4 py-2 font-medium text-sm text-unipas-primary uppercase tracking-wider">
                  Tentang Unipas
                </div>
                <div className="space-y-1 pl-4">
                  <Link
                    href="/tentang/sejarah"
                    className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sejarah
                  </Link>
                  <Link
                    href="/tentang/visi-misi"
                    className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Visi & Misi
                  </Link>
                  <Link
                    href="/tentang/struktur"
                    className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Struktur Organisasi
                  </Link>
                  <Link
                    href="/tentang/rektorat"
                    className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pimpinan Unipas
                  </Link>
                </div>
              </div>

              <div className="border-t pt-2">
                <div className="px-4 py-2 font-medium text-sm text-unipas-primary uppercase tracking-wider">
                  Akademik
                </div>
                <div className="space-y-1 pl-4">
                  <Link
                    href="/fakultas"
                    className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Fakultas
                  </Link>
                  <Link
                    href="/program-studi"
                    className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Program Studi
                  </Link>
                  <Link
                    href="/penerimaan"
                    className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Penerimaan
                  </Link>
                </div>
              </div>

              <div className="border-t pt-2">
                <div className="px-4 py-2 font-medium text-sm text-unipas-primary uppercase tracking-wider">
                  Penelitian & Prestasi
                </div>
                <div className="space-y-1 pl-4">
                  <Link
                    href="/penelitian"
                    className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Penelitian
                  </Link>
                  <Link
                    href="/prestasi"
                    className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Prestasi
                  </Link>
                  <Link
                    href="/video-kegiatan"
                    className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Video Kegiatan
                  </Link>
                  <Link
                    href="/jurnal"
                    className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Jurnal Penelitian
                  </Link>
                </div>
              </div>

              <div className="border-t pt-2">
                <div className="px-4 py-2 font-medium text-sm text-unipas-primary uppercase tracking-wider">
                  Pengabdian
                </div>
                <div className="space-y-1 pl-4">
                  <Link
                    href="/pengabdian"
                    className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Program Pengabdian
                  </Link>
                  <Link
                    href="/pengabdian#kemitraan"
                    className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Kemitraan
                  </Link>
                </div>
              </div>

              <div className="border-t pt-2">
                <Link
                  href="/login"
                  className="block px-4 py-2 hover:bg-unipas-accent/20 text-unipas-primary hover:text-unipas-accent rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login Admin
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

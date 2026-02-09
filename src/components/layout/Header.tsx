'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown, MapPin, Phone, Mail, Globe, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
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
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-lg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-unipas-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-unipas-accent/5 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Modern Top Bar */}
        <div className="bg-gradient-to-r from-unipas-primary via-unipas-accent to-unipas-primary text-white">
          <div className="container mx-auto px-4">
            {/* Desktop Top Bar */}
            <div className="hidden md:flex justify-between items-center py-3 text-sm">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-6"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">Morotai, Maluku Utara</span>
                </div>
                <span className="text-white/50">•</span>
                <span className="font-medium">Universitas Pasifik</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-6"
              >
                <Link href="tel:+628123456789" className="hover:text-white/80 transition-colors flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="hidden lg:inline font-medium">+62 812-3456-789</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Top Bar */}
            <div className="md:hidden flex justify-between items-center py-3">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <Globe className="h-4 w-4 text-white" />
                </motion.div>
                <span className="text-sm font-bold">Universitas Pasifik</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center group">
            <Link href="/" className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="relative flex-shrink-0 mr-3"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-unipas-primary to-unipas-accent rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl p-3 shadow-lg group-hover:shadow-xl transition-shadow">
                  <img 
                    src="/logo-unipas02.png" 
                    alt="Unipas Logo" 
                    className="h-12 w-12 object-contain"
                  />
                </div>
              </motion.div>
            </Link>
            
            <Link href="/" className="flex flex-col justify-center">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg md:text-xl lg:text-2xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent leading-none"
              >
                Universitas Pasifik
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xs md:text-sm text-muted-foreground font-semibold leading-none"
              >
                Morotai
              </motion.p>
            </Link>
          </div>

          {/* Desktop Navigation - dengan positioning yang diperbaiki */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      href="/" 
                      className="font-bold hover:bg-gradient-to-r hover:from-unipas-primary/10 hover:to-unipas-accent/10 text-unipas-primary hover:text-unipas-accent px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 border border-transparent hover:border-unipas-accent/20"
                    >
                      Beranda
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-unipas-primary hover:text-unipas-accent hover:bg-gradient-to-r hover:from-unipas-primary/10 hover:to-unipas-accent/10 px-6 py-3 rounded-xl transition-all duration-300 border border-transparent hover:border-unipas-accent/20">
                    Tentang Unipas
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="grid gap-4 p-6 w-[500px]">
                      <div className="col-span-2">
                        <NavigationMenuLink asChild>
                          <Link href="/tentang" className="flex h-full w-full select-none flex-col justify-end rounded-2xl bg-gradient-to-br from-unipas-primary/10 to-unipas-accent/5 p-6 no-underline outline-none hover:from-unipas-primary/20 hover:to-unipas-accent/10 transition-all duration-300 group">
                            <div className="mb-2 mt-4 text-xl font-black text-unipas-primary">
                              Tentang Unipas
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Profil lengkap Universitas Pasifik Morotai
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {[
                        { href: "/tentang/sejarah", label: "Sejarah", desc: "Perjalanan panjang Unipas" },
                        { href: "/tentang/visi-misi", label: "Visi & Misi", desc: "Tujuan dan arah pengembangan" },
                        { href: "/tentang/struktur", label: "Struktur Organisasi", desc: "Struktur kepemimpinan Unipas" },
                        { href: "/tentang/rektorat", label: "Pimpinan Unipas", desc: "Rektorat dan dekanat" }
                      ].map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link href={item.href} className="block select-none space-y-2 rounded-xl p-4 hover:bg-gradient-to-r hover:from-unipas-primary/10 hover:to-unipas-accent/10 transition-all duration-300 group">
                            <div className="font-bold text-sm leading-none text-unipas-primary group-hover:text-unipas-accent">{item.label}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.desc}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-unipas-primary hover:text-unipas-accent hover:bg-gradient-to-r hover:from-unipas-primary/10 hover:to-unipas-accent/10 px-6 py-3 rounded-xl transition-all duration-300 border border-transparent hover:border-unipas-accent/20">
                    Akademik
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="grid gap-4 p-6 w-[500px]">
                      <div className="col-span-2">
                        <NavigationMenuLink asChild>
                          <Link href="/fakultas" className="flex h-full w-full select-none flex-col justify-end rounded-2xl bg-gradient-to-br from-unipas-primary/10 to-unipas-accent/5 p-6 no-underline outline-none hover:from-unipas-primary/20 hover:to-unipas-accent/10 transition-all duration-300 group">
                            <div className="mb-2 mt-4 text-xl font-black text-unipas-primary">
                              Fakultas & Program Studi
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Jelajahi 14 fakultas dan ratusan program studi Unipas
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {[
                        { href: "/fakultas", label: "Fakultas", desc: "Daftar lengkap fakultas di Unipas" },
                        { href: "/program-studi", label: "Program Studi", desc: "Program sarjana, magister, dan doktoral" },
                        { href: "/penerimaan", label: "Penerimaan", desc: "Informasi penerimaan mahasiswa baru" }
                      ].map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link href={item.href} className="block select-none space-y-2 rounded-xl p-4 hover:bg-gradient-to-r hover:from-unipas-primary/10 hover:to-unipas-accent/10 transition-all duration-300 group">
                            <div className="font-bold text-sm leading-none text-unipas-primary group-hover:text-unipas-accent">{item.label}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.desc}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      href="/penerimaan" 
                      className="font-bold hover:bg-gradient-to-r hover:from-unipas-primary/10 hover:to-unipas-accent/10 text-unipas-primary hover:text-unipas-accent px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 border border-transparent hover:border-unipas-accent/20"
                    >
                      Penerimaan
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-unipas-primary hover:text-unipas-accent hover:bg-gradient-to-r hover:from-unipas-primary/10 hover:to-unipas-accent/10 px-6 py-3 rounded-xl transition-all duration-300 border border-transparent hover:border-unipas-accent/20">
                    Penelitian & Prestasi
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-1/2 -translate-x-full top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="grid gap-4 p-6 w-[500px]">
                      <div className="col-span-2">
                        <NavigationMenuLink asChild>
                          <Link href="/penelitian" className="flex h-full w-full select-none flex-col justify-end rounded-2xl bg-gradient-to-br from-unipas-primary/10 to-unipas-accent/5 p-6 no-underline outline-none hover:from-unipas-primary/20 hover:to-unipas-accent/10 transition-all duration-300 group">
                            <div className="mb-2 mt-4 text-xl font-black text-unipas-primary">
                              Penelitian & Inovasi
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Temuan penelitian dan inovasi dari Unipas
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {[
                        { href: "/penelitian", label: "Penelitian", desc: "Kegiatan penelitian dan publikasi" },
                        { href: "/prestasi", label: "Prestasi", desc: "Prestasi mahasiswa dan dosen" },
                        { href: "/video-kegiatan", label: "Video Kegiatan", desc: "Video dokumentasi kegiatan kampus" },
                        { href: "/jurnal", label: "Jurnal Penelitian", desc: "Publikasi ilmiah dan jurnal penelitian" }
                      ].map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link href={item.href} className="block select-none space-y-2 rounded-xl p-4 hover:bg-gradient-to-r hover:from-unipas-primary/10 hover:to-unipas-accent/10 transition-all duration-300 group">
                            <div className="font-bold text-sm leading-none text-unipas-primary group-hover:text-unipas-accent">{item.label}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.desc}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-unipas-primary hover:text-unipas-accent hover:bg-gradient-to-r hover:from-unipas-primary/10 hover:to-unipas-accent/10 px-6 py-3 rounded-xl transition-all duration-300 border border-transparent hover:border-unipas-accent/20">
                    Pengabdian
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-1/2 -translate-x-full top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="grid gap-4 p-6 w-[500px]">
                      <div className="col-span-2">
                        <NavigationMenuLink asChild>
                          <Link href="/pengabdian" className="flex h-full w-full select-none flex-col justify-end rounded-2xl bg-gradient-to-br from-unipas-primary/10 to-unipas-accent/5 p-6 no-underline outline-none hover:from-unipas-primary/20 hover:to-unipas-accent/10 transition-all duration-300 group">
                            <div className="mb-2 mt-4 text-xl font-black text-unipas-primary">
                              Pengabdian Masyarakat
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Program pengabdian dan tanggung jawab sosial Unipas
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {[
                        { href: "/pengabdian", label: "Program Pengabdian", desc: "Kegiatan pengabdian kepada masyarakat" },
                        { href: "/pengabdian#kemitraan", label: "Kemitraan", desc: "Jaringan kemitraan strategis" }
                      ].map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link href={item.href} className="block select-none space-y-2 rounded-xl p-4 hover:bg-gradient-to-r hover:from-unipas-primary/10 hover:to-unipas-accent/10 transition-all duration-300 group">
                            <div className="font-bold text-sm leading-none text-unipas-primary group-hover:text-unipas-accent">{item.label}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.desc}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-unipas-primary/10 rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-unipas-primary" /> : <Menu className="h-6 w-6 text-unipas-primary" />}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden border-t bg-white/95 backdrop-blur-md shadow-xl"
          >
            <nav className="container mx-auto px-4 py-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-unipas-primary/20">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 bg-gradient-to-r from-unipas-primary to-unipas-accent rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <Zap className="h-5 w-5 text-white" />
                  </motion.div>
                  <div>
                    <div className="font-black text-unipas-primary text-lg">Universitas Pasifik</div>
                    <div className="text-xs text-muted-foreground font-medium">Menu Navigasi</div>
                  </div>
                </motion.div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:bg-unipas-accent/10 rounded-xl"
                >
                  <X className="h-5 w-5 text-unipas-primary" />
                </Button>
              </div>

              {/* Scrollable Mobile Navigation Items */}
              <div className="max-h-[60vh] overflow-y-auto space-y-4">
                <div className="space-y-3">
                  <Link
                    href="/"
                    className="flex items-center gap-4 px-4 py-4 hover:bg-gradient-to-r hover:from-unipas-primary/10 hover:to-unipas-accent/10 text-unipas-primary hover:text-unipas-accent rounded-2xl font-bold transition-all group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-10 h-10 bg-unipas-primary/10 rounded-xl flex items-center justify-center group-hover:bg-unipas-accent/20">
                      <Globe className="h-5 w-5 text-unipas-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Beranda</div>
                      <div className="text-xs text-muted-foreground">Halaman utama</div>
                    </div>
                  </Link>
                </div>
                
                {/* Other sections with modern styling */}
                <div className="space-y-4">
                  {[
                    { title: "Tentang Unipas", items: [
                      { href: "/tentang/sejarah", label: "Sejarah", desc: "Perjalanan Unipas" },
                      { href: "/tentang/visi-misi", label: "Visi & Misi", desc: "Tujuan pengembangan" },
                      { href: "/tentang/struktur", label: "Struktur Organisasi", desc: "Kepemimpinan Unipas" },
                      { href: "/tentang/rektorat", label: "Pimpinan Unipas", desc: "Rektorat dan dekanat" }
                    ]},
                    { title: "Akademik", items: [
                      { href: "/fakultas", label: "Fakultas", desc: "Daftar fakultas" },
                      { href: "/program-studi", label: "Program Studi", desc: "Jenjang pendidikan" },
                      { href: "/penerimaan", label: "Penerimaan", desc: "Info pendaftaran" }
                    ]},
                    { title: "Penelitian & Prestasi", items: [
                      { href: "/penelitian", label: "Penelitian", desc: "Kegiatan riset" },
                      { href: "/prestasi", label: "Prestasi", desc: "Pencapaian" },
                      { href: "/video-kegiatan", label: "Video Kegiatan", desc: "Dokumentasi" },
                      { href: "/jurnal", label: "Jurnal Penelitian", desc: "Publikasi ilmiah" }
                    ]},
                    { title: "Pengabdian", items: [
                      { href: "/pengabdian", label: "Program Pengabdian", desc: "Kegiatan masyarakat" },
                      { href: "/pengabdian#kemitraan", label: "Kemitraan", desc: "Jaringan strategis" }
                    ]}
                  ].map((section) => (
                    <div key={section.title}>
                      <div className="flex items-center gap-2 px-4 py-2">
                        <ChevronDown className="h-4 w-4 text-unipas-accent" />
                        <div className="font-black text-sm text-unipas-primary uppercase tracking-wider">{section.title}</div>
                      </div>
                      <div className="space-y-2 pl-6">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-3 hover:bg-gradient-to-r hover:from-unipas-primary/10 hover:to-unipas-accent/10 text-unipas-primary hover:text-unipas-accent rounded-xl transition-all group"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className="font-bold text-sm">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
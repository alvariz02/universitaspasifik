import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return <div className="min-h-screen flex flex-col"><Header /><main className="public-page flex-1">
    <PageHero title="Halaman tidak ditemukan" description="Halaman yang Anda cari mungkin sudah dipindahkan atau belum tersedia." />
    <div className="site-container max-w-3xl py-12"><div className="site-card p-8 text-center space-y-6"><p className="text-muted-foreground">Gunakan pencarian untuk menemukan informasi kampus.</p><div className="flex flex-wrap justify-center gap-3"><Button asChild><Link href="/cari">Cari Informasi</Link></Button><Button asChild variant="outline"><Link href="/">Kembali ke Beranda</Link></Button></div></div></div>
  </main><Footer /></div>
}

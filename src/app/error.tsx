'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="min-h-screen flex flex-col"><Header /><main className="public-page flex-1">
    <PageHero title="Halaman belum dapat dimuat" description="Terjadi kendala saat memuat informasi. Silakan coba kembali." />
    <div className="site-container max-w-3xl py-12"><div role="alert" className="site-card p-8 text-center space-y-6"><p className="text-muted-foreground">Jika kendala masih terjadi, Anda dapat kembali ke beranda atau mencoba lagi sebentar.</p><div className="flex flex-wrap justify-center gap-3"><Button onClick={reset}>Coba Lagi</Button><Button asChild variant="outline"><Link href="/">Kembali ke Beranda</Link></Button></div></div></div>
  </main><Footer /></div>
}

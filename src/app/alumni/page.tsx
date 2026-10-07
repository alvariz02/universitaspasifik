import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Alumni - Universitas Pasifik',
}

export default function AlumniPage() {
  return <div className="min-h-screen flex flex-col"><Header /><main className="public-page flex-1"><PageHero title="Alumni UNIPAS" description="Informasi dan layanan untuk alumni Universitas Pasifik Morotai." /><section className="site-section"><div className="site-container max-w-5xl"><div className="site-card p-6 md:p-10 space-y-4"><h2 className="section-title text-unipas-primary">Tetap terhubung dengan kampus</h2><p className="text-muted-foreground leading-relaxed">Temukan layanan tracer study dan sampaikan pengalaman Anda untuk membantu pengembangan Universitas Pasifik.</p><Button asChild><Link href="/alumni/tracer-study">Buka Tracer Study</Link></Button></div></div></section></main><Footer /></div>
}

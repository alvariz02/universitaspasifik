import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Tracer Study Alumni - Universitas Pasifik',
}

export default function TracerStudyPage() {
  return <div className="min-h-screen flex flex-col"><Header /><main className="public-page flex-1"><PageHero title="Tracer Study Alumni" description="Bantu pengembangan pendidikan melalui pengalaman dan masukan alumni." /><section className="site-section"><div className="site-container max-w-5xl"><div className="site-card p-6 md:p-10 space-y-4"><h2 className="section-title text-unipas-primary">Layanan tracer study</h2><p className="text-muted-foreground leading-relaxed">Formulir tracer study belum tersedia. Hubungi pihak kampus untuk informasi pendataan alumni.</p><Button asChild><Link href="/kontak">Hubungi Kampus</Link></Button></div></div></section></main><Footer /></div>
}

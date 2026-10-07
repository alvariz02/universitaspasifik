import type { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function PageHero({ title, description, children }: { title: ReactNode; description?: ReactNode; children?: ReactNode }) {
  return <section className="page-hero">
    <div className="site-container">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-sm text-white/75">
        <Link href="/" className="rounded hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4">Beranda</Link>
        <ChevronRight aria-hidden="true" className="h-4 w-4" /><span>Universitas Pasifik</span>
      </nav>
      <h1 className="page-title mx-auto max-w-4xl">{title}</h1>
      {description && <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">{description}</p>}
      {children && <div className="mt-6">{children}</div>}
    </div>
  </section>
}

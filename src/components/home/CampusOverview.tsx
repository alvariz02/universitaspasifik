import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CalendarDays, History, Target, Download } from 'lucide-react'

const calendarImage = '/Kalender%20%20Akademik%20Unipas%20Morotai%2020262027.png'

export default function CampusOverview() {
  return (
    <section className="bg-slate-50 py-14 md:py-20" aria-labelledby="campus-overview-title">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-unipas-accent">MENGENAL UNIPAS MOROTAI</p>
            <h2 id="campus-overview-title" className="text-2xl font-extrabold tracking-tight text-unipas-primary md:text-3xl">Arah, perjalanan, dan kehidupan akademik</h2>
          </div>
          <Link href="/tentang" className="inline-flex items-center gap-2 text-sm font-semibold text-unipas-primary">Tentang universitas <ArrowRight size={16} /></Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="flex flex-col rounded-2xl bg-unipas-primary p-7 text-white md:p-8">
            <div className="mb-6 flex items-center gap-3"><Target size={24} className="text-amber-300" /><h3 className="text-xl font-bold">Visi & Misi</h3></div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-200">Visi UNIPAS</p>
            <blockquote className="text-2xl font-semibold leading-snug tracking-tight">Unggul di Kawasan Pasifik Berbasis Potensi Lokal Tahun 2045</blockquote>
            <div className="mt-6 border-t border-white/20 pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-200">Misi kami</p>
              <ul className="space-y-3 text-sm leading-relaxed text-blue-50">
                <li>Pendidikan yang menghasilkan lulusan kompeten dan berdaya saing.</li>
                <li>Inovasi dan kolaborasi penelitian serta pengabdian masyarakat berbasis potensi lokal.</li>
                <li>Tata kelola berbudaya mutu dan kemitraan strategis di kawasan Pasifik.</li>
              </ul>
            </div>
            <Link href="/tentang/visi-misi" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber-200">Selengkapnya tentang visi-misi <ArrowRight size={16} /></Link>
          </article>

          <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 md:p-8">
            <div className="mb-6 flex items-center gap-3 text-unipas-primary"><History size={24} /><h3 className="text-xl font-bold">Sejarah Singkat</h3></div>
            <p className="text-5xl font-extrabold tracking-tight text-unipas-primary">2013<span className="ml-2 text-xs font-semibold tracking-normal text-slate-500">AWAL PERJALANAN</span></p>
            <p className="mt-5 text-sm leading-7 text-slate-600">Universitas Pasifik Morotai memperoleh izin operasional pada 5 Februari 2013 melalui keputusan Kemendikbud RI Nomor 08/E/O/2013. Perjalanan akademiknya dimulai dengan 6 fakultas dan 11 program studi.</p>
            <div className="my-6 space-y-4 border-l-2 border-amber-300 pl-5">
              <div><p className="text-sm font-bold text-unipas-primary">2012 · Momentum Sail Indonesia</p><p className="mt-1 text-xs leading-6 text-slate-500">Morotai menjadi penyelenggara Sail Indonesia.</p></div>
              <div><p className="text-sm font-bold text-unipas-primary">5 Februari 2013 · Izin operasional</p><p className="mt-1 text-xs leading-6 text-slate-500">Memulai perjalanan pendidikan tinggi di Pulau Morotai.</p></div>
            </div>
            <Link href="/tentang/sejarah" className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-unipas-primary">Telusuri sejarah UNIPAS <ArrowRight size={16} /></Link>
          </article>

          <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="px-7 pt-7 md:px-8 md:pt-8"><div className="mb-4 flex items-center gap-3 text-unipas-primary"><CalendarDays size={24} /><h3 className="text-xl font-bold">Kalender Akademik</h3></div><span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-unipas-primary">Tahun Akademik 2026/2027</span><p className="mt-4 text-sm leading-6 text-slate-600">Lihat jadwal kegiatan akademik dan rencanakan perjalanan studi Anda.</p></div>
            <Link href="/kalender-akademik" className="relative mx-7 my-6 block aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 ring-1 ring-slate-100 md:mx-8" aria-label="Lihat kalender akademik 2026/2027"><Image src={calendarImage} alt="Kalender akademik Universitas Pasifik Morotai 2026/2027" fill sizes="(max-width: 1024px) 90vw, 360px" className="object-contain p-2" /></Link>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 px-7 py-5 md:px-8"><Link href="/kalender-akademik" className="inline-flex items-center gap-2 text-sm font-semibold text-unipas-primary">Lihat kalender <ArrowRight size={16} /></Link><a href={calendarImage} download="Kalender-Akademik-Unipas-Morotai-2026-2027.png" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600"><Download size={15} />Unduh</a></div>
          </article>
        </div>
      </div>
    </section>
  )
}

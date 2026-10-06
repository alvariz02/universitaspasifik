'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CalendarDays, MapPin, Play, Building2, Newspaper, Trophy } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import ShareButton from '@/components/ShareButton'
import { newsCategories } from '@/lib/news-categories'
import styles from './CampusMagazine.module.css'

type DateValue = string | Date
interface News { id: number; title: string; slug: string; excerpt?: string; imageUrl?: string; category?: string; authorName?: string; publishedDate?: DateValue; isFeatured?: boolean }
interface Event { id: number; title: string; slug: string; eventDate: DateValue; location?: string }
interface Announcement { id: number; title: string; category?: string; priority?: string; isActive?: boolean }
interface Achievement { id: number; title: string; imageUrl?: string; achieverName?: string; level?: string; category?: string }
interface Faculty { id: number; name: string; slug: string; imageUrl?: string; departments?: { id: number }[] }
interface Video { id: number; title: string; description?: string; youtubeId: string; thumbnail?: string; category?: string; viewCount?: number; isFeatured?: boolean }
interface Props { news: News[]; events: Event[]; announcements: Announcement[]; achievements: Achievement[]; faculties: Faculty[]; videos: Video[] }

function categoryLabel(value?: string) { return newsCategories.find(item => item.value === value)?.label || value || 'Kabar Kampus' }
function dateLabel(value?: DateValue) {
  if (!value || Number.isNaN(new Date(value).getTime())) return ''
  return new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}
function Photo({ src, title, sizes = '(max-width: 768px) 100vw, 40vw' }: { src?: string; title: string; sizes?: string }) {
  return src ? <Image src={src} alt={title} fill sizes={sizes} className={styles.photo} /> : <div className={styles.placeholder}><Building2 size={48} strokeWidth={1} /><span>Universitas Pasifik Morotai</span></div>
}
function SectionHeading({ number, title, href, dark = false }: { number: string; title: string; href: string; dark?: boolean }) {
  return <div className={`${styles.heading} ${dark ? styles.headingDark : ''}`}><div><span className={styles.sectionNumber}>{number}</span><h2>{title}</h2></div><Link href={href}>Lihat semua <ArrowRight size={16} /></Link></div>
}
function NewsMeta({ item }: { item: News }) {
  return <div className={styles.meta}>{item.authorName && <span>{item.authorName}</span>}{dateLabel(item.publishedDate) && <span><CalendarDays size={13} />{dateLabel(item.publishedDate)}</span>}</div>
}

export default function CampusMagazine({ news, events, announcements, achievements, faculties, videos }: Props) {
  const [category, setCategory] = useState('all')
  const [visible, setVisible] = useState(4)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const spotlight = [...news.filter(item => item.isFeatured), ...news.filter(item => !item.isFeatured)].slice(0, 4)
  const filteredNews = category === 'all' ? news : news.filter(item => item.category === category)
  const categoryValues = [...new Set([...newsCategories.slice(-3).map(item => item.value), ...news.map(item => item.category).filter((value): value is string => !!value)])]
  const agenda = events.filter(item => new Date(item.eventDate).getTime() >= Date.now()).sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()).slice(0, 3)
  const notices = announcements.filter(item => item.isActive !== false).slice(0, 4)
  const videoItems = [...videos.filter(item => item.isFeatured), ...videos.filter(item => !item.isFeatured)].slice(0, 4)
  const selectCategory = (value: string) => { setCategory(value); setVisible(4) }

  return <div className={styles.magazine}>
    <section className={styles.section} aria-label="Berita kampus">
      <div className={styles.intro}><span className={styles.eyebrow}>CERITA DARI KAMPUS</span><p>Gagasan, pencapaian, dan kabar terbaru dari Universitas Pasifik Morotai.</p></div>
      <SectionHeading number="01" title="Sorotan Kampus" href="/berita" />
      {spotlight.length ? <div className={styles.spotlight}>{spotlight.map((item, index) => <Link key={item.id} href={`/berita/${item.slug}`} className={`${styles.cover} ${index === 0 ? styles.leadCover : ''}`}>
        <Photo src={item.imageUrl} title={item.title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw" />
        <div className={styles.shade} /><span className={styles.coverCategory}>{categoryLabel(item.category)}</span>
        <div className={styles.coverContent}><span className={styles.coverIndex}>0{index + 1} / {index === 0 ? 'SOROTAN UTAMA' : 'KABAR KAMPUS'}</span><h3>{item.title}</h3><NewsMeta item={item} /><span className={styles.coverArrow}><ArrowRight size={19} /></span></div>
      </Link>)}</div> : <p className={styles.empty}>Berita kampus akan tampil di sini.</p>}

      <div className={styles.editorial}>
        <div className={styles.feed}>
          <SectionHeading number="02" title="Berita Terbaru" href="/berita" />
          <div className={styles.filters} aria-label="Filter kategori berita"><button onClick={() => selectCategory('all')} aria-pressed={category === 'all'}>Semua berita</button>{categoryValues.map(value => <button key={value} onClick={() => selectCategory(value)} aria-pressed={category === value}>{categoryLabel(value)}</button>)}</div>
          <div aria-live="polite">{filteredNews.slice(0, visible).map(item => <article key={item.id} className={styles.article}>
            <Link href={`/berita/${item.slug}`} className={styles.articlePhoto}><Photo src={item.imageUrl} title={item.title} sizes="(max-width: 640px) 100vw, 28vw" /></Link>
            <div className={styles.articleContent}><span className={styles.category}>{categoryLabel(item.category)}</span><h3><Link href={`/berita/${item.slug}`}>{item.title}</Link></h3><NewsMeta item={item} />{item.excerpt && <p>{item.excerpt}</p>}<div className={styles.articleActions}><Link href={`/berita/${item.slug}`} className={styles.readLink}>Baca cerita <ArrowRight size={16} /></Link><ShareButton title={item.title} url={`/berita/${item.slug}`} description={item.excerpt} /></div></div>
          </article>)}{!filteredNews.length && <p className={styles.empty}>Belum ada berita dalam kategori ini.</p>}</div>
          {filteredNews.length > visible ? <button className={styles.more} onClick={() => setVisible(count => count + 4)}>Muat berita lainnya <ArrowRight size={16} /></button> : <Link className={styles.more} href="/berita">Jelajahi semua berita <ArrowRight size={16} /></Link>}
        </div>
        <aside className={styles.sidebar}>
          <div className={styles.sidePanel}><div className={styles.sideTitle}><span className={styles.dot} /><h2>Pengumuman</h2><Link href="/pengumuman" aria-label="Semua pengumuman"><ArrowRight size={18} /></Link></div>{notices.length ? notices.map((item, index) => <Link href={`/pengumuman/${item.id}`} key={item.id} className={styles.notice}><span className={styles.noticeNumber}>0{index + 1}</span><div><span className={styles.smallLabel}>{item.priority === 'high' ? 'PENTING' : item.category || 'INFORMASI'}</span><h3>{item.title}</h3></div><ArrowRight size={15} /></Link>) : <p className={styles.sideEmpty}>Belum ada pengumuman terbaru.</p>}</div>
          <div className={`${styles.sidePanel} ${styles.agenda}`}><div className={styles.sideTitle}><h2>Agenda Kampus</h2><CalendarDays size={19} /></div>{agenda.length ? agenda.map(item => <Link key={item.id} href={`/event/${item.slug}`} className={styles.event}><div className={styles.dateBlock}><strong>{new Date(item.eventDate).getDate()}</strong><span>{new Date(item.eventDate).toLocaleDateString('id-ID', { month: 'short' })}</span></div><div><h3>{item.title}</h3>{item.location && <p><MapPin size={12} />{item.location}</p>}</div></Link>) : <p className={styles.sideEmpty}>Nantikan agenda kampus berikutnya.</p>}<Link href="/event" className={styles.readLink}>Semua agenda <ArrowRight size={15} /></Link></div>
          <div className={styles.sidePanel}><div className={styles.sideTitle}><h2>Jelajahi Kategori</h2><Newspaper size={18} /></div>{categoryValues.map(value => <button key={value} className={styles.categoryRow} aria-pressed={category === value} onClick={() => selectCategory(value)}><span>{categoryLabel(value)}</span><span>{news.filter(item => item.category === value).length}</span></button>)}</div>
        </aside>
      </div>
    </section>

    <section className={`${styles.section} ${styles.achievementSection}`}><SectionHeading number="03" title="Prestasi & Inspirasi" href="/prestasi" />
      <div className={styles.achievementGrid}>{achievements.slice(0, 4).map(item => <Link key={item.id} href={`/prestasi/${item.id}`} className={styles.achievementCard}><div className={styles.achievementPhoto}><Photo src={item.imageUrl} title={item.title} sizes="(max-width: 640px) 100vw, 25vw" /><span className={styles.awardBadge}><Trophy size={14} />{item.level || item.category || 'Prestasi'}</span></div><div className={styles.achievementContent}><h3>{item.title}</h3>{item.achieverName && <p>{item.achieverName}</p>}<span className={styles.readLink}>Lihat pencapaian <ArrowRight size={15} /></span></div></Link>)}</div>{!achievements.length && <p className={styles.empty}>Pencapaian civitas akademika akan tampil di sini.</p>}
    </section>

    <section className={styles.section}><SectionHeading number="04" title="Kenali Fakultas Kami" href="/fakultas" /><div className={styles.facultyGrid}>{faculties.map((item, index) => <Link href={`/fakultas/${item.slug}`} key={item.id} className={styles.faculty}><span className={styles.facultyNumber}>{String(index + 1).padStart(2, '0')}</span><Building2 size={25} strokeWidth={1.5} /><h3>{item.name}</h3>{item.departments && <p>{item.departments.length} program studi</p>}<ArrowRight size={19} className={styles.facultyArrow} /></Link>)}</div>{!faculties.length && <p className={styles.empty}>Informasi fakultas akan segera tersedia.</p>}</section>

    <section className={styles.videoSection}><div className={styles.section}><div className={styles.videoIntro}><span className={styles.eyebrow}>KAMPUS DALAM LENSA</span><p>Lihat lebih dekat kehidupan dan kegiatan di Universitas Pasifik Morotai.</p></div><SectionHeading number="05" title="Video Kegiatan" href="/video-kegiatan" dark />
      {videoItems.length ? <div className={styles.videoGrid}>{videoItems.map((item, index) => <button key={item.id} className={`${styles.videoCard} ${index === 0 ? styles.leadVideo : ''}`} onClick={() => setSelectedVideo(item)} aria-label={`Putar video ${item.title}`}><div className={styles.videoPhoto}><Photo src={item.thumbnail || `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`} title={item.title} /><div className={styles.shade} /><span className={styles.play}><Play size={index === 0 ? 27 : 18} fill="currentColor" /></span><span className={styles.watchLabel}>TONTON VIDEO</span></div><div className={styles.videoContent}><span className={styles.smallLabel}>{item.category || 'KEGIATAN KAMPUS'}</span><h3>{item.title}</h3>{index === 0 && item.description && <p>{item.description}</p>}</div></button>)}</div> : <p className={styles.empty}>Video kegiatan kampus akan tampil di sini.</p>}
    </div></section>
    <Dialog open={!!selectedVideo} onOpenChange={open => { if (!open) setSelectedVideo(null) }}><DialogContent className="max-w-4xl"><DialogHeader><DialogTitle>{selectedVideo?.title}</DialogTitle></DialogHeader>{selectedVideo && <iframe className="aspect-video w-full rounded-lg" src={`https://www.youtube.com/embed/${encodeURIComponent(selectedVideo.youtubeId)}?autoplay=1&rel=0`} title={selectedVideo.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />}</DialogContent></Dialog>
  </div>
}

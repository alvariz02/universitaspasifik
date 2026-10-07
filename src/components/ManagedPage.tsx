import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SafeContent } from '@/components/SafeContent'
import PageHero from '@/components/layout/PageHero'

export default function ManagedPage({ page }: { page: { title: string; content: string } }) {
  return <div className="min-h-screen flex flex-col"><Header /><main className="public-page flex-1"><PageHero title={page.title} /><article className="site-container py-12 max-w-5xl"><div className="site-card p-6 md:p-10"><SafeContent content={page.content} /></div></article></main><Footer /></div>
}

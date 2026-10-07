import PageHero from '@/components/layout/PageHero'
import { Metadata } from 'next'
import JournalGallery from '@/components/JournalGallery'
import { db } from '@/lib/db'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Jurnal Penelitian - Universitas Pasifik Morotai',
  description: 'Kumpulan jurnal penelitian dan publikasi ilmiah dari Universitas Pasifik Morotai',
}

async function getJournals() {
  try {
    const journals = await db.journal.findMany({
      where: { isActive: true },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50,
      include: {
        faculty: true
      }
    })
    
    return journals
  } catch (error) {
    console.error('Error fetching journals:', error)
    return []
  }
}

async function getFaculties() {
  try {
    const faculties = await db.faculty.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    
    return faculties
  } catch (error) {
    console.error('Error fetching faculties:', error)
    return []
  }
}

export default async function JurnalPage() {
  const [journals, faculties] = await Promise.all([
    getJournals(),
    getFaculties()
  ])

  return (
    <div className="min-h-screen flex flex-col bg-unipas-muted">
      <Header />
      <main className="public-page flex-1">
      {/* Hero Section */}
      <PageHero title={<>Jurnal Penelitian</>} description={<>Kumpulan jurnal penelitian dan publikasi ilmiah dari civitas akademika Universitas Pasifik Morotai</>} />

      {/* Journal Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {journals.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum ada jurnal tersedia</h3>
            <p className="text-gray-500">Jurnal penelitian akan segera ditambahkan</p>
          </div>
        ) : (
          <JournalGallery journals={journals as any} faculties={faculties} />
        )}
      </div>
      </main>
      <Footer />
    </div>
  )
}
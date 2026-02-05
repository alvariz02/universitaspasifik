import { Metadata } from 'next'
import JournalGallery from '@/components/JournalGallery'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Jurnal Penelitian - Universitas Pasifik Morotai',
  description: 'Kumpulan jurnal penelitian dan publikasi ilmiah dari Universitas Pasifik Morotai',
}

async function getJournals() {
  try {
    const journals = await db.journal.findMany({
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
    <div className="min-h-screen bg-unipas-muted">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-unipas-primary to-unipas-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Jurnal Penelitian
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Kumpulan jurnal penelitian dan publikasi ilmiah dari civitas akademika Universitas Pasifik Morotai
            </p>
          </div>
        </div>
      </div>

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
    </div>
  )
}
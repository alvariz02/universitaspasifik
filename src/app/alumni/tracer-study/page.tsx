import React from 'react'

export const metadata = {
  title: 'Tracer Study Alumni - Universitas Pasifik',
}

export default function TracerStudyPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-unipas-primary">Tracer Study Alumni</h1>
      <p className="mt-4 text-muted-foreground">Terima kasih telah menjadi bagian dari Unipas. Silakan isi formulir tracer study untuk membantu pengembangan program kami.</p>

      <section className="mt-8">
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">(Form tracer study dapat ditambahkan di sini — implementasi form tersendiri diperlukan.)</p>
        </div>
      </section>
    </main>
  )
}

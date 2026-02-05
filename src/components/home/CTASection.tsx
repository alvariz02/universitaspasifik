import Link from 'next/link'
import { ArrowRight, GraduationCap, BookOpen, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  const features = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'Pendidikan Berkualitas',
      description: 'Kurikulum modern dengan standar internasional'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Fasilitas Lengkap',
      description: 'Laboratorium, perpustakaan, dan fasilitas modern'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Lulusan Berkualitas',
      description: 'Alumni sukses di berbagai bidang industri'
    }
  ]

  return (
    <section className="py-20 bg-linear-to-br from-unipas-secondary via-white to-unipas-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-unipas-primary/3 via-unipas-accent/5 to-unipas-primary/3"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-unipas-primary via-unipas-accent to-unipas-primary"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-unipas-primary mb-4">
            Siap Bergabung dengan Keluarga Unipas?
          </h2>
          <p className="text-xl text-unipas-text mb-8 max-w-2xl mx-auto">
            Daftarkan diri Anda sekarang dan menjadi bagian dari Universitas Pasifik Morotai,
            kampus maritim terbaik di Indonesia
          </p>
          <Link href="/penerimaan">
            <Button
              size="lg"
              className="bg-linear-to-r from-unipas-primary via-unipas-accent to-unipas-primary hover:from-unipas-accent hover:via-unipas-primary hover:to-unipas-accent text-white px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 border border-white/20"
            >
              Daftar Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-white via-unipas-secondary to-unipas-muted rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-unipas-accent/30 backdrop-blur-sm"
            >
              <div className="bg-linear-to-br from-unipas-accent/30 via-unipas-primary/20 to-unipas-accent/30 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="text-white drop-shadow-md">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-unipas-primary text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-ui-navy/80 text-sm mb-4">
            Jalur pendaftaran tersedia untuk berbagai jenjang pendidikan
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/penerimaan">
              <Button variant="outline" className="border-ui-navy text-ui-navy hover:bg-ui-navy hover:text-white">
                SNBP
              </Button>
            </Link>
            <Link href="/penerimaan">
              <Button variant="outline" className="border-ui-navy text-ui-navy hover:bg-ui-navy hover:text-white">
                SNBT
              </Button>
            </Link>
            <Link href="/penerimaan">
              <Button variant="outline" className="border-ui-navy text-ui-navy hover:bg-ui-navy hover:text-white">
                SIMAK UI
              </Button>
            </Link>
            <Link href="/penerimaan">
              <Button variant="outline" className="border-ui-navy text-ui-navy hover:bg-ui-navy hover:text-white">
                Pascasarjana
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

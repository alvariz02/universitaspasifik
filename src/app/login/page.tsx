'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, User, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from '@/hooks/useNavigationRouter'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      toast({
        title: 'Login Berhasil',
        description: 'Selamat datang kembali di Admin Panel Universitas Pasifik',
      })
      router.replace('/admin')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login gagal. Silakan coba lagi.'
      setError(message)
      toast({ title: 'Login Gagal', description: message, variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="public-page flex-1 flex items-center justify-center py-16 bg-gray-50">
        <div className="w-full max-w-md px-4">
          <div className="site-card bg-white p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-unipas-accent/20 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-unipas-primary" />
              </div>
              <h1 className="page-title text-unipas-primary mb-2">
                Login Admin
              </h1>
              <p className="text-muted-foreground">
                Masuk untuk mengelola konten website Unipas
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                  {error}
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-unipas-primary font-medium">
                  Email
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@unipas.ac.id"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-unipas-primary font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="•••••••••"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-unipas-primary text-white hover:bg-unipas-accent font-semibold py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Login...
                  </>
                ) : (
                  'Login'
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full border-unipas-primary text-unipas-primary hover:bg-unipas-primary hover:text-white"
                onClick={() => router.push('/')}
              >
                Kembali ke Beranda
              </Button>
            </form>

            {/* Help Info */}
            <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
              <p className="mb-2">
                Butuh bantuan?
              </p>
              <a href="/kontak" className="text-unipas-primary hover:text-unipas-primary/80 font-medium">
                Hubungi Administrator
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

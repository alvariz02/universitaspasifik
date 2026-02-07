'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, User, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
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

    const success = login(email, password)

    if (success) {
      toast({
        title: "Login Berhasil",
        description: "Selamat datang kembali di Admin Panel Universitas Pasifik",
        variant: "default",
      })
      router.push('/admin')
    } else {
      setError('Email atau password salah')
      toast({
        title: "Login Gagal",
        description: "Email atau password yang Anda masukkan salah",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 bg-gray-50">
        <div className="w-full max-w-md px-4">
          <div className="bg-white rounded-lg shadow-lg border-2 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-unipas-accent/20 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-unipas-primary" />
              </div>
              <h1 className="text-3xl font-bold text-unipas-primary mb-2">
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
                <Label htmlFor="email" className="text-ui-navy font-medium">
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

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-muted-foreground">
                    Ingat saya
                  </span>
                </label>
                <a href="#" className="text-sm text-unipas-accent hover:text-unipas-primary">
                  Lupa password?
                </a>
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

            {/* Demo Credentials Notice */}
            <div className="mt-6 bg-unipas-primary/5 rounded-lg p-4 border border-unipas-primary/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-unipas-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-unipas-primary mb-1">
                    Demo Credentials:
                  </p>
                  <p className="text-muted-foreground">
                    Email: <code className="bg-white px-2 py-1 rounded border text-xs">admin@unipas.ac.id</code>
                  </p>
                  <p className="text-muted-foreground">
                    Password: <code className="bg-white px-2 py-1 rounded border text-xs">admin123</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Help Info */}
            <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
              <p className="mb-2">
                Butuh bantuan?
              </p>
              <a href="/kontak" className="text-ui-navy hover:text-ui-navy/80 font-medium">
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

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  Bell,
  Trophy,
  GraduationCap,
  Building2,
  Users,
  Image as ImageIcon,
  SlidersHorizontal,
  Mail,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  Video,
  BookOpen,
  FolderTree
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Hero Sliders', href: '/admin/hero-sliders', icon: SlidersHorizontal },
  { name: 'Statistik', href: '/admin/statistics', icon: FileText },
  { name: 'Berita', href: '/admin/news', icon: Newspaper },
  { name: 'Event', href: '/admin/events', icon: Calendar },
  { name: 'Video Kegiatan', href: '/admin/videos', icon: Video },
  { name: 'Jurnal', href: '/admin/journals', icon: BookOpen },
  { name: 'Pengumuman', href: '/admin/announcements', icon: Bell },
  { name: 'Fakultas', href: '/admin/faculties', icon: Building2 },
  { name: 'Departemen', href: '/admin/departments', icon: FolderTree },
  { name: 'Prestasi', href: '/admin/achievements', icon: Trophy },
  { name: 'Penerimaan', href: '/admin/admissions', icon: GraduationCap },
  { name: 'Fasilitas', href: '/admin/facilities', icon: Building2 },
  { name: 'Staff', href: '/admin/staff', icon: Users },
  { name: 'Galeri', href: '/admin/galleries', icon: ImageIcon },
  { name: 'Kontak', href: '/admin/contact', icon: Mail },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, logout, user } = useAuth()
  const { toast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari panel admin",
      variant: "default",
    })
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-unipas-muted overflow-x-hidden">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-unipas-primary to-unipas-accent text-white px-4 py-3 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">UP</span>
          </div>
          <span className="font-bold text-white">Admin</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-white/20"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex pt-16 lg:pt-0">
        {/* Sidebar */}
        <aside
          className={
            `fixed left-0 top-16 lg:top-0 z-50 h-[calc(100vh-64px)] lg:h-screen w-72 bg-linear-to-b from-unipas-primary to-unipas-accent text-white transform transition-transform duration-300 ease-in-out overflow-y-auto ` +
            (sidebarOpen ? 'translate-x-0 lg:w-72' : '-translate-x-full lg:translate-x-0 lg:w-20')
          }
        >
          <div className="hidden lg:flex items-center gap-2 p-6 border-b border-white/20 sticky top-0">
            <div className="h-10 w-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold">UP</span>
            </div>
            <span className={`font-bold transition-opacity ${sidebarOpen ? 'opacity-100' : 'lg:opacity-0'}`}>
              Admin
            </span>
          </div>

          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-white/20 text-white font-medium shadow-lg backdrop-blur-sm'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className={`${sidebarOpen ? 'block' : 'lg:hidden'}`}>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-white/20 mt-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="w-full justify-start text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className={`ml-3 ${sidebarOpen ? 'block' : 'lg:hidden'}`}>Logout</span>
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main
          className={`relative flex-1 min-h-[calc(100vh-64px)] lg:min-h-screen transition-all duration-300 w-full overflow-auto ${
            sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'
          }`}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="w-full">{children}</div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

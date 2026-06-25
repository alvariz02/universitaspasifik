import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HomeClient from './HomeClient'

export const revalidate = 3600

export default function Home() {
  return <HomeClient />
}


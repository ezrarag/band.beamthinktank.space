import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CityGrid from '@/components/CityGrid'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CityGrid />
    </main>
  )
}

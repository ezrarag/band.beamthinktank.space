'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, Music, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const cities = [
  { name: 'Orlando', slug: 'orlando', color: 'city-orlando' },
  { name: 'Nashville', slug: 'nashville', color: 'city-nashville' },
  { name: 'Atlanta', slug: 'atlanta', color: 'city-atlanta' },
  { name: 'Augusta', slug: 'augusta', color: 'city-augusta' },
  { name: 'Knoxville', slug: 'knoxville', color: 'city-knoxville' },
  { name: 'Tampa', slug: 'tampa', color: 'city-tampa' },
  { name: 'Jackson', slug: 'jackson', color: 'city-jackson' },
  { name: 'Virginia', slug: 'virginia', color: 'city-virginia' },
  { name: 'Los Angeles', slug: 'los-angeles', color: 'city-losangeles' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false)
  const router = useRouter()

  const navigateToCity = (slug: string) => {
    router.push(`/city/${slug}`)
    setIsCityDropdownOpen(false)
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-beam rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">BEAM Band</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="text-gray-700 hover:text-beam-600 transition-colors">
              Events
            </Link>
            <Link href="/merch" className="text-gray-700 hover:text-beam-600 transition-colors">
              Merch
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-beam-600 transition-colors">
              About
            </Link>
            
            {/* City Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-beam-600 transition-colors"
              >
                <span>Select City</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isCityDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                  >
                    {cities.map((city) => (
                      <button
                        key={city.slug}
                        onClick={() => navigateToCity(city.slug)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                      >
                        <div className={`w-3 h-3 rounded-full bg-${city.color}`}></div>
                        <span>{city.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-beam-600 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/events"
                  className="block px-3 py-2 text-gray-700 hover:text-beam-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Events
                </Link>
                <Link
                  href="/merch"
                  className="block px-3 py-2 text-gray-700 hover:text-beam-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Merch
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2 text-gray-700 hover:text-beam-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                
                {/* Mobile City Selector */}
                <div className="px-3 py-2">
                  <div className="text-sm font-medium text-gray-500 mb-2">Select City</div>
                  <div className="grid grid-cols-2 gap-2">
                    {cities.map((city) => (
                      <button
                        key={city.slug}
                        onClick={() => navigateToCity(city.slug)}
                        className="text-left px-3 py-2 text-sm text-gray-700 hover:text-beam-600 hover:bg-gray-50 rounded-md transition-colors flex items-center space-x-2"
                      >
                        <div className={`w-2 h-2 rounded-full bg-${city.color}`}></div>
                        <span>{city.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

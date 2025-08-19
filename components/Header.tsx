'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, ChevronDown, User } from 'lucide-react'
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
    <header className="absolute top-8 left-8 z-50">
      {/* Floating Header Bar - Enhanced styling to match screenshots */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[rgb(10,11,10)] rounded-xl px-3 py-2 shadow-2xl border border-white/30 backdrop-blur-sm"
        style={{
          height: '57px',
          width: 'min-content',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          overflow: 'hidden'
        }}
      >
        {/* Hamburger Menu - 41x41px with enhanced styling */}
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-[41px] h-[41px] bg-white/10 rounded-lg flex items-center justify-center transition-all duration-200 border border-white/20 hover:border-white/40 hover:shadow-lg"
        >
          <Menu className="w-5 h-5 text-white" />
        </motion.button>

        {/* Logo/Brand Name - 30px height with enhanced typography */}
        <Link 
          href="/" 
          className="text-xl font-serif text-white tracking-wide hover:text-white/90 transition-colors duration-200 font-semibold"
          style={{ height: '30px', display: 'flex', alignItems: 'center' }}
        >
          Band
        </Link>

        {/* Navigation Menu - 39px height items with enhanced styling */}
        <motion.div 
          className="flex items-center gap-1"
          style={{ height: 'min-content' }}
        >
          {/* EVENTS */}
          <Link 
            href="/events" 
            className="h-[39px] px-4 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 font-medium relative group"
          >
            EVENTS
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* ABOUT */}
          <Link 
            href="/about" 
            className="h-[39px] px-4 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 font-medium relative group"
          >
            ABOUT
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* CITIES Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="h-[39px] px-4 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 font-medium"
            >
              <span>CITIES</span>
              <motion.div
                animate={{ rotate: isCityDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 ml-1" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {isCityDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-3 w-64 bg-black/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
                >
                  <div className="p-4">
                    <div className="text-white/60 text-xs font-medium mb-3 uppercase tracking-wider">Select City</div>
                    <div className="grid grid-cols-1 gap-1">
                      {cities.map((city) => (
                        <motion.button
                          key={city.slug}
                          whileHover={{ x: 4 }}
                          onClick={() => navigateToCity(city.slug)}
                          className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 flex items-center space-x-3 group"
                        >
                          <div className={`w-2 h-2 rounded-full bg-${city.color} group-hover:scale-125 transition-transform duration-200`}></div>
                          <span>{city.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* User Login Icon - 41px height with enhanced styling */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ height: '41px' }}
        >
          <Link 
            href="/login" 
            className="h-[41px] w-[41px] flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20 hover:border-white/40 hover:shadow-lg"
          >
            <User className="w-5 h-5 text-white" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Full Screen Menu Dropdown - Enhanced styling to match screenshots */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 flex items-center justify-center"
          >
            {/* Close Button - Top Left with enhanced styling */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 left-8 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-200 border border-white/20 hover:border-white/40 hover:shadow-lg"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Menu Content - Centered with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-center space-y-10"
            >
              {/* Top Decorative Line - Enhanced styling */}
              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-white/70 rounded-full shadow-sm"></div>
                <div className="w-24 h-px bg-white/40 shadow-sm"></div>
                <div className="w-3 h-3 bg-white/70 rounded-full shadow-sm"></div>
              </div>

              {/* Menu Items - Enhanced typography and spacing */}
              <div className="space-y-8">
                <Link
                  href="/events"
                  className="block text-5xl md:text-6xl font-serif text-white/90 hover:text-white transition-colors duration-300 cursor-pointer hover:scale-105 transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  EVENTS
                </Link>
                <Link
                  href="/cities"
                  className="block text-5xl md:text-6xl font-serif text-white/90 hover:text-white transition-colors duration-300 cursor-pointer hover:scale-105 transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CITIES
                </Link>
                <Link
                  href="/about"
                  className="block text-5xl md:text-6xl font-serif text-white/90 hover:text-white transition-colors duration-300 cursor-pointer hover:scale-105 transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link
                  href="/contact"
                  className="block text-5xl md:text-6xl font-serif text-white/90 hover:text-white transition-colors duration-300 cursor-pointer hover:scale-105 transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT
                </Link>
                <Link
                  href="/blog"
                  className="block text-5xl md:text-6xl font-serif text-white/90 hover:text-white transition-colors duration-300 cursor-pointer hover:scale-105 transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  BLOG
                </Link>
              </div>

              {/* Bottom Decorative Line - Enhanced styling */}
              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-white/70 rounded-full shadow-sm"></div>
                <div className="w-24 h-px bg-white/40 shadow-sm"></div>
                <div className="w-3 h-3 bg-white/70 rounded-full shadow-sm"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

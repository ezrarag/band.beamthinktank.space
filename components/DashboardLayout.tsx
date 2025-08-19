'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  DollarSign, 
  Shield, 
  User, 
  Menu, 
  X,
  LogOut,
  Bell
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface DashboardLayoutProps {
  children: React.ReactNode
  citySlug: string
  cityName: string
}

const navigation = [
  { name: 'Events', href: 'events', icon: Calendar },
  { name: 'Fundraising', href: 'fundraising', icon: DollarSign },
  { name: 'Governance', href: 'governance', icon: Shield },
  { name: 'Profile', href: 'profile', icon: User },
]

export default function DashboardLayout({ children, citySlug, cityName }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-gray-600 bg-opacity-75" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: sidebarOpen ? 0 : -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BB</span>
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">BEAM BAND</h1>
              <p className="text-sm text-gray-500 capitalize">{cityName}</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname.includes(item.href)
              return (
                <Link
                  key={item.name}
                  href={`/dashboard/${citySlug}/${item.href}`}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Participant</p>
              <p className="text-xs text-gray-500 truncate">@beam-band</p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              
              {/* Slack Integration Button */}
              <a
                href={`https://join.slack.com/t/beam-band-${citySlug}/invite/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.194 14.644c0 1.16-.943 2.107-2.107 2.107-1.16 0-2.107-.943-2.107-2.107 0-1.16.943-2.107 2.107-2.107 1.16 0 2.107.943 2.107 2.107zm5.882-9.568l1.178 2.35c.276.551.138 1.23-.276 1.606-.414.375-.993.375-1.407 0l-1.178-2.35c-.276-.551-.138-1.23.276-1.606.414-.375.993-.375 1.407 0zm5.882 9.568c0 1.16-.943 2.107-2.107 2.107-1.16 0-2.107-.943-2.107-2.107 0-1.16.943-2.107 2.107-2.107 1.16 0 2.107.943 2.107 2.107zm-2.107-5.882l-2.35-1.178c-.551-.276-1.23-.138-1.606.276-.375.414-.375.993 0 1.407l2.35 1.178c.551.276 1.23.138 1.606-.276.375-.414.375-.993 0-1.407z"/>
                </svg>
                Join Slack
              </a>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

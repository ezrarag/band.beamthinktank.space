'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      </div>

      {/* Main Content Container - Single Large Card */}
      <div className="min-h-screen p-4 lg:p-6 xl:p-8">
        <div className="max-w-7xl mx-auto h-full">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl overflow-hidden h-full">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 h-full w-full">
              
              {/* Left Column - 80% (4/5 columns) - Larger like screenshot */}
              <div className="lg:col-span-4 relative">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://sercfyvcyjmbvjqlryed.supabase.co/storage/v1/object/sign/homepage/pexels-pppsdavid-1749822.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZDJiOTUwYS01MzcxLTRjMzYtYjcxZS01ZmQ2NGIzN2VhYWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob21lcGFnZS9wZXhlbHMtcHBwc2RhdmlkLTE3NDk4MjIuanBnIiwiaWF0IjoxNzU1NjM4MDk1LCJleHAiOjE3ODcxNzQwOTV9.9DTUkqPXDr0rX_yoAaH2yKWq5rW38fLLFQOmw6Dbjtc')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                
                {/* Gradient Overlay - Entire Bottom Portion */}
                <div className="absolute bottom-0 left-0 right-0 h-64 lg:h-80 xl:h-96 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                
                {/* BEAM BAND Text - Bottom Left Corner */}
                <div className="relative z-10 p-8 lg:p-12 flex items-end h-96 lg:h-[32rem] xl:h-[36rem]">
                  <div className="text-left">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="font-forum"
                    >
                      <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                        BEAM
                      </div>
                      <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                        BAND
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Right Column - 20% (1/5 column) - Smaller like screenshot */}
              <div className="lg:col-span-1 p-4 lg:p-6">
                <div className="grid grid-rows-3 gap-3 lg:gap-4 auto-rows-fr h-full">
                  
                  {/* City Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="group relative overflow-hidden rounded-2xl cursor-pointer"
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('https://sercfyvcyjmbvjqlryed.supabase.co/storage/v1/object/sign/homepage/pexels-carlos-oliva-1966452-3586966.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZDJiOTUwYS01MzcxLTRjMzYtYjcxZS01ZmQ2NGIzN2VhYWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob21lcGFnZS9wZXhlbHMtY2FybG9zLW9saXZhLTE5NjY0NTItMzU4Njk2Ni5qcGciLCJpYXQiOjE3NTU2Mzc5NTMsImV4cCI6MTc4NzE3Mzk1M30.Y7tCl5qhfLC8LcUUTuYJijY8FxsRBQfsKwgsbPY4Vv8')`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                    
                    {/* Card Content */}
                    <div className="relative z-10 p-4 lg:p-5 h-full flex flex-col justify-between">
                      {/* Top Section */}
                      <div className="flex justify-between items-start">
                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        </div>
                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        </div>
                      </div>
                      
                      {/* Bottom Section */}
                      <div className="flex justify-between items-center">
                        <h3 className="text-white font-semibold text-base lg:text-lg font-forum">Cities</h3>
                        <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Events Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="group relative overflow-hidden rounded-2xl cursor-pointer"
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                    
                    {/* Card Content */}
                    <div className="relative z-10 p-4 lg:p-5 h-full flex flex-col justify-between">
                      {/* Top Section */}
                      <div className="flex justify-between items-start">
                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        </div>
                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        </div>
                      </div>
                      
                      {/* Bottom Section */}
                      <div className="flex justify-between items-center">
                        <h3 className="text-white font-semibold text-base lg:text-lg font-forum">Events</h3>
                        <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Join Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="group relative overflow-hidden rounded-2xl cursor-pointer"
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('https://sercfyvcyjmbvjqlryed.supabase.co/storage/v1/object/sign/homepage/pexels-ingo-609771.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZDJiOTUwYS01MzcxLTRjMzYtYjcxZS01ZmQ2NGIzN2VhYWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob21lcGFnZS9wZXhlbHMtaW5nby02MDk3NzEuanBnIiwiaWF0IjoxNzU1NjM3ODc5LCJleHAiOjE3ODcxNzM4Nzl9.o12qtSaAo0qirjL-a9feFLkOXJFyKA8rTNM2LIb1WOs')`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                    
                    {/* Card Content */}
                    <div className="relative z-10 p-4 lg:p-5 h-full flex flex-col justify-between">
                      {/* Top Section */}
                      <div className="flex justify-between items-start">
                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        </div>
                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        </div>
                      </div>
                      
                      {/* Bottom Section */}
                      <div className="flex justify-between items-center">
                        <h3 className="text-white font-semibold text-base lg:text-lg font-forum">Join Event</h3>
                        <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

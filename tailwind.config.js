/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        beam: {
          50: '#fef7ee',
          100: '#fdecd4',
          200: '#fbd5a9',
          300: '#f8b872',
          400: '#f5933a',
          500: '#f27515',
          600: '#e35a0b',
          700: '#bc430c',
          800: '#953510',
          900: '#782e10',
        },
        city: {
          orlando: '#ff6b35',
          nashville: '#4ecdc4',
          atlanta: '#45b7d1',
          augusta: '#96ceb4',
          knoxville: '#feca57',
          tampa: '#ff9ff3',
          jackson: '#54a0ff',
          virginia: '#5f27cd',
          losangeles: '#ff3838',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}

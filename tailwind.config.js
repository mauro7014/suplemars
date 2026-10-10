/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linen:    '#111111',
        cream:    '#1C1C1C',
        sand:     '#2A2A2A',
        stone:    '#666666',
        bark:     '#999999',
        earth:    '#CCCCCC',
        charcoal: '#F0F0F0',
        ink:      '#FFFFFF',
        copper:   '#FF6B00',
        sage:     '#0066CC',
        gold:     '#F5A623',
      },
      fontFamily: {
        serif:   ['Bebas Neue', 'Impact', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '0.05em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1',  letterSpacing: '0.03em' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '0.02em' }],
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in':        'fadeIn 0.4s ease-out forwards',
        'slide-up':       'slideUp 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
      },
    },
  },
  plugins: [],
}

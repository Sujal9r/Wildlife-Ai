/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#06110d',
          900: '#0a1712',
          850: '#0f2119',
          800: '#123125',
          700: '#194736',
          600: '#23614a',
          500: '#2f7a5d',
          400: '#4fa07d',
          300: '#83c2a4',
          200: '#bee3cf',
          100: '#eaf7ef',
        },
        moss: '#c0ff7b',
        amber: '#f3b562',
        ember: '#fb7185',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.04), 0 18px 60px rgba(0,0,0,0.34)',
        soft: '0 10px 30px rgba(0,0,0,0.18)',
      },
      backgroundImage: {
        'forest-grid':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

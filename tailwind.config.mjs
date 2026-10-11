/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        palette: {
          deep: '#086288',
          ocean: '#4D8DBA',
          sky: '#97D7FF',
          cream: '#FFEFC4',
        },
        surface: {
          light: '#FCFBF7',
          card: '#FFFFFF',
          muted: '#F3F8FC',
          dark: '#041821',
          'dark-card': '#072534',
          'dark-elevated': '#0A3347',
        },
        brand: {
          50: '#F0F9FF',
          100: '#DFF2FF',
          200: '#BCE6FF',
          300: '#97D7FF', // Exact palette #97D7FF
          400: '#6DB2DC',
          500: '#4D8DBA', // Exact palette #4D8DBA
          600: '#086288', // Exact palette #086288
          700: '#064E6D',
          800: '#053B52',
          900: '#042A3B',
          950: '#021822',
        },
        cream: {
          50: '#FFFDF5',
          100: '#FFF8E3',
          200: '#FFEFC4', // Exact palette #FFEFC4
          300: '#F5DC9C',
          400: '#E5C370',
          500: '#CFA546',
        },
        accent: {
          amber: '#FFEFC4',
          rose: '#F43F5E',
          emerald: '#10B981',
        },
      },
      boxShadow: {
        'soft-light': '0 6px 28px -4px rgba(8, 98, 136, 0.08), 0 2px 10px -2px rgba(77, 141, 186, 0.06)',
        'glow-dark': '0 0 30px -4px rgba(151, 215, 255, 0.22), 0 8px 24px -6px rgba(0, 0, 0, 0.65)',
        'glow-amber': '0 0 22px -2px rgba(255, 239, 196, 0.55)',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.65' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};

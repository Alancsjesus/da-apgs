import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e8edf5',
          100: '#c5d0e5',
          200: '#9fb0d3',
          300: '#7890c1',
          400: '#5a77b4',
          500: '#3b5fa6',
          600: '#2e4f8f',
          700: '#1e3a6b',
          800: '#142a52',
          900: '#0a1b38',
        },
        gold: {
          50:  '#fdf8eb',
          100: '#f9edca',
          200: '#f3d98a',
          300: '#e8bf4a',
          400: '#d4a82a',
          500: '#b8972a',
          600: '#9a7d1f',
          700: '#7a6218',
          800: '#5c4912',
          900: '#3d300b',
        },
        surface: '#F8F9FB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config

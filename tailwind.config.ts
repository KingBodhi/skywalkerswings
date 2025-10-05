import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Conversion-Optimized Psychology-Driven Palette
        primary: {
          50: '#f0f4f8',
          100: '#d9e6f2',
          200: '#b3cde3',
          300: '#8db4d3',
          400: '#679bc4',
          500: '#4182b4', // Main primary
          600: '#003366', // Navy-Steel Blue (authority, reliability)
          700: '#002244',
          800: '#001122',
          900: '#000811'
        },
        accent: {
          50: '#fff4e6',
          100: '#ffe0b3',
          200: '#ffcc80',
          300: '#ffb74d',
          400: '#ffa726',
          500: '#FF6A00', // Safety Orange (attention, action)
          600: '#e65100',
          700: '#cc4400',
          800: '#b33700',
          900: '#992a00'
        },
        success: {
          50: '#f1f8e9',
          100: '#dcedc8',
          200: '#c5e1a5',
          300: '#aed581',
          400: '#9ccc65',
          500: '#4CAF50', // Compliance Green (certification, success)
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20'
        },
        neutral: {
          50: '#F7F9FC', // Clean background
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#D1D6DC', // UI borders
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        danger: {
          50: '#ffebee',
          100: '#ffcdd2',
          200: '#ef9a9a',
          300: '#e57373',
          400: '#ef5350',
          500: '#C62828', // Error states
          600: '#d32f2f',
          700: '#c62828',
          800: '#b71c1c',
          900: '#8e0000'
        }
      },
      fontFamily: {
        display: ['Oswald', 'system-ui', 'sans-serif'], // Headers
        body: ['Inter', 'system-ui', 'sans-serif'], // Body text
        mono: ['Roboto Mono', 'monospace'] // Part numbers, technical specs
      },
      fontSize: {
        'display-1': ['clamp(2.125rem, 1.875rem + 1.25vw, 3rem)', { lineHeight: '1.15' }], // 34-48px
        'h1': ['clamp(1.875rem, 1.625rem + 1.25vw, 2.5rem)', { lineHeight: '1.2' }], // 30-40px
        'h2': ['clamp(1.5rem, 1.375rem + 0.625vw, 2rem)', { lineHeight: '1.25' }], // 24-32px
        'body-lg': ['clamp(1rem, 0.9375rem + 0.3125vw, 1.125rem)', { lineHeight: '1.6' }], // 16-18px
        'body-md': ['clamp(0.9375rem, 0.9375rem + 0vw, 1rem)', { lineHeight: '1.6' }], // 15-16px
        'label': ['1rem', { lineHeight: '1.4', fontWeight: '600' }], // 16px
        'caption': ['0.875rem', { lineHeight: '1.4' }] // 14px
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-accent': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)'
      }
    },
  },
  plugins: [],
};

export default config;
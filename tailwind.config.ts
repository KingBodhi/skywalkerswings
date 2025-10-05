import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f5fb',
          100: '#f1e5f5',
          200: '#e2c9eb',
          300: '#cda8df',
          400: '#b47dcd',
          500: '#9653b9',
          600: '#7a3b9d',
          700: '#5c2a7a',
          800: '#3e1c56',
          900: '#261038',
        },
        accent: {
          50: '#fff5f9',
          100: '#ffe2ef',
          200: '#ffc0dd',
          300: '#ff98c5',
          400: '#ff6eac',
          500: '#ff4f97',
          600: '#e03c85',
          700: '#bd2d6d',
          800: '#962157',
          900: '#6a143a',
        },
        success: {
          50: '#e6f7f5',
          100: '#c3ece6',
          200: '#97ded6',
          300: '#6acfc4',
          400: '#3fc0b1',
          500: '#23a494',
          600: '#188276',
          700: '#116259',
          800: '#0a423d',
          900: '#042522',
        },
        neutral: {
          50: '#fbf7fb',
          100: '#f3edf4',
          200: '#e2d9e3',
          300: '#cbbfcd',
          400: '#aa9aa9',
          500: '#897987',
          600: '#6d5f6c',
          700: '#534853',
          800: '#382f38',
          900: '#231d24',
        },
        danger: {
          50: '#fdeef3',
          100: '#f9d1df',
          200: '#f3a9c4',
          300: '#ec7aa7',
          400: '#e04f8b',
          500: '#c62872',
          600: '#a71b5f',
          700: '#83124a',
          800: '#5f0b34',
          900: '#3c051f',
        },
      },
      fontFamily: {
        display: ['Oswald', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      fontSize: {
        'display-1': ['clamp(2.125rem, 1.875rem + 1.25vw, 3rem)', { lineHeight: '1.15' }],
        h1: ['clamp(1.875rem, 1.625rem + 1.25vw, 2.5rem)', { lineHeight: '1.2' }],
        h2: ['clamp(1.5rem, 1.375rem + 0.625vw, 2rem)', { lineHeight: '1.25' }],
        'body-lg': ['clamp(1rem, 0.9375rem + 0.3125vw, 1.125rem)', { lineHeight: '1.6' }],
        'body-md': ['clamp(0.9375rem, 0.9375rem + 0vw, 1rem)', { lineHeight: '1.6' }],
        label: ['1rem', { lineHeight: '1.4', fontWeight: '600' }],
        caption: ['0.875rem', { lineHeight: '1.4' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-accent': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(38, 16, 56, 0.12), 0 10px 20px -2px rgba(38, 16, 56, 0.08)',
        medium: '0 4px 25px -5px rgba(38, 16, 56, 0.16), 0 10px 10px -5px rgba(38, 16, 56, 0.1)',
        strong: '0 12px 45px -12px rgba(38, 16, 56, 0.3), 0 4px 14px -4px rgba(38, 16, 56, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;

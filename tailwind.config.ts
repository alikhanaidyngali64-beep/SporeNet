import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EC',
        ink: '#1B1B1B',
        moss: {
          DEFAULT: '#5C6B3E',
          light: '#8FB55A',
          deep: '#3A4527',
        },
        ochre: {
          DEFAULT: '#C28F3C',
          warm: '#D9A85F',
        },
        forest: {
          DEFAULT: '#0E1410',
          deep: '#070A08',
          mid: '#1A2218',
        },
        milk: '#E8E4D8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spore-drift': 'spore-drift 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'spore-drift': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-50%, -50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        // Win95 fonts
        'win95-arial': ['Arial', 'sans-serif'],
        'win95-ms-sans': ['MS Sans Serif', 'Arial', 'sans-serif'],
        'win95-courier': ['Courier New', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        // Purple color palette extensions
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        // New color palette extensions
        midnight: {
          50: '#f0f0f7',
          100: '#e1e1eb',
          200: '#c3c3d7',
          300: '#a5a5c3',
          400: '#8787af',
          500: '#161032', // The Midnight Dark
          600: '#131029',
          700: '#100d20',
          800: '#0c0a17',
          900: '#08050e',
          950: '#040307',
        },
        lime: {
          50: '#fafff5',
          100: '#f5ffeb',
          200: '#ebffd7',
          300: '#d7ffaf',
          400: '#c3ff87',
          500: '#ecffb0', // The Lime
          600: '#d9ff8f',
          700: '#c6ff6e',
          800: '#b3ff4d',
          900: '#a0ff2c',
          950: '#8dff0a',
        },
        cream: {
          50: '#ffffff',
          100: '#ffffff',
          200: '#fffef7',
          300: '#fffef0',
          400: '#fffde8',
          500: '#faffd8', // The Cream
          600: '#f9ffc1',
          700: '#f8ffaa',
          800: '#f7ff93',
          900: '#f6ff7c',
          950: '#f5ff65',
        },
        sage: {
          50: '#f7f9f7',
          100: '#eef3ee',
          200: '#dde7dd',
          300: '#ccdbcc',
          400: '#bbcfcf',
          500: '#9aa899', // The Sage
          600: '#8b9789',
          700: '#7c8679',
          800: '#6d7569',
          900: '#5e6459',
          950: '#4f5349',
        },
        // Win95 color palette
        'win95': {
          teal: '#008080',
          gray: '#808080',
          silver: '#C0C0C0',
          white: '#FFFFFF',
          black: '#000000',
          blue: '#0000FF',
          // Win95 UI colors
          'bg': '#008080',
          'window-bg': '#C0C0C0',
          'window-border-dark': '#000000',
          'window-border-light': '#FFFFFF',
          'button-face': '#C0C0C0',
          'button-shadow': '#808080',
          'button-highlight': '#FFFFFF',
          text: '#000000',
          'disabled-text': '#808080',
          'selected-bg': '#000080',
          'selected-text': '#FFFFFF',
        },
        // Brutalist accent colors
        'brutalist': {
          red: '#FF0000',
          yellow: '#FFFF00',
          green: '#00FF00',
          magenta: '#FF00FF',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 0.25rem)',
        '2xl': 'calc(var(--radius) + 0.5rem)',
        '3xl': 'calc(var(--radius) + 0.75rem)',
        full: '9999px'
      },
      // Win95 spacing system (8px grid)
      spacing: {
        'win95-xs': '4px',
        'win95-sm': '8px',
        'win95-md': '16px',
        'win95-lg': '24px',
        'win95-xl': '32px',
        'win95-2xl': '48px',
        'win95-3xl': '64px',
      },
      // Win95 border widths
      borderWidth: {
        'win95': '2px',
      },
      // Win95 box shadows
      boxShadow: {
        'win95': '1px 1px 0 #FFFFFF, -1px -1px 0 #000000',
        'win95-inset': 'inset 1px 1px 0 #000000, inset -1px -1px 0 #FFFFFF',
        'win95-button': '1px 1px 0 #FFFFFF, -1px -1px 0 #000000',
        'win95-button-active': 'inset 1px 1px 0 #000000, inset -1px -1px 0 #FFFFFF',
        'brutalist': '4px 4px 0 #000000',
        'brutalist-hover': '6px 6px 0 #000000',
        'brutalist-active': '2px 2px 0 #000000',
      },
      // Win95 animations
      animation: {
        'glitch': 'glitch 2s infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        }
      }
    }
  },
  plugins: [animate],
};
export default config;
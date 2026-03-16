/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2563eb',
          purple: '#7c3aed',
        },
        risk: {
          high: '#ef4444',
          moderate: '#f59e0b',
          low: '#22c55e',
        },
        healthcare: {
          bg: '#f0f9ff',
          card: '#ffffff',
          text: {
            primary: '#1f2937',
            secondary: '#6b7280',
            muted: '#9ca3af',
          }
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

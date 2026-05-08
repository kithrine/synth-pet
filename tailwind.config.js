/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', '"Courier New"', 'monospace'],
      },
      colors: {
        neonPink: '#ff3df2',
        neonCyan: '#20f7ff',
        neonPurple: '#9b5cff',
        night: '#090416',
      },
      boxShadow: {
        neonPink: '0 0 14px rgba(255, 61, 242, 0.75), 0 0 32px rgba(255, 61, 242, 0.35)',
        neonCyan: '0 0 14px rgba(32, 247, 255, 0.7), 0 0 34px rgba(32, 247, 255, 0.32)',
        neonPurple: '0 0 18px rgba(155, 92, 255, 0.65), 0 0 42px rgba(155, 92, 255, 0.3)',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"JetBrains Mono"', 'monospace'], // Default to Mono everywhere
        ui: ['Inter', 'sans-serif'],             // Secondary UI font
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        background: '#0a0a0a', // Near black
        surface: '#171717',    // Slightly lighter
        text: '#ededed',       // High contrast text
        muted: '#a1a1aa',      // Muted text
        accent: '#3b82f6',     // Technical Blue
        border: '#27272a',     // Subtle borders
      },
    },
  },
  plugins: [],
}

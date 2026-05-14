/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:        '#F4EDE0',
        linen:        '#E8DFD0',
        sage:         '#7A8B6F',
        'sage-deep':  '#5A6B53',
        amber:        '#D4A24C',
        'amber-deep': '#B5852E',
        chestnut:     '#5C3D2E',
        ink:          '#2A1F18',
        bordeaux:     '#7A2E2A',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans:    ['"Inter"', 'sans-serif'],
        script:  ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        warm:    '0 30px 80px -40px rgba(92,61,46,0.30)',
        'warm-sm':'0 20px 60px -30px rgba(92,61,46,0.25)',
      },
    },
  },
  plugins: [],
}

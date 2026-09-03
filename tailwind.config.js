/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#061426', 900: '#081b33', 800: '#0c294b' },
        electric: '#146cff',
        cyan: '#25c9e8',
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      boxShadow: { soft: '0 18px 45px rgba(10,38,77,.09)' },
    },
  },
  plugins: [],
}

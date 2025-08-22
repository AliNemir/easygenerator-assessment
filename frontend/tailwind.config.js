/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF4F2',
          100: '#FFE8E4', 
          200: '#FFD5CC',
          300: '#FFB8A8',
          400: '#FF9478',
          500: '#FF7A5A', // Primary solid
          600: '#F25A3A', // Gradient end
          700: '#E04527',
          800: '#C73618',
          900: '#A82D14',
        },
        gradientStart: '#FF8A5E',
        gradientEnd: '#F25A3A',
        darkText: '#0F1724',
        lightGray: '#F8F9FA',
        mediumGray: '#6C757D',
      },
      fontFamily: {
        'heading': ['Montserrat', 'system-ui', 'sans-serif'],
        'body': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FF8A5E 0%, #F25A3A 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #FF9478 0%, #E04527 100%)',
      },
    },
  },
  plugins: [],
}
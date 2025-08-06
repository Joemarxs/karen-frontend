export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#F9F8F6',
          100: '#F1EFEC',
          200: '#E6E2DD',
          300: '#DCD7D0',
          400: '#D5CFC8',
        },
        brown: {
          100: '#F5F0EB',
          200: '#E6DFD7',
          300: '#D7CFC5',
          400: '#B8A99A',
          500: '#96826E',
          600: '#7D6E5D',
          700: '#5D4E3D',
          800: '#463C2F',
          900: '#2C2620',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      keyframes: {
        zoomFade: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.1)', opacity: '1' },
        },
      },
      animation: {
        zoomFade: 'zoomFade 5s ease-in-out forwards',
      },
    },
  },
};

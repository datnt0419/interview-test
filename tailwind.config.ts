import type { Config } from 'tailwindcss';
// eslint-disable-next-line import/no-extraneous-dependencies

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-custom-color-100',
    'bg-custom-color-200',
    'bg-custom-color-300',
    'bg-custom-color-400',
    'bg-custom-color-500',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'custom-color': {
          100: '#FF5733',
          200: '#33FF57',
          300: ' #3357FF',
          400: '#F333FF',
          500: '#33FFF3 ',
        },
      },
    },
  },
  plugins: [],
};
export default config;

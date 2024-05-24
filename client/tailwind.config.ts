import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        vertical: "url('/src/assets/vertical-bg.png')",
        horizontal: "url('/src/assets/horizontal-bg.png')",
      },
      fontFamily: {
        firaMono: ['Fira Mono', 'monospace'],
        sairaStencil: ['Saira Stencil One', 'sans-serif'],
      },
      colors: {
        aquamarine: {
          '50': '#eefffb',
          '100': '#c5fff5',
          '200': '#8bffed',
          '300': '#3dffe1',
          '400': '#14edd3',
          '500': '#00d1ba',
          '600': '#00a899',
          '700': '#00857b',
          '800': '#056a63',
          '900': '#0a5752',
          '950': '#003534',
        },
        downriver: {
          '50': '#e9f9ff',
          '100': '#cef2ff',
          '200': '#a7eaff',
          '300': '#6be0ff',
          '400': '#26caff',
          '500': '#00a4ff',
          '600': '#007aff',
          '700': '#005fff',
          '800': '#0051e6',
          '900': '#004ab3',
          '950': '#00214d',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

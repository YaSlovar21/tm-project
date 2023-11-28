/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        termoblok: {
          css: {
            '--tw-prose-body' : '#f2f2f2',
            '--tw-prose-headings' : '#e2e8f0',
            '--tw-prose-lead' : '#f2f2f2',
            '--tw-prose-links' : theme('colors.purple[600]'),
            '--tw-prose-bold' : '#171717',
            '--tw-prose-counters' : '#737373',
            '--tw-prose-bullets' : '#ff5e3a',
            '--tw-prose-hr' : '#e5e5e5',
            '--tw-prose-quotes' : '#171717',
            '--tw-prose-quote-borders' : '#e5e5e5',
            '--tw-prose-captions' : '#737373',
            '--tw-prose-code' : '#171717',
            '--tw-prose-pre-code' : '#e5e5e5',
            '--tw-prose-pre-bg' : '#262626',
            '--tw-prose-th-borders' : '#d4d4d4',
            '--tw-prose-td-borders' : '#e5e5e5',
          },
        },
      }),
      colors: {
        orange: {
          lighter: '#FF9275',
          light: '#F36D4A',
          DEFAULT: '#E7461C',
          dark: '#B72F0B',
          darker: '#901E00',
        },
      }
    },
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}


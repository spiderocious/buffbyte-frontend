/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        paper: {
          DEFAULT: 'var(--paper)',
          deep:    'var(--paper-deep)',
          edge:    'var(--paper-edge)',
        },
        sheet: 'var(--sheet)',
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
          4: 'var(--ink-4)',
          5: 'var(--ink-5)',
        },
        hair: {
          DEFAULT: 'var(--hair)',
          soft:    'var(--hair-soft)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          deep:    'var(--accent-deep)',
          press:   'var(--accent-press)',
          tint:    'var(--accent-tint)',
          edge:    'var(--accent-edge)',
          ink:     'var(--accent-ink)',
        },
        warn: {
          DEFAULT: 'var(--warn)',
          deep:    'var(--warn-deep)',
          bg:      'var(--warn-bg)',
          edge:    'var(--warn-edge)',
        },
        crit: {
          DEFAULT: 'var(--crit)',
          deep:    'var(--crit-deep)',
          bg:      'var(--crit-bg)',
          edge:    'var(--crit-edge)',
        },
      },
      borderRadius: {
        sharp: 'var(--r-sharp)',
        soft:  'var(--r-soft)',
        card:  'var(--r-card)',
        pill:  'var(--r-pill)',
      },
      boxShadow: {
        line:    'var(--line-1)',
        'line-ink': 'var(--line-2)',
        pop:     'var(--shade-pop)',
        modal:   'var(--shade-modal)',
        focus:   'var(--focus-ring)',
      },
    },
  },
  plugins: [],
};

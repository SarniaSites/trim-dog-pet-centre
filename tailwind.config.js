/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Plum – the "TRIM DOG / PET CENTRE" lettering and bone outline in the logo (#79243c). Headings, line-art, the bone.
        plum: { DEFAULT: '#79243C', 700: '#5E1A2E', 400: '#A46477', 200: '#D9B9C2' },
        // Action – the dark teal of the "Keeping your Pets Happy" slogan in the logo. Reserved for Call, Order and links.
        action: { DEFAULT: '#2A6163', dark: '#1F4B4D', light: '#D5E8E7' },
        // Highlight – the kibble amber in the Facebook banner (#dba456). The brass tag, swing tags, illustration fills.
        highlight: { DEFAULT: '#DBA456', deep: '#A86727', engrave: '#773709', light: '#F3DDB4' },
        // Ink – the banner's dark charcoal-plum (#2c2528). Body text.
        ink: { DEFAULT: '#2C2528', soft: '#5A4E53', faint: '#85777C' },
        // Surface – the logo's blush pink (#e6d8da) taken down to grounds, so whites lean warm-pink, never pure white.
        surface: { DEFAULT: '#FBF7F6', 2: '#F4EAEA', 3: '#EAD9DB', paper: '#FFFCFA' },
      },
      fontFamily: {
        // Caprasimo: chunky, warm Cooper-style lettering, like an old shop sign; echoes the logo's heavy rounded caps
        display: ['Caprasimo', 'Georgia', 'serif'],
        sans: ['"Albert Sans Variable"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      maxWidth: { site: '78rem' },
      borderRadius: { tag: '999px' },
    },
  },
  plugins: [],
};

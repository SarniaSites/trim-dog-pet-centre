/** @type {import('tailwindcss').Config} */
// Trim Dog Pet Centre — every colour is sampled from the business's own logo, banner or shopfront.
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // brand: the maroon "TRIM DOG / PET CENTRE" lettering and bone outline in the logo (#79243c).
        // Headings, the aisles section ground, the footer, line-art.
        brand: { DEFAULT: '#79243C', deep: '#5C1A2D', soft: '#A46477', mist: '#E6D8DA' },
        // action: the teal of the logo's "Keeping your Pets Happy" slogan and the banner headline.
        // Reserved for things you can press: Call, Send your list, Add to list, links.
        action: { DEFAULT: '#1D6A6F', deep: '#14504F', tint: '#D6EAE8' },
        // highlight: the kibble amber in the Facebook banner (#dba456 / #a86727).
        // Masking tape on photos, the ticks on the shopping list, active aisle labels.
        highlight: { DEFAULT: '#DBA456', deep: '#A86727', paper: '#FBF1DC' },
        // ink: the banner's charcoal (#2c2528). Body text.
        ink: { DEFAULT: '#2C2528', soft: '#5B4F53', faint: '#7E7175' },
        // surface: the logo's blush (#e6d8da) lifted to grounds, so nothing is pure white.
        surface: { DEFAULT: '#FBF6F4', 2: '#F4EAE8', paper: '#FFFCF8' },
      },
      fontFamily: {
        // Alfa Slab One: heavy slab like painted shop-front signwriting, for a family shop that has been here longest
        display: ['"Alfa Slab One"', 'Rockwell', 'Georgia', 'serif'],
        // Onest: plain, round, easy to read; close to the logo's sturdy sans lettering
        sans: ['"Onest Variable"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        // Kalam: the shopping-list handwriting, and the small shopkeeper notes beside headings
        hand: ['Kalam', '"Comic Sans MS"', 'cursive'],
      },
      maxWidth: { site: '80rem' },
    },
  },
  plugins: [],
};

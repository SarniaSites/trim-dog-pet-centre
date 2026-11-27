# Trim Dog Pet Centre — website

Single-page site for Trim Dog Pet Centre, Pleinheaume Road, Vale, Guernsey. Plain HTML, Tailwind CSS v3 (compiled), vanilla JS, self-hosted fonts. No frameworks, no CDNs, all paths relative.

```
index.html              the page; sections split by big comment banners
thanks.html             shown after the form is sent
404.html                not-found page (uses <base href="/trim-dog-pet-centre/">, change on go-live)
assets/css/styles.css   compiled Tailwind (committed; rebuild after edits)
assets/js/main.js       header, menu, aisle tabs, shopping list, lightbox, form validation
assets/fonts/           Alfa Slab One, Onest, Kalam (woff2) + OFL licences
images/brand/           logo.svg (redrawn from the Facebook logo), mark.svg
images/work/            shop photos: name.webp (~1600px) + name-sm.webp (~800px)
images/                 favicons, og-image.jpg (share card), site.webmanifest
src/input.css           Tailwind source, @font-face, components, keyframes
tailwind.config.js      brand colours by role (with where each came from) + fonts
sitemap.xml, robots.txt
_fb-pack/               the Facebook source pack (not published by GitHub Pages)
_shots/                 screenshots for the team (not published)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| brand | `#79243C` | Headings, aisles section, footer, line-art. The maroon logo lettering and bone |
| action | `#1D6A6F` | Only things you press: Call, Send your list, Add, links. The logo's teal slogan |
| highlight | `#DBA456` | Masking tape on photos, list ticks, active aisle. Kibble amber from the banner |
| ink | `#2C2528` | Body text. Banner charcoal |
| surface | `#FBF6F4` / `#F4EAE8` | Grounds, tinted from the logo's blush |

Fonts: **Alfa Slab One** (display, shop-sign slab), **Onest Variable** (body), **Kalam** (the handwritten shopping list and notes). All OFL, from @fontsource.

Logo: the Facebook logo is only 232px, so the bone and lettering were redrawn as SVG (`images/brand/logo.svg`, and as a `<symbol>` inside each page). The puppy, kitten and bird drawings from the original logo were left out.

## The idea

The page is built around the shop's phone-order habit. The hero shows a handwritten shopping list. In "What's on the shelves" every item has an **Add** button; added items appear in a floating "Your list" chip (and the mobile bar) and fill the **Your list** box in the order form, which is styled as the same notepad. Sending it stamps the list "Packed". The list is kept in the visitor's browser (localStorage) until sent.

## Editing

- **Text**: edit `index.html`.
- **Colours / fonts**: edit `tailwind.config.js` or `src/input.css`, then `npm install` (first time) and `npm run build`.
- **Aisles**: each aisle is a `<button role="tab">` plus a matching `<div role="tabpanel">`. Inside a panel, each list item is `<li><span>Label</span><button class="add" data-add="Text that goes on the list">Add</button></li>`.
- **Add a shop photo**: save `name.webp` (~1600px) and `name-sm.webp` (~800px) in `images/work/`, then copy a `<button class="pin">` in "Around the shop" and change the image, `data-full`, `data-cap`, alt text and caption. The first eight pins have set positions on desktop (`.p1`–`.p8` in `src/input.css`).
- No before/after slider (not a transformation trade) and no FAQ (the pack doesn't answer enough questions).

## Going live — checklist

- [ ] Client buys their domain in their own name (roughly £10 a year for .com, £30–40 for .gg)
- [ ] Help the client create a free Cloudflare account in their name; connect this repo to Cloudflare Pages on their account (production branch `main`, no build command, output = repo root) and add their domain to the Pages project
- [ ] Swap the GitHub Pages URL for the real domain everywhere: canonical, og tags, JSON-LD, sitemap, robots, form `_next`, and the `<base>` in 404.html
- [ ] Switch the form from the team's email to the client's and activate FormSubmit
- [ ] Confirm phone/email, and add opening hours (the pack didn't include them)
- [ ] Get the client to sign off the aisle wording, and confirm: delivery (reviews mention home delivery and the Herm boat), kerbside collection, ordering in, tag engraving while you wait, and that they're happy naming Michelle for the bandanas
- [ ] Confirm the four reviews can be shown with first name + initial
- [ ] Assumptions: the "Shopping list" in the hero is illustrative. Left out of the site: storm and COVID-era closure notices, bank holiday closures, World Cup and Halloween items, the missing cat appeal, the Kennel Club show posts, the walking passport, the live-food supplier post and the reduced-price frozen offer
- [ ] Optional: transfer the repo to the client's own GitHub if they want it

Source: built from the Facebook pack in `_fb-pack/` (not published on the live site).

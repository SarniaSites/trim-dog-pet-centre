# Trim Dog Pet Centre — website

Single-page site for Trim Dog Pet Centre, Pleinheaume Road, Vale, Guernsey. Plain HTML, Tailwind CSS v3 (compiled), vanilla JS, self-hosted fonts. No frameworks, no CDNs, all paths relative.

```
index.html              the page, sections split by comment banners
thanks.html, 404.html   form thank-you page and not-found page, same design
assets/css/styles.css   compiled Tailwind (committed; rebuild after edits)
assets/js/main.js       header, menu, hero tag swing, aisle tabs, lightbox, tag engraver, form validation
assets/fonts/           Caprasimo + Albert Sans (woff2) with their OFL licences
images/brand/           logo.svg (redrawn from the Facebook logo), mark.svg
images/work/            shop photos, name.webp (~1600px) + name-sm.webp (~800px)
images/                 favicons, og-image.jpg (share card), site.webmanifest
src/input.css           Tailwind source, @font-face, components, keyframes
tailwind.config.js      brand colours (named by role, with sources) and fonts
sitemap.xml, robots.txt
_fb-pack/               the Facebook source pack (not published by GitHub Pages)
_shots/                 screenshots for the team (not published)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| plum | `#79243C` | Headings, line-art, footer. From the logo lettering and bone outline |
| action | `#2A6163` | Call, order and link colour only. From the logo's "Keeping your Pets Happy" slogan |
| highlight | `#DBA456` | The engraved brass tag, step markers, bullets. Kibble amber from the Facebook banner |
| ink | `#2C2528` | Body text, outlines, chequered floor. Banner charcoal |
| surface | `#FBF7F6` / `#F4EAEA` | Grounds, tinted from the logo's blush pink |

Fonts: **Caprasimo** (display, warm shop-sign lettering) and **Albert Sans Variable** (body). Both OFL, from @fontsource.

Logo: the Facebook logo is only 232px, so the bone-and-lettering part was redrawn as SVG (`images/brand/logo.svg`, and inline in the header). The puppy and kitten photos and the bird-cage drawings from the original were left out at small sizes.

## Editing

- **Text**: edit `index.html` directly.
- **Colours / fonts**: edit `tailwind.config.js` or `src/input.css`, then run `npm install` (first time) and `npm run build`.
- **Add a shop photo**: save `name.webp` (~1600px wide) and `name-sm.webp` (~800px) into `images/work/`, then copy one of the `<button class="tile">` blocks in the "Around the shop" section and change the image, `data-full`, `data-cap`, alt text and swing-tag label. Add `t-wide` or `t-tall` to the tile for a bigger slot.
- **Aisle explorer**: each aisle is a `<button role="tab">` on the ring plus a matching `<div role="tabpanel">`. Change the photos, paragraph and `<ul class="bone-list">` items inside a panel. To add an aisle, add both and match the `id` / `aria-controls`.
- **Tag engraver**: shapes are the `<g data-shape>` groups in the `#tags` SVG; colours are the `name="colour"` radio values (`tag colour|engraving colour`).
- No before/after slider (not a transformation trade) and no FAQ (the pack doesn't answer enough real questions).

## Going live

- [ ] Client buys their domain in their own name (roughly £10 a year for .com, £30–40 for .gg). They already link to trimdogpetcentre.com, so check whether they own it.
- [ ] Help the client create a free Cloudflare account in their name; connect this repo to Cloudflare Pages on their account (production branch `main`, no build command, output = repo root) and add their domain to the Pages project
- [ ] Swap `https://sarniasites.github.io/trim-dog-pet-centre/` for the real domain everywhere: canonical, og tags, JSON-LD, sitemap.xml, robots.txt, the form's `_next`
- [ ] Switch the form from the team's email to the client's (info@trimdogpetcentre.com?) and activate FormSubmit
- [ ] Confirm phone/email; get the client to sign off the aisle wording and brand names (Omni, Natures Menu, Wilsons)
- [ ] Ask for opening hours (not in the pack, so the site says "ring to check opening times") and add them to the Visit section and JSON-LD
- [ ] Confirm delivery: the site only says "ask about delivery when you call"
- [ ] Optional: transfer the repo to the client's own GitHub if they want it

### Assumptions and things left out

- "Guernsey's oldest family-run pet shop" comes from the business's own Facebook bio.
- Names used: Michelle (makes the bandanas and bow ties, from a post); Jan, Sal and Nick appear only inside customer reviews.
- Review names shortened to first name + initial.
- Left out as seasonal or out of date: Christmas window and advent calendars, Halloween bandanas, World Cup and Euros bandanas and teddies, storm closure notices, bank holiday closures, Liberation Day, the missing cat Finley, the Guernsey Kennel Club dog show posts, the Wag walking passports, and Figjam Reptiles live food (a separate business).
- One sale price (frozen 60/40 blocks, £15 a case of 12) was a one-off reduction, so no prices are shown.

Source: built from the Facebook pack in `_fb-pack/` (not published on the live site).

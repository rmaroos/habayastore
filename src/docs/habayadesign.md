# Habaya --- Vintage & Antique Website Design Specification

**File:** `habayadesign.md`\
**Project:** Habaya modest-fashion / hijab e-commerce website\
**Document type:** Visual design direction and implementation
specification\
**Version:** 1.0\
**Status:** Creative direction draft based on the supplied references\
**Related document:** `habayasite.md` --- product requirements, sitemap,
user flows, and functional scope

------------------------------------------------------------------------

## 1. Purpose of This Document

This document defines the visual and interaction design direction for
the Habaya website. The client wants the same core content and shopping
capabilities as the supplied Aayla Hijabs reference, but the new website
must have its own distinctive, vintage and antique-inspired appearance.

The additional design samples suggest useful references: - **Buver-style
fashion storefront:** editorial serif wordmark, restrained navigation,
large campaign photography, generous whitespace, and elegant product
presentation. - **Aayla Hijabs:** modest-fashion product focus, campaign
hero, featured products, collection browsing, brand mission, flagship
store, newsletter, and footer. - **Vogue-style fashion/about page:**
cream backgrounds, editorial typography, alternating image-and-copy
sections, testimonials/brand proof, team or brand storytelling, and a
classic magazine-like hierarchy.

These are visual references, not instructions to copy another site's
exact identity, assets, or proprietary design. The final design should
combine the useful principles into a coherent original Habaya identity.

**Scope boundary:** This document covers appearance, layout, typography,
colour, imagery, component styling, motion, responsive behaviour, and
visual quality. Product functionality, business rules, checkout
requirements, and sitemap details remain in `habayasite.md`.

## 2. Creative Brief

### 2.1 Design ambition

Create a **heritage-inspired, boutique, antique editorial storefront**
for hijabs and modest fashion. The website should feel as though a
contemporary modest-fashion label has been presented through a carefully
curated vintage fashion journal or an old-world textile atelier.

It must be: - Vintage and antique-inspired, not a generic modern
SaaS/e-commerce template. - Elegant, warm, tactile, editorial, and
distinctive. - Premium but approachable. - Fashion-focused, with the
products remaining the main subject. - Appropriate for modest fashion
and respectful of the brand's audience. - Practical to browse and
purchase from, especially on mobile. - Original to Habaya rather than a
copy of the reference websites.

### 2.2 Design keywords

**Heritage · Antique paper · Fashion journal · Textile archive · Quiet
luxury · Old-world boutique · Editorial serif · Natural fabric · Curated
collection · Timeless modesty**

### 2.3 Desired emotional response

Visitors should feel that: - The brand is thoughtful and trustworthy. -
Each collection has been curated rather than mass-displayed. - Fabrics,
colours, and craftsmanship deserve attention. - The brand is timeless
rather than driven by short-lived trends. - Shopping is calm, clear, and
pleasant.

### 2.4 What the design is not

Avoid: - Typical bright white-and-black modern DTC layouts with
oversized rounded cards. - Neon gradients, glassmorphism, glowing
borders, and futuristic effects. - Overuse of pills, floating widgets,
giant rounded buttons, and generic icon tiles. - Excessive animations,
parallax, cursor effects, and scroll hijacking. - Artificially
distressed textures that reduce readability. - Making every section look
identical or turning the site into a museum page that is difficult to
shop. - Dark, muddy, low-contrast styling that hides product colours. -
Using ornate decorative fonts for long paragraphs or small product
details.

## 3. Reference Analysis and How to Apply It

### Reference A --- Buver editorial fashion homepage

**Useful principles** - Large serif wordmark that establishes a
recognisable fashion identity. - Simple, restrained top navigation. -
Hero campaign image with copy placed within a clear text area. - Large
serif headline and small supporting copy. - Product grid with clean
photography and restrained labels. - A mix of editorial space and
commerce-focused sections.

**Habaya adaptation** - Create an original heritage-style Habaya
wordmark. - Use a campaign image featuring the client's actual
modest-fashion products. - Use a classic serif headline, compact
supporting text, and a clearly visible CTA. - Keep product grids
consistent and easy to scan. - Use warm ivory and muted ink instead of
stark white and pure black as the default.

### Reference B --- Aayla Hijabs storefront

**Useful principles** - A prominent campaign hero. - Brand introduction
section. - Featured product collection. - Browse-by-collection area. -
Mission/brand values section. - Physical flagship store feature. -
Newsletter and detailed footer. - Collection page with filters, product
cards, badges, and related products.

**Habaya adaptation** - Preserve these content roles and the approved
client content. - Introduce vintage editorial typography and warmer
materials around those sections. - Keep product photography and prices
clear. - Treat category names and product details as commerce
information, not decorative text. - Give the collection page the same
brand personality as the homepage.

### Reference C --- Vogue-style editorial/about page

**Useful principles** - Cream background and elegant serif titles. -
Editorial page title and clear section spacing. - Alternating
image-and-text storytelling blocks. - Quote or testimonial section. -
Team/brand credibility section. - Classic multi-column footer.

**Habaya adaptation** - Use alternating image/text sections for Our
Story, Our Mission, and Store pages. - Only include testimonials, team
profiles, press mentions, or reviews when genuine and approved. - Do not
invent staff names, quotes, publications, customer ratings, or
endorsements. - Keep editorial pages warm and atmospheric, but maintain
straightforward paths back to shopping.

## 4. Design Principles

1.  **Editorial first, commerce always:** Use fashion-magazine
    composition, but never make prices, product choices, stock, or CTAs
    difficult to find.
2.  **Warmth over starkness:** Prefer parchment, ivory, muted brown, and
    ink tones.
3.  **Typography creates character:** Use the contrast between a classic
    display serif and a highly legible body typeface.
4.  **Photography carries the emotion:** Let product imagery communicate
    texture, drape, colour, and styling.
5.  **Decoration must have a reason:** Fine rules, small labels, and
    subtle paper details are enough. Avoid clutter.
6.  **Consistency across pages:** Homepage, collection, product, cart,
    and checkout should feel like one brand.
7.  **Accessibility is part of premium design:** Good contrast, readable
    type, visible focus, and usable controls are mandatory.
8.  **Mobile remains a first-class experience:** Preserve the editorial
    mood without making shoppers scroll through unnecessary decoration.

## 5. Visual Design System

### 5.1 Proposed colour palette

Use this as a starting point and confirm it with the client. Colours
should feel like archival paper, old books, natural dyes, and dark ink.

  -----------------------------------------------------------------------
  Token                   Hex                     Intended use
  ----------------------- ----------------------- -----------------------
  `paper-ivory`           `#F7F2E8`               Main warm page
                                                  background

  `parchment`             `#EDE2D0`               Secondary section
                                                  background

  `aged-linen`            `#D9C8B2`               Subtle panels,
                                                  dividers, supporting
                                                  surfaces

  `ink-brown`             `#30251F`               Main text and dark
                                                  backgrounds

  `heritage-burgundy`     `#55252D`               Primary brand accent,
                                                  important CTAs,
                                                  announcement bar

  `antique-brass`         `#A88956`               Small decorative
                                                  accents, fine rules,
                                                  selected details

  `muted-olive`           `#77765B`               Secondary accent for
                                                  selected states or
                                                  editorial details

  `warm-white`            `#FCFAF5`               Product-image
                                                  surroundings and
                                                  elevated surfaces

  `soft-taupe`            `#8A796A`               Secondary text when
                                                  contrast is sufficient

  `border-linen`          `#D8CDBE`               Dividers, input
                                                  borders, card
                                                  boundaries
  -----------------------------------------------------------------------

**Colour rules** - Use `ink-brown` for most text on light backgrounds. -
Use `heritage-burgundy` sparingly so it remains recognisable. - Use
`antique-brass` as a small accent, not for long text or low-contrast
labels. - Product imagery should retain accurate colours; do not apply a
global sepia filter to all product images. - Use semantic colours for
errors, warnings, and success messages. Vintage styling must not obscure
system feedback. - Verify actual text contrast against WCAG AA
expectations before release.

### 5.2 Colour distribution guidance

Approximate starting balance across a typical page: - 60--70% warm ivory
or warm white. - 15--20% parchment and linen surfaces. - 8--12%
ink-brown text and dark areas. - 3--6% burgundy accents. - 1--3% brass
or olive decorative accents.

These are visual guidelines, not strict code-level percentages.

### 5.3 Typography

**Recommended pairing** - Display/headline serif: `Cormorant Garamond`,
`Libre Baskerville`, or `Playfair Display`. - Body/UI sans-serif:
`Lato`, `Inter`, or `Source Sans 3`. - Optional tiny editorial label:
use the body font with letter spacing; avoid adding a third font unless
the brand needs it.

**Suggested hierarchy** - Hero headline: expressive serif, desktop
56--76 px; mobile 38--48 px. - Page title: serif, desktop 44--60 px;
mobile 34--42 px. - Section heading: serif, desktop 32--42 px; mobile
27--34 px. - Product name: body font or restrained serif, 14--17 px. -
Body copy: 15--17 px with comfortable line height. - Small labels and
metadata: 11--13 px; do not use very small text for essential
information. - Buttons/navigation: 12--14 px, medium weight, clear
letter spacing where appropriate.

Use responsive typography and test line wrapping with the actual copy.
The site should not use all-uppercase text for every heading. Use
sentence case or restrained title case.

### 5.4 Logo and wordmark direction

-   Use a custom or carefully selected serif wordmark for **Habaya**.
-   Keep the wordmark readable at small mobile sizes.
-   Consider a restrained monogram or textile-inspired emblem as a
    secondary brand asset.
-   Avoid complex crests, crowns, fake royal insignia, or overly
    ornamental marks unless the client explicitly wants that brand
    story.
-   Do not trace or reproduce the Buver, Aayla, or Vogue logos.

## 6. Texture, Borders, and Surface Treatment

### Use subtly

-   Fine 1 px rules in `border-linen`.
-   Thin burgundy or brass separators.
-   Very subtle paper grain on selected editorial backgrounds, if it
    does not affect performance or readability.
-   Lightly warm image surroundings.
-   Square or minimally rounded image corners for an editorial catalogue
    feel.
-   Occasional small archival-style captions, collection numbers, or
    category labels when meaningful.

### Avoid

-   Strong grunge overlays.
-   Heavy scratches, stains, torn edges, and fake age marks on every
    section.
-   Texture beneath dense product descriptions or form controls.
-   Decorative frames around every product.
-   Excessive rounded cards that make the site feel like a modern app.
-   Shadows on every component.

### Corner radius guidance

-   Product images: 0--4 px by default.
-   Editorial photography: 0--6 px, with occasional larger crop only
    when composition calls for it.
-   Buttons and inputs: 0--3 px or a subtle radius.
-   Large rounded cards: avoid as a default.

## 7. Layout and Spacing

### General page width

-   Desktop content max-width: approximately 1280--1440 px, depending on
    photography and product count.
-   Main horizontal padding: 40--64 px on wide desktop, 24--32 px on
    tablet, 16--20 px on mobile.
-   Section vertical spacing: 80--120 px desktop; 52--76 px mobile.
-   Product grids should use consistent gutters and align names/prices
    predictably.

These are initial design tokens. Adjust after viewing real product
photography and content.

### Grid principles

-   Desktop collection grid: 3--4 columns, depending on available width
    and image aspect ratio.
-   Tablet: 2--3 columns.
-   Mobile: usually 2 columns for efficient browsing; use 1 column only
    when imagery or content needs more room.
-   Keep consistent product image ratios within a collection.
-   Avoid placing long product names and prices too close to the next
    card.

### Editorial rhythm

Alternate commerce sections and editorial storytelling so the homepage
does not become a long wall of product tiles. Use a clear visual
sequence: 1. Brand/campaign introduction. 2. Short brand statement. 3.
Featured products. 4. Collection discovery. 5. Mission/story. 6.
Flagship store or craft story. 7. Newsletter. 8. Footer.

The exact order should follow the final content plan in `habayasite.md`
and client approval.

## 8. Page-by-Page Visual Direction

## 8.1 Homepage

### A. Announcement bar

-   Compact, full-width strip.
-   Burgundy or ink-brown background with warm light text.
-   Small readable message, optionally separated by a fine line or tiny
    emblem.
-   Avoid fast-moving marquee text by default; if used, it must be
    pauseable and accessible.

### B. Header/navigation

-   Warm ivory background.
-   Habaya wordmark on the left or centred, depending on final
    logo/navigation arrangement.
-   Navigation links kept compact and restrained.
-   Search, account, and cart icons use consistent thin strokes.
-   Use text labels or accessible names for icon-only controls.
-   Active navigation state should be visible without relying only on
    colour.
-   Mobile menu should keep all primary shopping categories easy to
    reach.

### C. Hero campaign

-   Large, high-quality fashion image with a deliberate editorial crop.
-   Text block should sit in a quiet area of the image or in a separate
    adjacent panel; ensure sufficient contrast.
-   Large serif campaign headline.
-   Supporting text limited to a short paragraph.
-   One primary CTA with clear wording.
-   Optional small campaign eyebrow label above the heading.
-   Avoid overlaid text on busy fabric patterns or faces.
-   On mobile, crop intelligently and ensure the CTA remains visible
    without excessive scrolling.

### D. Brand introduction

-   Editorial two-column section: text and image.
-   Use an asymmetric composition where useful, inspired by the
    references but not copied.
-   Heading in serif, body in readable sans-serif, CTA as a restrained
    rectangular button.
-   Use genuine brand photography or approved product imagery.

### E. Featured collection/products

-   Warm ivory or parchment section.
-   Centred serif heading, optional short introductory line.
-   3--4 product cards across on desktop; 2 on mobile.
-   Product images large enough to evaluate the fabric and colour.
-   Product name and price placed immediately below the image.
-   Small stock/sale labels; use a subtle high-contrast label, not
    oversized floating pills.
-   Do not apply a sepia filter to the product itself.

### F. Browse by collection

-   Clear editorial heading.
-   Collection imagery should be visually consistent.
-   Use image-led tiles with concise labels.
-   Labels should be legible and linked to the corresponding collection.
-   Prefer square or portrait crops appropriate to the product.
-   Avoid too many decorative overlays.

### G. Mission / brand story

-   Use an editorial image-and-text split or alternating layout.
-   Keep the mission statement concise on the homepage.
-   Link to the full story page if more detail is needed.
-   Use authentic brand language; do not invent claims about sourcing,
    sustainability, ethics, or community impact.

### H. Flagship store

-   Pair a real store image with verified location details.
-   Include address, opening hours, and a directions CTA only after
    client verification.
-   A small uppercase eyebrow label may introduce the section.
-   Keep the section practical, not just decorative.

### I. Newsletter

-   Parchment or warm-white background.
-   Serif heading and concise explanation.
-   Email field with a clear border and accessible label.
-   Burgundy CTA.
-   Show success and error states in the same visual system.

### J. Footer

-   Ink-brown or deep burgundy background with warm light text.
-   Habaya wordmark and short brand description.
-   Separate columns for company, help, collections, and contact/store
    information.
-   Social icons with accessible labels.
-   Fine divider and small copyright line.
-   Keep legal and support links readable; avoid tiny low-contrast text.

## 8.2 Collection listing page

### Collection introduction

-   Breadcrumbs in small, readable text.
-   Collection title in a large serif.
-   Short description or introduction.
-   Optional banner image, only if it helps explain the collection.
-   Product count presented quietly and accurately.

### Filters and sorting

-   Use simple text controls and fine borders.
-   Filter and sort controls should feel like part of a fashion
    catalogue, not app dashboard widgets.
-   Make selected filters obvious.
-   Show a clear "Clear all" action.
-   Use accessible labels and visible keyboard focus.
-   On mobile, use a dedicated filter panel/drawer with a clear
    apply/close action.

### Product grid

-   Product imagery takes priority.
-   Consistent image ratios and spacing.
-   Name, variant hint if applicable, price, and sale price are
    readable.
-   Use restrained sale/new/sold-out labels.
-   Do not hide essential product information until hover; mobile has no
    reliable hover.
-   Hover can gently reveal a secondary image or quick action if
    approved, but should not be required for basic shopping.

### Pagination/load more

-   Use simple text or understated outlined controls.
-   Make the current page/next action easy to understand.
-   Preserve filter/sort state when changing result pages.

### Related products

-   Use a restrained editorial heading, e.g. "You may also love" or
    client-approved copy.
-   Keep cards consistent with the main product grid.
-   Use carousel controls only if needed; on mobile, ensure cards remain
    touch-accessible.

## 8.3 Product detail page

-   Main image gallery with generous space and consistent backgrounds.
-   Product title in serif or restrained body type; prioritise
    legibility.
-   Price directly beneath the title.
-   Clear variant selectors using labelled swatches or text choices,
    depending on the product data.
-   Quantity and add-to-cart controls grouped logically.
-   Product description, fabric/material, dimensions, care, delivery,
    and returns organised in readable sections.
-   Use fine dividers or accordion rows where content is long.
-   Related products below the main product content.
-   Avoid hiding price, selected colour, stock state, or add-to-cart
    behind hover.
-   Zoom/gallery controls must work with keyboard and touch.
-   Keep product colour photography accurate.

## 8.4 Cart

-   Use the same warm surfaces, ink text, and fine separators.
-   Clear item image, name, variant, price, quantity, and remove action.
-   Subtotal and checkout CTA should be visually prominent without
    becoming oversized.
-   Delivery/tax notes should be clear before the user proceeds.
-   Empty-cart page should include a concise message and a clear
    return-to-shop link.
-   Error and stock-change messages must have strong contrast.

## 8.5 Checkout

-   Keep checkout simpler than the editorial homepage.
-   Reduce decorative imagery and unnecessary navigation.
-   Use a clean, focused layout with clear progress or section headings.
-   Inputs should have visible labels, error messages, and adequate
    touch targets.
-   Order summary, delivery cost, discounts, and final total must be
    easy to verify.
-   Use the same typography and palette, but prioritise speed, trust,
    and accessibility.
-   Never make functional checkout information faint or excessively
    small for the sake of the vintage mood.

## 8.6 About / Our Story

-   Editorial page title and short introduction.
-   Alternating image-and-text blocks, with varied but balanced
    composition.
-   Use approved founder/team/craft stories only.
-   Include a link to shop collections at a natural point.
-   Testimonials or press mentions must be genuine and authorised.

## 8.7 Our Mission

-   A clear statement of purpose.
-   Supporting brand photography.
-   Short sections that explain values without unverified claims.
-   Use a quote treatment only if it is approved brand copy, not an
    invented testimonial.

## 8.8 Flagship Store / Visit Us

-   Store photography.
-   Verified address, opening hours, contact details, and map/directions
    link.
-   Optional gallery of the store and fabrics.
-   Make practical information easy to scan.

## 8.9 Search results

-   Reuse collection typography and product cards.
-   Display the search query and result count where useful.
-   Provide a clear empty state.
-   Keep filters and sorting consistent with collection pages.

## 8.10 FAQ, Contact, Shipping, Returns, Terms and Privacy

-   Readable page width and line length.
-   Clear serif page heading with restrained sans-serif body copy.
-   FAQ questions separated by fine rules.
-   Forms use labelled inputs, concise helper text, and clear
    validation.
-   Policy pages prioritise legibility over decoration.

## 9. Component Specifications

### Buttons

**Primary** - Background: heritage burgundy. - Text: warm white. -
Shape: rectangular or minimally rounded. - Hover: slightly deeper
burgundy or a subtle border/contrast change. - Focus: clearly visible
outline.

**Secondary** - Transparent or warm-white fill. - Ink-brown border and
text. - Hover: light parchment background.

**Text link** - Ink-brown or burgundy. - Underline on hover/focus where
suitable. - Clear keyboard focus.

Button labels should describe the action: "Shop the Collection", "View
Product", "Add to Bag", "Visit the Store".

### Product card

-   Product image at the top.
-   Small, restrained badge for "New", "Sale", or "Sold out" when
    accurate.
-   Product name and price beneath.
-   Original price struck through only when there is a real discount.
-   Optional colour/variant indicators only if useful and accessible.
-   Hover effect should be subtle: slight image transition or alternate
    image, not dramatic zoom.
-   The whole card should not accidentally trigger conflicting actions
    if a separate quick-add button exists.

### Form controls

-   Warm-white background.
-   Thin linen border.
-   Ink-brown text.
-   Visible label and clear focus state.
-   Error message close to the field.
-   Do not use placeholder text as the only label.

### Badges

-   Small text, high contrast, restrained styling.
-   Avoid excessive rounded black capsules if they conflict with the
    heritage identity.
-   Do not communicate essential states by colour alone.

### Icons

-   Use one consistent icon family and stroke weight.
-   Prefer simple line icons.
-   Search, account, bag/cart, menu, close, arrow, and social icons
    should be visually consistent.
-   Use accessible labels for icon-only controls.

### Dividers and decorative elements

-   Fine linen or brass rules.
-   Use small decorative ornaments sparingly and only where they
    strengthen the brand.
-   Decorative elements must not resemble buttons if they are not
    interactive.

## 10. Motion and Interaction

### Recommended

-   Short fade/slide-in for editorial sections where it does not delay
    content.
-   Gentle image transition on product-card hover.
-   Clear menu open/close transitions.
-   Subtle button hover feedback.
-   Smooth anchor scrolling only when it does not interfere with
    navigation.

### Avoid

-   Scroll hijacking.
-   Long intro animations before shoppers can use the site.
-   Large parallax effects on product grids.
-   Repeated bouncing, pulsing, or attention-grabbing motion.
-   Auto-advancing carousels that move too quickly or cannot be paused.
-   Motion that causes layout shifts or makes product details difficult
    to read.

### Motion guidance

-   Keep most transitions around 150--250 ms.
-   Respect `prefers-reduced-motion`.
-   Ensure all actions remain usable when motion is disabled.
-   Never use animation as the only way to communicate success, error,
    or availability.

## 11. Photography and Image Art Direction

### Product photography

-   Show the actual hijab/fabric colour as accurately as possible.
-   Use consistent lighting and colour correction across product cards.
-   Include close-ups that show texture, weave, drape, and finish where
    available.
-   Use consistent crops for products in the same collection.
-   Ensure the product remains visible against the background.
-   Do not add a heavy vintage filter to every product image; it can
    misrepresent colours.

### Editorial photography

-   Warm, natural light.
-   Tactile textiles and fabric detail.
-   Thoughtful composition with negative space for copy.
-   Natural poses and styling appropriate to the brand.
-   A mix of campaign, product, store, and detail photography.
-   Avoid mixing highly processed stock imagery with real brand
    photography in the same section.

### Asset quality

-   Use client-owned or licensed images.
-   Prepare suitable desktop and mobile crops for hero campaigns.
-   Use modern image formats where supported.
-   Supply alt text for informative images.
-   Keep image compression high enough to protect page speed without
    visibly degrading fabric detail.

### Cultural and brand respect

-   Follow the client's approved modest-fashion imagery guidelines.
-   Do not assume that generic fashion stock imagery is acceptable.
-   Obtain approval for any models, styling, product claims, or campaign
    wording.

## 12. Responsive Design

### Desktop

-   Full editorial layout with generous whitespace.
-   3--4 product columns depending on content width.
-   Image/text splits and asymmetric editorial sections.
-   Full navigation where space permits.

### Tablet

-   Reduce horizontal padding.
-   Reflow split sections without shrinking text excessively.
-   Use 2--3 product columns as appropriate.
-   Keep filters, menu, and cart controls easy to operate.

### Mobile

-   Prioritise logo, menu, search, and cart.
-   Use 2 product columns where cards remain legible; switch to 1 when
    content requires it.
-   Use shorter hero copy and carefully art-directed image crops.
-   Stack editorial image/text sections.
-   Ensure product names, prices, variants, and buttons are visible
    without hover.
-   Use at least 44 × 44 CSS pixel touch targets where practical.
-   Avoid tiny text, dense navigation, horizontal page overflow, and
    oversized decorative gaps.
-   Filter/sort controls should be easy to open, apply, and dismiss.

## 13. Accessibility and Usability

-   Meet WCAG 2.2 AA where practicable.
-   Maintain readable contrast for body text, controls, prices, badges,
    and errors.
-   Use semantic heading order.
-   Provide keyboard navigation and visible focus.
-   Label all form fields.
-   Announce cart updates and form feedback to assistive technology.
-   Provide meaningful alt text for product/editorial images where
    appropriate.
-   Make carousels keyboard-operable and provide accessible control
    labels.
-   Avoid relying on hover-only interactions.
-   Respect reduced-motion preferences.
-   Test with zoomed text and smaller mobile viewports.
-   Keep vintage styling subordinate to usability.

## 14. Design Tokens for Implementation

Suggested CSS custom properties:

``` css
:root {
  --color-paper-ivory: #F7F2E8;
  --color-parchment: #EDE2D0;
  --color-aged-linen: #D9C8B2;
  --color-ink-brown: #30251F;
  --color-heritage-burgundy: #55252D;
  --color-antique-brass: #A88956;
  --color-muted-olive: #77765B;
  --color-warm-white: #FCFAF5;
  --color-soft-taupe: #8A796A;
  --color-border-linen: #D8CDBE;

  --font-display: "Cormorant Garamond", "Libre Baskerville", Georgia, serif;
  --font-body: "Lato", "Inter", Arial, sans-serif;

  --content-max: 1360px;
  --page-gutter-desktop: 48px;
  --page-gutter-tablet: 28px;
  --page-gutter-mobile: 18px;

  --space-section-desktop: 96px;
  --space-section-mobile: 60px;

  --radius-image: 2px;
  --radius-control: 2px;
  --border-thin: 1px solid var(--color-border-linen);
}
```

These values are a starting point and should be adjusted after reviewing
the actual logo, photography, and brand requirements.

## 15. Design QA Checklist

### Brand consistency

-   [ ] The site feels vintage, editorial, and original to Habaya.
-   [ ] The design does not look like a generic modern store template.
-   [ ] Wordmark and typography remain legible at all sizes.
-   [ ] Colours are consistent across all pages.

### Commerce clarity

-   [ ] Product names and prices are easy to find.
-   [ ] Variant selection and stock state are clear.
-   [ ] Product images show accurate colours.
-   [ ] Sale labels are accurate and restrained.
-   [ ] Essential actions are not hidden behind hover.
-   [ ] Cart and checkout remain clear and focused.

### Responsive

-   [ ] Header and navigation work on mobile.
-   [ ] Product grid remains readable at narrow widths.
-   [ ] Hero copy does not overlap important image content.
-   [ ] No horizontal overflow.
-   [ ] Forms and controls are touch-friendly.
-   [ ] Footer links remain readable.

### Accessibility

-   [ ] Contrast checked.
-   [ ] Keyboard focus visible.
-   [ ] Inputs have labels.
-   [ ] Images have appropriate alt text.
-   [ ] Carousels are operable without a mouse.
-   [ ] Reduced-motion preference is respected.

### Performance

-   [ ] Hero image is optimised.
-   [ ] Product images are appropriately sized.
-   [ ] Decorative textures do not add excessive payload.
-   [ ] Fonts are loaded efficiently.
-   [ ] Animations do not cause layout shifts.

## 16. Open Design Decisions

Confirm these with the client before final sign-off:

1.  Is "Habaya" the final brand name, or is it a working name?
2.  Does the client prefer a darker heritage look (burgundy/ink) or a
    lighter parchment-first look?
3.  Should the brand feel more like an antique textile atelier, a
    vintage fashion magazine, or a classic boutique?
4.  Which logo assets already exist?
5.  Which fonts and image assets are licensed/available?
6.  Should the homepage hero be full-bleed, split image/text, or a more
    traditional editorial composition?
7.  Does the client prefer square product images or portrait model
    photography?
8.  Which product-card labels are required?
9.  Should collection filters be visible on desktop or opened through a
    control?
10. Is the physical store a key part of the brand story?
11. Are there brand guidelines or cultural imagery requirements to
    follow?
12. Which supported devices and browsers should be included in
    acceptance testing?

## 17. Handoff Notes for Developers

-   Treat the colour, typography, spacing, and radius values as design
    tokens rather than one-off values.
-   Build reusable components for announcement bar, header, footer,
    section heading, product card, collection tile, button, form
    control, breadcrumb, filter panel, and product gallery.
-   Keep product data and content separate from presentational
    components.
-   Use responsive image sources and preserve accurate product colours.
-   Implement all hover states with keyboard-focus equivalents.
-   Do not hardcode real prices, stock states, testimonials, store
    hours, or policy copy into design components.
-   Keep checkout minimal and consistent, but prioritise conversion,
    trust, and accessibility over decoration.
-   Validate the final pages against both this document and
    `habayasite.md`.
-   The final visual design should be reviewed with real product imagery
    and the approved logo before development is considered complete.

------------------------------------------------------------------------

## 18. Final Creative Direction

**Habaya should look like a contemporary modest-fashion brand presented
through a timeless vintage fashion journal.** Use warm paper tones, rich
ink and burgundy accents, classic serif headlines, restrained sans-serif
body typography, tactile but subtle surfaces, editorial photography,
fine borders, and generous whitespace. Preserve the practical shopping
structure shown in the Aayla reference while giving every page a
coherent, original heritage character.

The result should feel **vintage in its visual language, contemporary in
its usability, and unmistakably Habaya in its identity**.

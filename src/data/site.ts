import { DeliveryOption } from '../types/product';

export const images = {
  hero: "/f35c907f-f8ce-4daa-b5cf-62a94a63c964.jpg",
  intro: "/be4a8462-0c64-4605-ab6a-831fbcd657cd.jpg",
  mission: "/5d94295b-ad3f-4266-ae83-ef919f3d5311.jpg",
  store: "/5305a641-4301-460e-9325-0e9f09f0b62d.jpg",
  atelier: "/8408461c-f90f-4266-a9f1-0af22f7fd75d.jpg"
};

export const announcement = {
  message: 'Complimentary UK delivery on orders over £50',
  linkLabel: 'Delivery details',
  linkTo: '/help/shipping'
};

export const primaryNav = [
{ label: 'New in', to: '/collections/new-arrivals' },
{ label: 'Printed Modal', to: '/collections/printed-modal' },
{ label: 'Modal', to: '/collections/modal-hijabs' },
{ label: 'Jersey', to: '/collections/jersey-hijabs' },
{ label: 'Chiffon', to: '/collections/premium-chiffon' },
{ label: 'Sale', to: '/collections/sale' },
{ label: 'Our Story', to: '/our-story' },
{ label: 'Visit Us', to: '/visit-us' }];


export const footerColumns = [
{
  title: 'Shop',
  links: [
  { label: 'Shop all', to: '/shop' },
  { label: 'New in', to: '/collections/new-arrivals' },
  { label: 'Printed Modal', to: '/collections/printed-modal' },
  { label: 'Modal Hijabs', to: '/collections/modal-hijabs' },
  { label: 'Jersey Hijabs', to: '/collections/jersey-hijabs' },
  { label: 'Premium Chiffon', to: '/collections/premium-chiffon' }]

},
{
  title: 'Habaya',
  links: [
  { label: 'Our story', to: '/our-story' },
  { label: 'Our mission', to: '/our-mission' },
  { label: 'Visit the flagship', to: '/visit-us' },
  { label: 'Contact us', to: '/contact' },
  { label: 'Client Admin Portal', to: '/admin' }]

},
{
  title: 'Help',
  links: [
  { label: 'FAQ', to: '/faq' },
  { label: 'Shipping & delivery', to: '/help/shipping' },
  { label: 'Returns & refunds', to: '/help/returns' },
  { label: 'Privacy policy', to: '/help/privacy' },
  { label: 'Terms & conditions', to: '/help/terms' }]

}];


export const store = {
  name: 'Habaya Flagship',
  addressLines: ['14 Granby Arcade', 'Leicester LE1 6FB', 'United Kingdom'],
  phone: '+44 116 496 0123',
  email: 'hello@habaya.co.uk',
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Granby+Street+Leicester',
  hours: [
  { days: 'Monday – Thursday', time: '10:00 – 18:00' },
  { days: 'Friday', time: '10:00 – 12:30, 14:30 – 18:30' },
  { days: 'Saturday', time: '10:00 – 19:00' },
  { days: 'Sunday', time: '11:00 – 17:00' }]

};

export const socialLinks = [
{ label: 'Instagram', href: 'https://instagram.com' },
{ label: 'TikTok', href: 'https://tiktok.com' },
{ label: 'Pinterest', href: 'https://pinterest.com' }];


export const deliveryOptions: DeliveryOption[] = [
{ id: 'standard', label: 'Standard delivery', detail: '2–4 working days', price: 3.95, freeOver: 50 },
{ id: 'express', label: 'Express delivery', detail: 'Next working day if ordered by 1pm', price: 6.95 },
{ id: 'collect', label: 'Collect from the flagship', detail: 'Ready within 24 hours · Leicester', price: 0 }];


export const priceRanges = [
{ id: 'under-18', label: 'Under £18', min: 0, max: 17.99 },
{ id: '18-24', label: '£18 – £24', min: 18, max: 24 },
{ id: 'over-24', label: 'Over £24', min: 24.01, max: 9999 }];


export const sortOptions = [
{ id: 'featured', label: 'Featured' },
{ id: 'newest', label: 'Newest' },
{ id: 'price-asc', label: 'Price: low to high' },
{ id: 'price-desc', label: 'Price: high to low' }];


export const storyChapters = [
{
  title: 'It began with a drawer of scarves',
  body: 'Habaya started at a kitchen table, with a drawer of hijabs collected over years — some inherited, some found in markets, all kept because the fabric felt right. We wanted to make pieces that would earn the same place in someone else’s drawer.',
  image: images.atelier,
  alt: 'Wooden shelves holding folded bolts of fabric in natural tones'
},
{
  title: 'Fabric first, always',
  body: 'Every collection begins with touch. We sample, wash and wear each fabric for weeks before it becomes a Habaya hijab, looking for drape, breathability and colours that stay true after many washes.',
  image: images.mission,
  alt: 'Hands folding burgundy fabric on a cutting table'
},
{
  title: 'A small shop with an open door',
  body: 'Our flagship in Leicester is where the archive lives. It is a place to feel the fabrics, try colours against your skin, and take your time — no rush, and always a cup of tea.',
  image: images.store,
  alt: 'Interior of the Habaya flagship boutique with wooden shelves'
}];


export const missionValues = [
{
  title: 'Modesty with ease',
  body: 'Hijabs that are comfortable to wear for a full day, simple to style, and made to sit well without fuss.'
},
{
  title: 'Made to be kept',
  body: 'We choose fabrics for how they wear over time, not just how they photograph, so each piece lasts for many seasons.'
},
{
  title: 'A considered palette',
  body: 'Colours chosen to work together, so a small collection of hijabs can carry you through work, family and occasion.'
}];


export const faqGroups = [
{
  title: 'Orders & delivery',
  items: [
  {
    q: 'How long does delivery take?',
    a: 'Standard UK delivery takes 2–4 working days. Express orders placed before 1pm on a working day are delivered the next working day.'
  },
  {
    q: 'Do you offer free delivery?',
    a: 'Standard UK delivery is complimentary on orders over £50. Collection from our Leicester flagship is always free.'
  },
  {
    q: 'Can I change my order after placing it?',
    a: 'Contact us as soon as possible at hello@habaya.co.uk. If your order has not yet been packed, we will do our best to help.'
  }]

},
{
  title: 'Products & care',
  items: [
  {
    q: 'Which fabric is best for everyday wear?',
    a: 'Our Everyday Modal and Premium Jersey are the most forgiving for long days. Modal offers a soft drape; jersey needs no pins.'
  },
  {
    q: 'Are your colours accurate on screen?',
    a: 'We photograph every hijab in natural daylight without colour filters. Screens vary, so if you are unsure, contact us and we will describe the shade.'
  },
  {
    q: 'How should I wash my hijab?',
    a: 'Care instructions are listed on every product page. Most modal and jersey pieces can be machine washed on a delicate cycle at 30°C.'
  }]

},
{
  title: 'Returns',
  items: [
  {
    q: 'What is your returns policy?',
    a: 'Unworn items with tags attached can be returned within 14 days of delivery for a refund to the original payment method.'
  },
  {
    q: 'Can I return a sale item?',
    a: 'Sale items can be returned under the same conditions as full-price items unless marked final sale.'
  }]

}];


export const policies: Record<string, {title: string;intro: string;sections: {heading: string;body: string;}[];}> = {
  shipping: {
    title: 'Shipping & delivery',
    intro: 'We pack every order by hand at our Leicester flagship and dispatch from Monday to Friday.',
    sections: [
    {
      heading: 'UK delivery',
      body: 'Standard delivery (2–4 working days) is £3.95, or complimentary on orders over £50. Express delivery is £6.95 and arrives the next working day when ordered before 1pm.'
    },
    {
      heading: 'Click & collect',
      body: 'Choose “Collect from the flagship” at checkout. We will email you when your order is ready, usually within 24 hours. Please bring your order reference.'
    },
    {
      heading: 'International delivery',
      body: 'We currently deliver within the United Kingdom only. We hope to offer international shipping soon.'
    }]

  },
  returns: {
    title: 'Returns & refunds',
    intro: 'If something is not quite right, we will help you return it simply.',
    sections: [
    {
      heading: 'Eligibility',
      body: 'Items may be returned within 14 days of delivery, unworn, unwashed and with original tags attached. For hygiene reasons, underscarves cannot be returned once opened.'
    },
    {
      heading: 'How to return',
      body: 'Email hello@habaya.co.uk with your order reference and the items you wish to return. We will reply with a returns address and instructions. Items may also be returned in person at the flagship.'
    },
    {
      heading: 'Refunds',
      body: 'Refunds are issued to the original payment method within 5 working days of your return arriving with us. Original delivery charges are refunded only if the full order is returned.'
    }]

  },
  privacy: {
    title: 'Privacy policy',
    intro: 'We collect only the information we need to fulfil your order and, if you choose, to send you our newsletter.',
    sections: [
    {
      heading: 'What we collect',
      body: 'Your name, email address, delivery address, phone number where needed by our courier, and order history. Card details are handled by our payment provider and never stored by Habaya.'
    },
    {
      heading: 'Marketing',
      body: 'We only send marketing emails if you have opted in. Every email includes an unsubscribe link, and you can contact us at any time to update your preferences.'
    },
    {
      heading: 'Your rights',
      body: 'You may request a copy of your data, ask us to correct it, or ask us to delete it by emailing hello@habaya.co.uk.'
    }]

  },
  terms: {
    title: 'Terms & conditions',
    intro: 'These terms apply to all purchases made on habaya.co.uk.',
    sections: [
    {
      heading: 'Orders',
      body: 'An order is accepted once payment has been confirmed and you receive our confirmation email. We reserve the right to cancel orders where stock is unavailable, with a full refund.'
    },
    {
      heading: 'Pricing',
      body: 'All prices are shown in pounds sterling and include VAT. Delivery charges are shown before you complete your order.'
    },
    {
      heading: 'Product images',
      body: 'We take care to show colours accurately, but slight variations may occur between screens and fabric batches.'
    }]

  }
};
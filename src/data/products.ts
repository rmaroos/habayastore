import { Product } from '../types/product';

const care = [
'Hand wash cold, or machine wash at 30°C on a delicate cycle.',
'Do not tumble dry. Dry flat, away from direct sunlight.',
'Cool iron on the reverse if needed.'];


const chiffonCare = [
'Hand wash cold with a gentle detergent.',
'Do not wring. Hang to dry in shade.',
'Steam or iron on the lowest setting through a cloth.'];


export const products: Product[] = [
{
  id: 'p-rosa',
  slug: 'rosa-botanical-printed-modal',
  name: 'Rosa Botanical',
  type: 'Printed Modal Hijab',
  collection: 'printed-modal',
  description:
  'A dusty-rose ground scattered with small cream blossoms, printed on breathable modal that drapes softly and holds its shape from morning to evening.',
  price: 24,
  material: '95% modal, 5% elastane',
  dimensions: '180 × 70 cm',
  care,
  featured: true,
  addedOrder: 6,
  colours: [
  {
    name: 'Dusty Rose',
    hex: '#B48A88',
    family: 'Pinks',
    image: "/54023614-3373-4d9f-827c-edd4e6e00d9f.jpg",
    stock: 14,
    sku: 'HB-PM-ROS-01'
  }]

},
{
  id: 'p-sage',
  slug: 'sage-trellis-printed-modal',
  name: 'Sage Trellis',
  type: 'Printed Modal Hijab',
  collection: 'printed-modal',
  description:
  'A fine cream lattice on soft sage, inspired by old garden trellis drawings. Light enough for warm days, opaque enough for everyday wear.',
  price: 24,
  material: '95% modal, 5% elastane',
  dimensions: '180 × 70 cm',
  care,
  featured: true,
  addedOrder: 7,
  colours: [
  {
    name: 'Sage',
    hex: '#9AA58C',
    family: 'Greens',
    image: "/3bccf45a-b34d-4590-8e51-273d1bc050dd.jpg",
    stock: 8,
    sku: 'HB-PM-SAG-01'
  }]

},
{
  id: 'p-paisley',
  slug: 'midnight-paisley-printed-modal',
  name: 'Midnight Paisley',
  type: 'Printed Modal Hijab',
  collection: 'printed-modal',
  description:
  'An antique paisley in muted gold and cream on deep navy. A richer print for evenings and occasions that still feels quiet.',
  price: 22,
  compareAt: 28,
  material: '95% modal, 5% elastane',
  dimensions: '180 × 70 cm',
  care,
  featured: true,
  addedOrder: 4,
  colours: [
  {
    name: 'Midnight Navy',
    hex: '#2B3550',
    family: 'Blues',
    image: "/61798417-e14a-454b-b9ec-87d2bbd66ffe.jpg",
    stock: 3,
    sku: 'HB-PM-NAV-01'
  }]

},
{
  id: 'p-terracotta',
  slug: 'terracotta-garden-printed-modal',
  name: 'Terracotta Garden',
  type: 'Printed Modal Hijab',
  collection: 'printed-modal',
  description:
  'A vintage floral garden in cream and rust on warm terracotta. The newest print in the archive, made for autumn layering.',
  price: 26,
  material: '95% modal, 5% elastane',
  dimensions: '180 × 70 cm',
  care,
  isNew: true,
  featured: true,
  addedOrder: 10,
  colours: [
  {
    name: 'Terracotta',
    hex: '#B0674A',
    family: 'Reds',
    image: "/01527079-ff99-4d09-845b-fe664efefa5c.jpg",
    stock: 20,
    sku: 'HB-PM-TER-01'
  }]

},
{
  id: 'p-everyday-modal',
  slug: 'everyday-modal-hijab',
  name: 'Everyday Modal',
  type: 'Modal Hijab',
  collection: 'modal-hijabs',
  description:
  'Our foundation hijab: a plain, matte modal with gentle stretch and a soft hand. It wraps easily, stays in place, and washes beautifully.',
  price: 18,
  material: '95% modal, 5% elastane',
  dimensions: '180 × 70 cm',
  care,
  addedOrder: 3,
  colours: [
  {
    name: 'Sand',
    hex: '#CDB596',
    family: 'Neutrals',
    image: "/71db55ba-7af4-4db9-8827-335ecc30e367.jpg",
    stock: 25,
    sku: 'HB-MD-SND-01'
  },
  {
    name: 'Stone',
    hex: '#B5B3AE',
    family: 'Neutrals',
    image: "/6769ec5b-6aae-4410-a318-2833ff689b26.jpg",
    stock: 12,
    sku: 'HB-MD-STN-01'
  },
  {
    name: 'Mocha',
    hex: '#6E4E3C',
    family: 'Darks',
    image: "/5b638fe3-a98f-40cd-9265-74b06cf02cc0.jpg",
    stock: 0,
    sku: 'HB-MD-MOC-01'
  }]

},
{
  id: 'p-mulberry',
  slug: 'mulberry-modal-hijab',
  name: 'Mulberry Modal',
  type: 'Modal Hijab',
  collection: 'modal-hijabs',
  description:
  'A deep, wine-dark modal with the same soft drape as our Everyday Modal. A considered colour that pairs with ivory, camel and charcoal.',
  price: 19,
  material: '95% modal, 5% elastane',
  dimensions: '180 × 70 cm',
  care,
  isNew: true,
  addedOrder: 9,
  colours: [
  {
    name: 'Mulberry',
    hex: '#5E2430',
    family: 'Reds',
    image: "/85ebc124-9aea-4700-ba4b-23a556448e90.jpg",
    stock: 6,
    sku: 'HB-MD-MUL-01'
  }]

},
{
  id: 'p-premium-jersey',
  slug: 'premium-jersey-hijab',
  name: 'Premium Jersey',
  type: 'Jersey Hijab',
  collection: 'jersey-hijabs',
  description:
  'A dense cotton-blend jersey with a fluid stretch that needs no pins. Breathable, forgiving and made for busy days.',
  price: 16,
  material: '92% cotton, 8% elastane',
  dimensions: '175 × 65 cm',
  care,
  addedOrder: 5,
  colours: [
  {
    name: 'Black',
    hex: '#1F1D1C',
    family: 'Darks',
    image: "/37120637-a22a-40d7-915b-88a1b3b352a2.jpg",
    stock: 30,
    sku: 'HB-JR-BLK-01'
  },
  {
    name: 'Navy',
    hex: '#232B3E',
    family: 'Blues',
    image: "/46df749e-b80f-4676-8a41-d7bb6bf91ca3.jpg",
    stock: 18,
    sku: 'HB-JR-NAV-01'
  },
  {
    name: 'Camel',
    hex: '#C29467',
    family: 'Neutrals',
    image: "/a553a9ac-815b-41f4-93f4-6846ba5db8f4.jpg",
    stock: 9,
    sku: 'HB-JR-CML-01'
  }]

},
{
  id: 'p-ribbed-jersey',
  slug: 'ribbed-jersey-hijab',
  name: 'Ribbed Jersey',
  type: 'Jersey Hijab',
  collection: 'jersey-hijabs',
  description:
  'A fine vertical rib gives this jersey a subtle texture and a little more structure around the face.',
  price: 17,
  material: '90% viscose, 10% elastane',
  dimensions: '175 × 65 cm',
  care,
  addedOrder: 2,
  colours: [
  {
    name: 'Olive',
    hex: '#6F6E4E',
    family: 'Greens',
    image: "/699eeda4-c03b-4e0e-9762-e1e4ab6f8b52.jpg",
    stock: 0,
    sku: 'HB-JR-OLV-01'
  }]

},
{
  id: 'p-premium-chiffon',
  slug: 'premium-chiffon-hijab',
  name: 'Premium Chiffon',
  type: 'Chiffon Hijab',
  collection: 'premium-chiffon',
  description:
  'A lightweight, finely woven chiffon with a soft, almost powdery finish. Sheer enough to float, with enough grip to stay where you place it.',
  price: 15,
  compareAt: 19,
  material: '100% polyester georgette chiffon',
  dimensions: '180 × 72 cm',
  care: chiffonCare,
  addedOrder: 8,
  colours: [
  {
    name: 'Ivory',
    hex: '#EDE4D3',
    family: 'Neutrals',
    image: "/39b880a6-0b26-484a-becb-f372451d84ce.jpg",
    stock: 22,
    sku: 'HB-CH-IVR-01'
  },
  {
    name: 'Dusty Blue',
    hex: '#9DB0C2',
    family: 'Blues',
    image: "/44b33281-5c61-4743-a586-f8dc6f2adb07.jpg",
    stock: 11,
    sku: 'HB-CH-DBL-01'
  },
  {
    name: 'Blush',
    hex: '#E3C1BC',
    family: 'Pinks',
    image: "/6927ff21-f074-431b-9473-1a3b2c765cb3.jpg",
    stock: 4,
    sku: 'HB-CH-BLS-01'
  }]

}];
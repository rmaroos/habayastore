-- ==============================================================================
-- HABAYA BOUTIQUE - SUPABASE INITIAL SEED DATA
-- ==============================================================================
-- Run this in your Supabase SQL Editor after running schema.sql.
-- ==============================================================================

-- 1. Insert Initial Products
insert into public.products (id, slug, name, type, collection, description, price, compare_at, material, dimensions, care, colours, is_new, featured, added_order)
values
(
  'p-rosa',
  'rosa-botanical-printed-modal',
  'Rosa Botanical',
  'Printed Modal Hijab',
  'printed-modal',
  'A dusty-rose ground scattered with small cream blossoms, printed on breathable modal that drapes softly and holds its shape from morning to evening.',
  24,
  null,
  '95% modal, 5% elastane',
  '180 × 70 cm',
  '["Hand wash cold, or machine wash at 30°C on a delicate cycle.", "Do not tumble dry. Dry flat, away from direct sunlight.", "Cool iron on the reverse if needed."]'::jsonb,
  '[{"name": "Dusty Rose", "hex": "#B48A88", "family": "Pinks", "image": "/54023614-3373-4d9f-827c-edd4e6e00d9f.jpg", "stock": 14, "sku": "HB-PM-ROS-01"}]'::jsonb,
  false,
  true,
  6
),
(
  'p-sage',
  'sage-trellis-printed-modal',
  'Sage Trellis',
  'Printed Modal Hijab',
  'printed-modal',
  'A fine cream lattice on soft sage, inspired by old garden trellis drawings. Light enough for warm days, opaque enough for everyday wear.',
  24,
  null,
  '95% modal, 5% elastane',
  '180 × 70 cm',
  '["Hand wash cold, or machine wash at 30°C on a delicate cycle.", "Do not tumble dry. Dry flat, away from direct sunlight.", "Cool iron on the reverse if needed."]'::jsonb,
  '[{"name": "Sage", "hex": "#9AA58C", "family": "Greens", "image": "/3bccf45a-b34d-4590-8e51-273d1bc050dd.jpg", "stock": 8, "sku": "HB-PM-SAG-01"}]'::jsonb,
  false,
  true,
  7
),
(
  'p-paisley',
  'midnight-paisley-printed-modal',
  'Midnight Paisley',
  'Printed Modal Hijab',
  'printed-modal',
  'An antique paisley in muted gold and cream on deep navy. A richer print for evenings and occasions that still feels quiet.',
  22,
  28,
  '95% modal, 5% elastane',
  '180 × 70 cm',
  '["Hand wash cold, or machine wash at 30°C on a delicate cycle.", "Do not tumble dry. Dry flat, away from direct sunlight.", "Cool iron on the reverse if needed."]'::jsonb,
  '[{"name": "Midnight Navy", "hex": "#2B3550", "family": "Blues", "image": "/61798417-e14a-454b-b9ec-87d2bbd66ffe.jpg", "stock": 3, "sku": "HB-PM-NAV-01"}]'::jsonb,
  false,
  true,
  4
),
(
  'p-terracotta',
  'terracotta-garden-printed-modal',
  'Terracotta Garden',
  'Printed Modal Hijab',
  'printed-modal',
  'A vintage floral garden in cream and rust on warm terracotta. The newest print in the archive, made for autumn layering.',
  26,
  null,
  '95% modal, 5% elastane',
  '180 × 70 cm',
  '["Hand wash cold, or machine wash at 30°C on a delicate cycle.", "Do not tumble dry. Dry flat, away from direct sunlight.", "Cool iron on the reverse if needed."]'::jsonb,
  '[{"name": "Terracotta", "hex": "#B0674A", "family": "Reds", "image": "/01527079-ff99-4d09-845b-fe664efefa5c.jpg", "stock": 20, "sku": "HB-PM-TER-01"}]'::jsonb,
  true,
  true,
  10
),
(
  'p-everyday-modal',
  'everyday-modal-hijab',
  'Everyday Modal',
  'Modal Hijab',
  'modal-hijabs',
  'Our foundation hijab: a plain, matte modal with gentle stretch and a soft hand. It wraps easily, stays in place, and washes beautifully.',
  18,
  null,
  '95% modal, 5% elastane',
  '180 × 70 cm',
  '["Hand wash cold, or machine wash at 30°C on a delicate cycle.", "Do not tumble dry. Dry flat, away from direct sunlight.", "Cool iron on the reverse if needed."]'::jsonb,
  '[
    {"name": "Sand", "hex": "#CDB596", "family": "Neutrals", "image": "/71db55ba-7af4-4db9-8827-335ecc30e367.jpg", "stock": 25, "sku": "HB-MD-SND-01"},
    {"name": "Stone", "hex": "#B5B3AE", "family": "Neutrals", "image": "/6769ec5b-6aae-4410-a318-2833ff689b26.jpg", "stock": 12, "sku": "HB-MD-STN-01"},
    {"name": "Mocha", "hex": "#6E4E3C", "family": "Darks", "image": "/5b638fe3-a98f-40cd-9265-74b06cf02cc0.jpg", "stock": 0, "sku": "HB-MD-MOC-01"}
  ]'::jsonb,
  false,
  false,
  3
),
(
  'p-mulberry',
  'mulberry-modal-hijab',
  'Mulberry Modal',
  'Modal Hijab',
  'modal-hijabs',
  'A deep, wine-dark modal with the same soft drape as our Everyday Modal. A considered colour that pairs with ivory, camel and charcoal.',
  19,
  null,
  '95% modal, 5% elastane',
  '180 × 70 cm',
  '["Hand wash cold, or machine wash at 30°C on a delicate cycle.", "Do not tumble dry. Dry flat, away from direct sunlight.", "Cool iron on the reverse if needed."]'::jsonb,
  '[{"name": "Mulberry", "hex": "#5E2430", "family": "Reds", "image": "/85ebc124-9aea-4700-ba4b-23a556448e90.jpg", "stock": 6, "sku": "HB-MD-MUL-01"}]'::jsonb,
  true,
  false,
  9
),
(
  'p-premium-jersey',
  'premium-jersey-hijab',
  'Premium Jersey',
  'Jersey Hijab',
  'jersey-hijabs',
  'A dense cotton-blend jersey with a fluid stretch that needs no pins. Breathable, forgiving and made for busy days.',
  16,
  null,
  '92% cotton, 8% elastane',
  '175 × 65 cm',
  '["Hand wash cold, or machine wash at 30°C on a delicate cycle.", "Do not tumble dry. Dry flat, away from direct sunlight.", "Cool iron on the reverse if needed."]'::jsonb,
  '[
    {"name": "Black", "hex": "#1F1D1C", "family": "Darks", "image": "/37120637-a22a-40d7-915b-88a1b3b352a2.jpg", "stock": 30, "sku": "HB-JR-BLK-01"},
    {"name": "Navy", "hex": "#232B3E", "family": "Blues", "image": "/46df749e-b80f-4676-8a41-d7bb6bf91ca3.jpg", "stock": 18, "sku": "HB-JR-NAV-01"},
    {"name": "Camel", "hex": "#C29467", "family": "Neutrals", "image": "/a553a9ac-815b-41f4-93f4-6846ba5db8f4.jpg", "stock": 9, "sku": "HB-JR-CML-01"}
  ]'::jsonb,
  false,
  false,
  5
),
(
  'p-ribbed-jersey',
  'ribbed-jersey-hijab',
  'Ribbed Jersey',
  'Jersey Hijab',
  'jersey-hijabs',
  'A fine vertical rib gives this jersey a subtle texture and a little more structure around the face.',
  17,
  null,
  '90% viscose, 10% elastane',
  '175 × 65 cm',
  '["Hand wash cold, or machine wash at 30°C on a delicate cycle.", "Do not tumble dry. Dry flat, away from direct sunlight.", "Cool iron on the reverse if needed."]'::jsonb,
  '[{"name": "Olive", "hex": "#6F6E4E", "family": "Greens", "image": "/699eeda4-c03b-4e0e-9762-e1e4ab6f8b52.jpg", "stock": 0, "sku": "HB-JR-OLV-01"}]'::jsonb,
  false,
  false,
  2
),
(
  'p-premium-chiffon',
  'premium-chiffon-hijab',
  'Premium Chiffon',
  'Chiffon Hijab',
  'premium-chiffon',
  'A lightweight, finely woven chiffon with a soft, almost powdery finish. Sheer enough to float, with enough grip to stay where you place it.',
  15,
  19,
  '100% polyester georgette chiffon',
  '180 × 72 cm',
  '["Hand wash cold with a gentle detergent.", "Do not wring. Hang to dry in shade.", "Steam or iron on the lowest setting through a cloth."]'::jsonb,
  '[
    {"name": "Ivory", "hex": "#EDE4D3", "family": "Neutrals", "image": "/39b880a6-0b26-484a-becb-f372451d84ce.jpg", "stock": 22, "sku": "HB-CH-IVR-01"},
    {"name": "Dusty Blue", "hex": "#9DB0C2", "family": "Blues", "image": "/44b33281-5c61-4743-a586-f8dc6f2adb07.jpg", "stock": 11, "sku": "HB-CH-DBL-01"},
    {"name": "Blush", "hex": "#E3C1BC", "family": "Pinks", "image": "/6927ff21-f074-431b-9473-1a3b2c765cb3.jpg", "stock": 4, "sku": "HB-CH-BLS-01"}
  ]'::jsonb,
  false,
  false,
  8
)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  type = excluded.type,
  collection = excluded.collection,
  description = excluded.description,
  price = excluded.price,
  compare_at = excluded.compare_at,
  material = excluded.material,
  dimensions = excluded.dimensions,
  care = excluded.care,
  colours = excluded.colours,
  is_new = excluded.is_new,
  featured = excluded.featured,
  added_order = excluded.added_order;

-- 2. Insert Sample Orders
insert into public.orders (id, reference, email, name, address, delivery, delivery_cost, subtotal, total, lines, status, notes)
values
(
  'order-demo-01',
  'HB-849201',
  'sophia.clarke@example.co.uk',
  'Sophia Clarke',
  '24 Kensington Church Street, London W8 4EP',
  '{"id": "express", "label": "UK Next Day Express", "price": 5.95, "detail": "DPD tracked with 1-hour delivery window"}'::jsonb,
  5.95,
  48.00,
  53.95,
  '[
    {"name": "Rosa Botanical", "colour": "Dusty Rose", "quantity": 1, "lineTotal": 24, "image": "/54023614-3373-4d9f-827c-edd4e6e00d9f.jpg"},
    {"name": "Sage Trellis", "colour": "Sage", "quantity": 1, "lineTotal": 24, "image": "/3bccf45a-b34d-4590-8e51-273d1bc050dd.jpg"}
  ]'::jsonb,
  'Processing',
  'Gift wrap requested with parchment note.'
)
on conflict (id) do nothing;

-- 3. Insert Sample Customer Inquiries
insert into public.inquiries (id, name, email, order_number, topic, message, status)
values
(
  'inq-demo-01',
  'Amina Khan',
  'amina.k@example.com',
  'HB-849201',
  'Order or delivery',
  'Hello! I placed an order yesterday for the Rosa Botanical and would love to confirm if this will arrive before Friday for an upcoming family dinner. Thank you!',
  'New'
)
on conflict (id) do nothing;

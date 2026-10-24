import React, { useState, useEffect } from 'react';
import { XIcon, PlusIcon, Trash2Icon, CheckIcon } from 'lucide-react';
import { CollectionSlug, ColourFamily, Product, ProductColour } from '../types/product';
import { collections } from '../data/collections';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => Promise<void>;
  product?: Product | null;
}

const COLOUR_FAMILIES: ColourFamily[] = ['Neutrals', 'Pinks', 'Greens', 'Blues', 'Reds', 'Darks'];

const DEFAULT_CARE = [
  'Hand wash cold, or machine wash at 30°C on a delicate cycle.',
  'Do not tumble dry. Dry flat, away from direct sunlight.',
  'Cool iron on the reverse if needed.',
];

export function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
  const isEditing = Boolean(product);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    slug: '',
    type: 'Printed Modal Hijab',
    collection: 'printed-modal',
    description: '',
    price: 24,
    compareAt: undefined,
    material: '95% modal, 5% elastane',
    dimensions: '180 × 70 cm',
    care: DEFAULT_CARE,
    colours: [
      {
        name: 'Natural Tone',
        hex: '#CDB596',
        family: 'Neutrals',
        image: '/71db55ba-7af4-4db9-8827-335ecc30e367.jpg',
        stock: 15,
        sku: 'HB-NEW-01',
      },
    ],
    isNew: true,
    featured: false,
    addedOrder: Date.now(),
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        care: product.care?.length ? product.care : DEFAULT_CARE,
        colours: product.colours?.length ? product.colours : [],
      });
    } else {
      setFormData({
        name: '',
        slug: '',
        type: 'Printed Modal Hijab',
        collection: 'printed-modal',
        description: '',
        price: 24,
        compareAt: undefined,
        material: '95% modal, 5% elastane',
        dimensions: '180 × 70 cm',
        care: DEFAULT_CARE,
        colours: [
          {
            name: 'Natural Tone',
            hex: '#CDB596',
            family: 'Neutrals',
            image: '/71db55ba-7af4-4db9-8827-335ecc30e367.jpg',
            stock: 15,
            sku: `HB-SKU-${Math.floor(100 + Math.random() * 900)}`,
          },
        ],
        isNew: true,
        featured: false,
        addedOrder: Date.now(),
      });
    }
    setError(null);
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: !isEditing ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : prev.slug,
    }));
  };

  const handleAddColour = () => {
    const newVariant: ProductColour = {
      name: 'New Shade',
      hex: '#30251F',
      family: 'Neutrals',
      image: '/54023614-3373-4d9f-827c-edd4e6e00d9f.jpg',
      stock: 10,
      sku: `HB-${formData.collection?.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
    };
    setFormData((prev) => ({
      ...prev,
      colours: [...(prev.colours || []), newVariant],
    }));
  };

  const handleUpdateColour = (index: number, field: keyof ProductColour, value: any) => {
    setFormData((prev) => {
      const list = [...(prev.colours || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, colours: list };
    });
  };

  const handleRemoveColour = (index: number) => {
    if ((formData.colours?.length || 0) <= 1) {
      alert('A product must have at least one colour variant.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      colours: prev.colours?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name?.trim()) {
      setError('Product name is required.');
      return;
    }
    if (!formData.slug?.trim()) {
      setError('Product URL slug is required.');
      return;
    }
    if (formData.price === undefined || formData.price < 0) {
      setError('Please provide a valid price.');
      return;
    }
    if (!formData.colours || formData.colours.length === 0) {
      setError('Please add at least one colour variant.');
      return;
    }

    setSaving(true);
    try {
      const finalProduct: Product = {
        id: product?.id || `p-${formData.slug}-${Date.now().toString().slice(-4)}`,
        slug: formData.slug.trim(),
        name: formData.name.trim(),
        type: formData.type || 'Hijab',
        collection: (formData.collection as CollectionSlug) || 'printed-modal',
        description: formData.description?.trim() || '',
        price: Number(formData.price),
        compareAt: formData.compareAt ? Number(formData.compareAt) : undefined,
        material: formData.material?.trim() || 'Modal',
        dimensions: formData.dimensions?.trim() || '180 × 70 cm',
        care: formData.care || DEFAULT_CARE,
        colours: formData.colours,
        isNew: formData.isNew,
        featured: formData.featured,
        addedOrder: formData.addedOrder || Date.now(),
      };

      await onSave(finalProduct);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded bg-warm p-6 shadow-2xl sm:p-8 border border-rule">
        <div className="flex items-center justify-between border-b border-rule pb-4">
          <div>
            <h2 className="font-display text-2xl font-medium text-ink">
              {isEditing ? `Edit "${product?.name}"` : 'Add New Product'}
            </h2>
            <p className="mt-0.5 text-xs text-ink-soft">
              Fill in product specifications, pricing, fabrics, and colour variants.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded p-1.5 text-ink-soft hover:bg-parchment hover:text-ink transition-colors"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label text-xs">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Rosa Botanical"
                className="field-input h-10 text-sm"
              />
            </div>
            <div>
              <label className="field-label text-xs">URL Slug *</label>
              <input
                type="text"
                required
                value={formData.slug || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="e.g. rosa-botanical"
                className="field-input h-10 text-sm font-mono"
              />
            </div>
            <div>
              <label className="field-label text-xs">Collection *</label>
              <select
                value={formData.collection}
                onChange={(e) => setFormData((prev) => ({ ...prev, collection: e.target.value as CollectionSlug }))}
                className="field-input h-10 text-sm bg-warm"
              >
                {collections.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label text-xs">Type / Subtitle</label>
              <input
                type="text"
                value={formData.type || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                placeholder="e.g. Printed Modal Hijab"
                className="field-input h-10 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <label className="field-label text-xs">Price (£) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price ?? ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: parseFloat(e.target.value) }))}
                className="field-input h-10 text-sm"
              />
            </div>
            <div>
              <label className="field-label text-xs">Compare At (£) (Sale)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.compareAt ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    compareAt: e.target.value ? parseFloat(e.target.value) : undefined,
                  }))
                }
                placeholder="Original price"
                className="field-input h-10 text-sm"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isNew"
                checked={Boolean(formData.isNew)}
                onChange={(e) => setFormData((prev) => ({ ...prev, isNew: e.target.checked }))}
                className="h-4 w-4 rounded border-rule text-burgundy focus:ring-burgundy"
              />
              <label htmlFor="isNew" className="text-xs font-semibold text-ink cursor-pointer">
                New Tag
              </label>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={Boolean(formData.featured)}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                className="h-4 w-4 rounded border-rule text-burgundy focus:ring-burgundy"
              />
              <label htmlFor="featured" className="text-xs font-semibold text-ink cursor-pointer">
                Featured
              </label>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label text-xs">Material Composition</label>
              <input
                type="text"
                value={formData.material || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, material: e.target.value }))}
                placeholder="e.g. 95% modal, 5% elastane"
                className="field-input h-10 text-sm"
              />
            </div>
            <div>
              <label className="field-label text-xs">Dimensions</label>
              <input
                type="text"
                value={formData.dimensions || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, dimensions: e.target.value }))}
                placeholder="e.g. 180 × 70 cm"
                className="field-input h-10 text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label text-xs">Editorial Description</label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe texture and drape..."
                className="field-input h-auto py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="border-t border-rule pt-4">
            <div className="flex items-center justify-between pb-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
                  Colour Variants & Stock ({formData.colours?.length || 0})
                </h3>
              </div>
              <button
                type="button"
                onClick={handleAddColour}
                className="inline-flex items-center gap-1.5 rounded bg-parchment px-3 py-1.5 text-xs font-bold text-ink hover:bg-linen transition-colors"
              >
                <PlusIcon className="h-3.5 w-3.5" />
                Add Colour
              </button>
            </div>

            <div className="space-y-3">
              {formData.colours?.map((c, idx) => (
                <div
                  key={idx}
                  className="grid gap-2.5 rounded border border-rule/70 bg-ivory/50 p-3 sm:grid-cols-12 sm:items-center"
                >
                  <div className="sm:col-span-3">
                    <label className="text-[10px] uppercase font-bold text-ink-soft">Variant Name</label>
                    <input
                      type="text"
                      value={c.name}
                      onChange={(e) => handleUpdateColour(idx, 'name', e.target.value)}
                      placeholder="e.g. Dusty Rose"
                      className="field-input h-8 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-ink-soft">Hex & Swatch</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={c.hex}
                        onChange={(e) => handleUpdateColour(idx, 'hex', e.target.value)}
                        className="h-8 w-8 cursor-pointer rounded border border-rule bg-transparent p-0.5"
                      />
                      <input
                        type="text"
                        value={c.hex}
                        onChange={(e) => handleUpdateColour(idx, 'hex', e.target.value)}
                        className="field-input h-8 text-xs font-mono w-20"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-ink-soft">Family</label>
                    <select
                      value={c.family}
                      onChange={(e) => handleUpdateColour(idx, 'family', e.target.value as ColourFamily)}
                      className="field-input h-8 text-xs bg-warm"
                    >
                      {COLOUR_FAMILIES.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-ink-soft">Stock Count</label>
                    <input
                      type="number"
                      min="0"
                      value={c.stock}
                      onChange={(e) => handleUpdateColour(idx, 'stock', parseInt(e.target.value) || 0)}
                      className="field-input h-8 text-xs font-semibold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-ink-soft">Image URL</label>
                    <input
                      type="text"
                      value={c.image}
                      onChange={(e) => handleUpdateColour(idx, 'image', e.target.value)}
                      placeholder="/image.jpg"
                      className="field-input h-8 text-xs font-mono"
                    />
                  </div>

                  <div className="flex sm:col-span-1 justify-end pt-3 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => handleRemoveColour(idx)}
                      title="Remove variant"
                      className="rounded p-1.5 text-danger hover:bg-rose-100 transition-colors"
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-rule pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="btn-outline h-10 px-5 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary h-10 px-6 text-xs flex items-center gap-2"
            >
              <CheckIcon className="h-4 w-4" />
              {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

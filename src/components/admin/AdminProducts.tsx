import React, { useState, useMemo } from 'react';
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  Edit2Icon,
  Trash2Icon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  ArrowUpDownIcon,
  PackageIcon,
  ExternalLinkIcon,
} from 'lucide-react';
import { Product } from '../../types/product';
import { useStore } from '../../contexts/StoreContext';
import { collections } from '../../data/collections';
import { formatPrice } from '../../utils/currency';
import { ProductEditModal } from './ProductEditModal';
import { Link } from 'react-router-dom';

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, quickUpdateStock } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Collection filter
      if (selectedCollection !== 'all' && p.collection !== selectedCollection) {
        return false;
      }

      // Stock status filter
      const totalStock = p.colours.reduce((sum, c) => sum + c.stock, 0);
      if (stockFilter === 'low' && (totalStock > 10 || totalStock === 0)) return false;
      if (stockFilter === 'out' && totalStock > 0) return false;

      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesType = p.type.toLowerCase().includes(q);
        const matchesColours = p.colours.some((c) => c.name.toLowerCase().includes(q) || c.sku.toLowerCase().includes(q));
        if (!matchesName && !matchesType && !matchesColours) return false;
      }

      return true;
    });
  }, [products, selectedCollection, stockFilter, search]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (saved: Product) => {
    if (editingProduct) {
      await updateProduct(saved);
    } else {
      await addProduct(saved);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Products & Inventory</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Manage your boutique catalog, adjust stock counts, update pricing, and introduce new collections.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="btn-primary h-11 px-5 text-xs flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <PlusIcon className="h-4 w-4" />
          Add New Product
        </button>
      </div>

      {/* Search & Filters */}
      <div className="rounded border border-rule bg-warm p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-12">
          {/* Search Bar */}
          <div className="relative sm:col-span-5">
            <SearchIcon className="absolute left-3.5 top-3 h-4 w-4 text-taupe" />
            <input
              type="text"
              placeholder="Search by name, SKU, shade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="field-input h-10 pl-10 text-xs"
            />
          </div>

          {/* Collection Filter */}
          <div className="sm:col-span-4">
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="field-input h-10 text-xs bg-warm"
            >
              <option value="all">All Collections ({products.length})</option>
              {collections.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({products.filter((p) => p.collection === c.slug).length})
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div className="sm:col-span-3">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="field-input h-10 text-xs bg-warm"
            >
              <option value="all">All Stock Levels</option>
              <option value="low">Low Stock (&le; 10 units)</option>
              <option value="out">Out of Stock (0 units)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded border border-rule bg-warm shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-rule bg-ivory text-[11px] font-bold uppercase tracking-wider text-ink-soft">
              <tr>
                <th className="px-5 py-3.5">Product</th>
                <th className="px-4 py-3.5">Collection</th>
                <th className="px-4 py-3.5">Price</th>
                <th className="px-4 py-3.5">Variants & Live Stock</th>
                <th className="px-4 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule/60">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-ink-soft">
                    <PackageIcon className="mx-auto h-8 w-8 text-taupe mb-2" />
                    <p className="font-medium text-sm text-ink">No products match your filters</p>
                    <p className="mt-1 text-xs">Try clearing search terms or adding a new product.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const totalStock = p.colours.reduce((sum, c) => sum + c.stock, 0);
                  const isLow = totalStock > 0 && totalStock <= 10;
                  const isOut = totalStock === 0;

                  return (
                    <tr key={p.id} className="hover:bg-ivory/50 transition-colors">
                      {/* Product Thumbnail & Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.colours[0]?.image || '/54023614-3373-4d9f-827c-edd4e6e00d9f.jpg'}
                            alt={p.name}
                            className="h-12 w-10 rounded-sm object-cover border border-rule/80 shrink-0 bg-parchment"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-ink text-sm">{p.name}</span>
                              {p.isNew && (
                                <span className="rounded bg-burgundy/10 text-burgundy px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                                  New
                                </span>
                              )}
                              {p.featured && (
                                <span className="rounded bg-brass/20 text-brass px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                                  Featured
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-ink-soft block mt-0.5">{p.type}</span>
                          </div>
                        </div>
                      </td>

                      {/* Collection */}
                      <td className="px-4 py-4 text-ink-soft">
                        <span className="rounded bg-parchment/80 px-2 py-1 text-[11px] text-ink capitalize">
                          {p.collection.replace('-', ' ')}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-4 font-semibold text-ink">
                        <span>{formatPrice(p.price)}</span>
                        {p.compareAt && (
                          <span className="ml-1.5 text-xs text-taupe line-through">
                            {formatPrice(p.compareAt)}
                          </span>
                        )}
                      </td>

                      {/* Variants & Inline Stock Counter */}
                      <td className="px-4 py-4">
                        <div className="space-y-1.5 max-w-xs">
                          {p.colours.map((c) => (
                            <div key={c.name} className="flex items-center justify-between gap-3 text-[11px]">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span
                                  className="h-3 w-3 rounded-full border border-rule shrink-0"
                                  style={{ backgroundColor: c.hex }}
                                  title={c.hex}
                                />
                                <span className="truncate text-ink-soft">{c.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => quickUpdateStock(p.id, c.name, c.stock - 1)}
                                  disabled={c.stock <= 0}
                                  className="h-5 w-5 rounded bg-parchment text-ink font-bold hover:bg-linen disabled:opacity-30"
                                >
                                  -
                                </button>
                                <span className="w-7 text-center font-bold text-ink font-mono">{c.stock}</span>
                                <button
                                  type="button"
                                  onClick={() => quickUpdateStock(p.id, c.name, c.stock + 1)}
                                  className="h-5 w-5 rounded bg-parchment text-ink font-bold hover:bg-linen"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 text-center">
                        {isOut ? (
                          <span className="inline-flex items-center gap-1 rounded bg-rose-100 text-rose-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                            <AlertTriangleIcon className="h-3 w-3" />
                            Sold Out
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1 rounded bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                            <AlertTriangleIcon className="h-3 w-3" />
                            Low ({totalStock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                            <CheckCircle2Icon className="h-3 w-3" />
                            In Stock ({totalStock})
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to={`/products/${p.slug}`}
                            target="_blank"
                            title="View on store"
                            className="rounded p-1.5 text-ink-soft hover:bg-parchment hover:text-ink transition-colors"
                          >
                            <ExternalLinkIcon className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            title="Edit details"
                            className="rounded p-1.5 text-ink-soft hover:bg-parchment hover:text-ink transition-colors"
                          >
                            <Edit2Icon className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(p.id)}
                            title="Delete product"
                            className="rounded p-1.5 text-danger hover:bg-rose-50 transition-colors"
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded bg-warm p-6 shadow-2xl border border-rule">
            <h3 className="font-display text-xl font-medium text-ink">Delete Product?</h3>
            <p className="mt-2 text-xs text-ink-soft leading-relaxed">
              Are you sure you want to remove this product from the boutique catalog? This action will remove it from
              the store and sync with the database.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="btn-outline h-9 px-4 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="btn-primary bg-danger hover:bg-red-800 h-9 px-4 text-xs"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Edit / Create Modal */}
      <ProductEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
}

import React from 'react';
import {
  TrendingUpIcon,
  ShoppingBagIcon,
  PackageIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  ClockIcon,
  TruckIcon,
  CheckCircle2Icon,
  MailIcon,
  UserIcon,
} from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { formatPrice } from '../../utils/currency';
import { OrderStatus } from '../../types/admin';

interface AdminDashboardProps {
  onNavigate: (tab: 'products' | 'orders' | 'inquiries' | 'settings') => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { products, orders, inquiries, quickUpdateStock, updateOrderStatus } = useStore();

  // Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const totalUnitsInStock = products.reduce(
    (sum, p) => sum + p.colours.reduce((cSum, c) => cSum + c.stock, 0),
    0
  );

  const lowStockItems: { product: string; colour: string; stock: number; id: string }[] = [];
  products.forEach((p) => {
    p.colours.forEach((c) => {
      if (c.stock <= 5) {
        lowStockItems.push({ product: p.name, colour: c.name, stock: c.stock, id: p.id });
      }
    });
  });

  const recentOrders = orders.slice(0, 5);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  return (
    <div className="space-y-8">
      {/* Welcome & Overview Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Boutique Executive Overview</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Live operations, store performance, inventory alerts, and customer activity.
          </p>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <div className="rounded border border-rule bg-warm p-5 shadow-sm">
          <div className="flex items-center justify-between text-ink-soft">
            <span className="text-[11px] font-bold uppercase tracking-wider">Gross Sales</span>
            <span className="rounded-full bg-emerald-100 p-2 text-emerald-800">
              <TrendingUpIcon className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 font-display text-3xl font-medium text-ink">
            {formatPrice(totalRevenue)}
          </div>
          <p className="mt-1 text-xs text-ink-soft">From {orders.length} orders placed</p>
        </div>

        {/* Total Orders */}
        <div className="rounded border border-rule bg-warm p-5 shadow-sm">
          <div className="flex items-center justify-between text-ink-soft">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
            <span className="rounded-full bg-blue-100 p-2 text-blue-800">
              <ShoppingBagIcon className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 font-display text-3xl font-medium text-ink">{orders.length}</div>
          <p className="mt-1 text-xs text-ink-soft">
            {pendingOrdersCount > 0 ? (
              <span className="text-amber-700 font-bold">{pendingOrdersCount} pending shipment</span>
            ) : (
              'All orders fulfilled'
            )}
          </p>
        </div>

        {/* Products in Catalog */}
        <div className="rounded border border-rule bg-warm p-5 shadow-sm">
          <div className="flex items-center justify-between text-ink-soft">
            <span className="text-[11px] font-bold uppercase tracking-wider">Live Catalog</span>
            <span className="rounded-full bg-parchment p-2 text-ink">
              <PackageIcon className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 font-display text-3xl font-medium text-ink">{products.length} Styles</div>
          <p className="mt-1 text-xs text-ink-soft">{totalUnitsInStock} total units in stock</p>
        </div>

        {/* Low Stock Alerts */}
        <div className="rounded border border-rule bg-warm p-5 shadow-sm">
          <div className="flex items-center justify-between text-ink-soft">
            <span className="text-[11px] font-bold uppercase tracking-wider">Stock Alerts</span>
            <span
              className={`rounded-full p-2 ${
                lowStockItems.length > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              <AlertTriangleIcon className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 font-display text-3xl font-medium text-ink">
            {lowStockItems.length}
          </div>
          <p className="mt-1 text-xs text-ink-soft">
            {lowStockItems.length > 0 ? 'Variants require reordering' : 'Stock levels healthy'}
          </p>
        </div>
      </div>

      {/* Grid: Recent Orders & Stock Alerts */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Recent Orders (col-span-8) */}
        <div className="lg:col-span-8 rounded border border-rule bg-warm p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-rule pb-3">
            <div>
              <h2 className="text-base font-bold text-ink">Recent Orders</h2>
              <p className="text-xs text-ink-soft">Latest client transactions from checkout</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('orders')}
              className="group inline-flex items-center gap-1 text-xs font-bold text-burgundy hover:underline"
            >
              View all orders
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            {recentOrders.length === 0 ? (
              <div className="py-8 text-center text-xs text-ink-soft">
                No orders have been placed yet. Test the checkout on the store to see an order appear here!
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-rule/60 text-[10px] font-bold uppercase text-ink-soft">
                    <th className="pb-2">Reference</th>
                    <th className="pb-2">Customer</th>
                    <th className="pb-2">Total</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule/60">
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-ivory/50">
                      <td className="py-2.5 font-mono font-bold text-ink">{o.reference}</td>
                      <td className="py-2.5 text-ink-soft">
                        <div className="font-semibold text-ink">{o.name}</div>
                        <div className="text-[10px] text-taupe">{o.email}</div>
                      </td>
                      <td className="py-2.5 font-bold text-ink">{formatPrice(o.total)}</td>
                      <td className="py-2.5">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                          className="rounded border border-rule bg-warm px-2 py-0.5 text-[10px] font-bold"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Low Stock Alerts & Inquiries (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Low Stock Box */}
          <div className="rounded border border-rule bg-warm p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-ink">Low Stock Alerts</h2>
              <button
                type="button"
                onClick={() => onNavigate('products')}
                className="text-xs font-bold text-burgundy hover:underline"
              >
                Inventory
              </button>
            </div>

            <div className="mt-3 space-y-2.5">
              {lowStockItems.length === 0 ? (
                <p className="text-xs text-ink-soft py-4 text-center">All variants are well-stocked.</p>
              ) : (
                lowStockItems.slice(0, 5).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded border border-rule/70 bg-ivory/60 p-2 text-xs"
                  >
                    <div>
                      <div className="font-bold text-ink">{item.product}</div>
                      <div className="text-[10px] text-ink-soft">Shade: {item.colour}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          item.stock === 0 ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.stock} left
                      </span>
                      <button
                        type="button"
                        onClick={() => quickUpdateStock(item.id, item.colour, item.stock + 5)}
                        title="Quick add +5 stock"
                        className="rounded bg-parchment px-1.5 py-0.5 text-[10px] font-bold text-ink hover:bg-linen"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Customer Inquiries Card */}
          <div className="rounded border border-rule bg-warm p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-ink">Inquiries</h2>
              <button
                type="button"
                onClick={() => onNavigate('inquiries')}
                className="text-xs font-bold text-burgundy hover:underline"
              >
                Messages ({newInquiriesCount})
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {inquiries.length === 0 ? (
                <p className="text-xs text-ink-soft py-3 text-center">No customer messages received.</p>
              ) : (
                inquiries.slice(0, 3).map((inq) => (
                  <div key={inq.id} className="rounded border border-rule/60 bg-ivory/50 p-2.5 text-xs">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-ink">{inq.name}</span>
                      <span className="text-[10px] text-taupe">{inq.topic}</span>
                    </div>
                    <p className="text-[11px] text-ink-soft line-clamp-2 mt-1">{inq.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

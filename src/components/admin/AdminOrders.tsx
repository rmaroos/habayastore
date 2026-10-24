import React, { useState, useMemo } from 'react';
import {
  SearchIcon,
  ShoppingBagIcon,
  ClockIcon,
  TruckIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ChevronDownIcon,
  XIcon,
  UserIcon,
  MailIcon,
  MapPinIcon,
} from 'lucide-react';
import { OrderStatus, StoredOrder } from '../../types/admin';
import { useStore } from '../../contexts/StoreContext';
import { formatPrice } from '../../utils/currency';

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; text: string; icon: React.ElementType }
> = {
  Pending: { label: 'Pending', bg: 'bg-amber-100', text: 'text-amber-800', icon: ClockIcon },
  Processing: { label: 'Processing', bg: 'bg-blue-100', text: 'text-blue-800', icon: ClockIcon },
  Shipped: { label: 'Shipped', bg: 'bg-purple-100', text: 'text-purple-800', icon: TruckIcon },
  Delivered: { label: 'Delivered', bg: 'bg-emerald-100', text: 'text-emerald-800', icon: CheckCircle2Icon },
  Cancelled: { label: 'Cancelled', bg: 'bg-rose-100', text: 'text-rose-800', icon: XCircleIcon },
};

export function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<StoredOrder | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesRef = o.reference.toLowerCase().includes(q);
        const matchesName = o.name.toLowerCase().includes(q);
        const matchesEmail = o.email.toLowerCase().includes(q);
        if (!matchesRef && !matchesName && !matchesEmail) return false;
      }
      return true;
    });
  }, [orders, statusFilter, search]);

  const handleStatusChange = async (orderId: string, nextStatus: OrderStatus) => {
    await updateOrderStatus(orderId, nextStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: nextStatus } : null));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Orders & Fulfillment</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Track incoming purchases from checkout, review customer addresses, and update shipment status.
          </p>
        </div>
        <div className="text-xs text-ink-soft">
          Total orders: <span className="font-bold text-ink">{orders.length}</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="rounded border border-rule bg-warm p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-12">
          <div className="relative sm:col-span-8">
            <SearchIcon className="absolute left-3.5 top-3 h-4 w-4 text-taupe" />
            <input
              type="text"
              placeholder="Search by order reference (e.g. HB-123456), customer name, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="field-input h-10 pl-10 text-xs"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="field-input h-10 text-xs bg-warm"
            >
              <option value="all">All Statuses ({orders.length})</option>
              <option value="Pending">Pending ({orders.filter((o) => o.status === 'Pending').length})</option>
              <option value="Processing">Processing ({orders.filter((o) => o.status === 'Processing').length})</option>
              <option value="Shipped">Shipped ({orders.filter((o) => o.status === 'Shipped').length})</option>
              <option value="Delivered">Delivered ({orders.filter((o) => o.status === 'Delivered').length})</option>
              <option value="Cancelled">Cancelled ({orders.filter((o) => o.status === 'Cancelled').length})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded border border-rule bg-warm shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-rule bg-ivory text-[11px] font-bold uppercase tracking-wider text-ink-soft">
              <tr>
                <th className="px-5 py-3.5">Reference</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-4 py-3.5">Customer</th>
                <th className="px-4 py-3.5">Items</th>
                <th className="px-4 py-3.5">Total</th>
                <th className="px-4 py-3.5">Fulfillment Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-ink-soft">
                    <ShoppingBagIcon className="mx-auto h-8 w-8 text-taupe mb-2" />
                    <p className="font-medium text-sm text-ink">No orders found</p>
                    <p className="mt-1 text-xs">
                      When a customer completes a checkout purchase, it will appear here in real-time.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const statusInfo = STATUS_CONFIG[o.status] || STATUS_CONFIG.Pending;
                  const Icon = statusInfo.icon;
                  const formattedDate = new Date(o.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <tr key={o.id} className="hover:bg-ivory/50 transition-colors">
                      {/* Reference */}
                      <td className="px-5 py-4 font-mono font-bold text-ink">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(o)}
                          className="hover:text-burgundy hover:underline text-xs"
                        >
                          {o.reference}
                        </button>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 text-ink-soft whitespace-nowrap">{formattedDate}</td>

                      {/* Customer */}
                      <td className="px-4 py-4">
                        <div className="font-semibold text-ink">{o.name}</div>
                        <div className="text-[11px] text-ink-soft truncate max-w-[160px]">{o.email}</div>
                      </td>

                      {/* Items */}
                      <td className="px-4 py-4 text-ink-soft">
                        <span>{o.lines.reduce((s, l) => s + l.quantity, 0)} item(s)</span>
                      </td>

                      {/* Total */}
                      <td className="px-4 py-4 font-bold text-ink whitespace-nowrap">
                        {formatPrice(o.total)}
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-4 py-4">
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                          className={`rounded px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider border-0 cursor-pointer ${statusInfo.bg} ${statusInfo.text} focus:ring-1 focus:ring-ink`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(o)}
                          className="btn-outline h-8 px-3 text-[11px]"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded bg-warm p-6 shadow-2xl border border-rule sm:p-8">
            <div className="flex items-start justify-between border-b border-rule pb-4">
              <div>
                <span className="eyebrow">Order Details</span>
                <h2 className="font-display text-2xl font-medium text-ink mt-1">
                  {selectedOrder.reference}
                </h2>
                <p className="text-xs text-ink-soft mt-0.5">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-GB')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded p-1.5 text-ink-soft hover:bg-parchment hover:text-ink transition-colors"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Customer & Delivery Information */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 rounded border border-rule bg-ivory/50 p-4 text-xs">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-ink uppercase tracking-wider text-[11px] mb-2">
                  <UserIcon className="h-3.5 w-3.5 text-burgundy" /> Customer
                </div>
                <p className="font-semibold text-ink">{selectedOrder.name}</p>
                <p className="text-ink-soft flex items-center gap-1 mt-1">
                  <MailIcon className="h-3 w-3" /> {selectedOrder.email}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 font-bold text-ink uppercase tracking-wider text-[11px] mb-2">
                  <MapPinIcon className="h-3.5 w-3.5 text-burgundy" /> Shipping Address
                </div>
                <p className="text-ink-soft leading-relaxed">{selectedOrder.address}</p>
                <p className="mt-1 font-medium text-ink">
                  Method: <span className="text-burgundy capitalize">{selectedOrder.delivery?.label || 'Standard'}</span>
                </p>
              </div>
            </div>

            {/* Ordered Items Table */}
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink mb-3">
                Items Purchased ({selectedOrder.lines.length})
              </h3>
              <div className="rounded border border-rule divide-y divide-rule/60 overflow-hidden">
                {selectedOrder.lines.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 text-xs bg-warm">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-10 object-cover rounded-sm border border-rule shrink-0 bg-parchment"
                      />
                      <div>
                        <div className="font-bold text-ink">{item.name}</div>
                        <div className="text-[11px] text-ink-soft">Shade: {item.colour}</div>
                        <div className="text-[11px] text-ink-soft">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-semibold text-ink">{formatPrice(item.lineTotal)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="mt-6 border-t border-rule pt-4 text-xs space-y-1.5">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span>{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>Delivery ({selectedOrder.delivery?.label || 'Standard'})</span>
                <span>{formatPrice(selectedOrder.deliveryCost)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-ink border-t border-rule pt-2 mt-2">
                <span>Total Amount Paid</span>
                <span className="text-burgundy font-display text-base">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Status update in modal */}
            <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-ink-soft">Current Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                  className="rounded border border-rule bg-warm px-3 py-1.5 text-xs font-bold text-ink"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="btn-primary h-9 px-5 text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

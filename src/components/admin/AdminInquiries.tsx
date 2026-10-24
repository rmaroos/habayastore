import React, { useState, useMemo } from 'react';
import {
  MessageSquareIcon,
  SearchIcon,
  MailIcon,
  CheckCircle2Icon,
  ClockIcon,
  AlertCircleIcon,
  UserIcon,
} from 'lucide-react';
import { CustomerInquiry, InquiryStatus } from '../../types/admin';
import { useStore } from '../../contexts/StoreContext';

const STATUS_CONFIG: Record<
  InquiryStatus,
  { label: string; bg: string; text: string; icon: React.ElementType }
> = {
  New: { label: 'New', bg: 'bg-emerald-100', text: 'text-emerald-800', icon: AlertCircleIcon },
  'In Progress': { label: 'In Progress', bg: 'bg-amber-100', text: 'text-amber-800', icon: ClockIcon },
  Resolved: { label: 'Resolved', bg: 'bg-parchment', text: 'text-ink-soft', icon: CheckCircle2Icon },
};

export function AdminInquiries() {
  const { inquiries, updateInquiryStatus } = useStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((i) => {
      if (statusFilter !== 'all' && i.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = i.name.toLowerCase().includes(q);
        const matchesEmail = i.email.toLowerCase().includes(q);
        const matchesTopic = i.topic.toLowerCase().includes(q);
        const matchesMsg = i.message.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesTopic && !matchesMsg) return false;
      }
      return true;
    });
  }, [inquiries, statusFilter, search]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Customer Inquiries</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Messages and assistance requests sent from the boutique's Contact page.
          </p>
        </div>
        <div className="text-xs text-ink-soft">
          Total messages: <span className="font-bold text-ink">{inquiries.length}</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded border border-rule bg-warm p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-12">
          <div className="relative sm:col-span-8">
            <SearchIcon className="absolute left-3.5 top-3 h-4 w-4 text-taupe" />
            <input
              type="text"
              placeholder="Search by customer name, email, topic, or message contents..."
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
              <option value="all">All Inquiries ({inquiries.length})</option>
              <option value="New">New ({inquiries.filter((i) => i.status === 'New').length})</option>
              <option value="In Progress">
                In Progress ({inquiries.filter((i) => i.status === 'In Progress').length})
              </option>
              <option value="Resolved">Resolved ({inquiries.filter((i) => i.status === 'Resolved').length})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Cards List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="rounded border border-rule bg-warm p-12 text-center text-ink-soft shadow-sm">
            <MessageSquareIcon className="mx-auto h-8 w-8 text-taupe mb-2" />
            <p className="font-medium text-sm text-ink">No inquiries found</p>
            <p className="mt-1 text-xs">
              When shoppers send questions through the Contact Us form, they will appear here.
            </p>
          </div>
        ) : (
          filteredInquiries.map((inq) => {
            const statusInfo = STATUS_CONFIG[inq.status] || STATUS_CONFIG.New;
            const formattedDate = new Date(inq.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={inq.id}
                className="rounded border border-rule bg-warm p-5 shadow-sm transition-all hover:border-taupe"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-ink text-sm flex items-center gap-1.5">
                        <UserIcon className="h-3.5 w-3.5 text-burgundy" />
                        {inq.name}
                      </span>
                      <span className="text-xs text-ink-soft">({inq.email})</span>
                      <span className="rounded bg-ivory border border-rule px-2 py-0.5 text-[10px] font-bold uppercase text-ink-soft">
                        {inq.topic}
                      </span>
                      {inq.orderNumber && (
                        <span className="rounded bg-burgundy/10 text-burgundy px-2 py-0.5 text-[10px] font-bold font-mono">
                          Ref: {inq.orderNumber}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-taupe block mt-1">Received {formattedDate}</span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                      className={`rounded px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider border-0 cursor-pointer ${statusInfo.bg} ${statusInfo.text} focus:ring-1 focus:ring-ink`}
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>

                    <a
                      href={`mailto:${inq.email}?subject=Reply from Habaya regarding ${encodeURIComponent(inq.topic)}`}
                      className="btn-outline h-7 px-3 text-[11px] flex items-center gap-1.5"
                    >
                      <MailIcon className="h-3 w-3" />
                      Reply
                    </a>
                  </div>
                </div>

                {/* Message Body */}
                <div className="mt-4 rounded bg-ivory/60 border border-rule/60 p-3.5 text-xs text-ink leading-relaxed">
                  <p className="whitespace-pre-wrap">{inq.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

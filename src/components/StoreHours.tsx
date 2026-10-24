import React from 'react';
import { store } from '../data/site';

export function StoreHours({ tone = 'light' }: {tone?: 'light' | 'dark';}) {
  const muted = tone === 'dark' ? 'text-ivory/75' : 'text-ink-soft';
  const rule = tone === 'dark' ? 'border-ivory/15' : 'border-rule';
  return (
    <dl className="text-[14px]">
      {store.hours.map((h) =>
      <div key={h.days} className={`flex justify-between gap-4 border-b py-2 last:border-b-0 ${rule}`}>
          <dt className={muted}>{h.days}</dt>
          <dd className="text-right tabular-nums">{h.time}</dd>
        </div>
      )}
    </dl>);

}
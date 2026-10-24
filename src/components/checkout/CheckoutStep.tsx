import React from 'react';
import { CheckIcon } from 'lucide-react';

interface CheckoutStepProps {
  number: number;
  title: string;
  status: 'active' | 'done' | 'upcoming';
  summary?: React.ReactNode;
  onEdit?: () => void;
  children: React.ReactNode;
}

export function CheckoutStep({ number, title, status, summary, onEdit, children }: CheckoutStepProps) {
  return (
    <section aria-labelledby={`step-${number}`} className="border-b border-rule py-7">
      <div className="flex items-center justify-between gap-4">
        <h2 id={`step-${number}`} className="flex items-center gap-3">
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full border text-[13px] font-bold ${
            status === 'upcoming' ?
            'border-rule text-ink-soft' :
            status === 'done' ?
            'border-ink bg-ink text-warm' :
            'border-ink text-ink'}`
            }
            aria-hidden="true">
            
            {status === 'done' ? <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.5} /> : number}
          </span>
          <span className={`font-display text-[26px] leading-none ${status === 'upcoming' ? 'text-ink-soft' : ''}`}>
            {title}
          </span>
        </h2>
        {status === 'done' && onEdit &&
        <button type="button" onClick={onEdit} className="text-[13px] underline underline-offset-4 hover:text-burgundy">
            Edit
          </button>
        }
      </div>
      {status === 'done' && summary && <div className="mt-3 pl-10 text-[14px] text-ink-soft">{summary}</div>}
      {status === 'active' && <div className="mt-6">{children}</div>}
    </section>);

}
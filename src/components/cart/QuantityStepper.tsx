import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface QuantityStepperProps {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  label: string;
  size?: 'sm' | 'md';
}

export function QuantityStepper({ value, min = 1, max, onChange, label, size = 'md' }: QuantityStepperProps) {
  const h = size === 'sm' ? 'h-9' : 'h-12';
  const w = size === 'sm' ? 'w-9' : 'w-11';
  return (
    <div className={`inline-flex items-center rounded-[2px] border border-rule bg-warm ${h}`} role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        className={`flex h-full ${w} items-center justify-center text-ink transition-colors duration-150 ease-out hover:bg-parchment disabled:text-taupe disabled:hover:bg-transparent`}
        aria-label="Decrease quantity">
        
        <MinusIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
      </button>
      <span className="min-w-8 text-center text-[14px] tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className={`flex h-full ${w} items-center justify-center text-ink transition-colors duration-150 ease-out hover:bg-parchment disabled:text-taupe disabled:hover:bg-transparent`}
        aria-label="Increase quantity">
        
        <PlusIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
      </button>
    </div>);

}
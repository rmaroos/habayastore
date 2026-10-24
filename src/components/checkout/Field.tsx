import React, { useId } from 'react';

interface FieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  optional?: boolean;
}

export function Field({ label, value, onChange, error, hint, optional, className, ...rest }: FieldProps) {
  const id = useId();
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="font-normal text-ink-soft">(optional)</span>}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={`field-input ${error ? 'border-danger hover:border-danger focus:border-danger' : ''}`}
        {...rest} />
      
      {hint && !error &&
      <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-ink-soft">
          {hint}
        </p>
      }
      {error &&
      <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      }
    </div>);

}
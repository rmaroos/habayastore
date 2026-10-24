import React, { useId, useState } from 'react';
import { CheckIcon } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'already' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const id = useId();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!consent) {
      setError('Please tick the box to confirm you would like to receive our emails.');
      return;
    }
    setError(null);
    setStatus('submitting');
    window.setTimeout(() => {
      if (email.toLowerCase().includes('error')) setStatus('error');else
      if (email.toLowerCase().startsWith('hello@')) setStatus('already');else
      setStatus('success');
    }, 700);
  };

  if (status === 'success' || status === 'already') {
    return (
      <div role="status" className="flex items-start gap-3 border-y border-rule py-5 text-left">
        <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-success" strokeWidth={1.75} />
        <div>
          <p className="font-display text-[22px] leading-tight">
            {status === 'success' ? 'Thank you — you are on the list.' : 'You are already subscribed.'}
          </p>
          <p className="mt-1 text-[14px] text-ink-soft">
            {status === 'success' ?
            'Look out for our first letter in your inbox. You can unsubscribe at any time.' :
            `${email} is already receiving our letters. Nothing more to do.`}
          </p>
        </div>
      </div>);

  }

  return (
    <form onSubmit={submit} noValidate className="text-left">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error && !EMAIL_RE.test(email.trim())}
            aria-describedby={error ? `${id}-error` : undefined}
            className="field-input" />
          
        </div>
        <button type="submit" disabled={status === 'submitting'} className="btn-primary sm:w-auto">
          {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      <label className="mt-4 flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink-soft">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-burgundy" />
        
        <span>
          I would like to receive Habaya emails about new collections and offers. You can unsubscribe at any time. See
          our{' '}
          <a href="/help/privacy" className="underline underline-offset-2 hover:text-ink">
            privacy policy
          </a>
          .
        </span>
      </label>
      {error &&
      <p id={`${id}-error`} role="alert" className="field-error">
          {error}
        </p>
      }
      {status === 'error' &&
      <p role="alert" className="field-error">
          Something went wrong on our side. Please try again in a moment.
        </p>
      }
    </form>);

}
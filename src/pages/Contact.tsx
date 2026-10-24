import React, { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { store } from '../data/site';
import { PageIntro } from '../components/PageIntro';
import { Field } from '../components/checkout/Field';
import { useStore } from '../contexts/StoreContext';

type Status = 'idle' | 'sending' | 'sent';
interface Form {name: string;email: string;order: string;topic: string;message: string;}

const topics = ['Order or delivery', 'Returns', 'Product question', 'Flagship store', 'Something else'];

export function Contact() {
  const { addInquiry } = useStore();
  const [form, setForm] = useState<Form>({ name: '', email: '', order: '', topic: topics[0], message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.';
    if (form.message.trim().length < 10) next.message = 'Tell us a little more — at least 10 characters.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus('sending');
    addInquiry({
      name: form.name.trim(),
      email: form.email.trim(),
      orderNumber: form.order.trim() || undefined,
      topic: form.topic,
      message: form.message.trim(),
    });
    window.setTimeout(() => setStatus('sent'), 900);
  };

  return (
    <>
      <PageIntro
        crumb="Contact"
        title="We would love to hear from you"
        intro="Questions about an order, a fabric or a colour? Send us a note and we will reply within one working day." />
      
      <div className="container-page grid gap-12 py-12 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <aside className="space-y-8 lg:col-span-4">
          <div>
            <h2 className="eyebrow">Email</h2>
            <a href={`mailto:${store.email}`} className="link-underline mt-2 inline-block font-display text-[24px]">{store.email}</a>
          </div>
          <div>
            <h2 className="eyebrow">Telephone</h2>
            <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="mt-2 block font-display text-[24px]">{store.phone}</a>
            <p className="mt-1 text-[14px] text-ink-soft">Monday – Friday, 10:00 – 17:00</p>
          </div>
          <div>
            <h2 className="eyebrow">Flagship</h2>
            <address className="mt-2 text-[15px] not-italic leading-relaxed">
              {store.addressLines.slice(0, 2).map((l) => <span key={l} className="block">{l}</span>)}
            </address>
          </div>
        </aside>

        <div className="lg:col-span-7 lg:col-start-6">
          {status === 'sent' ?
          <div role="status" className="border border-rule bg-warm p-8">
              <CheckIcon className="h-6 w-6 text-success" strokeWidth={1.75} />
              <h2 className="mt-4 font-display text-[30px] leading-tight">Thank you, {form.name.split(' ')[0]}.</h2>
              <p className="mt-2 text-[15px] text-ink-soft">
                Your message has been sent. We will reply to {form.email} within one working day.
              </p>
            </div> :

          <form noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" autoComplete="name" value={form.name} onChange={(v) => set('name', v)} error={errors.name} />
              <Field label="Email" type="email" autoComplete="email" value={form.email} onChange={(v) => set('email', v)} error={errors.email} />
              <div>
                <label htmlFor="topic" className="field-label">Topic</label>
                <select id="topic" value={form.topic} onChange={(e) => set('topic', e.target.value)} className="field-input">
                  {topics.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <Field label="Order reference" optional placeholder="HB-123456" value={form.order} onChange={(v) => set('order', v)} />
              <div className="sm:col-span-2">
                <label htmlFor="message" className="field-label">Message</label>
                <textarea
                id="message"
                rows={6}
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`field-input h-auto py-3 ${errors.message ? 'border-danger' : ''}`} />
              
                {errors.message && <p id="message-error" className="field-error">{errors.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <button type="submit" disabled={status === 'sending'} className="btn-primary">
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </form>
          }
        </div>
      </div>
    </>);

}
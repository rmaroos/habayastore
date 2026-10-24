import React from 'react';
import { Link } from 'react-router-dom';
import { footerColumns, socialLinks, store } from '../../data/site';
import { Wordmark } from './Wordmark';

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <div className="[&_a]:items-start">
            <Wordmark tone="light" size="lg" />
          </div>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ivory/80">
            Heritage-inspired hijabs in modal, jersey and chiffon. Chosen for drape, colour and the way they wear over
            time.
          </p>
          <ul className="mt-6 flex gap-5 text-[13px]">
            {socialLinks.map((s) =>
            <li key={s.label}>
                <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-brass underline-offset-4 hover:text-warm">
                
                  {s.label}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
          {footerColumns.map((col) =>
          <div key={col.title}>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brass">{col.title}</h2>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {col.links.map((l) =>
              <li key={l.to}>
                    <Link to={l.to} className="text-ivory/85 transition-colors duration-150 ease-out hover:text-warm">
                      {l.label}
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          )}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brass">Visit</h2>
            <address className="mt-4 space-y-1 text-[14px] not-italic text-ivory/85">
              {store.addressLines.slice(0, 2).map((l) =>
              <p key={l}>{l}</p>
              )}
              <p className="pt-2">
                <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="hover:text-warm">
                  {store.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${store.email}`} className="hover:text-warm">
                  {store.email}
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>
      <div className="border-t border-ivory/15">
        <div className="container-page flex flex-col gap-2 py-6 text-[13px] text-ivory/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Habaya. All rights reserved.</p>
          <p>Prices in GBP, including VAT.</p>
        </div>
      </div>
    </footer>);

}
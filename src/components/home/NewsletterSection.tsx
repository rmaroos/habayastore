import React from 'react';
import { NewsletterForm } from '../NewsletterForm';

export function NewsletterSection() {
  return (
    <section aria-labelledby="newsletter-heading" className="bg-parchment py-16 lg:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <h2 id="newsletter-heading" className="font-display text-[34px] leading-tight lg:text-[44px]">
            Letters from the archive
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
            New prints, restocks and the occasional styling note — sent once or twice a month, never more.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>);

}
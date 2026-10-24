import React from 'react';
import { Link } from 'react-router-dom';
import { faqGroups } from '../data/site';
import { PageIntro } from '../components/PageIntro';
import { AccordionItem } from '../components/Accordion';

export function Faq() {
  return (
    <>
      <PageIntro crumb="FAQ" title="Questions, answered" intro="The things we are asked most often about orders, fabrics and returns." />
      <div className="container-page grid gap-12 py-12 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="space-y-14 lg:col-span-8">
          {faqGroups.map((g) =>
          <section key={g.title} aria-labelledby={`faq-${g.title}`}>
              <h2 id={`faq-${g.title}`} className="font-display text-[30px]">{g.title}</h2>
              <div className="mt-4 border-t border-ink">
                {g.items.map((item) =>
              <AccordionItem key={item.q} title={item.q} titleClassName="text-[16px]">
                    {item.a}
                  </AccordionItem>
              )}
              </div>
            </section>
          )}
        </div>
        <aside className="lg:col-span-3 lg:col-start-10">
          <div className="border-t border-ink pt-6 lg:sticky lg:top-[160px]">
            <h2 className="font-display text-[24px]">Still wondering?</h2>
            <p className="mt-2 text-[15px] text-ink-soft">We reply to every message within one working day.</p>
            <Link to="/contact" className="btn-outline mt-5">Contact us</Link>
          </div>
        </aside>
      </div>
    </>);

}
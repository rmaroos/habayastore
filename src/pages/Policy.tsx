import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { policies } from '../data/site';
import { PageIntro } from '../components/PageIntro';
import { NotFound } from './NotFound';

export function Policy() {
  const { policy = '' } = useParams();
  const page = policies[policy];
  if (!page) return <NotFound />;

  return (
    <>
      <PageIntro crumb={page.title} title={page.title} intro={page.intro} />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <nav aria-label="Help pages" className="lg:col-span-3">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 border-b border-rule pb-4 lg:block lg:space-y-1 lg:border-b-0 lg:border-l lg:pb-0">
            {Object.entries(policies).map(([key, p]) =>
            <li key={key}>
                <NavLink
                to={`/help/${key}`}
                className={({ isActive }) =>
                `block text-[14px] lg:-ml-px lg:border-l lg:py-1.5 lg:pl-4 ${
                isActive ? 'border-ink font-bold text-ink' : 'border-transparent text-ink-soft hover:text-ink'}`

                }>
                
                  {p.title}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="max-w-2xl space-y-10 lg:col-span-7 lg:col-start-5">
          {page.sections.map((s) =>
          <section key={s.heading}>
              <h2 className="font-display text-[28px] leading-tight">{s.heading}</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{s.body}</p>
            </section>
          )}
          <p className="border-t border-rule pt-6 text-[13px] text-ink-soft">Last updated October 2026.</p>
        </div>
      </div>
    </>);

}
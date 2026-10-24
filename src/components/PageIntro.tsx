import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';

interface PageIntroProps {
  title: string;
  intro?: string;
  crumb: string;
}

export function PageIntro({ title, intro, crumb }: PageIntroProps) {
  return (
    <header className="border-b border-rule">
      <div className="container-page pb-10 pt-8 lg:pb-14 lg:pt-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: crumb }]} />
        <h1 className="mt-8 max-w-3xl font-display text-[42px] font-medium leading-[1.02] lg:mt-10 lg:text-[64px]">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-soft lg:text-[17px]">{intro}</p>}
      </div>
    </header>);

}